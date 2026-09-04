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

export function emptyBrand(
  name: string,
  officialUrl: string
): VehicleBrand {
  return {
    id: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    name,
    officialUrl,
    models: [],
  };
}

export function modelId(manufacturer: string, model: string) {
  return `${manufacturer}-${model}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
}

export function variantId(
  manufacturer: string,
  model: string,
  variant: string
) {
  return `${manufacturer}-${model}-${variant}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-");
}

export function emptyModel(
  manufacturer: string,
  model: string,
  officialUrl: string,
  category: VehicleModel["category"] = "Commercial Vehicle"
): VehicleModel {
  return {
    id: modelId(manufacturer, model),
    name: model,
    category,
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
