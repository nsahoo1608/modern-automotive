import { NextResponse } from "next/server";
import { brandDirectory } from "@/lib/vehicle-data/brand-directory";
import { manufacturerSources } from "@/lib/vehicle-data/manufacturers";

export async function GET() {
  return NextResponse.json({
    success: true,
    sourcePolicy: {
      pricing: "official-manufacturer-or-authorized-dealer",
      images: "official-manufacturer",
      logos: "official-brand",
      showroom: "authorized-dealer",
    },
    fetchedAt: new Date().toISOString(),
    manufacturers: manufacturerSources.map(source => ({ ...source, directory: brandDirectory.find(brand => brand.id === source.id) })),
    brandCount: brandDirectory.length,
  });
}
