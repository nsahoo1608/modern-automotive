import * as cheerio from "cheerio";
import type { OfficialSyncSource } from "./sources";
import { isOfficialUrl } from "./sources";

export type ExtractedImage = {
  url: string;
  alt?: string;
};

export type ExtractedColour = {
  id: string;
  name: string;
  hex?: string;
  image?: ExtractedImage;
};

export type ExtractedPrice = {
  amount: number;
  currency: string;
  type: "ex-showroom" | "starting-from" | "indicative";
};

export type ExtractedVehicle = {
  name: string;
  price?: ExtractedPrice;
  officialUrl?: string;
  images: ExtractedImage[];
  variantName?: string;
  fuel?: string;
  transmission?: string;
  colours?: ExtractedColour[];
  source: "html" | "json-ld" | "next-data";
};

export type ExtractedPageData = {
  url: string;
  canonicalUrl?: string;
  title?: string;
  description?: string;
  modelName?: string;
  images: ExtractedImage[];
  prices: ExtractedPrice[];
  vehicles: ExtractedVehicle[];
};

type JsonLdValue = Record<string, unknown> | unknown[];

function absoluteUrl(
  value: string,
  pageUrl: string
): string | undefined {
  try {
    return new URL(value, pageUrl).toString();
  } catch {
    return undefined;
  }
}

function cleanText(value: unknown): string | undefined {
  if (typeof value !== "string") return undefined;

  const text = value.replace(/\s+/g, " ").trim();

  return text || undefined;
}

