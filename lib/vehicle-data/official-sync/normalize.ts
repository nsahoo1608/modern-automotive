import type {
  VehicleImage,
  VehicleModel,
  VehiclePrice,
  VehicleVariant,
} from "../types";

import type {
  ExtractedPageData,
  ExtractedPrice,
} from "./extract";

import type {
  OfficialSyncSource,
} from "./sources";

import {
  isOfficialUrl,
} from "./sources";

function normalizePrice(
  extracted: ExtractedPrice,
  sourceUrl: string,
  verifiedAt: string
): VehiclePrice | undefined {
  if (
    extracted.currency.toUpperCase() !== "INR" ||
    !Number.isFinite(extracted.amount) ||
    extracted.amount <= 0
  ) {
    return undefined;
  }

  return {
    amount: extracted.amount,
    currency: "INR",
    type: extracted.type,
    sourceUrl,
    verifiedAt,
  };
}

function normalizeImages(
  page: ExtractedPageData,
  source: OfficialSyncSource
): VehicleImage[] {
  const candidates = page.images
    .filter((image) =>
      isOfficialUrl(image.url, source)
    )
    .filter(
      (image, index, all) =>
        all.findIndex(
          (item) => item.url === image.url
        ) === index
    );

  const modelSlug = slug(
    page.modelName ??
      page.title ??
      ""
  );

  const scored = candidates.map(
    (image, index) => {
      const value =
        `${image.url} ${
          image.alt ?? ""
        }`.toLowerCase();

      let score = 0;

      if (
        modelSlug &&
        value.includes(modelSlug)
      ) {
        score += 100;
      }

      if (
        /\/(product|vehicle|truck|bus|excavator|equipment|machines?)\//i.test(
          image.url
        )
      ) {
        score += 30;
      }

      if (
        /\/images\/(icv|lcv|hcv)\//i.test(
          image.url
        )
      ) {
        score += 40;
      }

      if (
        /(overview|product|main|hero|front|side)/i.test(
          image.url
        )
      ) {
        score += 20;
      }

      if (
        /(truck|bus|vehicle|furio|jayo|tractor|excavator|loader|machine)/i.test(
          image.alt ?? ""
        )
      ) {
        score += 20;
      }

      if (
        /(logo|icon|menu|enquiry|sales|facebook|instagram|youtube|linkedin|whatsapp|arrow|banner)/i.test(
          value
        )
      ) {
        score -= 150;
      }

      if (
        /(logo|mahindra-rise|mtb-logo|icon-product)/i.test(
          value
        )
      ) {
        score = -1000;
      }

      if (
        image.url === page.url ||
        image.url === page.canonicalUrl
      ) {
        score -= 200;
      }

      return {
        image,
        score,
        index,
      };
    }
  );

  scored.sort(
    (a, b) =>
      b.score - a.score ||
      a.index - b.index
  );

  const selected = scored
    .filter(
      (item) => item.score > -50
    )
    .slice(0, 10);

  return selected.map(
    (item, index) => ({
      url: item.image.url,
      alt:
        item.image.alt ??
        page.modelName ??
        page.title ??
        "Official vehicle image",
      type:
        index === 0
          ? "primary"
          : "gallery",
      sourceUrl:
        page.canonicalUrl ??
        page.url,
    })
  );
}

function choosePrice(
  page: ExtractedPageData,
  verifiedAt: string
): VehiclePrice | undefined {
  if (page.prices.length === 0) {
    return undefined;
  }

  const officialPrices = page.prices
    .map((price) =>
      normalizePrice(
        price,
        page.canonicalUrl ?? page.url,
        verifiedAt
      )
    )
    .filter(
      (
        price
      ): price is VehiclePrice =>
        Boolean(price)
    );

  if (officialPrices.length === 0) {
    return undefined;
  }

  const exactPrice =
    officialPrices.find(
      (price) =>
        price.type === "ex-showroom"
    );

  if (exactPrice) {
    return exactPrice;
  }

  return officialPrices.find(
    (price) =>
      price.type === "starting-from"
  );
}

function mergeImages(
  target: VehicleImage[],
  incoming: VehicleImage[]
): void {
  for (const image of incoming) {
    if (
      !target.some(
        (item) => item.url === image.url
      )
    ) {
      target.push(image);
    }
  }
}

function variantKey(
  name: string,
  fuel?: string,
  transmission?: string
): string {
  return [
    slug(name),
    slug(fuel ?? ""),
    slug(transmission ?? ""),
  ].join("|");
}

