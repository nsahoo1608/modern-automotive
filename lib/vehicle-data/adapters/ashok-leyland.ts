import type { VehicleBrand, VehicleManufacturer } from "../types";
import {
  makeImage,
  makeVariant,
  modelId,
} from "./utils";

const AL = "https://www.ashokleyland.com/in";

const image = (
  url: string,
  alt: string,
  sourceUrl: string
) => makeImage(url, alt, sourceUrl);

function busModel(options: {
  name: string;
  url: string;
  imageUrl?: string;
  subcategory: string;
  fuel?: string;
  engine?: string;
  power?: string;
  torque?: string;
  transmission?: string;
  wheelbase?: string;
  gvw?: string;
  seating?: string;
  length?: string;
}) {
  const {
    name,
    url,
    imageUrl,
    subcategory,
    fuel,
    engine,
    power,
    torque,
    transmission,
    wheelbase,
    gvw,
    seating,
    length,
  } = options;

  const specifications: Record<string, string> = {};

  if (wheelbase) specifications["Wheelbase"] = wheelbase;
  if (gvw) specifications["Maximum GVW"] = gvw;
  if (seating) specifications["Seating Capacity"] = seating;
  if (length) specifications["Overall Length"] = length;

  const images = imageUrl
    ? [image(imageUrl, `${name} - Ashok Leyland`, url)]
    : [];

  return {
    id: modelId("ashok-leyland", name),
    name,
    category: "Bus" as const,
    subcategory,
    bodyType: "Bus",
    application: "Passenger transport",
    images,
    variants: [
      makeVariant(
        "ashok-leyland",
        name,
        name,
        url,
        {
          fuel,
          engine,
          power,
          torque,
          transmission,
          images,
          specifications,
        }
      ),
    ],
    officialUrl: url,
  };
}

function chassisModel(options: {
  name: string;
  url: string;
  imageUrl?: string;
  subcategory: string;
  engine?: string;
  power?: string;
  torque?: string;
  transmission?: string;
  wheelbase?: string;
  gvw?: string;
  payload?: string;
}) {
  const {
    name,
    url,
    imageUrl,
    subcategory,
    engine,
    power,
    torque,
    transmission,
    wheelbase,
    gvw,
    payload,
  } = options;

  const specifications: Record<string, string> = {};

  if (wheelbase) specifications["Wheelbase"] = wheelbase;
  if (gvw) specifications["GVW"] = gvw;
  if (payload) specifications["Payload"] = payload;

  const images = imageUrl
    ? [image(imageUrl, `${name} - Ashok Leyland`, url)]
    : [];

  return {
    id: modelId("ashok-leyland", name),
    name,
    category: "Chassis" as const,
    subcategory,
    bodyType: "Chassis",
    application: "Commercial vehicle / body building",
    images,
    variants: [
      makeVariant(
        "ashok-leyland",
        name,
        name,
        url,
        {
          engine,
          power,
          torque,
          transmission,
          images,
          specifications,
        }
      ),
    ],
    officialUrl: url,
  };
}

