"use client";
import { useState } from "react";
import Link from "next/link";
import { brandDirectory } from "@/lib/vehicle-data/brand-directory";
export default function BrandMarquee() {
  const [paused, setPaused] = useState(false);
  return <section className="global-marquee" aria-label="Global vehicle brands"><div className="container marquee-heading"><span>{brandDirectory.length} GLOBAL VEHICLE & EQUIPMENT BRANDS</span><Link href="/brands">Browse brands & parent companies ↗</Link><button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Play scrolling" : "Pause scrolling"}</button></div><div className="marquee-window"><div className="marquee-track" style={{ animationPlayState: paused ? "paused" : "running" }}>{[0,1].map(copy => <div className="marquee-group" key={copy} aria-hidden={copy === 1}>{brandDirectory.map(brand => <Link key={brand.id} href={`/brands?search=${encodeURIComponent(brand.name)}`} tabIndex={copy === 1 ? -1 : 0}><strong>{brand.name}</strong><small>{brand.parentCompany === "Other manufacturers" ? brand.category : brand.parentCompany}</small></Link>)}</div>)}</div></div></section>;
}
