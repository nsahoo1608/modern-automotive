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
