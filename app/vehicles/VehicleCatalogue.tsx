"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { VehicleManufacturer } from "@/lib/vehicle-data/types";
import { vehicleCategoryNames } from "@/lib/vehicle-data/categories";
import { manufacturerSources } from "@/lib/vehicle-data/manufacturers";

export default function VehicleCatalogue({ initialCategory }: { initialCategory: string }) {
  const [manufacturers, setManufacturers] = useState<VehicleManufacturer[]>([]);
  const [category, setCategory] = useState(initialCategory);
  const [brand, setBrand] = useState("");
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [limit, setLimit] = useState(24);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/vehicles", { signal: controller.signal })
      .then(async response => { if (!response.ok) throw new Error("Catalogue unavailable"); return response.json(); })
      .then(data => {
        setManufacturers(data.manufacturers ?? []);
        if (Object.keys(data.errors ?? {}).length) setError("Some manufacturer information could not be refreshed. Available models are shown below; confirm current details on the manufacturer’s website.");
      })
      .catch(e => { if (e.name !== "AbortError") setError("We could not load models. Retry, browse the official manufacturer websites below, or request finance with your vehicle details."); })
      .finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [reload]);
  const models = manufacturers.flatMap(manufacturer => (manufacturer.brands ?? []).flatMap(item => (item.models ?? []).map(model => ({ model, brand: item }))));
  const brands = Array.from(new Set(models.map(item => item.brand.name))).sort();
  const filtered = models.filter(item => (!category || item.model.category === category) && (!brand || item.brand.name === brand) && `${item.brand.name} ${item.model.name}`.toLowerCase().includes(query.trim().toLowerCase()));

  return <main className="catalogue-shell">

<section className="directory-hero"><div><p className="eyebrow">EXPLORE YOUR NEXT MOVE</p><h1>Find your next vehicle.</h1><p>Explore cars, commercial vehicles and equipment. Browse published manufacturer information and tell us what you want to finance.</p><Link href="/brands">Browse global brands & parent companies →</Link></div><Image src="/images/commercial.webp" width={650} height={365} alt="Illustrative commercial vehicle photography" priority /></section>
    <div className="catalogue-filters">
      <label>Search models<input type="search" placeholder="Search by model or brand" value={query} onChange={event => setQuery(event.target.value)} /></label>
      <label>Vehicle type<select value={category} onChange={event => setCategory(event.target.value)}><option value="">All vehicle types</option>{vehicleCategoryNames.map(name => <option key={name}>{name}</option>)}</select></label>
      <label>Brand<select value={brand} onChange={event => setBrand(event.target.value)}><option value="">All brands</option>{brands.map(name => <option key={name}>{name}</option>)}</select></label>
    </div>
    {loading && <p role="status">Refreshing the manufacturer catalogue… You can browse official websites below while it loads.</p>}
    {error && <p role="status">{error} <button type="button" onClick={() => { setLoading(true); setError(""); setReload(value => value + 1); }} style={{ color: "#5ed9b0", textDecoration: "underline" }}>Retry catalogue</button></p>}
    {!loading && <p aria-live="polite">{filtered.length} models found</p>}
    {!loading && !filtered.length && <div className="vehicle-card"><h2>No models match your selection.</h2><p>Try another category or brand. You can request finance even if your vehicle is not listed.</p><button type="button" onClick={() => { setQuery(""); setCategory(""); setBrand(""); }}>Clear filters</button><Link href="/apply">Tell us your requirement →</Link></div>}
    <section className="catalogue-grid" aria-label="Vehicle models">{filtered.slice(0,limit).map(({ model, brand: item }) => {
      const prices = model.variants.map(variant => variant.price).filter(price => price && Number.isFinite(price.amount) && price.amount > 0);
      const lowest = prices.sort((a,b) => a!.amount - b!.amount)[0];
      return <article className="vehicle-card" key={`${item.id}-${model.id}`}>
        {model.images[0] ? <Image unoptimized width={480} height={240} src={model.images[0].url} alt={model.images[0].alt || model.name} /> : <div><Image width={480} height={240} src={`/images/${model.category.includes("Equipment") ? "equipment" : model.category === "Passenger Vehicle" ? "passenger" : model.category === "Electric Vehicle" ? "electric" : "commercial"}.webp`} alt={`Illustrative ${model.category.toLowerCase()} category image, not the listed model`} /><small className="fine-print">Illustrative category image</small></div>}
        <p>{item.name} · {model.category}</p><h2>{model.name}</h2>
        <p>{lowest ? `From ₹${lowest.amount.toLocaleString("en-IN")} (${lowest.type})` : "Contact the manufacturer or dealer for current pricing."}</p>
        {lowest && <p style={{ fontSize: 12 }}>Published price; taxes, fees and location may change the final quote.</p>}
        <details><summary>{model.variants.length} variants · View details</summary>{model.variants.map(variant => <p key={variant.id}>{variant.name}{variant.fuel ? ` · ${variant.fuel}` : ""}{variant.transmission ? ` · ${variant.transmission}` : ""}{variant.price ? ` · ₹${variant.price.amount.toLocaleString("en-IN")}` : ""}</p>)}</details>
        <a href={model.officialUrl} target="_blank" rel="noopener noreferrer">Manufacturer details ↗</a>
        <Link className="apply-link" href={`/apply?category=${encodeURIComponent(model.category)}&brand=${encodeURIComponent(item.name)}&model=${encodeURIComponent(model.name)}`}>Request finance →</Link>
      </article>;
    })}</section>
    {filtered.length > limit && <button className="button button-outline load-more" type="button" onClick={() => setLimit(value => value + 24)}>Show more models ({filtered.length - limit} remaining)</button>}
    <h2 style={{ fontSize: 28, fontWeight: 800 }}>Official manufacturer websites</h2><p>Use these links to confirm availability, prices and dealer locations. Listings are manufacturer references, rather than available used vehicle stock.</p>
    <div className="catalogue-grid">{manufacturerSources.filter(item => !query || item.name.toLowerCase().includes(query.toLowerCase())).map(item => <a className="vehicle-card" key={item.id} href={item.vehicleUrl || item.officialUrl} target="_blank" rel="noopener noreferrer">{item.name} ↗</a>)}</div>
  </main>;
}
