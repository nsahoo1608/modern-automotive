import type { VehicleManufacturer, VehicleModel } from "../types";
import { emptyModel } from "./utils";

const OFFICIAL = "https://smlisuzu.com";

export async function fetchSmlIsuzuCatalog(): Promise<VehicleManufacturer> {
  const models: VehicleModel[] = [
    emptyModel("sml-isuzu", "Sartaj 5252 Diesel", `${OFFICIAL}/IN/category/trucks/diesel-4-tyre`, "Commercial Vehicle", { subcategory: "Diesel 4 Tyre", application: "Goods transport" }),
    emptyModel("sml-isuzu", "Sartaj 5252 CNG", `${OFFICIAL}/IN/category/trucks/cng-truck`, "Commercial Vehicle", { subcategory: "CNG Truck", application: "Goods transport" }),
    emptyModel("sml-isuzu", "Samrat GS CNG", `${OFFICIAL}/IN/category/trucks/cng-truck`, "Commercial Vehicle", { subcategory: "CNG Truck", application: "Goods transport" }),
    emptyModel("sml-isuzu", "Samrat GS Diesel", `${OFFICIAL}/IN/category/trucks/diesel-6-tyre`, "Commercial Vehicle", { subcategory: "Diesel 6 Tyre", application: "Goods transport" }),
    emptyModel("sml-isuzu", "Samrat GS Tipper", `${OFFICIAL}/IN/category/trucks/diesel-6-tyre`, "Commercial Vehicle", { subcategory: "Diesel 6 Tyre", bodyType: "Tipper", application: "Construction / goods transport" }),
    emptyModel("sml-isuzu", "Sartaj GS 59 CNG", `${OFFICIAL}/IN/category/trucks/cng-truck`, "Commercial Vehicle", { subcategory: "CNG Truck", application: "Goods transport" }),
    emptyModel("sml-isuzu", "Sartaj HG 72 CNG", `${OFFICIAL}/IN/category/trucks/cng-truck`, "Commercial Vehicle", { subcategory: "CNG Truck", application: "Goods transport" }),
    emptyModel("sml-isuzu", "Samrat GS XT", `${OFFICIAL}/IN/category/trucks/diesel-6-tyre`, "Commercial Vehicle", { subcategory: "Diesel 6 Tyre", application: "Heavy goods transport" }),
    emptyModel("sml-isuzu", "Supreme GS CNG", `${OFFICIAL}/IN/category/trucks/cng-truck`, "Commercial Vehicle", { subcategory: "CNG Truck", application: "Goods transport" }),
    emptyModel("sml-isuzu", "Supreme Metro", `${OFFICIAL}/IN/category/trucks/cng-truck`, "Commercial Vehicle", { subcategory: "CNG Truck", application: "Urban goods transport" }),
    emptyModel("sml-isuzu", "Sartaj GS 59 Diesel", `${OFFICIAL}/IN/category/trucks/diesel-4-tyre`, "Commercial Vehicle", { subcategory: "Diesel 4 Tyre", application: "Goods transport" }),
    emptyModel("sml-isuzu", "Sartaj HG 72 Diesel", `${OFFICIAL}/IN/category/trucks/diesel-4-tyre`, "Commercial Vehicle", { subcategory: "Diesel 4 Tyre", application: "Goods transport" }),
    emptyModel("sml-isuzu", "Super Tipper", `${OFFICIAL}/IN/category/trucks/diesel-6-tyre`, "Commercial Vehicle", { subcategory: "Diesel 6 Tyre", bodyType: "Tipper", application: "Construction / goods transport" }),
    emptyModel("sml-isuzu", "Supreme GS Diesel", `${OFFICIAL}/IN/category/trucks/diesel-6-tyre`, "Commercial Vehicle", { subcategory: "Diesel 6 Tyre", application: "Goods transport" }),
    emptyModel("sml-isuzu", "Super GS (Hydraulic Brakes) Diesel", `${OFFICIAL}/IN/category/trucks/diesel-6-tyre`, "Commercial Vehicle", { subcategory: "Diesel 6 Tyre", application: "Goods transport" }),
    emptyModel("sml-isuzu", "Super GS (Air Brakes) Diesel", `${OFFICIAL}/IN/category/trucks/diesel-6-tyre`, "Commercial Vehicle", { subcategory: "Diesel 6 Tyre", application: "Goods transport" }),
    emptyModel("sml-isuzu", "Prestige Diesel", `${OFFICIAL}/IN/category/trucks/diesel-6-tyre`, "Commercial Vehicle", { subcategory: "Diesel 6 Tyre", application: "Goods / passenger transport" }),
    emptyModel("sml-isuzu", "Prestige CNG", `${OFFICIAL}/IN/category/trucks/cng-truck`, "Commercial Vehicle", { subcategory: "CNG Truck", application: "Goods / passenger transport" }),
  ];

  return {
    id: "sml-isuzu",
    name: "SML Isuzu",
    officialUrl: OFFICIAL,
    sources: [
      {
        id: "sml-isuzu-official",
        name: "SML Isuzu Official",
        officialUrl: OFFICIAL,
        vehicleUrl: OFFICIAL,
      },
    ],
    brands: [
      {
        id: "sml-isuzu-sml-isuzu",
        name: "SML Isuzu",
        officialUrl: OFFICIAL,
        models,
      },
    ],
  };
}
