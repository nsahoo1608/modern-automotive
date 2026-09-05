import type { VehicleBrand, VehicleManufacturer } from "../types";
import {
  makeImage,
  makeVariant,
  modelId,
} from "./utils";

const EICHER = "https://www.eichertrucksandbuses.com";

const verifiedAt = new Date().toISOString();

function productImage(
  url: string,
  alt: string,
  sourceUrl: string
) {
  return makeImage(url, alt, sourceUrl);
}

function createModel(options: {
  name: string;
  category:
    | "Commercial Vehicle"
    | "Bus"
    | "Chassis"
    | "Special Purpose Vehicle";
  subcategory: string;
  officialUrl: string;
  imageUrl?: string;
  bodyType?: string;
  application?: string;
  fuel?: string;
  engine?: string;
  battery?: string;
  power?: string;
  torque?: string;
  transmission?: string;
  specifications?: Record<string, string>;
}) {
  const {
    name,
    category,
    subcategory,
    officialUrl,
    imageUrl,
    bodyType,
    application,
    fuel,
    engine,
    battery,
    power,
    torque,
    transmission,
    specifications = {},
  } = options;

  const images = imageUrl
    ? [
        productImage(
          imageUrl,
          `${name} - Eicher`,
          officialUrl
        ),
      ]
    : [];

  return {
    id: modelId("eicher", name),
    name,
    category,
    subcategory,
    bodyType,
    application,
    images,
    variants: [
      makeVariant(
        "eicher",
        name,
        name,
        officialUrl,
        {
          fuel,
          engine,
          battery,
          power,
          torque,
          transmission,
          images,
          specifications: {
            ...specifications,
            "Verified At": verifiedAt,
          },
        }
      ),
    ],
    officialUrl,
  };
}

