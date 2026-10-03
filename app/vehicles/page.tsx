import type { Metadata } from "next";
import VehicleCatalogue from "./VehicleCatalogue";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Explore vehicles", description: "Browse manufacturer models, available variants and published prices, then request vehicle finance." };
export default async function VehiclesPage({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const params = await searchParams;
  return <VehicleCatalogue initialCategory={params.category ?? ""} />;
}
