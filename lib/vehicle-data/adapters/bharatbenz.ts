import type { VehicleManufacturer } from "../types";
import { emptyModel } from "./utils";

const OFFICIAL = "https://www.bharatbenz.com";

export async function fetchBharatBenzCatalog(): Promise<VehicleManufacturer> {
  const models = [
    emptyModel(
      "bharatbenz",
      "2826R",
      `${OFFICIAL}/trucks/all-new-rigids-21`,
      "Commercial Vehicle",
      {
        subcategory: "Heavy Duty Rigid Truck",
        application: "Heavy haulage / transport",
      }
    ),

    emptyModel(
      "bharatbenz",
      "3526R",
      `${OFFICIAL}/trucks/all-new-rigids-21`,
      "Commercial Vehicle",
      {
        subcategory: "Heavy Duty Rigid Truck",
        application: "Heavy haulage / transport",
      }
    ),

    emptyModel(
      "bharatbenz",
      "3832R",
      `${OFFICIAL}/trucks/all-new-rigids-21`,
      "Commercial Vehicle",
      {
        subcategory: "Heavy Duty Rigid Truck",
        application: "Heavy haulage / transport",
      }
    ),

    emptyModel(
      "bharatbenz",
      "4232R",
      `${OFFICIAL}/trucks/all-new-rigids-21`,
      "Commercial Vehicle",
      {
        subcategory: "Heavy Duty Rigid Truck",
        application: "Heavy haulage / transport",
      }
    ),

    emptyModel(
      "bharatbenz",
      "4832R",
      `${OFFICIAL}/trucks/all-new-rigids-21`,
      "Commercial Vehicle",
      {
        subcategory: "Heavy Duty Rigid Truck",
        application: "Heavy haulage / transport",
      }
    ),

    emptyModel(
      "bharatbenz",
      "917 Bus Chassis",
      `${OFFICIAL}/buses`,
      "Chassis",
      {
        subcategory: "Medium Duty Bus Chassis",
        application: "Bus body / passenger transport",
      }
    ),

    emptyModel(
      "bharatbenz",
      "1017 Bus Chassis",
      `${OFFICIAL}/buses`,
      "Chassis",
      {
        subcategory: "Medium Duty Bus Chassis",
        application: "Bus body / passenger transport",
      }
    ),

    emptyModel(
      "bharatbenz",
      "1624 Bus Chassis",
      `${OFFICIAL}/buses`,
      "Chassis",
      {
        subcategory: "Heavy Duty Bus Chassis",
        application: "Bus body / passenger transport",
      }
    ),

    emptyModel(
      "bharatbenz",
      "1924 Bus Chassis",
      `${OFFICIAL}/buses`,
      "Chassis",
      {
        subcategory: "Heavy Duty Bus Chassis",
        application: "Bus body / passenger transport",
      }
    ),

    emptyModel("bharatbenz", "4023T", `${OFFICIAL}/trucks/tractors-specifications-4023t-13`, "Commercial Vehicle", { subcategory: "Heavy Duty Tractor", application: "Tractor-trailer / haulage" }),

    emptyModel("bharatbenz", "4028T", `${OFFICIAL}/trucks/hdt-t-specifications-4028t-56`, "Commercial Vehicle", { subcategory: "Heavy Duty Tractor", application: "Tractor-trailer / haulage" }),

    emptyModel("bharatbenz", "4628T 4x2", `${OFFICIAL}/trucks/tractors-4`, "Commercial Vehicle", { subcategory: "Heavy Duty Tractor", application: "Tractor-trailer / haulage" }),

    emptyModel("bharatbenz", "5528T 4x2", `${OFFICIAL}/trucks/tractors-4`, "Commercial Vehicle", { subcategory: "Heavy Duty Tractor", application: "Tractor-trailer / haulage" }),

    emptyModel("bharatbenz", "4032T TORQSHIFT", `${OFFICIAL}/trucks/--specifications-4032t-torqshift-83`, "Commercial Vehicle", { subcategory: "Heavy Duty Tractor", application: "Tractor-trailer / haulage" }),

    emptyModel("bharatbenz", "5032T", `${OFFICIAL}/trucks/hdt-t-specifications-5032t-82`, "Commercial Vehicle", { subcategory: "Heavy Duty Tractor", application: "Tractor-trailer / haulage" }),

    emptyModel("bharatbenz", "5432T", `${OFFICIAL}/trucks/tractors-4`, "Commercial Vehicle", { subcategory: "Heavy Duty Tractor", application: "Tractor-trailer / haulage" }),

    emptyModel("bharatbenz", "5532T 4x2 TORQSHIFT", `${OFFICIAL}/trucks/hdt-t-specifications-5532t-4x2-80`, "Commercial Vehicle", { subcategory: "Heavy Duty Tractor", application: "Tractor-trailer / haulage" }),

    emptyModel("bharatbenz", "5532T 6x4 TORQSHIFT", `${OFFICIAL}/trucks/--specifications-5532t-6x4-79`, "Commercial Vehicle", { subcategory: "Heavy Duty Tractor", application: "Tractor-trailer / haulage" }),

    emptyModel("bharatbenz", "5532T HR", `${OFFICIAL}/trucks/tractors-4`, "Commercial Vehicle", { subcategory: "Heavy Duty Tractor", application: "Tractor-trailer / haulage" }),

    emptyModel("bharatbenz", "1926C", `${OFFICIAL}/trucks/hdt-c-5`, "Commercial Vehicle", { subcategory: "Heavy Duty Tipper", application: "Construction / mining" }),

    emptyModel("bharatbenz", "2826C", `${OFFICIAL}/trucks/--specifications-2826c-75`, "Commercial Vehicle", { subcategory: "Heavy Duty Tipper", application: "Construction / mining" }),

    emptyModel("bharatbenz", "2828C HX", `${OFFICIAL}/trucks/hdt-c-5`, "Commercial Vehicle", { subcategory: "Heavy Duty Tipper", application: "Construction / mining" }),

    emptyModel("bharatbenz", "3532C HX", `${OFFICIAL}/trucks/hdt-c-5`, "Commercial Vehicle", { subcategory: "Heavy Duty Tipper", application: "Construction / mining" }),

    emptyModel("bharatbenz", "2828CH", `${OFFICIAL}/trucks/hdt-c-5`, "Commercial Vehicle", { subcategory: "Heavy Duty Tipper", application: "Construction / mining" }),

    emptyModel("bharatbenz", "2832CM TORQSHIFT", `${OFFICIAL}/trucks/hdt-c-5`, "Commercial Vehicle", { subcategory: "Heavy Duty Tipper", application: "Mining / construction" }),

    emptyModel("bharatbenz", "3532CM TORQSHIFT", `${OFFICIAL}/trucks/hdt-c-5`, "Commercial Vehicle", { subcategory: "Heavy Duty Tipper", application: "Mining / construction" }),

    emptyModel("bharatbenz", "2828C RMC", `${OFFICIAL}/trucks/hdt-c-5`, "Commercial Vehicle", { subcategory: "Ready Mix Concrete Tipper", application: "Ready-mix concrete" }),

    emptyModel("bharatbenz", "2823RT", `${OFFICIAL}/trucks/hdt-rt-tractors-9`, "Commercial Vehicle", { subcategory: "Heavy Duty Rigid Tipper", application: "Construction / haulage" }),

    emptyModel("bharatbenz", "3523RT", `${OFFICIAL}/trucks/hdt-rt-tractors-9`, "Commercial Vehicle", { subcategory: "Heavy Duty Rigid Tipper", application: "Construction / haulage" }),

    emptyModel("bharatbenz", "4228RT", `${OFFICIAL}/trucks/hdt-rt-tractors-9`, "Commercial Vehicle", { subcategory: "Heavy Duty Rigid Tipper", application: "Construction / haulage" })
  ];

  return {
    id: "bharatbenz",
    name: "BharatBenz",
    officialUrl: OFFICIAL,
    sources: [
      {
        id: "bharatbenz-official",
        name: "BharatBenz Official",
        officialUrl: OFFICIAL,
        vehicleUrl: `${OFFICIAL}/`,
        dealerLocatorUrl: `${OFFICIAL}/dealer`,
      },
    ],
    brands: [
      {
        id: "bharatbenz-bharatbenz",
        name: "BharatBenz",
        officialUrl: OFFICIAL,
        models,
      },
    ],
  };
}
