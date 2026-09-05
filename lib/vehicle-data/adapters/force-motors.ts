import type { VehicleManufacturer } from "../types";
import { makeVariant } from "./utils";

const FORCE_URL = "https://www.forcemotors.com/vehicles/";
const FORCE_PRICE_URL = "https://www.forcemotors.com/prices/";

const price = (
  amount: number
) => ({
  amount,
  currency: "INR" as const,
  type: "ex-showroom" as const,
  sourceUrl: FORCE_PRICE_URL,
  verifiedAt: "2026-09-06",
});

export async function fetchForceMotorsCatalog(): Promise<VehicleManufacturer> {
  const manufacturer = "force-motors";

  const travellerModels = [
    {
      name: "Traveller N 3050WB",
      category: "Commercial Vehicle" as const,
      subcategory: "Passenger Van",
      variants: [
        makeVariant(manufacturer, "Traveller N 3050WB", "T1 N MB 3050 HR FM2.6 BSVI.2 PS 13D ABS", FORCE_URL, {
          fuel: "Diesel",
          engine: "FM 2.6",
          price: price(1548649),
          specifications: {
            seating: "13D",
            emissions: "BS-VI Stage 2",
            brakes: "ABS",
          },
        }),
        makeVariant(manufacturer, "Traveller N 3050WB", "T1 N MB 3050 HR FM2.6 BSVI.2 AC PS 9D ABS", FORCE_URL, {
          fuel: "Diesel",
          engine: "FM 2.6",
          price: price(1722517),
          specifications: {
            seating: "9D",
            emissions: "BS-VI Stage 2",
            brakes: "ABS",
          },
        }),
      ],
    },

    {
      name: "Traveller N 3350WB",
      category: "Commercial Vehicle" as const,
      subcategory: "Passenger Van",
      variants: [
        makeVariant(manufacturer, "Traveller N 3350WB", "ECO 3350 FM2.6CR BSVI.2 14D ABS", FORCE_URL, {
          fuel: "Diesel",
          engine: "FM 2.6CR",
          price: price(1771908),
          specifications: {
            seating: "14D",
            emissions: "BS-VI Stage 2",
            brakes: "ABS",
          },
        }),
        makeVariant(manufacturer, "Traveller N 3350WB", "3350 FM2.6 BSVI.2 G32 AC 12D ABS", FORCE_URL, {
          fuel: "Diesel",
          engine: "FM 2.6",
          price: price(1996557),
          specifications: {
            seating: "12D",
            emissions: "BS-VI Stage 2",
            brakes: "ABS",
          },
        }),
      ],
    },

    {
      name: "Traveller N 3700WB",
      category: "Commercial Vehicle" as const,
      subcategory: "Passenger Van",
      variants: [
        makeVariant(manufacturer, "Traveller N 3700WB", "3700 FM2.6CR BSVI.2 17D HB ABS", FORCE_URL, {
          fuel: "Diesel",
          engine: "FM 2.6CR",
          price: price(2008056),
          specifications: {
            seating: "17D",
            emissions: "BS-VI Stage 2",
            brakes: "ABS",
          },
        }),
        makeVariant(manufacturer, "Traveller N 3700WB", "3700 FM2.6CR BSVI.2 AC 17D ABS", FORCE_URL, {
          fuel: "Diesel",
          engine: "FM 2.6CR",
          price: price(2175007),
          specifications: {
            seating: "17D",
            emissions: "BS-VI Stage 2",
            brakes: "ABS",
          },
        }),
      ],
    },

    {
      name: "Traveller N 4020WB",
      category: "Commercial Vehicle" as const,
      subcategory: "Passenger Van",
      variants: [],
    },

    {
      name: "Traveller N Wider Body 3350WB",
      category: "Commercial Vehicle" as const,
      subcategory: "Passenger Van",
      variants: [],
    },

    {
      name: "Traveller N Wider Body 4020WB",
      category: "Commercial Vehicle" as const,
      subcategory: "Passenger Van",
      variants: [],
    },

    {
      name: "Traveller N 4020WB CNG",
      category: "Commercial Vehicle" as const,
      subcategory: "CNG Passenger Van",
      variants: [],
    },

    {
      name: "Traveller N Wider Body 4020WB CNG",
      category: "Commercial Vehicle" as const,
      subcategory: "CNG Passenger Van",
      variants: [],
    },
  ];

  const schoolBuses = [
    {
      name: "Traveller N School Bus 3050WB",
      variants: [
        makeVariant(manufacturer, "Traveller N School Bus 3050WB", "3050 School Bus 17D", FORCE_URL, {
          fuel: "Diesel",
          engine: "FM 2.6",
          price: price(1721301),
          specifications: {
            seating: "17D",
            safety: "ABS, FDSS, FAPS",
          },
        }),
      ],
    },
    {
      name: "Traveller N School Bus 3350WB",
      variants: [
        makeVariant(manufacturer, "Traveller N School Bus 3350WB", "3350 School Bus 17D", FORCE_URL, {
          fuel: "Diesel",
          engine: "FM 2.6",
          price: price(1817360),
          specifications: {
            seating: "17D",
            safety: "ABS, FDSS, FAPS",
          },
        }),
      ],
    },
    {
      name: "Traveller N School Bus 3700WB",
      variants: [
        makeVariant(manufacturer, "Traveller N School Bus 3700WB", "3700 School Bus 21D", FORCE_URL, {
          fuel: "Diesel",
          engine: "FM 2.6",
          price: price(1968955),
          specifications: {
            seating: "21D",
            safety: "ABS, FDSS, FAPS",
          },
        }),
        makeVariant(manufacturer, "Traveller N School Bus 3700WB", "3700 School Bus CNG 21D", FORCE_URL, {
          fuel: "CNG",
          engine: "FM 3.2 CNG",
          price: price(2146677),
          specifications: {
            seating: "21D",
            safety: "ABS, FDSS, FAPS",
          },
        }),
      ],
    },
    {
      name: "Traveller N School Bus 4020WB",
      variants: [
        makeVariant(manufacturer, "Traveller N School Bus 4020WB", "4020 School Bus 20D", FORCE_URL, {
          fuel: "Diesel",
          engine: "FM 2.6",
          price: price(2117646),
          specifications: {
            seating: "20D",
            safety: "ABS, FDSS, FAPS",
          },
        }),
        makeVariant(manufacturer, "Traveller N School Bus 4020WB", "4020 School Bus CNG 20D", FORCE_URL, {
          fuel: "CNG",
          engine: "FM 2.6 CNG",
          price: price(2287558),
          specifications: {
            seating: "20D",
            safety: "ABS, FDSS, FAPS",
          },
        }),
      ],
    },
    {
      name: "Traveller N Wider Body School Bus 4020WB",
      variants: [],
    },
  ];

  const models = [
    ...travellerModels,

    ...schoolBuses.map((item) => ({
      name: item.name,
      category: "Bus" as const,
      subcategory: "School Bus",
      variants: item.variants,
    })),

    {
      name: "Urbania DX",
      category: "Passenger Vehicle" as const,
      subcategory: "Premium Passenger Van",
      variants: [
        makeVariant(manufacturer, "Urbania DX", "3350WB 10D", FORCE_URL, {
          fuel: "Diesel",
          engine: "2.6 L",
          power: "100 kW",
          price: price(2897352),
          specifications: {
            wheelbase: "3350 mm",
            seating: "10D",
            transmission: "Manual",
            safety: "ESP, Airbags",
          },
        }),
        makeVariant(manufacturer, "Urbania DX", "3615WB 13D", FORCE_URL, {
          fuel: "Diesel",
          engine: "2.6 L",
          power: "100 kW",
          price: price(3156963),
          specifications: {
            wheelbase: "3615 mm",
            seating: "13D",
            transmission: "Manual",
            safety: "ESP, Airbags",
          },
        }),
        makeVariant(manufacturer, "Urbania DX", "4400WB 16D", FORCE_URL, {
          fuel: "Diesel",
          engine: "2.6 L",
          power: "100 kW",
          price: price(3437980),
          specifications: {
            wheelbase: "4400 mm",
            seating: "16D",
            transmission: "Manual",
            safety: "ESP, Airbags",
          },
        }),
      ],
    },

    {
      name: "Monobus 4020WB",
      category: "Bus" as const,
      subcategory: "Passenger Bus",
      variants: [
        makeVariant(manufacturer, "Monobus 4020WB", "4020WB Passenger Bus", FORCE_URL, {
          fuel: "Diesel",
          engine: "FM 2.6CR",
          power: "114 hp",
          torque: "350 Nm",
          price: price(2725832),
          specifications: {
            wheelbase: "4020 mm",
            body: "Monocoque",
          },
        }),
      ],
    },

    {
      name: "Monobus 5200WB",
      category: "Bus" as const,
      subcategory: "Passenger Bus",
      variants: [
        makeVariant(manufacturer, "Monobus 5200WB", "5200WB Passenger Bus", FORCE_URL, {
          fuel: "Diesel",
          engine: "FM 2.6CR",
          power: "114 hp",
          torque: "350 Nm",
          price: price(2886000),
          specifications: {
            wheelbase: "5200 mm",
            seating: "41+D",
            body: "Monocoque",
            transmission: "G-35 Manual",
          },
        }),
        makeVariant(manufacturer, "Monobus 5200WB", "5200WB CNG", FORCE_URL, {
          fuel: "CNG",
          engine: "FM 3.2 CNG",
          power: "127 hp",
          torque: "360 Nm",
          specifications: {
            wheelbase: "5200 mm",
            seating: "41D",
          },
        }),
      ],
    },

    {
      name: "Monobus School Bus 4020WB",
      category: "Bus" as const,
      subcategory: "School Bus",
      variants: [
        makeVariant(manufacturer, "Monobus School Bus 4020WB", "4020WB School Bus 43+A+D", FORCE_URL, {
          fuel: "Diesel",
          price: price(2797145),
          specifications: {
            safety: "ESP, FAPS",
          },
        }),
        makeVariant(manufacturer, "Monobus School Bus 4020WB", "4020WB School Bus CNG", FORCE_URL, {
          fuel: "CNG",
          engine: "FM 3.2 CNG",
          price: price(2893944),
          specifications: {
            safety: "ESP, FAPS",
          },
        }),
      ],
    },

    {
      name: "Monobus School Bus 5200WB",
      category: "Bus" as const,
      subcategory: "School Bus",
      variants: [
        makeVariant(manufacturer, "Monobus School Bus 5200WB", "5200WB School Bus 53+A+D", FORCE_URL, {
          fuel: "Diesel",
          engine: "FM 2.6CR",
          price: price(2951783),
          specifications: {
            safety: "ESP, FAPS, FDSS",
            seating: "53+A+D",
          },
        }),
      ],
    },

    {
      name: "Trax Cruiser",
      category: "Commercial Vehicle" as const,
      subcategory: "Passenger Utility Vehicle",
      variants: [
        makeVariant(manufacturer, "Trax Cruiser", "Cruiser 9+D", FORCE_URL, {
          fuel: "Diesel",
          engine: "FM 2.6",
          price: price(1262255),
          specifications: {
            seating: "9+D",
            brakes: "ABS",
          },
        }),
        makeVariant(manufacturer, "Trax Cruiser", "Cruiser 12+D 4x4", FORCE_URL, {
          fuel: "Diesel",
          engine: "FM 2.6",
          price: price(1463652),
          specifications: {
            seating: "12+D",
            drivetrain: "4x4",
            brakes: "ABS",
          },
        }),
        makeVariant(manufacturer, "Trax Cruiser", "Cruiser 12+D 4x4 AC", FORCE_URL, {
          fuel: "Diesel",
          engine: "FM 2.6",
          price: price(1573137),
          specifications: {
            seating: "12+D",
            drivetrain: "4x4",
            brakes: "ABS",
          },
        }),
      ],
    },

    {
      name: "Trax Toofan",
      category: "Commercial Vehicle" as const,
      subcategory: "Passenger Utility Vehicle",
      variants: [
        makeVariant(manufacturer, "Trax Toofan", "Toofan 11+D", "https://www.forcemotors.com/vehicles/trax-toofan/", {
          fuel: "Diesel",
          engine: "FM 2.6CR",
          power: "90 hp",
          torque: "250 Nm",
          price: price(1268000),
          specifications: {
            seating: "11+D",
            brakes: "ABS, EBD, Disc Brake",
          },
        }),
      ],
    },

    {
      name: "Trax Gama",
      category: "Commercial Vehicle" as const,
      subcategory: "Passenger Utility Vehicle",
      variants: [
        makeVariant(manufacturer, "Trax Gama", "Gama 4x2 9+D", "https://www.forcemotors.com/vehicle/trax-gama/", {
          fuel: "Diesel",
          engine: "FM2.6CR",
          power: "90 hp",
          torque: "250 Nm",
          price: price(1084336),
          specifications: {
            seating: "9+D",
            wheelbase: "2825 mm",
            transmission: "5-speed Manual",
          },
        }),
      ],
    },

    {
      name: "Trax Cruiser School Van",
      category: "Bus" as const,
      subcategory: "School Van",
      variants: [
        makeVariant(manufacturer, "Trax Cruiser School Van", "Cruiser School Van 12+D", FORCE_URL, {
          fuel: "Diesel",
          engine: "FM 2.6",
          price: price(1295329),
          specifications: {
            seating: "12+D",
            safety: "ABS",
          },
        }),
      ],
    },

    {
      name: "Trax DV",
      category: "Commercial Vehicle" as const,
      subcategory: "Delivery Van",
      variants: [],
    },

    {
      name: "Trax Crew Van",
      category: "Commercial Vehicle" as const,
      subcategory: "Crew Van",
      variants: [],
    },

    {
      name: "Citiline",
      category: "Commercial Vehicle" as const,
      subcategory: "Passenger Utility Vehicle",
      variants: [],
    },

    {
      name: "Special Applications",
      category: "Special Purpose Vehicle" as const,
      subcategory: "Special Application Vehicle",
      variants: [],
    },

    {
      name: "Gurkha",
      category: "Passenger Vehicle" as const,
      subcategory: "Off-Road SUV",
      variants: [
        makeVariant(manufacturer, "Gurkha", "Gurkha 3 Door", FORCE_URL, {
          fuel: "Diesel",
          price: price(1625013),
          specifications: {
            seating: "3+D",
            drivetrain: "4x4",
          },
        }),
        makeVariant(manufacturer, "Gurkha", "Gurkha 5 Door", FORCE_URL, {
          fuel: "Diesel",
          price: price(1758013),
          specifications: {
            seating: "6+D",
            drivetrain: "4x4",
          },
        }),
      ],
    },

    {
      name: "e-Traveller Smart Citibus EV",
      category: "Electric Vehicle" as const,
      subcategory: "Electric Passenger Van",
      variants: [
        makeVariant(manufacturer, "e-Traveller Smart Citibus EV", "Smart Citibus EV", FORCE_URL, {
          fuel: "Electric",
          battery: "Electric",
          specifications: {
            drivetrain: "Electric",
            application: "Last-mile and shared mobility",
          },
        }),
      ],
    },
  ];

  return {
    id: manufacturer,
    name: "Force Motors",
    officialUrl: "https://www.forcemotors.com/",
    sources: [
      {
        id: "force-motors-vehicles",
        name: "Force Motors Vehicles",
        officialUrl: "https://www.forcemotors.com/",
        vehicleUrl: FORCE_URL,
        priceUrl: FORCE_PRICE_URL,
        dealerLocatorUrl: "https://www.forcemotors.com/dealers/",
      },
    ],
    brands: [
      {
        id: "force-motors-force",
        name: "Force Motors",
        officialUrl: "https://www.forcemotors.com/",
        models: models.map((model) => ({
          id: `${manufacturer}-${model.name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-|-$/g, "")}`,
          name: model.name,
          category: model.category,
          subcategory: model.subcategory,
          images: [],
          variants: model.variants,
          officialUrl: FORCE_URL,
        })),
      },
    ],
  };
}
