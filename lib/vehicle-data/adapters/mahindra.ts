import type { VehicleManufacturer, VehicleModel, VehicleVariant } from "../types";
import { emptyModel } from "./utils";

const MAHINDRA = "https://auto.mahindra.com";

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