function parseNumber(value: unknown): number | undefined {
  if (typeof value === "number" && Number.isFinite(value)) {
    return value;
  }

  if (typeof value !== "string") return undefined;

  const cleaned = value.replace(/[?,\s]/g, "");

  const match = cleaned.match(/\d+(?:\.\d+)?/);

  if (!match) return undefined;

  const number = Number(match[0]);

  return Number.isFinite(number) ? number : undefined;
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function getJsonLdTypes(value: Record<string, unknown>): string[] {
  const type = value["@type"];

  if (typeof type === "string") {
    return [type.toLowerCase()];
  }

  if (Array.isArray(type)) {
    return type
      .filter(
        (item): item is string =>
          typeof item === "string"
      )
      .map((item) => item.toLowerCase());
  }

  return [];
}

function collectJsonLdProducts(
  value: JsonLdValue,
  products: Record<string, unknown>[]
): void {
  if (Array.isArray(value)) {
    for (const item of value) {
      if (isRecord(item) || Array.isArray(item)) {
        collectJsonLdProducts(
          item as JsonLdValue,
          products
        );
      }
    }

    return;
  }

  if (!isRecord(value)) return;

  const types = getJsonLdTypes(value);

  if (
    types.includes("product") ||
    types.includes("vehicle") ||
    types.includes("car")
  ) {
    products.push(value);
  }

  const graph = value["@graph"];

  if (Array.isArray(graph)) {
    collectJsonLdProducts(
      graph as JsonLdValue,
      products
    );
  }
}

function addImage(
  images: ExtractedImage[],
  value: unknown,
  pageUrl: string,
  source: OfficialSyncSource,
  alt?: string
): void {
  if (typeof value !== "string") return;

  const url = absoluteUrl(value, pageUrl);

  if (!url || !isOfficialUrl(url, source)) return;

  if (
    !images.some(
      (image) => image.url === url
    )
  ) {
    images.push({
      url,
      alt: cleanText(alt),
    });
  }
}

function extractImagesFromHtml(
  $: cheerio.CheerioAPI,
  pageUrl: string,
  source: OfficialSyncSource
): ExtractedImage[] {
  const images: ExtractedImage[] = [];

  $(
    'meta[property="og:image"], meta[property="og:image:url"]'
  ).each((_, element) => {
    addImage(
      images,
      $(element).attr("content"),
      pageUrl,
      source
    );
  });

  $(
    'meta[name="twitter:image"], meta[name="twitter:image:src"]'
  ).each((_, element) => {
    addImage(
      images,
      $(element).attr("content"),
      pageUrl,
      source
    );
  });

  $("img").each((_, element) => {
    const src =
      $(element).attr("src") ??
      $(element).attr("data-src") ??
      $(element).attr("data-lazy-src");

    const alt = cleanText(
      $(element).attr("alt")
    );

    if (!src) return;

    addImage(
      images,
      src,
      pageUrl,
      source,
      alt
    );
  });

  return images;
}

function extractPricesFromProduct(
  product: Record<string, unknown>
): ExtractedPrice[] {
  const prices: ExtractedPrice[] = [];

  const offers = product.offers;

  const offerList = Array.isArray(offers)
    ? offers
    : offers
      ? [offers]
      : [];

  for (const offer of offerList) {
    if (!isRecord(offer)) continue;

    const amount = parseNumber(
      offer.price ??
        offer.lowPrice ??
        offer.minPrice
    );

    if (amount === undefined) continue;

    const currency =
      typeof offer.priceCurrency === "string"
        ? offer.priceCurrency
        : "INR";

    const priceText = JSON.stringify(
      offer
    ).toLowerCase();

    let type: ExtractedPrice["type"] =
      "ex-showroom";

    if (
      priceText.includes("starting") ||
      priceText.includes("from") ||
      offer.lowPrice !== undefined ||
      offer.minPrice !== undefined
    ) {
      type = "starting-from";
    }

    prices.push({
      amount,
      currency,
      type,
    });
  }

  return prices;
}

function extractJsonLd(
  $: cheerio.CheerioAPI
): {
  products: Record<string, unknown>[];
} {
  const products: Record<string, unknown>[] = [];

  $('script[type="application/ld+json"]').each(
    (_, element) => {
      const text = $(element)
        .text()
        .trim();

      if (!text) return;

      try {
        const parsed = JSON.parse(
          text
        ) as JsonLdValue;

        collectJsonLdProducts(
          parsed,
          products
        );
      } catch {
        // Ignore malformed JSON-LD.
      }
    }
  );

  return { products };
}

function extractHondaNextData(
  $: cheerio.CheerioAPI,
  pageUrl: string,
  source: OfficialSyncSource
): ExtractedVehicle[] {
  const vehicles: ExtractedVehicle[] = [];

  const element = $("script#__NEXT_DATA__");

  if (!element.length) {
    return vehicles;
  }

  const text = element.text().trim();

  if (!text) {
    return vehicles;
  }

  function collectHondaColours(): ExtractedColour[] {
    const colours: ExtractedColour[] = [];
    const seen = new Set<string>();

    $("script").each((_, script) => {
      const scriptText = $(script).html() ?? "";

      if (!scriptText.includes("chooseCarColor")) {
        return;
      }

      const matches = scriptText.match(
        /"colorId"\s*:\s*(\d+)[\s\S]{0,2500}?"imageUrl"\s*:\s*"([^"]+)"[\s\S]{0,1800}?"chooseCarColor"\s*:\s*\[\s*\{\s*"colorName"\s*:\s*"([^"]+)"[\s\S]*?"colorStart"\s*:\s*"([^"]*)"/g
      );

      if (!matches) {
        return;
      }

      for (const match of matches) {
        const parsed = match.match(
          /"colorId"\s*:\s*(\d+)[\s\S]{0,2500}?"imageUrl"\s*:\s*"([^"]+)"[\s\S]{0,1800}?"chooseCarColor"\s*:\s*\[\s*\{\s*"colorName"\s*:\s*"([^"]+)"[\s\S]*?"colorStart"\s*:\s*"([^"]*)"/
        );

        if (!parsed) {
          continue;
        }

        const [, colorId, imageUrl, colorName, colorStart] = parsed;

        if (!colorName || !imageUrl || seen.has(colorName)) {
          continue;
        }

        seen.add(colorName);

        colours.push({
          id: colorId,
          name: colorName,
          hex: colorStart ? `#${colorStart}` : undefined,
          image: {
            url: imageUrl,
            alt: colorName,
          },
        });
      }
    });

    return colours;
  }
  function collectImages(
    item: Record<string, unknown>
  ): ExtractedImage[] {
    const images: ExtractedImage[] = [];

    const lists = [
      item.webUrlLink,
      item.mobileUrlLink,
      item.imageArray,
      item.car_model_images,
      item.mobileImageArr,
    ];

    for (const list of lists) {
      if (!Array.isArray(list)) continue;

      for (const image of list) {
        if (typeof image === "string") {
          addImage(
            images,
            image,
            pageUrl,
            source
          );
        }
      }
    }

    return images;
  }

  function addVehicle(
    item: Record<string, unknown>,
    fallbackName?: string
  ): void {
    const name =
      cleanText(item.carModelName) ??
      cleanText(item.modelName) ??
      cleanText(item.PN_name) ??
      fallbackName;

    if (!name) return;

    const priceValue = parseNumber(
      item.carModelPrice ??
        item.PN_Price ??
        item.price
    );

    const siteUrl =
      cleanText(item.carModelSiteUrl) ??
      cleanText(item.PN_Siteurl);

    const officialUrl = siteUrl
      ? absoluteUrl(
          siteUrl.startsWith("http")
            ? siteUrl
            : `/${siteUrl}`,
          pageUrl
        ) ?? pageUrl
      : pageUrl;

    const images = collectImages(item);

    const price =
      priceValue !== undefined
        ? {
            amount: priceValue,
            currency: "INR",
            type: "starting-from" as const,
          }
        : undefined;

    vehicles.push({
      name,
      price,
      officialUrl,
      images,
      variantName:
        cleanText(item.carModelVarient) ??
        cleanText(item.variantName) ??
        cleanText(item.carModelTrim),
      fuel:
        cleanText(item.carModelFuelType) ??
        cleanText(item.fuelType),
      transmission:
        cleanText(item.carModelTransmissionType) ??
        cleanText(item.transType),
      source: "next-data",
    });
  }

  function addDetailedVariant(
    modelName: string,
    fuelType: string | undefined,
    transmission: string | undefined,
    variantName: string,
    amount: number,
    images: ExtractedImage[],
    officialUrl: string
  ): void {
    if (!Number.isFinite(amount) || amount <= 0) {
      return;
    }

    vehicles.push({
      name: modelName,
      price: {
        amount,
        currency: "INR",
        type: "ex-showroom",
      },
      officialUrl,
      images: [...images],
      variantName,
      fuel: fuelType,
      transmission,
      source: "next-data",
    });
  }

  function parseHondaPriceStructure(
    value: unknown,
    fallbackModelName?: string,
    fallbackFuel?: string,
    fallbackTransmission?: string,
    fallbackImages: ExtractedImage[] = [],
    fallbackOfficialUrl = pageUrl
  ): void {
    if (Array.isArray(value)) {
      for (const item of value) {
        parseHondaPriceStructure(
          item,
          fallbackModelName,
          fallbackFuel,
          fallbackTransmission,
          fallbackImages,
          fallbackOfficialUrl
        );
      }

      return;
    }

    if (!isRecord(value)) {
      return;
    }

    const modelName =
      cleanText(value.carModelName) ??
      cleanText(value.modelName) ??
      cleanText(value.PN_name) ??
      fallbackModelName;

    const fuelType =
      cleanText(value.fuelType) ??
      cleanText(value.resourceFuelType) ??
      fallbackFuel;

    const transmission =
      cleanText(value.transType) ??
      cleanText(value.transmission) ??
      fallbackTransmission;

    const siteUrl =
      cleanText(value.carModelSiteUrl) ??
      cleanText(value.PN_Siteurl);

    const officialUrl = siteUrl
      ? absoluteUrl(
          siteUrl.startsWith("http")
            ? siteUrl
            : `/${siteUrl}`,
          pageUrl
        ) ?? fallbackOfficialUrl
      : fallbackOfficialUrl;

    const images = [
      ...fallbackImages,
      ...collectImages(value),
    ];

    const grades = value.grade;

    if (Array.isArray(grades)) {
      for (const grade of grades) {
        if (!isRecord(grade)) continue;

        const gradeTransmission =
          cleanText(grade.transType) ??
          transmission;

        const variants = Array.isArray(
          grade.variants
        )
          ? grade.variants
          : [];

        const prices = Array.isArray(
          grade.price
        )
          ? grade.price
          : [];

        const count = Math.min(
          variants.length,
          prices.length
        );

        for (
          let index = 0;
          index < count;
          index++
        ) {
          const variantName = cleanText(
            variants[index]
          );

          const amount = parseNumber(
            prices[index]
          );

          if (
            modelName &&
            variantName &&
            amount !== undefined
          ) {
            addDetailedVariant(
              modelName,
              fuelType,
              gradeTransmission,
              variantName,
              amount,
              images,
              officialUrl
            );
          }
        }
      }
    }

    const nestedKeys = [
      "priceData",
      "prices",
      "grades",
      "fuelTypes",
      "data",
      "items",
      "finalData",
      "carsData",
    ];

    for (const key of nestedKeys) {
      const nested: unknown = value[key];

      if (nested !== undefined && nested !== value) {
        parseHondaPriceStructure(
          nested,
          modelName,
          fuelType,
          transmission,
          images,
          officialUrl
        );
      }
    }
  }

  try {
    const data = JSON.parse(text) as unknown;

    if (!isRecord(data)) {
      return vehicles;
    }

    const props = data.props;

    if (!isRecord(props)) {
      return vehicles;
    }

    const pageProps = props.pageProps;

    if (!isRecord(pageProps)) {
      return vehicles;
    }

    const checkPriceData =
      pageProps.checkPriceData;

    if (Array.isArray(checkPriceData)) {
      for (const item of checkPriceData) {
        if (!isRecord(item)) continue;

        addVehicle(item);
      }
    }

    const carsData = pageProps.carsData;

    if (Array.isArray(carsData)) {
      for (const item of carsData) {
        if (!isRecord(item)) continue;

        const modelName = cleanText(
          item.PN_name
        );

        if (!modelName) continue;

        const images = collectImages(item);

        const existing = vehicles.find(
          (vehicle) =>
            vehicle.name.toLowerCase() ===
            modelName.toLowerCase()
        );

        if (existing) {
          for (const image of images) {
            if (
              !existing.images.some(
                (item) =>
                  item.url === image.url
              )
            ) {
              existing.images.push(image);
            }
          }
        }
      }
    }

    const detailedKeys = [
      "priceData",
      "prices",
      "modelPriceData",
      "vehiclePriceData",
      "carPriceMainData",
    ];

    let detailedModelName: string | undefined;
    let detailedOfficialUrl = pageUrl;
    let detailedImages: ExtractedImage[] = [];

    if (Array.isArray(carsData)) {
      const currentPath = new URL(pageUrl).pathname
        .replace(/\/+$/, "")
        .toLowerCase();

      const currentSlug =
        currentPath.split("/").filter(Boolean).pop() ?? "";

      const matchingItem = carsData.find((item) => {
        if (!isRecord(item)) return false;

        const siteUrl =
          cleanText(item.PN_Siteurl) ??
          cleanText(item.carModelSiteUrl);

        if (!siteUrl) return false;

        try {
          const absoluteSiteUrl = absoluteUrl(
            siteUrl.startsWith("http")
              ? siteUrl
              : `/${siteUrl}`,
            pageUrl
          );

          if (!absoluteSiteUrl) return false;

          const itemPath = new URL(absoluteSiteUrl).pathname
            .replace(/\/+$/, "")
            .toLowerCase();

          const itemSlug =
            itemPath.split("/").filter(Boolean).pop() ?? "";

          return itemSlug === currentSlug;
        } catch {
          return false;
        }
      });

      if (matchingItem && isRecord(matchingItem)) {
        detailedModelName =
          cleanText(matchingItem.PN_name) ??
          cleanText(matchingItem.carModelName) ??
          cleanText(matchingItem.modelName);

        const siteUrl =
          cleanText(matchingItem.PN_Siteurl) ??
          cleanText(matchingItem.carModelSiteUrl);

        if (siteUrl) {
          detailedOfficialUrl =
            absoluteUrl(
              siteUrl.startsWith("http")
                ? siteUrl
                : `/${siteUrl}`,
              pageUrl
            ) ?? detailedOfficialUrl;
        }

        detailedImages = collectImages(matchingItem);
      }
    }

    for (const key of detailedKeys) {
      const value = pageProps[key];

      if (value !== undefined) {
        parseHondaPriceStructure(
          value,
          detailedModelName,
          undefined,
          undefined,
          detailedImages,
          detailedOfficialUrl
        );
      }
    }
    const containers = [
      pageProps.data,
      pageProps.modelData,
      pageProps.carData,
      pageProps.seoData,
    ];

    for (const container of containers) {
      if (container !== undefined) {
        parseHondaPriceStructure(container);
      }
    }
  } catch {
    // Ignore invalid Next.js data.
  }

  const unique: ExtractedVehicle[] = [];

  for (const vehicle of vehicles) {
    const key = [
      vehicle.name,
      vehicle.variantName ?? "",
      vehicle.fuel ?? "",
      vehicle.transmission ?? "",
      vehicle.price?.amount ?? "",
    ]
      .map((value) =>
        String(value).trim().toLowerCase()
      )
      .join("|");

    const exists = unique.some(
      (item) => {
        const itemKey = [
          item.name,
          item.variantName ?? "",
          item.fuel ?? "",
          item.transmission ?? "",
          item.price?.amount ?? "",
        ]
          .map((value) =>
            String(value).trim().toLowerCase()
          )
          .join("|");

        return itemKey === key;
      }
    );

    if (!exists) {
      unique.push(vehicle);
    }
  }

  return unique;
}

