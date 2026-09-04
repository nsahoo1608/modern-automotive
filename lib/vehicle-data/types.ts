export type VehicleType =
  | "Passenger Vehicle"
  | "Commercial Vehicle"
  | "Electric Vehicle"
  | "Two Wheeler";

export type VehiclePrice = {
  amount: number;
  currency: "INR";
  type: "ex-showroom" | "on-road" | "dealer";
  city?: string;
  state?: string;
  sourceUrl: string;
  verifiedAt: string;
};

export type VehicleImage = {
  url: string;
  alt: string;
  type: "primary" | "gallery";
  sourceUrl?: string;
};

export type VehicleVariant = {
  id: string;
  name: string;
  fuel?: string;
  transmission?: string;
  price?: VehiclePrice;
  images: VehicleImage[];
  specifications?: Record<string, string>;
  officialUrl: string;
};

export type VehicleModel = {
  id: string;
  name: string;
  category: VehicleType;
  images: VehicleImage[];
  variants: VehicleVariant[];
  officialUrl: string;
};

export type VehicleBrand = {
  id: string;
  name: string;
  logo?: string;
  officialUrl: string;
  models: VehicleModel[];
};

export type ManufacturerSource = {
  id: string;
  name: string;
  officialUrl: string;
  vehicleUrl?: string;
  priceUrl?: string;
  dealerLocatorUrl?: string;
};

export type VehicleManufacturer = {
  id: string;
  name: string;
  logo?: string;
  officialUrl: string;
  sources: ManufacturerSource[];
  brands: VehicleBrand[];
};
