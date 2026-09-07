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

function aceModel(name: string, imageUrl: string, fuel: string, specifications: Record<string, string>): VehicleModel {
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


function tataTruckModel(
  name: string,
  subcategory: string,
  application: string,
  officialUrl: string = "https://trucks.tatamotors.com/all-trucks",
  imageUrl?: string,
  options?: {
    category?: VehicleModel["category"];
    wheelCount?: number;
    wheelConfiguration?: string;
    gvwKg?: number;
    gcwKg?: number;
    chassisType?: string;
    seatingCapacity?: string;
  }
): VehicleModel {
  imageUrl =
    imageUrl ??
    TATA_OFFICIAL_IMAGE_OVERRIDES[name] ??
    TATA_IMAGE_BY_MODEL[name];

  const image = imageUrl
    ? {
        url: imageUrl,
        alt: name,
        type: "primary" as const,
        sourceUrl: officialUrl,
      }
    : undefined;

  return {
    id:
      "tata-" +
      name
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, ""),
    name,
    category: options?.category ?? "Commercial Vehicle",
    subcategory,
    bodyType: options?.chassisType ? options.chassisType : (subcategory === "Tipper" ? "Tipper / HYVA" : "Truck / Lorry"),
    application,
    wheelCount: options?.wheelCount,
    wheelConfiguration: options?.wheelConfiguration,
    gvwKg: options?.gvwKg,
    gcwKg: options?.gcwKg,
    chassisType: options?.chassisType,
    seatingCapacity: options?.seatingCapacity,
    images: image ? [image] : [],
    variants: [
      {
        id:
          "tata-" +
          name
            .toLowerCase()
            .replace(/[^a-z0-9]+/g, "-")
            .replace(/^-+|-+$/g, ""),
        name,
        images: image ? [image] : [],
        officialUrl,
      },
    ],
    officialUrl,
  };
}

function tataBusModel(name: string, application: string, officialUrl: string, imageUrl?: string): VehicleModel {
  imageUrl = imageUrl ?? TATA_OFFICIAL_IMAGE_OVERRIDES[name] ?? TATA_IMAGE_BY_MODEL[name];
  return {
    id: "tata-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
    name,
    category: "Bus",
    subcategory: "Bus",
    bodyType: "Bus",
    application,
    images: imageUrl ? [{ url: imageUrl, alt: name, type: "primary", sourceUrl: officialUrl }] : [],
    variants: [{
      id: "tata-" + name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, ""),
      name,
      images: imageUrl ? [{ url: imageUrl, alt: name, type: "primary", sourceUrl: officialUrl }] : [],
      officialUrl,
    }],
    officialUrl,
  };
}


const TATA_IMAGE_PAGES: Record<string, string> = {
  "Tata LPT 709G": "https://trucks.tatamotors.com/lpt/tata-lpt-709g",
  "Tata LPT 712": "https://trucks.tatamotors.com/lpt/tata-lpt-712",
};