export type NormalizedOfficialVehicle = {
  model: VehicleModel;
  variant?: VehicleVariant;
};

export type NormalizedOfficialCatalog = {
  vehicles: NormalizedOfficialVehicle[];
};

export function normalizeOfficialPage(
  page: ExtractedPageData,
  source: OfficialSyncSource,
  manufacturerId: string,
  category: VehicleModel["category"] =
    "Commercial Vehicle",
  verifiedAt: string =
    new Date().toISOString()
): NormalizedOfficialCatalog {
  const grouped =
    new Map<
      string,
      NormalizedOfficialVehicle
    >();

  for (const extracted of page.vehicles) {
    const modelName =
      extracted.name.trim();

    if (!modelName) {
      continue;
    }

    const modelId =
      `${manufacturerId}-${slug(modelName)}`;

    const officialUrl =
      extracted.officialUrl &&
      isOfficialUrl(
        extracted.officialUrl,
        source
      )
        ? extracted.officialUrl
        : page.canonicalUrl ??
          page.url;

    let entry = grouped.get(modelId);

    if (!entry) {
      entry = {
        model: {
          id: modelId,
          name: modelName,
          category,
          images: [],
          variants: [],
          officialUrl,
        },
      };

      grouped.set(
        modelId,
        entry
      );
    }

    const extractedImages =
      extracted.images
        .filter((image) =>
          isOfficialUrl(
            image.url,
            source
          )
        )
        .map(
          (image, index) => ({
            url: image.url,
            alt:
              image.alt ??
              modelName,
            type:
              index === 0
                ? ("primary" as const)
                : ("gallery" as const),
            sourceUrl:
              officialUrl,
          })
        );

    const images =
      extractedImages.length > 0
        ? extractedImages
        : normalizeImages(
            page,
            source
          );

    mergeImages(
      entry.model.images,
      images
    );

    const normalizedPrice =
      extracted.price
        ? normalizePrice(
            extracted.price,
            officialUrl,
            verifiedAt
          )
        : undefined;

    if (!normalizedPrice) {
      continue;
    }

    const variantName =
      extracted.variantName?.trim() ||
      extracted.name.trim();

    const key =
      variantKey(
        variantName,
        extracted.fuel,
        extracted.transmission
      );

    const existingVariant =
      entry.model.variants.find(
        (variant) =>
          variantKey(
            variant.name,
            variant.fuel,
            variant.transmission
          ) === key
      );

    if (existingVariant) {
      continue;
    }

    const variant: VehicleVariant = {
      id:
        `${modelId}-${slug(
          variantName
        )}-${slug(
          extracted.transmission ??
            ""
        )}-${slug(
          extracted.fuel ?? ""
        )}`,
      name: variantName,
      fuel: extracted.fuel,
      transmission:
        extracted.transmission,
      price: normalizedPrice,
      images,
      officialUrl,
    };

    entry.model.variants.push(
      variant
    );

    if (!entry.variant) {
      entry.variant = variant;
    }
  }

  if (
    grouped.size === 0 &&
    page.vehicles.length === 0
  ) {
    const officialUrl =
      page.canonicalUrl ??
      page.url;

    const modelName =
      page.modelName ??
      page.title ??
      "Official Vehicle";

    const images =
      normalizeImages(
        page,
        source
      );

    const price =
      choosePrice(
        page,
        verifiedAt
      );

    const model: VehicleModel = {
      id:
        `${manufacturerId}-${slug(
          modelName
        )}`,
      name: modelName,
      category,
      images,
      variants: [],
      officialUrl,
    };

    if (price) {
      const variant: VehicleVariant = {
        id:
          `${manufacturerId}-${slug(
            modelName
          )}-official`,
        name: modelName,
        price,
        images,
        officialUrl,
      };

      model.variants.push(
        variant
      );

      grouped.set(
        model.id,
        {
          model,
          variant,
        }
      );
    } else {
      grouped.set(
        model.id,
        {
          model,
        }
      );
    }
  }

  return {
    vehicles: Array.from(
      grouped.values()
    ),
  };
}

function slug(value: string): string {
  return value
    .normalize("NFKD")
    .replace(
      /[\u0300-\u036f]/g,
      ""
    )
    .toLowerCase()
    .replace(
      /[^a-z0-9]+/g,
      "-"
    )
    .replace(
      /^-+|-+$/g,
      "");
}
