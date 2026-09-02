"use client";
import React, { useState } from 'react';
import { Phone, MessageCircle, Percent, Clock3, FileText, BadgeCheck, ShieldCheck, Car, Bike, Truck, Headphones, Users, Building2, Menu, X } from 'lucide-react';
export default function Page() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [enquireOpen, setEnquireOpen] = useState(false);
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
    else if (id === 'top') window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  return (
    <div className="min-h-screen bg-[#080b12] text-white font-sans antialiased overflow-x-hidden">
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&family=Plus+Jakarta+Sans:wght@600;700;800&display=swap'); *{font-family:'Inter',sans-serif} h1,h2{font-family:'Plus Jakarta Sans','Inter',sans-serif}`}</style>
      <header id="top" className="bg-black border-b border-white/[0.06] relative z-50">
        <div className="max-w- mx-auto px-4 md:px-6 h- flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-[#e11d2d] rounded- flex items-center justify-center font-black text-">R</div>
            <div className="leading-[1.05]"><div className="font-black text-"><span className="text-[#e11d2d]">R</span> RASMHI RANJAN</div><div className="text- tracking-[0.28em] text-white/70 font-semibold">VEHICLE FINANCE</div></div>
          </div>
          <div className="hidden md:flex items-center gap-7">
            <a href="tel:+919437123456" className="flex items-center gap-2.5"><span className="w-8 h-8 rounded-full bg-[#e11d2d]/10 border border-[#e11d2d]/20 flex items-center justify-center"><Phone className="w-4 h-4 text-[#e11d2d]" /></span><span className="text-">+91 9437 123 456</span></a>
            <a href="https://wa.me/919437123456" target="_blank" className="flex items-center gap-2.5"><span className="w-8 h-8 rounded-full bg-[#22c55e]/10 border border-[#22c55e]/20 flex items-center justify-center"><MessageCircle className="w-4 h-4 text-[#22c55e]" /></span><span className="text-">WhatsApp Us</span></a>
          </div>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-9 h-9 bg-white/5 rounded-lg flex items-center justify-center">{mobileOpen? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}</button>
        </div>
      </header>
      <nav className="bg-[#0f141f] border-b border-white/[0.06] sticky top-0 z-40 backdrop-blur-xl">
        <div className="max-w- mx-auto px-4 md:px-6 h- hidden md:flex items-center gap-8 text-[12.5px] tracking-[0.08em] font-semibold">
          <button onClick={()=>scrollTo('top')} className="relative h-full flex items-center text-white">HOME<span className="absolute bottom-0 left-0 right-0 h- bg-[#e11d2d]" /></button>
          <button onClick={()=>scrollTo('about-us')} className="text-white/60 hover:text-white">ABOUT US</button>
          <button onClick={()=>scrollTo('our-services')} className="text-white/60 hover:text-white">OUR SERVICES</button>
          <button onClick={()=>scrollTo('loan-partners')} className="text-white/60 hover:text-white">LOAN PARTNERS</button>
          <button onClick={()=>scrollTo('insurance')} className="text-white/60 hover:text-white">INSURANCE</button>
          <button onClick={()=>scrollTo('why-choose-us')} className="text-white/60 hover:text-white">WHY CHOOSE US</button>
          <button onClick={()=>scrollTo('contact')} className="text-white/60 hover:text-white">CONTACT US</button>
        </div>
      </nav>
      <section className="relative bg-[#080b12] overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(225,29,45,0.12),transparent_60%)]" />
        <div className="max-w- mx-auto px-4 md:px-6 py-14 md:py-24 relative z-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text- md:text- font-black leading-[0.95] tracking-tight">DRIVE YOUR DREAM.<br /><span className="text-[#e11d2d]">FINANCE</span> MADE SIMPLE.</h1>
            <p className="mt-5 text- md:text- text-white/60 leading-relaxed max-w-">Easy Vehicle Loans & Insurance Solutions Under One Roof.</p>
            <div className="mt-8 grid grid-cols-2 gap-4 max-w-">
              <div className="flex items-center gap-2.5 text-"><Percent className="w-4 h-4 text-[#e11d2d]" />Low Interest Rate</div>
              <div className="flex items-center gap-2.5 text-"><Clock3 className="w-4 h-4 text-[#e11d2d]" />Quick Approval</div>
              <div className="flex items-center gap-2.5 text-"><FileText className="w-4 h-4 text-[#e11d2d]" />Minimal Documentation</div>
              <div className="flex items-center gap-2.5 text-"><BadgeCheck className="w-4 h-4 text-[#e11d2d]" />Hassle Free Process</div>
            </div>
            <div className="mt-8 flex gap-3">
              <button onClick={()=>setEnquireOpen(true)} className="h- px-6 bg-[#e11d2d] hover:bg-[#c91a27] rounded- font-bold text- flex items-center gap-2">APPLY FOR FINANCE</button>
              <a href="https://wa.me/919437123456" target="_blank" className="h- px-6 bg-white/[0.06] border border-white/10 rounded- font-bold text- flex items-center gap-2"><MessageCircle className="w-4 h-4 text-[#22c55e]" />WHATSAPP US</a>
            </div>
          </div>
          <div className="relative">
            <img src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?q=80&w=1200" alt="Fortuner" className="w-full h- md:h- object-cover rounded- opacity-80" />
            <div className="absolute -bottom-6 -left-6 w- h- rounded- overflow-hidden border border-white/10 shadow-2xl hidden md:block"><img src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=600" alt="Bike" className="w-full h-full object-cover" /></div>
          </div>
        </div>
      </section>
      <section id="our-services" className="py-16 bg-[#0a0e14] border-t border-white/[0.04]">
        <div className="max-w- mx-auto px-4 md:px-6">
          <h2 className="text-center text- md:text- font-black tracking-tight">OUR <span className="text-[#e11d2d]">FINANCE</span> SERVICES</h2>
          <div className="mt-10 grid md:grid-cols-4 gap-5">
            <div className="bg-[#121821] border border-white/[0.06] rounded- p-5 text-center"><div className="w-10 h-10 mx-auto rounded-full bg-[#e11d2d] flex items-center justify-center"><Car className="w-5 h-5" /></div><img src="https://images.unsplash.com/photo-1555215695-3004980ad54e?q=80&w=600" className="mt-4 w-full h- object-cover rounded- opacity-80" alt="car" /><h3 className="mt-4 text- font-black">CAR FINANCE</h3><p className="mt-2 text- text-white/50">Finance for New & Used Cars at lowest interest rates.</p><button onClick={()=>setEnquireOpen(true)} className="mt-4 text- font-bold text-[#e11d2d]">APPLY NOW →</button></div>
            <div className="bg-[#121821] border border-white/[0.06] rounded- p-5 text-center"><div className="w-10 h-10 mx-auto rounded-full bg-[#e11d2d] flex items-center justify-center"><Bike className="w-5 h-5" /></div><img src="https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=600" className="mt-4 w-full h- object-cover rounded- opacity-80" alt="bike" /><h3 className="mt-4 text- font-black">BIKE FINANCE</h3><p className="mt-2 text- text-white/50">Two Wheeler Loans for new and used bikes.</p><button onClick={()=>setEnquireOpen(true)} className="mt-4 text- font-bold text-[#e11d2d]">APPLY NOW →</button></div>
            <div className="bg-[#121821] border border-white/[0.06] rounded- p-5 text-center"><div className="w-10 h-10 mx-auto rounded-full bg-[#e11d2d] flex items-center justify-center"><Truck className="w-5 h-5" /></div><img src="https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=600" className="mt-4 w-full h- object-cover rounded- opacity-80" alt="truck" /><h3 className="mt-4 text- font-black">COMMERCIAL VEHICLE FINANCE</h3><p className="mt-2 text- text-white/50">Loan solutions for Trucks, LCV, Pickups & more.</p><button onClick={()=>setEnquireOpen(true)} className="mt-4 text- font-bold text-[#e11d2d]">APPLY NOW →</button></div>
            <div className="bg-[#121821] border border-white/[0.06] rounded- p-5 text-center"><div className="w-10 h-10 mx-auto rounded-full bg-[#e11d2d] flex items-center justify-center"><ShieldCheck className="w-5 h-5" /></div><div className="mt-4 w-full h- bg-[#e11d2d]/10 rounded- flex items-center justify-center"><ShieldCheck className="w-12 h-12 text-[#e11d2d]" /></div><h3 className="mt-4 text- font-black">INSURANCE SERVICES</h3><p className="mt-2 text- text-white/50">Comprehensive Bike, Car, Commercial Vehicle Insurance.</p><button onClick={()=>setEnquireOpen(true)} className="mt-4 text- font-bold text-[#e11d2d]">GET INSURED →</button></div>
          </div>
        </div>
      </section>
      <footer className="bg-black border-t border-white/[0.06] py-4"><div className="max-w- mx-auto px-4 md:px-6 flex justify-between text- text-white/30"><span>© 2025 RASMHI RANJAN Vehicle Finance.</span><span>Privacy Policy | Terms</span></div></footer>
      <a href="https://wa.me/919437123456" target="_blank" className="fixed bottom-5 right-5 w-14 h-14 rounded-full bg-[#25D366] flex items-center justify-center shadow-xl"><MessageCircle className="w-7 h-7 text-white" /></a>
      {enquireOpen && (<div className="fixed inset-0 z-[80] flex items-center justify-center p-4"><div className="absolute inset-0 bg-black/70" onClick={()=>setEnquireOpen(false)} /><div className="relative w-full max-w- bg-[#111722] border border-white/10 rounded- p-6"><h3 className="font-black">Quick Enquiry</h3><p className="text- text-white/50 mt-1">Our executive will call you in 15 minutes.</p><a href="https://wa.me/919437123456" target="_blank" className="mt-5 w-full h- bg-[#25D366] rounded- flex items-center justify-center font-bold text-">CONTINUE ON WHATSAPP</a><button onClick={()=>setEnquireOpen(false)} className="mt-3 w-full h- bg-[#e11d2d] rounded- font-bold text-">CLOSE</button></div></div>)}
    </div>
  );
}
