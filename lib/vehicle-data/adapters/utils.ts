import type {
  VehicleBrand,
  VehicleManufacturer,
  VehicleModel,
  VehicleVariant,
} from "../types";

export type ManufacturerAdapter = {
  manufacturerId: string;
  fetchCatalog: () => Promise<VehicleManufacturer>;
};

export function slugify(value: string): string {
  return value
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function brandId(
  manufacturer: string,
  brand: string
): string {
  return `${slugify(manufacturer)}-${slugify(brand)}`;
}

export function modelId(
  manufacturer: string,
  model: string
): string {
  return `${slugify(manufacturer)}-${slugify(model)}`;
}

export function variantId(
  manufacturer: string,
  model: string,
  variant: string
): string {
  return `${slugify(manufacturer)}-${slugify(model)}-${slugify(
    variant
  )}`;
}

export function emptyBrand(
  name: string,
  officialUrl: string,
  manufacturer?: string
): VehicleBrand {
  return {
    id: manufacturer
      ? brandId(manufacturer, name)
      : slugify(name),
    name,
    officialUrl,
    models: [],
  };
}

export function emptyModel(
  manufacturer: string,
  model: string,
  officialUrl: string,
  category: VehicleModel["category"] = "Commercial Vehicle",
  options?: {
    subcategory?: string;
    bodyType?: string;
    application?: string;
  }
): VehicleModel {
  return {
    id: modelId(manufacturer, model),
    name: model,
    category,
    subcategory: options?.subcategory,
    bodyType: options?.bodyType,
    application: options?.application,
    images: [],
    variants: [],
    officialUrl,
  };
}

export function emptyVariant(
  manufacturer: string,
  model: string,
  name: string,
  officialUrl: string
): VehicleVariant {
  return {
    id: variantId(manufacturer, model, name),
    name,
    images: [],
    officialUrl,
  };
}

export function makeImage(
  url: string,
  alt: string,
  sourceUrl?: string
) {
  return {
    url,
    alt,
    type: "primary" as const,
    sourceUrl,
  };
}

export function makeVariant(
  manufacturer: string,
  model: string,
  name: string,
  officialUrl: string,
  options?: {
    fuel?: string;
    transmission?: string;
    engine?: string;
    battery?: string;
    power?: string;
    torque?: string;
    price?: VehicleVariant["price"];
    images?: VehicleVariant["images"];
    specifications?: Record<string, string>;
  }
): VehicleVariant {
  return {
    id: variantId(manufacturer, model, name),
    name,
    fuel: options?.fuel,
    transmission: options?.transmission,
    engine: options?.engine,
    battery: options?.battery,
    power: options?.power,
    torque: options?.torque,
    price: options?.price,
    images: options?.images ?? [],
    specifications: options?.specifications,
    officialUrl,
  };
}