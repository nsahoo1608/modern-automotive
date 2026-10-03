"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  return <header className="site-header"><div className="header-inner">
    <Link className="wordmark" href="/" onClick={() => setOpen(false)} aria-label="Rashmi Ranjan Fin Solution home"><Image className="original-logo" src="/images/logo.jpeg" alt="Rashmi Vehicle Financial Solutions" width={64} height={64} priority /><span>RASHMI RANJAN<small>FIN SOLUTION</small></span></Link>
    <button className="menu-toggle" type="button" aria-expanded={open} aria-controls="main-navigation" onClick={() => setOpen(!open)}>{open ? "Close ✕" : "Menu ☰"}</button>
    <nav id="main-navigation" className={open ? "main-navigation is-open" : "main-navigation"} aria-label="Main navigation">
      {[['/', 'Home'], ['/vehicles', 'Vehicles'], ['/brands', 'Brands'], ['/second-hand', 'Second-hand'], ['/#finance', 'EMI calculator'], ['/contact', 'Contact us']].map(([href,label]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined} onClick={() => setOpen(false)}>{label}</Link>)}
      <Link className="button button-primary" href="/apply" onClick={() => setOpen(false)}>Apply for finance <span>↗</span></Link>
    </nav>
  </div></header>;
}
