"use client";
import React, { useState } from 'react';
import { Phone, MessageCircle } from 'lucide-react';
export default function Page() {
  const partners = [
    { name: "HDB FINANCIAL SERVICES LTD", link: "https://www.hdbfs.com", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c5/HDB_Financial_Services_logo.svg" },
    { name: "HERO FINCORP LTD", link: "https://www.herofincorp.com", logo: "https://upload.wikimedia.org/wikipedia/en/4/4a/Hero_FinCorp_Logo.svg" },
    { name: "POONAWALLA FINCORP LTD", link: "https://www.poonawallafincorp.com", logo: "https://companieslogo.com/img/orig/POONAWALLA.NS_BIG-04e7a3e7.png?t=1720244490" },
    { name: "PIRAMAL FINANCE LTD", link: "https://www.piramalfinance.com", logo: "https://www.piramalfinance.com/assets/images/logo.png" },
    { name: "MAHINDRA FINANCE", link: "https://www.mahindrafinance.com", logo: "https://upload.wikimedia.org/wikipedia/commons/c/c7/Mahindra-finance-logo.png" },
    { name: "CHOLAMANDALAM INVESTMENT AND FINANCE", link: "https://www.cholamandalam.com", logo: "https://upload.wikimedia.org/wikipedia/en/7/70/Cholamandalam_Investment_and_Finance_Company.svg" },
    { name: "ARKA FINCORP LTD", link: "https://www.arkafincap.com", logo: "https://www.arkafincap.com/o/arka-fincap-theme/images/arka-logo.png" },
    { name: "SURYODAY SMALL FINANCE BANK", link: "https://www.suryodaybank.com", logo: "https://upload.wikimedia.org/wikipedia/commons/3/36/Suryoday_Small_Finance_Bank_logo.svg" },
    { name: "INDUSIND BANK LTD", link: "https://www.indusind.com", logo: "https://upload.wikimedia.org/wikipedia/commons/1/12/IndusInd_Bank_SVG_Logo.svg" },
    { name: "HINDUJA LEYLAND FINANCE", link: "https://www.hindujaleylandfinance.com", logo: "https://logo.clearbit.com/hindujaleylandfinance.com" },
    { name: "SUNDARAM FINANCE LTD", link: "https://www.sundaramfinance.in", logo: "https://www.sundaramfinance.in/images/sf-logo.svg" },
    { name: "KOTAK MAHINDRA BANK", link: "https://www.kotak.com", logo: "https://upload.wikimedia.org/wikipedia/commons/7/7c/Kotak_Mahindra_Bank_logo.svg" },
  ];
  return (
    <div className="min-h-screen bg-[#080b12] text-white font-sans">
      <header className="bg-black border-b border-white/[0.06] h- flex items-center"><div className="max-w- mx-auto px-4 md:px-6 w-full flex items-center justify-between"><div className="flex items-center gap-3"><div className="w-9 h-9 bg-[#e11d2d] rounded- flex items-center justify-center font-black">R</div><div className="font-black text-"><span className="text-[#e11d2d]">R</span> RASMHI RANJAN</div></div><a href="https://wa.me/919437123456" className="text- flex items-center gap-2"><MessageCircle className="w-4 h-4 text-green-500" /> WhatsApp</a></div></header>
      <section className="bg-[#f6f7f9] py-12">
        <div className="max-w- mx-auto px-4 md:px-6">
          <div className="text-center"><h2 className="text-black font-black text- tracking-[0.1em]">OUR BANKING PARTNERS</h2><p className="text-black/50 text- mt-2">12+ Trusted Banks & NBFCs - Click to visit official website</p><div className="mt-3 w-20 h- bg-[#e11d2d] mx-auto rounded-full" /></div>
          <div className="mt-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {partners.map((p,i)=>(
              <a key={i} href={p.link} target="_blank" rel="noopener" className="group bg-white border border-black/[0.08] rounded- p-6 flex flex-col items-center justify-center text-center min-h- shadow-[0_4px_20px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_32px_rgba(0,0,0,0.12)] hover:-translate-y- hover:border-[#e11d2d]/30 transition-all duration-300">
                <div className="w- h- flex items-center justify-center mb-4">
                  <img src={p.logo} alt={p.name} className="max-w-full max-h-full object-contain" />
                </div>
                <span className="text- font-extrabold leading-[1.3] tracking-[0.03em] text-black/70 group-hover:text-black">{p.name}</span>
                <span className="mt-2 text- font-bold tracking-[0.15em] text-[#e11d2d] opacity-0 group-hover:opacity-100 transition-opacity">VISIT →</span>
              </a>
            ))}
          </div>
          <div className="mt-10 text-center"><p className="text- text-black/40">* All logos are trademarks of their respective owners. Clicking will redirect to official website.</p></div>
        </div>
      </section>
      <footer className="bg-black py-6"><div className="max-w- mx-auto px-4 md:px-6 flex justify-between text- text-white/30"><span>© 2025 RASMHI RANJAN Vehicle Finance</span><span>12+ Banking Partners</span></div></footer>
      <a href="https://wa.me/919437123456" target="_blank" className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl"><MessageCircle className="w-7 h-7 text-white" /></a>
    </div>
  );
}
