import type { VehicleManufacturer, VehicleModel, VehicleVariant } from "../types";
import { emptyModel, emptyVariant, makeImage } from "./utils";

const MAHINDRA = "https://auto.mahindra.com";

const MAHINDRA_IMAGE_BY_MODEL: Record<string, string> = {
  "BLAZO i-TRK- 28": "",
  "BLAZO i-TRK- 35 Lift Axle": "",
  "Blazo i-TRK 42": "",
  "BLAZO i-TRK- 48": "",
  "BLAZO i-TRK- 49 10x2 - 5 Axle": "",
  "BLAZO i-TRK- 28 Tipper": "",
  "BLAZO i-TRK- 35 Tipper": "",
  "BLAZO i-TRK 40 4X2 TRACTOR": "",
  "BLAZO i-TRK- 46 4X2 Tractor": "",
  "BLAZO i-TRK 55 4X2 TRACTOR": "",
  "BLAZO i-TRK- 55 6X4 Tractor": "",
  "FURIO 10": "",
  "FURIO 11": "",
  "FURIO 12": "",
  "FURIO 14": "",
  "FURIO 14 HD": "",
  "Furio 8": "",
  "Jayo": "",
  "FURIO 7 CARGO": "",
  "FURIO 7 TIPPER": "",
  "FURIO 7 HD": "",
  "Loadking Optimo HSD Cargo": "",
  "Loadking Optimo DSD Cargo": "",
  "Loadking Optimo Tipper": "",
  "Cruzio": "",
  "Cruzio School Bus": "",
  "Cruzio Grande": "",
  "Cruzio Grande School Bus": "",
};


type LiveModel = {
  name: string;
  url: string;
  variants: {
    name: string;
    price: number;
  }[];
};

const liveModels: LiveModel[] = [
  {
    name: "Bolero Pik-Up",
    url: `${MAHINDRA}/own-online/variant-selection?pid=PUPM090318046187`,
    variants: [
      { name: "PIK-UP 4WD CBC", price: 980500 },
      { name: "PIK-UP FB 1.3 AC DIESEL", price: 985700 },
      { name: "PIK-UP CBC 4WD DIESEL", price: 935100 },
      { name: "PIK-UP FB PS AC", price: 1032500 },
      { name: "PIK-UP 4WD", price: 1004500 },
      { name: "PIK-UP FB MS CBC", price: 949500 },
      { name: "PIK-UP FB MS", price: 999750 },
      { name: "PIK-UP FB 1.3 MS DIESEL", price: 956200 },
      { name: "PIK-UP FB PS", price: 1007500 },
      { name: "PIK-UP 4WD DIESEL", price: 958000 },
      { name: "PIK-UP FB 1.3 DIESEL", price: 962800 },
      { name: "PIK-UP 4WD AC", price: 1032500 },
    ],
  },
  {
    name: "MAXX CITY",
    url: `${MAHINDRA}/own-online/variant-selection?mgc=MAXX`,
    variants: [
      { name: "CITY 1.3 LXCBC DIESEL", price: 799500 },
      { name: "CITY 1.4 LXCBC DIESEL", price: 829500 },
      { name: "CITY 1.4 LX DIESEL", price: 839500 },
      { name: "CITY 1.5 LXCBC DIESEL", price: 829500 },
      { name: "CITY 1.3 MXI DIESEL", price: 838500 },
      { name: "CITY 1.4 MXI DIESEL", price: 865500 },
      { name: "CITY 1.4 T VXI DIESEL", price: 820500 },
      { name: "MAXXCITY 1.3 VXI AC DIESEL", price: 853500 },
      { name: "CITY 1.3 LX DIESEL", price: 808500 },
      { name: "CITY 1.5 MXI DIESEL", price: 865500 },
      { name: "MAXXCITY 1.5 VXI AC DIESEL", price: 877500 },
      { name: "MAXXCITY 1.3 SXI AC DIESEL", price: 833500 },
      { name: "CITY 1.5 LX DIESEL", price: 839500 },
      { name: "MAXXCITY 1.4 VXI AC DIESEL", price: 877500 },
    ],
  },
  {
    name: "MAXX HD",
    url: `${MAHINDRA}/own-online/variant-selection?mgc=mxhd`,
    variants: [
      { name: "MAXX HD", price: 947500 },
    ],
  },
  {
    name: "Bolero",
    url: `${MAHINDRA}/own-online/variant-selection?mgc=bol`,
    variants: [
      { name: "B4 DIESEL", price: 849000 },
      { name: "B6 DIESEL", price: 929000 },
      { name: "B6 OPT DIESEL", price: 969000 },
      { name: "B8 DIESEL", price: 999000 },
    ],
  },
];

