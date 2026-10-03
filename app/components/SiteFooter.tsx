import Link from "next/link";
export default function SiteFooter() {
  return <footer className="site-footer"><div className="container footer-grid"><div><strong>RASHMI RANJAN <span>FIN SOLUTION</span></strong><p>Your next vehicle. A clearer way to finance it.</p><p>Cars · Commercial vehicles · Equipment</p></div><nav aria-label="Footer navigation"><Link href="/brands">Global brands ↗</Link><Link href="/vehicles">Explore vehicles ↗</Link><Link href="/#finance">Calculate EMI ↗</Link><Link href="/apply">Request finance ↗</Link></nav></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Rashmi Ranjan Fin Solution.</span><span>Finance is subject to lender assessment and terms.</span></div></footer>;
}