const TATA_IMAGE_BY_MODEL: Record<string, string> = {
  "Tata LPT 709G": "https://trucks.tatamotors.com/assets/trucks/files/Products/2024-02/LPT-709-G.jpg?VersionId=A2525FfwdgyLXavl7BMqo0Cdm96AlO4U",
  "Tata LPT 712": "https://trucks.tatamotors.com/assets/trucks/files/Products/2024-02/LPT-712.jpg?VersionId=Vx9mmQMu_jNN87dfcMrrxM14Wr8sIbFf",
  "Tata Ultra T.7": "https://trucks.tatamotors.com/assets/trucks/files/Products/2023-10/Ultra%20T.7.png",
  "Tata Ultra T.19": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-01/Ultra%20T.19%20Vehicle%20Image%203.jpg?VersionId=VmEiWsMleqtPwNQgezFN6.uiikA.FhdF",
  "Tata LPT 1916": "https://trucks.tatamotors.com/assets/trucks/files/Products/2024-02/1916-lpt.png?VersionId=G2wTsqUVKYvVWZxxu0C.65P7uTh2.s_n",
  "Tata LPT/SIGNA 2821.T": "https://trucks.tatamotors.com/assets/trucks/files/Products/2024-02/SIGNA-2821T.jpg?VersionId=m4W678YGrqA_jDVetNzxtdrGBV9rOp16",
  "Tata LPT/SIGNA 2823.T": "https://trucks.tatamotors.com/assets/trucks/files/Products/2024-02/SIGNA-2823T.jpg?VersionId=bcGOF0T2Y8E0IiaJF6pkH1FoAglE6xhk",
  "Tata LPT/SIGNA 3125.T": "https://trucks.tatamotors.com/assets/trucks/files/Products/2024-02/SIGNA-3125T.jpg?VersionId=5bk5yns6DELsGjF65NXO.sjTORadvoMo",
  "Tata LPT/SIGNA 3525.T": "https://trucks.tatamotors.com/assets/trucks/files/Products/2024-02/SIGNA-3525T.jpg?VersionId=4f9rz3FA89NPDqyIood7Ej7QRb5aCkIM",
  "Tata LPT/SIGNA 3725.T": "https://trucks.tatamotors.com/assets/trucks/files/trucks/2026-01/Signa%203725.T-2%202.jpg?VersionId=IXtRB77RNetxI6vx1mIXXASsJu8PCeBa",
  "Tata LPT/SIGNA 4225.T": "https://trucks.tatamotors.com/assets/trucks/files/trucks/2024-03/SIGNA%204225.T.jpg?VersionId=t9NQ6xSLZ2n4LbiT4TK4Bq7MbD6XLKto",
  "Tata LPT/SIGNA 4425.T": "https://trucks.tatamotors.com/assets/trucks/files/trucks/2026-01/Signa%204425.T-1%202.jpg?VersionId=u8peVq8xORCU3eAk.MHmGwVQWtfrWLkj",
  "Tata LPT/SIGNA/PRIMA 4832.T": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/PRIMA%204832.T%20Mer%202.png?VersionId=0_WzerJdSnNKsQw2WvJAXvO4Gy2r72d4",
  "Tata LPT 4932 / SIGNA 4932.T": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-01/Signa%204932.T-1%202.jpg?VersionId=_Vxk8PRoBTCXHBzgsRyJgN23Xq9A7BmU",
  "Tata SIGNA 4023.S": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/Signa%204023.S%20Container%202.png?VersionId=DtvkTg3aJwV_0hkH94qmeBqXnOqWFbJc",
  "Tata SIGNA 5521.S 4X2": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/Signa%205521.S%204x2%20Merge%20copy%202.png?VersionId=KxHb30yrSYdVKXZE0epfM_Y44VMMc210",
  "Tata SIGNA/PRIMA 5532.S 6X2": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-01/Signa%205532.S%206x2%202.jpg?VersionId=wMEB3dG5e2iRDKSf8AMIL06JT_A5QV2O",
  "Tata Prima 3530.K LNG": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/Prima%203530.K%20LNG%202.png?VersionId=5AryKLZLsAjGxdvqUGVPtW8V3Nnd_vDv",
  "Tata PRIMA 5530.S 4X2 LNG": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/Prima%205530.S%20LNG%20BG%20Truck%202.png?VersionId=a1PFx6gWYh5pUq5y5i1.KqdNlMFPs.X0",
  "PRIMA E.55S 4X2 TRACTOR": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-01/Tata%20Prima%20E.55S%20-%201%203.jpg?VersionId=xYJk79hZDCNz5H8qFKTRBRiNKI5G2mxx",
  "Tata Prima 2832.K REPTO": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/Prima%202832.K%20Scoop%20New%20Fascia_Mer%202.png?VersionId=cPQDPA.A1ttgCpivlrQs4YJAzug26nyq",
  "Tata PRIMA 3532.K REPTO": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/Prima%203532.K%20RMC%202.png?VersionId=IbZ5a_5cv0A7i9FDfJ5F7KKnf6Un8X7R",
  "Tata Prima E.28K 6X4 Tipper": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/PRIMA%20EV%2028E%202.png?VersionId=B5V7t0.KbDIExsuq2vXAMor_0JP58eI9",
  "Tata SIGNA 2823.K RMC": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/Prima%202832.K%20RMC_Mer%202.png?VersionId=TnmT6aQuOECy03EqoMM0utysgh_lRoYb",
  "Tata SIGNA 2821.K RMC": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/SIgna%202821.K%20RMC%202.png?VersionId=wbGvQvanbZIm5r_Ai1hdehVbecKzAmsP",
  "Tata SIGNA 2818.K RMC": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/Signa%202818.K%20RMC%202.png?VersionId=btPrR9.IWOBGbV7oyoHQM3L.jdO5QDH_",
  "Tata LPK 2821.K RMC": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/LPK%202821.K.png?VersionId=DJWfl6lelfP1hJzXJI5Jz8fCwNnvH5xr",
};
const TATA_OFFICIAL_IMAGE_OVERRIDES: Record<string, string> = {
  "Tata LPT/SIGNA 3023.T": "https://trucks.tatamotors.com/assets/trucks/files/trucks/2026-01/Signa%203023.T-1%202.jpg?VersionId=V5GYtr9SnM1Pbd5v652UxkkifLh251Su",
  "Tata LPT/SIGNA 3123.T": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/Signa%203123.T%20Merge%202_1.png?VersionId=2ZVIRkbSBuGHFmmwDyy0sS1VAEmQw9K.",
  "Tata LPT/SIGNA 3523.T": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/Signa%203523.T%20Merge%202.png?VersionId=XJbvHuvipDehFlLjJ9clqqNImtt8u6NV",
  "Tata LPT/SIGNA 3521.T": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/Signa%203521.T%20Merge%202.png?VersionId=S5QnKFW_wiHyoUcIN9URZ7fxNwjYUYGO",
  "Tata SIGNA/PRIMA 5532.S 4X2": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-01/Signa%205532.S-3%202.jpg?VersionId=26n5ijuRUqLCigkatwU6yTnF.6cH4eAG",
  "Tata PRIMA 2832.K SRT": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/Prima%202832.K%20Scoop%20New%20Fascia_Mer%202.png?VersionId=cPQDPA.A1ttgCpivlrQs4YJAzug26nyq",
  "Tata PRIMA 3532.K/.TK SRT": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/Prima%203532.K%20Co-driver_Mer%202.png?VersionId=2J4jhhTolUxNZ9Uwv9AdP5ExnRtSy79g",
  "Tata SIGNA 2820.K CNG": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/Signa%202820.K%20RMC%20CNG%20Final%20Mer%202.png?VersionId=GtdsteGNEK3dqHeJQacK2g_uwdSEo1bF",
  "Tata SIGNA 2832.K/.TK SRT": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/Signa%202832.K-TK%20Merge%201.png?VersionId=h76Yy_1K9GODIFEtMhPWfDtgihyvt.1D",
  "Tata SIGNA 2832.K REPTO": "https://trucks.tatamotors.com/assets/trucks/files/Products/2026-04/Signa%202832.K%20REPTO%20RMC%20Merge%202.png?VersionId=TuWCI4Fypa3mrxMuoy2KcZWE30vLEfRr",
  "Tata SIGNA 2830.K 8 Cum REPTO RMC": "https://trucks.tatamotors.com/assets/trucks/files/Products/2024-02/SIGNA%202830.K.png?VersionId=DIQFKwuo2YTgUVwhR6FVt7nLADTuckFU",
  "Tata Prima E.28K 6X4 Tipper": "https://trucks.tatamotors.com/product/prima-e28k",
  "Tata Ultra Prime SKL 58+A+D LPO11.6/54": "https://busesandvans.tatamotors.com/assets/buses/files/2026-02/525A4781%20copy1_0.jpg?VersionId=M7nhBthSMJQZeRj.YFyBOAr4X3XsXlgW",
  "Tata Starbus Ultra": "https://busesandvans.tatamotors.com/assets/buses/files/2025-02/starbus-thumb1_2.jpg?VersionId=6M5mns8ohXi2fDD608Kd4yDBKhgoB682",
  "Tata Starbus": "https://busesandvans.tatamotors.com/assets/buses/files/2023-09/Starbus_15.jpg"
};