const MAHINDRA_BULK_MODELS: VehicleModel[] = [
  (() => {
    const m = emptyModel("mahindra","BLAZO i-TRK- 28","https://www.mahindratruckandbus.com/english/heavy-commercial-vehicles/multiaxle-rigid-trucks.aspx","Commercial Vehicle");
    m.subcategory="Heavy Haulage";
    m.application="Heavy Cargo / Construction / Long Haul";
    m.gvwKg=28000;
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","BLAZO i-TRK- 35 Lift Axle","https://www.mahindratruckandbus.com/english/heavy-commercial-vehicles/multiaxle-rigid-trucks.aspx","Commercial Vehicle");
    m.subcategory="Heavy Haulage";
    m.application="Heavy Cargo / Construction / Long Haul";
    m.gvwKg=35000;
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","Blazo i-TRK 42","https://www.mahindratruckandbus.com/english/heavy-commercial-vehicles/multiaxle-rigid-trucks.aspx","Commercial Vehicle");
    m.subcategory="Heavy Haulage";
    m.application="Heavy Cargo / Long Haul";
    m.gvwKg=42000;
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","BLAZO i-TRK- 48","https://www.mahindratruckandbus.com/english/heavy-commercial-vehicles/multiaxle-rigid-trucks.aspx","Commercial Vehicle");
    m.subcategory="Heavy Haulage";
    m.application="Heavy Cargo / Long Haul";
    m.gvwKg=48000;
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","BLAZO i-TRK- 49 10x2 - 5 Axle","https://www.mahindratruckandbus.com/english/heavy-commercial-vehicles/multiaxle-rigid-trucks.aspx","Commercial Vehicle");
    m.subcategory="Heavy Haulage";
    m.application="Heavy Cargo / Mining / Long Haul";
    m.wheelCount=10;
    m.wheelConfiguration="10x2";
    m.gvwKg=49000;
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","BLAZO i-TRK- 28 Tipper","https://www.mahindratruckandbus.com/english/heavy-commercial-vehicles/tipper-trucks.aspx","Commercial Vehicle");
    m.subcategory="Tipper";
    m.application="Mining / Construction / Aggregates";
    m.gvwKg=28000;
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","BLAZO i-TRK- 35 Tipper","https://www.mahindratruckandbus.com/english/heavy-commercial-vehicles/tipper-trucks.aspx","Commercial Vehicle");
    m.subcategory="Tipper";
    m.application="Mining / Construction / Aggregates";
    m.gvwKg=35000;
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","BLAZO i-TRK 40 4X2 TRACTOR","https://www.mahindratruckandbus.com/english/heavy-commercial-vehicles/tractor-trailer.aspx","Commercial Vehicle");
    m.subcategory="Tractor";
    m.application="Tractor Trailer / Long Haul";
    m.wheelConfiguration="4x2";
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","BLAZO i-TRK- 46 4X2 Tractor","https://www.mahindratruckandbus.com/english/heavy-commercial-vehicles/tractor-trailer.aspx","Commercial Vehicle");
    m.subcategory="Tractor";
    m.application="Tractor Trailer / Long Haul";
    m.wheelConfiguration="4x2";
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","BLAZO i-TRK 55 4X2 TRACTOR","https://www.mahindratruckandbus.com/english/heavy-commercial-vehicles/tractor-trailer.aspx","Commercial Vehicle");
    m.subcategory="Tractor";
    m.application="Tractor Trailer / Long Haul";
    m.wheelConfiguration="4x2";
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","BLAZO i-TRK- 55 6X4 Tractor","https://www.mahindratruckandbus.com/english/heavy-commercial-vehicles/tractor-trailer.aspx","Commercial Vehicle");
    m.subcategory="Tractor";
    m.application="Tractor Trailer / Heavy Haulage";
    m.wheelConfiguration="6x4";
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","FURIO 10","https://www.mahindratruckandbus.com/english/intermediate-commercial-vehicles/furio.aspx","Commercial Vehicle");
    m.subcategory="Truck / Lorry";
    m.application="E-Commerce / Parcel / FMCG / Industrial Goods";
    m.gvwKg=10350; m.images=[makeImage("https://www.mahindratruckandbus.com/english/images/icv/furio/furio-10/Overview-1.png","FURIO 10","https://www.mahindratruckandbus.com/english/intermediate-commercial-vehicles/furio.aspx")];
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","FURIO 11","https://www.mahindratruckandbus.com/english/intermediate-commercial-vehicles/furio.aspx","Commercial Vehicle");
    m.subcategory="Truck / Lorry";
    m.application="E-Commerce / Parcel / FMCG / Industrial Goods";
    m.gvwKg=11280; m.images=[makeImage("https://www.mahindratruckandbus.com/english/images/icv/furio/furio-11/Overview-1.jpg","FURIO 11","https://www.mahindratruckandbus.com/english/intermediate-commercial-vehicles/furio.aspx")];
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","FURIO 12","https://www.mahindratruckandbus.com/english/intermediate-commercial-vehicles/furio.aspx","Commercial Vehicle");
    m.subcategory="Truck / Lorry";
    m.application="E-Commerce / Parcel / FMCG / Industrial Goods";
    m.gvwKg=11990; m.images=[makeImage("https://www.mahindratruckandbus.com/english/images/icv/furio/furio-12/Overview-1.jpg","FURIO 12","https://www.mahindratruckandbus.com/english/intermediate-commercial-vehicles/furio.aspx")];
    m.variants=[emptyVariant("mahindra","FURIO 12","FURIO 12 HSD","https://www.mahindratruckandbus.com/english/intermediate-commercial-vehicles/furio/furio-furio12-ton-specification.aspx")];
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","FURIO 14","https://www.mahindratruckandbus.com/english/intermediate-commercial-vehicles/furio.aspx","Commercial Vehicle");
    m.subcategory="Truck / Lorry";
    m.application="E-Commerce / Parcel / FMCG / Industrial Goods";
    m.gvwKg=14050; m.images=[makeImage("https://www.mahindratruckandbus.com/english/images/icv/furio/furio-14/Overview-1.jpg","FURIO 14","https://www.mahindratruckandbus.com/english/intermediate-commercial-vehicles/furio.aspx")];
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","FURIO 14 HD","https://www.mahindratruckandbus.com/english/intermediate-commercial-vehicles/furio.aspx","Commercial Vehicle");
    m.subcategory="Truck / Lorry";
    m.application="Heavy Duty Cargo / Construction / Industrial Goods";
    m.gvwKg=13100; m.images=[makeImage("https://www.mahindratruckandbus.com/english/images/icv/furio/furio-14-HD/furio-14-HD.jpg","FURIO 14 HD","https://www.mahindratruckandbus.com/english/intermediate-commercial-vehicles/furio.aspx")];
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","Furio 8","https://www.mahindratruckandbus.com/english/light-commercial-vehicles/index.aspx","Commercial Vehicle");
    m.subcategory="Truck / Lorry";
    m.application="Intra-city / Regional Haulage / Cargo";
    m.gvwKg=7490;
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","Jayo","https://www.mahindratruckandbus.com/english/light-commercial-vehicles/index.aspx","Commercial Vehicle");
    m.subcategory="Truck / Lorry";
    m.application="Cargo / Regional Transport";
    m.gvwKg=4990;
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","FURIO 7 CARGO","https://www.mahindratruckandbus.com/english/light-commercial-vehicles/furio7.aspx","Commercial Vehicle");
    m.subcategory="Truck / Lorry";
    m.application="Intra-city / Inter-city / Last Mile";
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","FURIO 7 TIPPER","https://www.mahindratruckandbus.com/english/light-commercial-vehicles/furio7.aspx","Commercial Vehicle");
    m.subcategory="Tipper";
    m.application="Construction / Quarry / Hilly Terrain";
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","FURIO 7 HD","https://www.mahindratruckandbus.com/english/light-commercial-vehicles/furio7.aspx","Commercial Vehicle");
    m.subcategory="Truck / Lorry";
    m.application="Heavy Duty Cargo / Construction / Food Grains / Milk / Market Loads";
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","Loadking Optimo HSD Cargo","https://www.mahindratruckandbus.com/english/light-commercial-vehicles/optimo/loadking-optimo-hsdcargo-overview.aspx","Commercial Vehicle");
    m.subcategory="Truck / Lorry";
    m.application="Last Mile / Construction / Cargo";
    m.gvwKg=6950;
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","Loadking Optimo DSD Cargo","https://www.mahindratruckandbus.com/english/light-commercial-vehicles/optimo/loadking-optimo-dsdcargo-overview.aspx","Commercial Vehicle");
    m.subcategory="Truck / Lorry";
    m.application="Cargo / Construction / Distribution";
    m.gvwKg=6950;
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","Loadking Optimo Tipper","https://www.mahindratruckandbus.com/english/light-commercial-vehicles/optimo/loadking-optimotipper-overview.aspx","Commercial Vehicle");
    m.subcategory="Tipper";
    m.application="Construction / Quarry / Sand / Blue Metal";
    m.gvwKg=6950;
    return m;
  })(),

  (() => {
    const m = emptyModel(
      "mahindra",
      "FURIO 16",
      "https://www.mahindratruckandbus.com/english/intermediate-commercial-vehicles/furio/furio-furio16-ton-overview.aspx",
      "Commercial Vehicle"
    );
    m.subcategory="Truck / Lorry";
    m.application="Cargo / Regional / Long Haul";
    m.gvwKg=16140;
    m.images=[makeImage("https://www.mahindratruckandbus.com/english/images/icv/furio/furio-16/Overview-1.jpg","FURIO 16","https://www.mahindratruckandbus.com/english/intermediate-commercial-vehicles/furio/furio-furio16-ton-overview.aspx")];
    return m;
  })(),

  (() => {
    const m = emptyModel(
      "mahindra",
      "FURIO 17",
      "https://www.mahindratruckandbus.com/english/intermediate-commercial-vehicles/furio/furio-furio17-ton-overview.aspx",
      "Commercial Vehicle"
    );
    m.subcategory="Truck / Lorry";
    m.application="Cargo / Regional / Long Haul";
    m.gvwKg=17000;
    m.images=[makeImage("https://www.mahindratruckandbus.com/english/images/icv/furio/furio-17/Overview-1.jpg","FURIO 17","https://www.mahindratruckandbus.com/english/intermediate-commercial-vehicles/furio/furio-furio17-ton-overview.aspx")];
    return m;
  })(),

  (() => {
    const m = emptyModel(
      "mahindra",
      "JAYO Mobile Medical Unit",
      "https://www.mahindratruckandbus.com/english/light-commercial-vehicles/special-application/jayo-mmu-overview.aspx",
      "Commercial Vehicle"
    );
    m.subcategory="Special Application";
    m.bodyType="Mobile Medical Unit";
    m.application="Mobile Medical / Healthcare Services";
    m.gvwKg=4900;
    m.images=[makeImage("https://www.mahindratruckandbus.com/english/images/lcv/jayo-mmu/jayo-mmu-overview.jpg","JAYO Mobile Medical Unit","https://www.mahindratruckandbus.com/english/light-commercial-vehicles/special-application/jayo-mmu-overview.aspx")];
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","Cruzio","https://www.mahindratruckandbus.com/english/passenger-buses/media/cruzio.aspx","Bus");
    m.subcategory="Bus";
    m.bodyType="Bus";
    m.application="Staff / Contract / Passenger Transport";
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","Cruzio School Bus","https://www.mahindratruckandbus.com/english/passenger-buses/media/cruzio.aspx","Bus");
    m.subcategory="School Bus";
    m.bodyType="Bus";
    m.application="School Transportation";
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","Cruzio Grande","https://www.mahindratruckandbus.com/english/passenger-buses/media/cruzio-grande.aspx","Bus");
    m.subcategory="Bus";
    m.bodyType="Bus";
    m.application="Staff / Contract / Passenger Transport";
    return m;
  })(),

  (() => {
    const m = emptyModel("mahindra","Cruzio Grande School Bus","https://www.mahindratruckandbus.com/english/passenger-buses/media/cruzio-grande.aspx","Bus");
    m.subcategory="School Bus";
    m.bodyType="Bus";
    m.application="School Transportation";
    return m;
  })(),
];
export async function fetchMahindraCommercial(): Promise<VehicleManufacturer> {
  const verifiedAt = new Date().toISOString();

  const models: VehicleModel[] = liveModels.map((item) => {
    const model = emptyModel(
      "mahindra",
      item.name,
      item.url,
      "Commercial Vehicle"
    );

    model.variants = item.variants.map((itemVariant) => ({
      id: `mahindra-${item.name}-${itemVariant.name}`
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-"),
      name: itemVariant.name,
      fuel: "Diesel",
      price: {
        amount: itemVariant.price,
        currency: "INR",
        type: "ex-showroom",
        sourceUrl: item.url,
        verifiedAt,
      },
      images: [],
      officialUrl: item.url,
    }));

    return model;
  });

  for (const bulkModel of MAHINDRA_BULK_MODELS) {
    if (!models.some((existingModel) => existingModel.name === bulkModel.name)) {
      models.push(bulkModel);
    }
  }

  return {
    id: "mahindra",
    name: "Mahindra",
    officialUrl: "https://www.mahindra.com/",
    sources: [
      {
        id: "mahindra-commercial",
        name: "Mahindra Automotive",
        officialUrl: "https://auto.mahindra.com/",
        vehicleUrl: "https://auto.mahindra.com/commercial/pik-ups",
        dealerLocatorUrl: "https://auto.mahindra.com/dealer-locator",
      },
    ],
    brands: [
      {
        id: "mahindra",
        name: "Mahindra",
        officialUrl: "https://auto.mahindra.com/",
        models,
      },
    ],
  };
}