export async function fetchEicherCatalog(): Promise<VehicleManufacturer> {
  /*
   * ============================================================
   * BUS
   * ============================================================
   */

  const starline2070Url =
    `${EICHER}/buses/school-bus/starline/starline-next-gen-2070-e`;

  const starline2090Url =
    `${EICHER}/buses/school-bus/starline/starline-next-gen-2090-e`;

  const starline2090DUrl =
    `${EICHER}/buses/school-bus/starline/starline-next-gen-2090-d`;

  const starline3010Url =
    `${EICHER}/buses/staff-bus/starline/starline-next-gen-3010`;

  const starline2070 = createModel({
    name: "Starline Next-Gen 2070 E",
    category: "Bus",
    subcategory: "School Bus",
    officialUrl: starline2070Url,
    bodyType: "School Bus",
    application: "School / institutional passenger transport",
    fuel: "Diesel",
    engine: "E494, 4-cylinder, 3.3 L",
    power: "104 kW",
    torque: "400 Nm",
    transmission: "5-speed manual",
    specifications: {
      "GVW": "Not specified",
      "Wheelbase": "Not specified",
      "Seating Capacity": "Not specified",
    },
  });

  const starline2090 = createModel({
    name: "Starline Next-Gen 2090 E",
    category: "Bus",
    subcategory: "School Bus",
    officialUrl: starline2090Url,
    bodyType: "School Bus",
    application: "School / institutional passenger transport",
    fuel: "Diesel",
    engine: "E494, 4-cylinder",
    specifications: {
      "GVW": "Not specified",
      "Wheelbase": "Not specified",
      "Seating Capacity": "Not specified",
    },
  });

  const starline2090D = createModel({
    name: "Starline Next-Gen 2090 D",
    category: "Bus",
    subcategory: "School Bus",
    officialUrl: starline2090DUrl,
    bodyType: "School Bus",
    application: "School / institutional passenger transport",
    fuel: "Diesel",
    specifications: {
      "GVW": "Not specified",
      "Wheelbase": "Not specified",
      "Seating Capacity": "Not specified",
    },
  });

  const starline3010 = createModel({
    name: "Starline Next-Gen 3010",
    category: "Bus",
    subcategory: "Staff Bus",
    officialUrl: starline3010Url,
    bodyType: "Staff Bus",
    application: "Staff / employee passenger transport",
    fuel: "Diesel",
    specifications: {
      "GVW": "Not specified",
      "Wheelbase": "Not specified",
      "Seating Capacity": "Not specified",
    },
  });

  /*
   * ============================================================
   * BUS CHASSIS
   * ============================================================
   */

  const busChassisUrl =
    `${EICHER}/buses/bus-chassis`;

  const hdBusChassisUrl =
    `${EICHER}/buses/bus-chassis/hd-bus-chassis`;

  const pro3000ChassisUrl =
    `${EICHER}/buses/bus-chassis/pro-3000-series`;

  const series2000ChassisUrl =
    `${EICHER}/buses/bus-chassis/2000-series`;

  const busChassis = createModel({
    name: "Eicher Bus Chassis",
    category: "Chassis",
    subcategory: "Bus Chassis",
    officialUrl: busChassisUrl,
    bodyType: "Bus Chassis",
    application: "Bus body building",
    specifications: {
      "Chassis Type": "Bus chassis",
      "Product Range": "Eicher bus chassis",
    },
  });

  const hdBusChassis = createModel({
    name: "Eicher HD Bus Chassis",
    category: "Chassis",
    subcategory: "Bus Chassis",
    officialUrl: hdBusChassisUrl,
    bodyType: "Heavy Duty Bus Chassis",
    application: "Heavy-duty bus body building",
    specifications: {
      "Chassis Type": "Heavy-duty bus chassis",
    },
  });

  const pro3000Chassis = createModel({
    name: "Eicher Pro 3000 Series Bus Chassis",
    category: "Chassis",
    subcategory: "Bus Chassis",
    officialUrl: pro3000ChassisUrl,
    bodyType: "Bus Chassis",
    application: "Bus body building",
    specifications: {
      "Chassis Series": "Pro 3000 Series",
    },
  });

  const series2000Chassis = createModel({
    name: "Eicher 2000 Series Bus Chassis",
    category: "Chassis",
    subcategory: "Bus Chassis",
    officialUrl: series2000ChassisUrl,
    bodyType: "Bus Chassis",
    application: "Bus body building",
    specifications: {
      "Chassis Series": "2000 Series",
    },
  });

  /*
   * ============================================================
   * LIGHT / MEDIUM DUTY TRUCKS
   * ============================================================
   */

  const pro2059XPUrl =
    `${EICHER}/light-medium-duty-trucks/light-duty/pro-2059xp`;

  const pro2075TUrl =
    `${EICHER}/light-medium-duty-trucks/tipper/Pro-2075T`;

  const pro2080TUrl =
    `${EICHER}/light-medium-duty-trucks/tipper/pro-2080t`;

  const pro2059XP = createModel({
    name: "Eicher Pro 2059XP",
    category: "Commercial Vehicle",
    subcategory: "Light Commercial Vehicle",
    officialUrl: pro2059XPUrl,
    bodyType: "Truck",
    application: "Haulage / goods transport",
    fuel: "Diesel",
    specifications: {
      "Series": "Pro 2000",
      "GVW": "Not specified",
      "Payload": "Not specified",
    },
  });

  const pro2075T = createModel({
    name: "Eicher Pro 2075T",
    category: "Commercial Vehicle",
    subcategory: "Tipper",
    officialUrl: pro2075TUrl,
    bodyType: "Tipper",
    application: "Construction / aggregate transport",
    fuel: "Diesel",
    engine: "E474 BSVI",
    power: "140 HP @ 3200 rpm",
    torque: "400 Nm @ 1250â€“2500 rpm",
    transmission: "ET 40S5",
    specifications: {
      "GVW": "7490 kg",
      "Tipping Capacity": "4 cubic metre",
      "Variants": "DSD / FBT / SBT PTO",
    },
  });

  const pro2080T = createModel({
    name: "Eicher Pro 2080T",
    category: "Commercial Vehicle",
    subcategory: "Tipper",
    officialUrl: pro2080TUrl,
    bodyType: "Tipper",
    application: "Construction / aggregate transport",
    fuel: "Diesel",
    engine: "E483",
    power: "115 HP",
    torque: "400 Nm",
    transmission: "5-speed Eicher transmission",
    specifications: {
      "Series": "Pro 2000",
      "Tipper Capacity": "4.5 cubic metre",
      "GVW": "Not specified",
    },
  });

  /*
   * ============================================================
   * HEAVY DUTY TIPPERS
   * ============================================================
   */

  const pro3015 = createModel({
    name: "Eicher Pro 3015",
    category: "Commercial Vehicle",
    subcategory: "Medium Commercial Vehicle",
    officialUrl: `${EICHER}/light-medium-duty-trucks/medium-duty/pro-3015`,
    bodyType: "Truck",
    application: "Cargo / General Transport",
    fuel: "Diesel",
    engine: "E494 4V TCI BS VI, 3.8L",
    power: "120 kW @ 2600 rpm",
    torque: "500 Nm",
    transmission: "ET50S7 7-speed",
    specifications: {
      "GVW": "16371 kg",
      "Displacement": "3.8 litres",
      "Emission": "BS VI",
    },
  });

  const pro8028XMUrl =
    `${EICHER}/heavy-duty-trucks/tipper/pro-8028xm`;

  const pro8028XCUrl =
    `${EICHER}/heavy-duty-trucks/tipper/pro-8028xc`;

  const pro6035TUrl =
    `${EICHER}/heavy-duty-trucks/tipper/pro-6035t`;

  const pro6035THRTUrl =
    `${EICHER}/heavy-duty-trucks/tipper/pro-6035T-hrt`;

  const pro6035XPTUrl =
    `${EICHER}/heavy-duty-trucks/tipper/pro-6035XPT`;

  const pro8035XMAMTUrl =
    `${EICHER}/heavy-duty-trucks/tipper/pro-8035xm-amt`;

  const pro8028XM = createModel({
    name: "Eicher Pro 8028XM",
    category: "Commercial Vehicle",
    subcategory: "Heavy Commercial Vehicle",
    officialUrl: pro8028XMUrl,
    bodyType: "Mining Tipper",
    application: "Mining / construction",
    fuel: "Diesel",
    engine: "VEDX8, BS-VI",
    power: "258 kW @ 2200 rpm",
    torque: "1350 Nm @ 1200â€“1600 rpm",
    transmission: "ET140S9 - 1C + 8F + 1R",
    specifications: {
      "GVW": "28000 kg",
      "Gradeability": "85%",
      "Wheelbase": "Not specified",
      "Rear Axle": "Heavy-duty axle with hub reduction",
    },
  });

  const pro8028XC = createModel({
    name: "Eicher Pro 8028XC",
    category: "Commercial Vehicle",
    subcategory: "Heavy Commercial Vehicle",
    officialUrl: pro8028XCUrl,
    bodyType: "Construction Tipper",
    application: "Construction / heavy load",
    fuel: "Diesel",
    engine: "VEDX8, BS-VI",
    power: "221 kW @ 2200 rpm",
    torque: "1200 Nm @ 1200â€“1600 rpm",
    transmission: "ET140S9 - 1C + 8F + 1R",
    specifications: {
      "GVW": "28000 kg",
      "Gradeability": "68%",
      "Rear Axle": "Heavy Duty Single Reduction Tandem Axle",
    },
  });

  const pro6035T = createModel({
    name: "Eicher Pro 6035T",
    category: "Commercial Vehicle",
    subcategory: "Heavy Commercial Vehicle",
    officialUrl: pro6035TUrl,
    bodyType: "Tipper",
    application: "Construction / heavy haulage",
    fuel: "Diesel",
    engine: "VEDX8 BS-VI",
    power: "194 kW @ 2200 rpm",
    torque: "1000 Nm @ 1100â€“1700 rpm",
    transmission: "ET 140S9, 9-speed",
    specifications: {
      "GVW": "35000 kg",
      "Gradeability": "39%",
      "TCD": "18.6 m",
      "Rear Axle": "Single reduction tandem axle",
    },
  });

  const pro6035THRT = createModel({
    name: "Eicher Pro 6035T HRT",
    category: "Commercial Vehicle",
    subcategory: "Heavy Commercial Vehicle",
    officialUrl: pro6035THRTUrl,
    bodyType: "Hub Reduction Tipper",
    application: "Mining / construction",
    fuel: "Diesel",
    engine: "VEDX8, 7.7 L",
    power: "194 kW",
    torque: "1000 Nm",
    transmission: "ET1409S",
    specifications: {
      "GVW": "35000 kg",
      "Variants": "CBC / 20BB / 23BB",
      "Rear Axle": "Heavy-Duty Hub Reduction Tandem Axle",
    },
  });

  const pro6035XPT = createModel({
    name: "Eicher Pro 6035XPT",
    category: "Commercial Vehicle",
    subcategory: "Heavy Commercial Vehicle",
    officialUrl: pro6035XPTUrl,
    bodyType: "Mining Tipper",
    application: "Mining / heavy construction",
    fuel: "Diesel",
    engine: "VEDX8 BSVI, 6-cylinder, 7.7 L",
    power: "224 kW @ 2200 rpm",
    torque: "1200 Nm @ 1200â€“1600 rpm",
    transmission: "ET140S9, 9-speed manual",
    specifications: {
      "GVW": "35000 kg",
      "Wheelbase": "5285 mm",
      "Fuel Tank": "315 L",
      "DEF Tank": "50 L",
      "Gradeability": "51.4%",
      "Ground Clearance": "290 mm",
      "Body Variants": "CBC / 18 CuM Rock / 23 CuM Box",
    },
  });

  const pro8035XMAMT = createModel({
    name: "Eicher Pro 8035XM AMT",
    category: "Commercial Vehicle",
    subcategory: "Heavy Commercial Vehicle",
    officialUrl: pro8035XMAMTUrl,
    bodyType: "Mining Tipper",
    application: "Mining / heavy construction",
    fuel: "Diesel",
    engine: "VEDX8, 7.7 L",
    power: "261 kW",
    torque: "1350 Nm",
    transmission: "ET140S9 9-speed AMT",
    specifications: {
      "GVW": "35000 kg",
      "Body": "19.5 cubic metre U-shaped rock body",
    },
  });

  /*
   * ============================================================
   * BRAND
   * ============================================================
   */

  const brand: VehicleBrand = {
    id: "eicher",
    name: "Eicher",
    officialUrl: EICHER,
    models: [
      // Bus
      starline2070,
      starline2090,
      starline2090D,
      starline3010,

      // Chassis
      busChassis,
      hdBusChassis,
      pro3000Chassis,
      series2000Chassis,

      // Light / Medium Duty
      pro3015,
      pro2059XP,
      pro2075T,
      pro2080T,

      // Heavy Duty
      pro8028XM,
      pro8028XC,
      pro6035T,
      pro6035THRT,
      pro6035XPT,
      pro8035XMAMT,
    ],
  };

  return {
    id: "eicher",
    name: "Eicher",
    officialUrl: EICHER,
    sources: [
      {
        id: "eicher",
        name: "Eicher Trucks & Buses",
        officialUrl: EICHER,
        vehicleUrl: `${EICHER}/`,
        dealerLocatorUrl: `${EICHER}/dealer-locator`,
      },
    ],
    brands: [brand],
  };
}