const TATA_CHASSIS_MODELS: VehicleModel[] = [
  tataTruckModel(
    "Tata LPO 1622/62 Chassis",
    "Chassis",
    "School / Staff Bus",
    "https://busesandvans.tatamotors.com/product/lpo-1622-62",
    undefined,
    {
      category: "Chassis",

      wheelCount: 6,
      wheelConfiguration: "4x2",
      gvwKg: 16200,
      chassisType: "Bus Chassis",
      seatingCapacity: "61+D/60+D, 56+D/53+D, 45+D/44+D/43+D, 36+D/35+D",
    }
  ),
  tataTruckModel(
    "Tata LPO 1822 Chassis",
    "Chassis",
    "Intercity / Staff / Tourist Bus",
    "https://busesandvans.tatamotors.com/LPO-1822",
    undefined,
    {
      category: "Chassis",

      wheelCount: 6,
      wheelConfiguration: "4x2",
      gvwKg: 18700,
      chassisType: "Bus Chassis",
      seatingCapacity: "Up to 50 seats",
    }
  ),
];
const TATA_BUS_ADDITIONAL_MODELS: VehicleModel[] = [
  tataBusModel("Tata CityRide SKL 23+A+D LP410/35", "School Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata CityRide SKL 40+A+D LP710/43", "School Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata CityRide SKL 59+A+D LP812/52", "School Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata CityRide SKL 50+A+D LP812/52", "School Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata CityRide SKL 37+A+D LP712/45", "School Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata CityRide SKL 27+A+D LP410/33", "School Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Ultra 9/7", "City / Staff Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Ultra 9/9 EV", "Electric School Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Starbus 9/12 EV", "Electric City / Staff Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Ultra Prime 42+D AC LPO11.6/54", "Staff & Contract Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Ultra Prime 50+D AC LPO11.6/54", "Staff & Contract Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Ultra Prime 55+D LPO11.6/54", "Staff & Contract Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Ultra Prime 50+D LPO11.6/54", "Staff & Contract Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Ultra Prime 44+D LPO11.6/54", "Staff & Contract Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Ultra Prime 34+D LPO8.6/44", "Staff & Contract Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Starbus Prime 40+D AC LP916/52", "Staff & Contract Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Starbus Prime 40+D LP916/52", "Staff & Contract Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Starbus Prime 40+D ACLP913/52G", "Staff & Contract Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Starbus Prime 40+D LP910/52G", "Staff & Contract Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Starbus Prime 40+D LP812/52", "Staff & Contract Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Starbus Prime 32+D AC LP716/45", "Staff & Contract Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Starbus Prime 32+D LP712/45", "Staff & Contract Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Starbus Prime 24+D LP412/36", "Staff & Contract Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Starbus Prime 24+D LP410/36 G", "Staff & Contract Bus", "https://busesandvans.tatamotors.com/listing-page"),
  tataBusModel("Tata Starbus Prime 16+D LP410/29", "Staff & Contract Bus", "https://busesandvans.tatamotors.com/listing-page"),
];

