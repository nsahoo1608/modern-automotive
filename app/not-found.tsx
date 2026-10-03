import Link from "next/link";
export default function NotFound() {
  return <main className="catalogue-shell"><h1>Page not found.</h1><p>Let’s get you back to vehicles and finance.</p><Link href="/">Go to homepage →</Link><p><Link href="/vehicles">Explore vehicles</Link> · <Link href="/apply">Apply for finance</Link></p></main>;
}
