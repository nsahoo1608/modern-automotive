import { NextResponse } from "next/server";

import { manufacturerAdapters } from "@/lib/vehicle-data/adapters";
import { manufacturerSources } from "@/lib/vehicle-data/manufacturers";

export const dynamic = "force-dynamic";

export async function GET() {
  const results = [];
  const errors: Record<string, string> = {};

  for (const manufacturer of manufacturerSources) {
    const adapter = manufacturerAdapters[manufacturer.id];

    if (!adapter) {
      results.push({
        id: manufacturer.id,
        name: manufacturer.name,
        officialUrl: manufacturer.officialUrl,
        vehicleUrl: manufacturer.vehicleUrl,
        priceUrl: manufacturer.priceUrl,
        dealerLocatorUrl: manufacturer.dealerLocatorUrl,
        brands: [],
        dataStatus: "adapter-pending",
      });

      continue;
    }

    try {
      const catalog = await adapter.fetchCatalog();

      results.push({
        ...catalog,
        dataStatus: "live",
      });
    } catch (error) {
      errors[manufacturer.id] =
        error instanceof Error
          ? error.message
          : "Unknown adapter error";

      results.push({
        id: manufacturer.id,
        name: manufacturer.name,
        officialUrl: manufacturer.officialUrl,
        vehicleUrl: manufacturer.vehicleUrl,
        priceUrl: manufacturer.priceUrl,
        dealerLocatorUrl: manufacturer.dealerLocatorUrl,
        brands: [],
        dataStatus: "error",
      });
    }
  }

  return NextResponse.json({
    success: Object.keys(errors).length === 0,
    sourcePolicy: {
      pricing: "official-manufacturer-or-authorized-dealer",
      images: "official-manufacturer",
      logos: "official-brand",
      showroom: "authorized-dealer",
    },
    fetchedAt: new Date().toISOString(),
    manufacturers: results,
    errors,
  });
}