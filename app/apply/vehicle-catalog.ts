export type VehicleVariant = {
  name: string;
  price?: number;
  images: string[];
  officialUrl?: string;
};

export type VehicleModel = {
  name: string;
  variants: VehicleVariant[];
};

export type VehicleBrand = {
  name: string;
  models: VehicleModel[];
};

export type VehicleCategory = {
  name: string;
  brands: VehicleBrand[];
};

import { mahindraCommercial } from "./mahindra-commercial";

export const vehicleCatalog: VehicleCategory[] = [
  mahindraCommercial,
];
