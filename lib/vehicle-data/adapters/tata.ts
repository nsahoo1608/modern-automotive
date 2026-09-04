import type {
  VehicleManufacturer,
  VehicleModel,
  VehicleVariant,
} from "../types";

const TATA = "https://cv.tatamotors.com";
const ACE = "https://smalltrucks.tatamotors.com/tata-ace";

const IMAGES = {
  goldPlusXL:
    "https://smalltrucks.tatamotors.com/assets/smalltrucks/files/2026-09/ACE%20Gold%20Plus%20XL%20-%20Right%203.4_0.png?VersionId=U1XOsZsNhvjXXiuScDcu1wju.Md.CHGy",

  goldPlus:
    "https://smalltrucks.tatamotors.com/assets/smalltrucks/files/2026-09/ACE%20Gold%20Plus%20-%20Right%203.4_0.png?VersionId=cB6NuuWARb3PeYFGz5YUnquuZrqPlEP6",

  proPetrol:
    "https://smalltrucks.tatamotors.com/assets/smalltrucks/files/2026-09/ACE%20Pro%20Petrol%20-%20Right%203.4_0.png?VersionId=WToN8fLvzYutpZSgoOt.I1qHv9SU3nZG",

  proBiFuel:
    "https://smalltrucks.tatamotors.com/assets/smalltrucks/files/2026-09/ACE%20Pro%20BiFuel%20Right%203.4_0.png?VersionId=KsBunilQv55nkoBvwVg0szrQ8pWFHjuK",

  goldCngPlus:
    "https://smalltrucks.tatamotors.com/assets/smalltrucks/files/2026-09/ACE%20Gold%20CNG%20Plus%20-%20Right%203.4_0.png?VersionId=nuS62LUKJF0ksrSNtZeFm90zOtJv_bYD",

  htPlus:
    "https://smalltrucks.tatamotors.com/assets/smalltrucks/files/2026-09/ACE%20HT%20Plus%20-%20Right%203.4_0.png?VersionId=MGjxNn8gpn0hsA48sy3NvuchWIlTWuf4",

  goldCng20:
    "https://smalltrucks.tatamotors.com/assets/smalltrucks/files/2026-09/ACE%20Gold%20CNG%202.0%20-%20Right%203.4_0.png?VersionId=j.o6JWHxUSD7qxM3CbwwhAcwyp8m9N04",

  goldPetrol:
    "https://smalltrucks.tatamotors.com/assets/smalltrucks/files/2026-09/ACE%20Gold%20Petrol%20-%20Right%203.4_0.png?VersionId=xJFL4q9xw_NuY20iZCxYKZ0cPJIIoxPZ",

  intraV40:
    "https://smalltrucks.tatamotors.com/assets/smalltrucks/files/2026-06/V40%20Right-%203-4%20Angle%20-%20With%20Natural%20Background%202.png?VersionId=biKMGc1HMc_KHoHJULqFuyJC_azsokdV",

  intraV20:
    "https://smalltrucks.tatamotors.com/assets/smalltrucks/files/2026-03/Intra%20V20%20-%20Left%20-%201x1%201.webp?VersionId=lfOccWCFvmielhwu_14hRK.DpxfN02dl",

  intraV70Gold:
    "https://smalltrucks.tatamotors.com/assets/smalltrucks/files/2026-03/Intra%20V70%20Gold%20-%20Left%20-%201x1%201.webp?VersionId=v60XgEaZiOY4sBu3wmgAtFtWYJG0C4ZQ",

  intraV50Gold:
    "https://smalltrucks.tatamotors.com/assets/smalltrucks/files/2026-03/Intra%20V50%20Gold%20-%20Left%20-%201x1%201.webp?VersionId=ZSFT8QniDflwDNmwReJJTH_eIqFLhr2Q",

  intraV30Gold:
    "https://smalltrucks.tatamotors.com/assets/smalltrucks/files/2026-03/Intra%20V30%20Gold%20-%20Left%20-%201x1%201.webp?VersionId=uZQRaW3dlanBvTLH2CL6AoYLyZxAMMW0",
  goldCng:
    "https://smalltrucks.tatamotors.com/assets/smalltrucks/files/2025-01/Brochure_0_0.png?VersionId=KScjUTYZfQkQn4WOhITxxabXBYOwcWzw",
};