export function extractPageData(
  html: string,
  pageUrl: string,
  source: OfficialSyncSource
): ExtractedPageData {
  const $ = cheerio.load(html);

  const images =
    extractImagesFromHtml(
      $,
      pageUrl,
      source
    );

  const {
    products,
  } = extractJsonLd($);

  const prices: ExtractedPrice[] = [];

  let modelName:
    | string
    | undefined;

  const vehicles: ExtractedVehicle[] =
    [];

  for (const product of products) {
    const name = cleanText(
      product.name
    );

    if (!modelName && name) {
      modelName = name;
    }

    const productImage =
      product.image;

    if (
      typeof productImage ===
      "string"
    ) {
      addImage(
        images,
        productImage,
        pageUrl,
        source
      );
    }

    if (
      Array.isArray(productImage)
    ) {
      for (const image of productImage) {
        addImage(
          images,
          image,
          pageUrl,
          source
        );
      }
    }

    const productPrices =
      extractPricesFromProduct(
        product
      );

    prices.push(
      ...productPrices
    );

    if (name) {
      vehicles.push({
        name,
        images: [],
        price:
          productPrices[0],
        officialUrl:
          pageUrl,
        source:
          "json-ld",
      });
    }
  }

  const nextVehicles =
    extractHondaNextData(
      $,
      pageUrl,
      source
    );

  for (const vehicle of nextVehicles) {
    const existingIndex =
      vehicles.findIndex(
        (item) =>
          item.name.trim().toLowerCase() ===
            vehicle.name.trim().toLowerCase() &&
          (item.variantName ?? "").trim().toLowerCase() ===
            (vehicle.variantName ?? "").trim().toLowerCase() &&
          (item.fuel ?? "").trim().toLowerCase() ===
            (vehicle.fuel ?? "").trim().toLowerCase() &&
          (item.transmission ?? "").trim().toLowerCase() ===
            (vehicle.transmission ?? "").trim().toLowerCase() &&
          (item.price?.amount ?? "") ===
            (vehicle.price?.amount ?? "")
      );

    if (existingIndex >= 0) {
      vehicles[existingIndex] =
        vehicle;
    } else {
      vehicles.push(vehicle);
    }

    if (vehicle.price) {
      prices.push(
        vehicle.price
      );
    }

    for (const image of vehicle.images) {
      if (
        !images.some(
          (item) =>
            item.url === image.url
        )
      ) {
        images.push(image);
      }
    }
  }

  const canonicalRaw =
    $('link[rel="canonical"]')
      .attr("href");

  const canonicalUrl =
    canonicalRaw
      ? absoluteUrl(
          canonicalRaw,
          pageUrl
        )
      : undefined;

  const title =
    cleanText(
      $("title").text()
    ) ??
    cleanText(
      $(
        'meta[property="og:title"]'
      ).attr("content")
    );

  const description =
    cleanText(
      $(
        'meta[name="description"]'
      ).attr("content")
    ) ??
    cleanText(
      $(
        'meta[property="og:description"]'
      ).attr("content")
    );

  return {
    url: pageUrl,
    canonicalUrl,
    title,
    description,
    modelName,
    images,
    prices,
    vehicles,
  };
}

