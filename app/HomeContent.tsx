"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import BrandMarquee from "./components/BrandMarquee";
import { CarFront, Truck, Construction, Zap, ArrowUpRight, Check, ChevronRight } from "lucide-react";
const categories = [
  { title: "Passenger vehicles", category: "Passenger Vehicle", description: "From your first car to your next upgrade.", icon: CarFront, number: "01" },
  { title: "Commercial vehicles", category: "Commercial Vehicle", description: "Vehicles that keep your business moving.", icon: Truck, number: "02" },
  { title: "Construction equipment", category: "Construction Equipment", description: "Build capacity for your next project.", icon: Construction, number: "03" },
  { title: "Electric vehicles", category: "Electric Vehicle", description: "Explore a different way forward.", icon: Zap, number: "04" },
];
const banks = [
  ["HDB Financial Services", "https://www.hdbfs.com"], ["Hero FinCorp", "https://www.herofincorp.com"],
  ["Poonawalla Fincorp", "https://www.poonawallafincorp.com"], ["Piramal Finance", "https://www.piramalfinance.com"],
  ["Mahindra Finance", "https://www.mahindrafinance.com"], ["Cholamandalam Finance", "https://www.cholamandalam.com"],
  ["Arka Fincap", "https://www.arkafincap.com"], ["Suryoday Bank", "https://www.suryodaybank.com"],
  ["IndusInd Bank", "https://www.indusind.com"], ["Hinduja Leyland Finance", "https://www.hindujaleylandfinance.com"],
  ["Sundaram Finance", "https://www.sundaramfinance.in"], ["Kotak Mahindra Bank", "https://www.kotak.com"],
];
const heroSlides = ["hero-journey", "commercial", "equipment", "electric"];
const categoryImages: Record<string,string> = { "Passenger Vehicle": "passenger", "Commercial Vehicle": "commercial", "Construction Equipment": "equipment", "Electric Vehicle": "electric" };
const money = (value: number) => `₹${Math.round(value).toLocaleString("en-IN")}`;
export default function HomeContent() {
  const [slide, setSlide] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (paused || reduced.matches) return;
    const timer = window.setInterval(() => setSlide(value => (value + 1) % heroSlides.length), 7000);
    return () => window.clearInterval(timer);
  }, [paused]);
  const [price, setPrice] = useState(800000);
  const [down, setDown] = useState(200000);
  const [rate, setRate] = useState(10);
  const [years, setYears] = useState(5);
  const loan = Math.max(0, price - Math.min(down, price));
  const months = years * 12;
  const monthlyRate = rate / 1200;
  const emi = loan === 0 ? 0 : monthlyRate === 0 ? loan / months : loan * monthlyRate / (1 - Math.pow(1 + monthlyRate, -months));
  return <main className="home-main">
    <section className="hero-section container">
      <div className="hero-copy"><p className="eyebrow"><span className="status-dot" /> VEHICLE & EQUIPMENT FINANCE</p>
        <h1>Your next move.<br /><span>Made possible.</span></h1>
        <p className="hero-description">The right vehicle. A finance plan that fits. Explore new and used vehicle finance for your life, business and next big project.</p>
        <div className="hero-actions"><Link className="button button-primary" href="/apply">Find my finance <ArrowUpRight size={18} /></Link><Link className="button button-outline" href="/vehicles">Explore vehicles <ChevronRight size={18} /></Link></div>
        <div className="hero-assurances"><span><Check size={15} /> New & used vehicles</span><span><Check size={15} /> Multiple finance options</span></div>
      </div>
      <div className="hero-art cinematic-hero">
        {heroSlides.map((image,index) => <Image key={image} src={`/images/${image}.webp`} fill sizes="(max-width: 800px) 100vw, 50vw" priority={index === 0} alt={index === slide ? "Illustrative vehicle and equipment imagery" : ""} className={index === slide ? "hero-photo is-active" : "hero-photo"} />)}
        <div className="art-label"><span className="status-dot" /> MOVE FORWARD WITH CONFIDENCE</div>
        <div className="hero-slide-controls"><button type="button" onClick={() => setSlide((slide + heroSlides.length - 1) % heroSlides.length)} aria-label="Previous hero image">←</button><span>{slide + 1} / {heroSlides.length}</span><button type="button" onClick={() => setSlide((slide + 1) % heroSlides.length)} aria-label="Next hero image">→</button><button type="button" onClick={() => setPaused(!paused)} aria-pressed={paused}>{paused ? "Play" : "Pause"}</button></div>
        <div className="art-bottom"><div><small>ILLUSTRATIVE ARTWORK · YOUR JOURNEY STARTS HERE</small><strong>Explore. Calculate. Apply.</strong></div><Link href="/vehicles" aria-label="Explore vehicle catalogue"><ArrowUpRight size={26} /></Link></div>
      </div>
    </section>
    <BrandMarquee />
    <section id="vehicles" className="container section-space"><div className="section-heading"><div><p className="eyebrow">BUILT AROUND YOUR NEEDS</p><h2>One destination.<br />Every kind of ambition.</h2></div><Link className="text-link" href="/vehicles">View vehicle catalogue <ArrowUpRight size={18} /></Link></div>
      <div className="category-grid">{categories.map(({ title, category, description, icon: Icon, number }) => <Link className="category-card" key={category} href={`/vehicles?category=${encodeURIComponent(category)}`}><div className="category-photo"><Image src={`/images/${categoryImages[category]}.webp`} width={480} height={280} sizes="(max-width: 520px) 100vw, (max-width: 1000px) 50vw, 25vw" alt={`Illustrative ${title.toLowerCase()} photography`} /></div><div className="category-card-content"><div className="card-top"><Icon size={34} strokeWidth={1.3} /><span>{number}</span></div><h3>{title}</h3><p>{description}</p><span className="card-action">Explore category <ArrowUpRight size={18} /></span></div></Link>)}</div>
    </section>
    <section id="finance" className="finance-section section-space"><div className="container finance-layout"><div><p className="eyebrow">PLAN BEFORE YOU APPLY</p><h2>A clearer picture<br />of your monthly EMI.</h2><p className="section-description">Adjust the numbers to find a monthly estimate that works for you. Start with your vehicle budget and see how down payment and tenure change the picture.</p><Image className="finance-photo" src="/images/finance.webp" width={650} height={330} alt="Illustrative finance planning with a calculator and vehicle model" /><div className="finance-note"><Check size={19} /><span>No application needed to explore your estimate.</span></div></div>
      <div className="calculator-card"><div className="calculator-header"><h3>EMI calculator</h3><span>INR · ₹</span></div><div className="emi-grid">
        <label>Vehicle price<input type="number" min="0" value={price} onChange={e => setPrice(Math.max(0, Number(e.target.value) || 0))} /></label>
        <label>Down payment<input type="number" min="0" max={price} value={down} onChange={e => setDown(Math.max(0, Math.min(price, Number(e.target.value) || 0)))} /></label>
        <label>Annual interest (%)<input type="number" min="0" max="100" step="0.1" value={rate} onChange={e => setRate(Math.max(0, Math.min(100, Number(e.target.value) || 0)))} /></label>
        <label>Tenure (years)<input type="number" min="1" max="15" value={years} onChange={e => setYears(Math.max(1, Math.min(15, Number(e.target.value) || 1)))} /></label>
      </div><div className="emi-result" aria-live="polite"><span>Estimated monthly payment</span><strong>{money(emi)}<small>/ month</small></strong><div><span>Loan amount <b>{money(loan)}</b></span><span>Total interest <b>{money(emi * months - loan)}</b></span></div></div><p className="fine-print">Illustrative estimate. Fees, insurance and taxes are excluded. Final rates and approval depend on lender terms.</p><Link className="button button-primary calculator-apply" href="/apply">Request a finance offer <ArrowUpRight size={18} /></Link></div>
    </div></section>
    <section className="container section-space"><p className="eyebrow">A SIMPLE WAY FORWARD</p><h2>From a first look<br />to your next move.</h2><div className="process-grid">{[['01', 'Choose your vehicle', 'Browse models or tell us about the vehicle or equipment you already have in mind.'], ['02', 'Share your requirement', 'Submit your contact details and finance needs through one simple application.'], ['03', 'Discuss your options', 'Our team follows up to discuss your requirement and the next steps with lenders.']].map(([number,title,description]) => <div key={number}><Image className="process-photo" src={`/images/${number === "01" ? "passenger" : number === "02" ? "finance" : "commercial"}.webp`} width={500} height={260} alt="Illustrative image for the vehicle finance process" /><span className="process-number">{number}</span><h3>{title}</h3><p>{description}</p></div>)}</div></section>
    <section id="partners" className="container section-space partners-section"><div className="section-heading"><div><p className="eyebrow">MORE WAYS TO MOVE FORWARD</p><h2>Explore finance options.</h2></div><p>Compare information from established lenders.<br />Visit their websites for current products and terms.</p></div><div className="lender-grid">{banks.map(([name,url]) => <a key={name} href={url} target="_blank" rel="noopener noreferrer">{name}<ArrowUpRight size={17} /></a>)}</div></section>
    <section className="container final-cta"><Image className="cta-photo" src="/images/hero-journey.webp" fill sizes="100vw" alt="" /><div><p className="eyebrow">YOUR NEXT CHAPTER</p><h2>Let’s get you moving.</h2><p>Share your requirement. We’ll help you explore the next step.</p></div><Link className="button button-primary" href="/apply">Start my application <ArrowUpRight size={18} /></Link></section>
  </main>;
}
