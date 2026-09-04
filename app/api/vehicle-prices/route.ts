import { NextResponse } from "next/server";

type VehicleVariant = {
  name: string;
  price: number;
  priceType: "ex-showroom";
  source: string;
};

type VehicleModel = {
  name: string;
  variants: VehicleVariant[];
};

const SOURCES: Record<string, string> = {
  "Bolero Pik-Up":
    "https://auto.mahindra.com/own-online/variant-selection?pid=PUPM090318046187",

  "MAXX CITY":
    "https://auto.mahindra.com/own-online/variant-selection?mgc=MAXX",

  "MAXX HD":
    "https://auto.mahindra.com/own-online/variant-selection?mgc=mxhd",

  "Bolero":
    "https://auto.mahindra.com/own-online/variant-selection?mgc=bol",
};

async function fetchOfficialPage(url: string): Promise<string> {
  const response = await fetch(url, {
    cache: "no-store",
    headers: {
      Accept:
        "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 Chrome/142 Safari/537.36",
    },
  });

  if (!response.ok) {
    throw new Error(
      `Manufacturer page returned HTTP ${response.status}`
    );
  }

  return response.text();
}

function cleanText(value: string): string {
  return value
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&#8377;/gi, "₹")
    .replace(/\s+/g, " ")
    .trim();
}

function extractVariants(
  html: string,
  model: string,
  source: string
): VehicleVariant[] {
  const text = cleanText(html);

  const modelPatterns: Record<string, RegExp> = {
    "Bolero Pik-Up":
      /PIK-UP\s+(?:4WD\s+AC|4WD\s+DIESEL|4WD\s+CBC|4WD|FB\s+PS\s+AC|FB\s+PS|FB\s+MS\s+CBC|FB\s+MS|FB\s+1\.3\s+AC\s+DIESEL|FB\s+1\.3\s+MS\s+DIESEL|FB\s+1\.3\s+DIESEL|CBC\s+4WD\s+DIESEL)/gi,

    "MAXX CITY":
      /(?:CITY\s+1\.(?:3|4|5)\s+(?:LX|MXI|LXCBC|VXI|SXI)(?:\s+AC)?(?:\s+\(Cowl Body Chassis\))?\s+DIESEL|MAXXCITY\s+1\.(?:3|5)\s+(?:VXI|SXI)\s+AC\s+DIESEL|MAXXCITY\s+1\.4\s+VXI\s+AC\s+DIESEL)/gi,

    "MAXX HD":
      /MAXX\s+HD\s+(?:1\.3|1\.7|1\.9|2\.0)L?\s+(?:LX|LXCBC|MXI|VXI|SXI)(?:\s+AC)?(?:\s+CNG)?(?:\s+BS6\.2)?(?:\s+DIESEL)?/gi,

    Bolero:
      /\b(?:B4|B6\s+OPT|B6|B8)\s+DIESEL\b/gi,
  };

  const pattern = modelPatterns[model];

  if (!pattern) {
    return [];
  }

  const priceRegex =
    /Ex[- ]Showroom Price\s*₹\s*([\d,]+)/gi;

  const prices: number[] = [];

  let priceMatch: RegExpExecArray | null;

  while ((priceMatch = priceRegex.exec(text)) !== null) {
    prices.push(
      Number(priceMatch[1].replace(/,/g, ""))
    );
  }

  const names: string[] = [];

  let nameMatch: RegExpExecArray | null;

  while ((nameMatch = pattern.exec(text)) !== null) {
    const name = nameMatch[0]
      .replace(/\s+/g, " ")
      .trim();

    if (!names.includes(name)) {
      names.push(name);
    }
  }

  /*
   * Mahindra's page contains feature sections as well as
   * the variant cards. The variant order corresponds to the
   * Ex-Showroom price records on the page.
   *
   * We therefore pair unique variant names with prices,
   * then remove obviously invalid combinations.
   */

  const variants: VehicleVariant[] = [];

  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const price = prices[i];

    if (!name || !price) {
      continue;
    }

    if (
      !variants.some(
        (variant) =>
          variant.name.toLowerCase() ===
          name.toLowerCase()
      )
    ) {
      variants.push({
        name,
        price,
        priceType: "ex-showroom",
        source,
      });
    }
  }

  return variants;
}

export async function GET() {
  const fetchedAt = new Date().toISOString();

  const models: Record<string, VehicleModel> = {};
  const errors: Record<string, string> = {};

  for (const [model, source] of Object.entries(SOURCES)) {
    try {
      const html = await fetchOfficialPage(source);

      const variants = extractVariants(
        html,
        model,
        source
      );

      models[model] = {
        name: model,
        variants,
      };

      console.log(
        `[vehicle-prices] ${model}: ${variants.length} variants`
      );
    } catch (error) {
      errors[model] =
        error instanceof Error
          ? error.message
          : "Unknown error";

      models[model] = {
        name: model,
        variants: [],
      };
    }
  }

  return NextResponse.json({
    manufacturer: "Mahindra",
    source: "Official Mahindra Automotive",
    fetchedAt,
    models,
    errors,
  });
}
