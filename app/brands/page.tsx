import type { Metadata } from "next";
import { brandDirectory } from "@/lib/vehicle-data/brand-directory";
import BrandDirectory from "./BrandDirectory";
export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Global brands & parent companies", description: "Explore global vehicle and equipment brands, their manufacturer groups and official websites." };
export default async function BrandsPage({ searchParams }: { searchParams: Promise<{search?:string}> }) {
  const params = await searchParams;
  return <BrandDirectory entries={brandDirectory} initialSearch={params.search ?? ""} />;
}