function aceModel(
  name: string,
  imageUrl: string,
  fuel: string,
  specifications: Record<string, string>
): VehicleModel {
  const image = {
    url: imageUrl,
    alt: name,
    type: "primary" as const,
    sourceUrl: ACE,
  };

  const variant: VehicleVariant = {
    id: `tata-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name,
    fuel,
    images: [image],
    specifications,
    officialUrl: ACE,
  };

  return {
    id: `tata-${name.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
    name,
    category: "Commercial Vehicle",
    images: [image],
    variants: [variant],
    officialUrl: ACE,
  };
}

export async function fetchTataCommercial(): Promise<VehicleManufacturer> {
  const models: VehicleModel[] = [
    aceModel(
      "Tata Intra V40",
      IMAGES.intraV40,
      "Diesel",
      {
        Engine: "1497 cc",
        Power: "59.5 kW (80 hp)",
        Torque: "285 Nm",
        "Wheelbase": "2450 mm",
      }
    ),

    aceModel(
      "Tata Intra V20",
      IMAGES.intraV20,
      "Diesel",
      {
        Engine: "1196 cc",
        Power: "59.5 kW (80 hp)",
        Torque: "190 Nm",
        "Wheelbase": "2450 mm",
      }
    ),

    aceModel(
      "Tata Intra V70 Gold",
      IMAGES.intraV70Gold,
      "Diesel",
      {
        Engine: "1496 cc",
        Power: "52 kW (70 hp)",
        Torque: "160 Nm",
        "Wheelbase": "2450 mm",
      }
    ),

    aceModel(
      "Tata Intra V50 Gold",
      IMAGES.intraV50Gold,
      "Diesel",
      {
        Engine: "1496 cc",
        Power: "52 kW (70 hp)",
        Torque: "160 Nm",
        "Wheelbase": "2450 mm",
      }
    ),

    aceModel(
      "Tata Intra V30 Gold",
      IMAGES.intraV30Gold,
      "Diesel",
      {
        Engine: "1496 cc",
        Power: "52 kW (70 hp)",
        Torque: "140 Nm",
        "Wheelbase": "2250 mm",
      }
    ),

    aceModel(
      "Tata Ace Gold Plus XL",
      IMAGES.goldPlusXL,
      "Diesel",
      {
        Engine: "700CC Turbocharged",
        Power: "16.2 kW (22PS)",
        Torque: "55 Nm",
        "Wheelbase": "2250 mm",
      }
    ),

    aceModel(
      "Tata Ace Gold+",
      IMAGES.goldPlus,
      "Diesel",
      {
        Engine: "702 cc",
        Power: "16.2 kW (22PS)",
        Torque: "55 Nm",
        "Wheelbase": "2100 mm",
      }
    ),

    aceModel(
      "Tata Ace Pro Petrol",
      IMAGES.proPetrol,
      "Petrol",
      {
        Engine: "694 cc",
        Power: "22 kW (30 hp)",
        Torque: "55 Nm",
        "Wheelbase": "1800 mm",
      }
    ),

    aceModel(
      "Tata Ace Pro Bi-Fuel",
      IMAGES.proBiFuel,
      "CNG + Petrol",
      {
        Engine: "694 cc",
        Power: "19 kW (25 hp) CNG",
        Torque: "51 Nm CNG",
        "Wheelbase": "1800 mm",
      }
    ),

    aceModel(
      "Tata Ace Gold CNG+",
      IMAGES.goldCngPlus,
      "CNG",
      {
        Engine: "694 cc",
        Power: "19.4 kW (26 hp)",
        Torque: "51 Nm",
        "Wheelbase": "2250 mm",
      }
    ),

    aceModel(
      "Tata Ace HT+",
      IMAGES.htPlus,
      "Diesel",
      {
        Engine: "798 cc",
        Power: "26 kW (35 hp)",
        Torque: "85 Nm",
        "Wheelbase": "2250 mm",
      }
    ),

    aceModel(
      "Tata Ace Gold CNG 2.0",
      IMAGES.goldCng20,
      "CNG + Petrol",
      {
        Engine: "694 cc Bi-Fuel",
        Power: "Petrol 30 hp / CNG 25 hp",
        Torque: "Petrol 55 Nm / CNG 49–50 Nm",
        "Wheelbase": "2250 mm",
      }
    ),

    aceModel(
      "Tata Ace Gold Petrol",
      IMAGES.goldPetrol,
      "Petrol",
      {
        Engine: "694 cc",
        Power: "22.1 kW (30 hp)",
        Torque: "55 Nm",
        "Wheelbase": "2100 mm",
      }
    ),

    aceModel(
      "Tata Ace Gold CNG",
      IMAGES.goldCng,
      "CNG",
      {
        Engine: "694 cc",
        Power: "19.4 kW",
        Torque: "51 Nm",
        "Wheelbase": "2250 mm",
      }
    ),
  ];

  return {
    id: "tata",
    name: "Tata Motors",
    officialUrl: "https://www.tatamotors.com/",
    sources: [
      {
        id: "tata-commercial",
        name: "Tata Motors Commercial Vehicles",
        officialUrl: TATA,
        vehicleUrl: "https://smalltrucks.tatamotors.com/",
      },
    ],
    brands: [
      {
        id: "tata",
        name: "Tata Motors",
        officialUrl: TATA,
        models,
      },
    ],
  };
}



