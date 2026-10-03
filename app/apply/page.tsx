import type { Metadata } from "next";
import { vehicleCategoryNames } from "@/lib/vehicle-data/categories";
import ApplyForm from "./ApplyForm";

export const dynamic = "force-dynamic";
export const metadata: Metadata = { title: "Apply for vehicle finance", description: "Request finance for your new or used vehicle, commercial vehicle or construction equipment." };
export default async function ApplyPage({ searchParams }: { searchParams: Promise<{ category?: string; brand?: string; model?: string }> }) {
  const params = await searchParams;
  const category = vehicleCategoryNames.find(name => name === params.category) ?? "";
  return <ApplyForm initialCategory={category} initialBrand={(params.brand ?? "").slice(0, 150)} initialModel={(params.model ?? "").slice(0, 150)} />;
}