const TATA_ADDITIONAL_MODELS: VehicleModel[] = [
  tataTruckModel("Tata SIGNA 4832.TK 10X2 & 10X4", "Tipper", "Mining / Infrastructure / Heavy Tipper", "https://trucks.tatamotors.com/product/signa-4832-tk", "https://trucks.tatamotors.com/assets/trucks/files/trucks/2026-04/Signa%204832.TK%20Merge%20New%202.png?VersionId=ePkj47stqxlR2Ps3Oi5JFjAhqrz0vCiI", { wheelCount: 16, wheelConfiguration: "10x2 / 10x4", gvwKg: 47500 }),
  tataTruckModel("Tata LPT 709G", "Truck / Lorry", "Cargo / Goods Transport"),
  tataTruckModel("Tata LPT 712", "Truck / Lorry", "Cargo / Goods Transport"),
  tataTruckModel("Tata Ultra T.7", "Truck / Lorry", "Cargo / Goods Transport"),
  tataTruckModel("Tata Ultra T.19", "Truck / Lorry", "Medium / Heavy Cargo"),
  tataTruckModel("Tata LPT 1916", "Truck / Lorry", "Cargo / Goods Transport"),
  tataTruckModel("Tata LPT/SIGNA 2821.T", "Truck / Lorry", "Construction Material / Cargo", undefined, undefined, { wheelCount: 10, gvwKg: 28000 }),
  tataTruckModel("Tata LPT/SIGNA 2823.T", "Truck / Lorry", "Construction Material / Cargo"),
  tataTruckModel("Tata LPT/SIGNA 3123.T", "Truck / Lorry", "Construction Material / Cargo"),
  tataTruckModel("Tata LPT/SIGNA 3023.T", "Truck / Lorry", "Cargo / Goods Transport", undefined, undefined, { wheelCount: 10, wheelConfiguration: "6x2", gvwKg: 30000 }),
  tataTruckModel("Tata LPT/SIGNA 3125.T", "Truck / Lorry", "Construction Material / Cargo"),
  tataTruckModel("Tata LPT/SIGNA 3523.T", "Truck / Lorry", "Construction Material / Cargo"),
  tataTruckModel("Tata LPT/SIGNA 3521.T", "Truck / Lorry", "Construction Material / Cargo"),
  tataTruckModel("Tata LPT/SIGNA 3525.T", "Truck / Lorry", "Construction Material / Cargo", undefined, undefined, { wheelCount: 12, wheelConfiguration: "8x2", gvwKg: 35000 }),
  tataTruckModel("Tata LPT/SIGNA 3725.T", "Truck / Lorry", "Heavy Cargo / Construction", undefined, undefined, { wheelCount: 14, wheelConfiguration: "8x2", gvwKg: 37000 }),
  tataTruckModel("Tata LPT/SIGNA 4225.T", "Truck / Lorry", "Heavy Cargo", undefined, undefined, { wheelCount: 14, gvwKg: 42000 }),
  tataTruckModel("Tata LPT/SIGNA 4425.T", "Truck / Lorry", "Heavy Cargo", undefined, undefined, { wheelCount: 14, gvwKg: 44000 }),
  tataTruckModel("Tata LPT/SIGNA/PRIMA 4832.T", "Truck / Lorry", "Heavy Haulage"),
  tataTruckModel("Tata LPT 4932 / SIGNA 4932.T", "Truck / Lorry", "Heavy Haulage", undefined, undefined, { wheelCount: 16, gvwKg: 49000 }),
  tataTruckModel("Tata SIGNA 4023.S", "Heavy Haulage", "Heavy Cargo / Long Haul"),
  tataTruckModel("Tata SIGNA 5521.S 4X2", "Heavy Haulage", "Heavy Cargo / Long Haul"),
  tataTruckModel("Tata SIGNA/PRIMA 5532.S 4X2", "Heavy Haulage", "Heavy Cargo / Long Haul"),
  tataTruckModel("Tata SIGNA/PRIMA 5532.S 6X2", "Heavy Haulage", "Heavy Cargo / Long Haul"),
  tataTruckModel("Tata Prima 3530.K LNG", "Tractor", "LNG Tractor Trailer"),
  tataTruckModel("Tata PRIMA 5530.S 4X2 LNG", "Tractor", "LNG Tractor Trailer"),
  tataTruckModel("PRIMA E.55S 4X2 TRACTOR", "Tractor", "Electric Tractor Trailer"),
  tataTruckModel("Tata Prima 2832.K REPTO", "Tipper", "Tipper / HYVA"),  tataTruckModel("Tata PRIMA 3532.K REPTO", "Tipper", "Tipper / HYVA"),
  tataTruckModel("Tata PRIMA 3532.K/.TK SRT", "Tipper", "Tipper / HYVA"),
  tataTruckModel("Tata SIGNA 2820.K CNG", "Tipper", "CNG Tipper / HYVA"),
  tataTruckModel("Tata SIGNA 2832.K/.TK SRT", "Tipper", "Tipper / HYVA"),
  tataTruckModel("Tata Prima E.28K 6X4 Tipper", "Tipper", "Electric Tipper / HYVA"),
  tataTruckModel("Tata SIGNA 2823.K RMC", "RMC", "Ready Mix Concrete"),
  tataTruckModel("Tata SIGNA 2832.K REPTO", "RMC", "Ready Mix Concrete"),
  tataTruckModel("Tata SIGNA 2821.K RMC", "RMC", "Ready Mix Concrete"),
  tataTruckModel("Tata SIGNA 2818.K RMC", "RMC", "Ready Mix Concrete"),
  tataTruckModel("Tata LPK 2821.K RMC", "RMC", "Ready Mix Concrete"),
  tataTruckModel("Tata SIGNA 2830.K 8 Cum REPTO RMC", "RMC", "Ready Mix Concrete"),
  tataBusModel("Tata Ultra Prime SKL 58+A+D LPO11.6/54", "School Bus", "https://busesandvans.tatamotors.com/product/ultra-prime-skl-58-a-d-lpo11-6-54"),
  tataBusModel("Tata Starbus Ultra", "Staff / School / Intercity Bus", "https://busesandvans.tatamotors.com/"),
  tataBusModel("Tata Starbus", "City / Staff / School Bus", "https://busesandvans.tatamotors.com/"),
];

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
        Torque: "Petrol 55 Nm / CNG 49â€“50 Nm",
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
  models.push(...TATA_CHASSIS_MODELS);
  models.push(...TATA_ADDITIONAL_MODELS);
  models.push(...TATA_BUS_ADDITIONAL_MODELS);


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












































