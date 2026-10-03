"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import type { BrandDirectoryEntry } from "@/lib/vehicle-data/brand-directory";
export default function BrandDirectory({ entries, initialSearch }: {entries:BrandDirectoryEntry[];initialSearch:string}) {
  const [search,setSearch] = useState(initialSearch);
  const [parent,setParent] = useState("");
  const [category,setCategory] = useState("");
  const groups = Array.from(new Set(entries.map(entry => entry.parentCompany))).sort();
  const categories = Array.from(new Set(entries.map(entry => entry.category))).sort();
  const filtered = entries.filter(entry => (!parent || entry.parentCompany === parent) && (!category || entry.category === category) && `${entry.name} ${entry.parentCompany}`.toLowerCase().includes(search.toLowerCase().trim()));
  return <main className="catalogue-shell"><section className="directory-hero"><div><p className="eyebrow">A WORLD OF POSSIBILITIES</p><h1>Global brands.<br />Connected by ambition.</h1><p>Explore {entries.length} vehicle and equipment brands, from everyday mobility to commercial fleets and specialist machinery.</p></div><Image src="/images/hero-journey.webp" width={650} height={365} alt="Illustrative vehicles travelling through green hills" /></section>
    <div className="catalogue-filters"><label><span>Search brand or company</span><input type="search" value={search} onChange={e => setSearch(e.target.value)} placeholder="For example: Audi or Volkswagen" /></label><label><span>Parent company / group</span><select value={parent} onChange={e => setParent(e.target.value)}><option value="">All company groups</option>{groups.map(group => <option key={group}>{group}</option>)}</select></label><label><span>Vehicle category</span><select value={category} onChange={e => setCategory(e.target.value)}><option value="">All categories</option>{categories.map(name => <option key={name}>{name}</option>)}</select></label></div>
    <p aria-live="polite">{filtered.length} brands found · Ownership references checked 3 October 2026.</p>
    <p className="directory-note">Global listings show manufacturer references. Model and price coverage varies by brand and market; availability and finance eligibility must be confirmed locally. Portfolio and joint-venture relationships are labelled separately.</p>
    {!filtered.length && <div className="vehicle-card"><h2>No brands match.</h2><button type="button" onClick={() => {setSearch("");setParent("");setCategory("");}}>Clear filters</button></div>}
    {groups.filter(group => filtered.some(entry => entry.parentCompany === group)).map(group => <section key={group} className="brand-company-section"><h2>{group}</h2><div className="brand-directory-grid">{filtered.filter(entry => entry.parentCompany === group).map(entry => <article className="vehicle-card" key={entry.id}><span className="coverage-badge">{entry.coverage}</span><h3>{entry.name}</h3><p>{entry.category}</p><p>{entry.relationship}</p><a href={entry.ownershipSource} target="_blank" rel="noopener noreferrer">Company reference ↗</a><a href={entry.officialUrl} target="_blank" rel="noopener noreferrer">Official brand website ↗</a><Link className="apply-link" href={`/apply?category=${encodeURIComponent(entry.category)}&brand=${encodeURIComponent(entry.name)}`}>Request finance →</Link></article>)}</div></section>)}
  </main>;
}