export async function fetchAshokLeylandCatalog(): Promise<VehicleManufacturer> {
  const sunshineUrl = `${AL}/buses/brands/sunshine`;
  const sunshineLiUrl = `${AL}/buses/brands/sunshine-li`;
  const oysterUrl = `${AL}/buses/brands/oysterd`;
  const vikingUrl = `${AL}/buses/brands/viking`;
  const cheetahUrl = `${AL}/buses/brands/cheetah`;

  const shortChassisUrl =
    `${AL}/defence/logistics/short-chassis-bus-4x2`;

  const longChassisUrl =
    `${AL}/defence/logistics/long-chassis-bus-4x2`;

  const buses = [
    busModel({
      name: "Sunshine",
      url: sunshineUrl,
      imageUrl:
        "https://www.ashokleyland.com/backend/wp-content/uploads/2024/02/Sunshine-1.jpg",
      subcategory: "School Bus",
      fuel: "Diesel",
      engine: "H series 4 cylinder Turbo Charged and After cooled, DI engine",
      power: "110 kW",
      torque: "450 Nm",
      transmission: "5 Speed Direct Drive",
      wheelbase: "4560 | 5200 mm",
      gvw: "8500 kg",
      seating: "3x2 39+D / 49+D; 2x2 32+D / 40+D",
      length: "8135 | 9415 mm",
    }),

    busModel({
      name: "Sunshine Li",
      url: sunshineLiUrl,
      imageUrl:
        "https://www.ashokleyland.com/backend/wp-content/uploads/2026/04/AL-Sunshine-Li-Driver-ISO-1.jpg",
      subcategory: "School Bus",
      fuel: "Diesel",
      engine: "H series 4 cylinder Turbo Charged and After cooled, DI engine",
      power: "110 kW",
      torque: "450 Nm",
      transmission: "5 Speed Direct Drive",
      wheelbase: "4560 | 5200 mm",
      gvw: "8500 kg",
      seating: "2x2 38+D / 42+D; 3x2 46+D / 51+D",
      length: "8530 | 9550 mm",
    }),

    busModel({
      name: "Oyster",
      url: oysterUrl,
      subcategory: "Staff Bus",
      fuel: "Diesel",
      engine: "H series 4-cylinder",
      power: "110 kW",
      torque: "450 Nm",
      transmission: "6 Speed OD",
      length: "8-10.3 m",
    }),

    busModel({
      name: "Viking",
      url: vikingUrl,
      imageUrl:
        "https://www.ashokleyland.com/backend/wp-content/uploads/2024/02/Viking-3.jpg",
      subcategory: "Intercity Bus",
      fuel: "Diesel",
      engine: "H series 6 cylinder Turbo Charged and After cooled, DI engine",
      power: "147 kW",
      torque: "700 Nm",
      transmission: "6 Speed Over Drive",
      wheelbase: "5334 | 5639 mm",
      gvw: "16200 kg",
      seating: "3x2 53+D / 58+D; 2x2 37+D to 46+D",
      length: "10934 | 11422 mm",
    }),

    busModel({
      name: "Cheetah",
      url: cheetahUrl,
      imageUrl:
        "https://www.ashokleyland.com/backend/wp-content/uploads/2024/02/Cheetah-1.jpg",
      subcategory: "Intercity Bus",
      fuel: "Diesel",
      engine: "H series 6 cylinder Turbo Charged and After cooled, DI engine",
      power: "147 kW",
      torque: "700 Nm",
      transmission: "6 Speed Over Drive",
      wheelbase: "4200 | 5156 | 5334 mm",
      gvw: "16200 kg",
      seating: "3x2 35+D to 50+D; 2x2 24+D",
      length: "8400 | 9890 | 10174 mm",
    }),
  ];

  const chassis = [
    chassisModel({
      name: "Short Chassis Bus 4x2",
      url: shortChassisUrl,
      subcategory: "Bus Chassis",
      power: "140 hp",
      torque: "450 Nm",
      transmission: "6-speed Manual",
      wheelbase: "4200 mm",
      gvw: "18000 kg",
      payload: "10000 kg",
    }),

    chassisModel({
      name: "Long Chassis Bus 4x2",
      url: longChassisUrl,
      subcategory: "Bus Chassis",
      power: "220 hp",
      torque: "800 Nm",
      transmission: "6-speed Manual",
      wheelbase: "6200 mm",
      gvw: "18000 kg",
      payload: "10000 kg",
    }),
  ];

  const brand: VehicleBrand = {
    id: "ashok-leyland",
    name: "Ashok Leyland",
    officialUrl: "https://www.ashokleyland.com/",
    models: [...buses, ...chassis],
  };

  return {
    id: "ashok-leyland",
    name: "Ashok Leyland",
    officialUrl: "https://www.ashokleyland.com/",
    sources: [
      {
        id: "ashok-leyland",
        name: "Ashok Leyland",
        officialUrl: "https://www.ashokleyland.com/",
        vehicleUrl: "https://www.ashokleyland.com/in/buses",
        dealerLocatorUrl:
          "https://www.ashokleyland.com/in/dealer-locator",
      },
    ],
    brands: [brand],
  };
}