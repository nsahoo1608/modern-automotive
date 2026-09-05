import type { VehicleManufacturer, VehicleModel } from "../types";
import { slugify } from "./utils";

export type LiveEquipmentSource = {
  manufacturerId: string;
  manufacturerName: string;
  officialUrl: string;
  productUrl: string;
  category: VehicleModel["category"];
  equipmentType: string;
};

function cleanText(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function extractHeadings(html: string): string[] {
  const matches = html.match(/<h[1-6][^>]*>[\s\S]*?<\/h[1-6]>/gi) ?? [];

  return matches
    .map(cleanText)
    .map((value) => value.trim())
    .filter(Boolean);
}

function looksLikeProduct(value: string): boolean {
  if (value.length < 2 || value.length > 100) return false;

  const lower = value.toLowerCase();

  const ignored = [
    "products",
    "product",
    "contact",
    "about us",
    "read more",
    "know more",
    "learn more",
    "find a dealer",
    "request a quote",
    "get a quote",
    "services",
    "solutions",
    "industries",
    "news",
    "careers",
    "support",
  ];

  return !ignored.some((item) => lower === item);
}

export async function fetchLiveEquipmentCatalog(
  source: LiveEquipmentSource
): Promise<VehicleManufacturer> {
  const response = await fetch(source.productUrl, {
    cache: "no-store",
    headers: {
      "User-Agent": "ModernAutomotive/1.0",
      Accept: "text/html,application/xhtml+xml",
    },
  });

  if (!response.ok) {
    throw new Error(
      `${source.manufacturerName} official source returned HTTP ${response.status}`
    );
  }

  const html = await response.text();

  const headings = extractHeadings(html);

  const uniqueProducts = Array.from(
    new Set(headings.filter(looksLikeProduct))
  );

  const models: VehicleModel[] = uniqueProducts.map((name) => ({
    id: `${source.manufacturerId}-${slugify(name)}`,
    name,
    category: source.category,
    subcategory: source.equipmentType,
    equipmentType: source.equipmentType,
    application: source.equipmentType,
    images: [],
    variants: [],
    officialUrl: source.productUrl,
  }));

  return {
    id: source.manufacturerId,
    name: source.manufacturerName,
    officialUrl: source.officialUrl,
    sources: [
      {
        id: `${source.manufacturerId}-official`,
        name: `${source.manufacturerName} Official`,
        officialUrl: source.officialUrl,
        vehicleUrl: source.productUrl,
      },
    ],
    brands: [
      {
        id: source.manufacturerId,
        name: source.manufacturerName,
        officialUrl: source.officialUrl,
        models,
      },
    ],
  };
}
