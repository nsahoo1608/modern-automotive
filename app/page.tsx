const products = [
  {
    number: "01",
    title: "New Car Finance",
    text: "Flexible finance options for your next new vehicle.",
  },
  {
    number: "02",
    title: "Used Car Finance",
    text: "Straightforward financing for quality pre-owned vehicles.",
  },
  {
    number: "03",
    title: "Commercial Vehicle",
    text: "Finance solutions built for business and commercial mobility.",
  },
];

const steps = [
  ["01", "Choose your vehicle", "Tell us what you want to drive."],
  ["02", "Choose your finance", "Find an option that fits your budget."],
  ["03", "Drive away", "Complete the process and get on the road."],
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#0B1110] text-[#F2F5F3]">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-white/[0.06] bg-[#0B1110]/95 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6 lg:px-8">
          <a href="#" className="text-lg font-bold tracking-[0.18em]">
            <span className="brand-name">RASHMI RANJAN</span><span className="brand-fin">FIN</span>
          </a>

          <nav className="hidden items-center gap-8 text-sm text-[#A8B5B0] md:flex">
            <a href="#" className="transition hover:text-white">Home</a>
            <a href="#finance" className="transition hover:text-white">Finance</a>
            <a href="#vehicles" className="transition hover:text-white">Vehicles</a>
            <a href="#process" className="transition hover:text-white">How It Works</a>
            <a href="#contact" className="transition hover:text-white">Contact</a>
          </nav>

          <a
            href="#contact"
            className="rounded-full bg-[#18B878] px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-[#20C986]"
          >
            Get Started
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute -right-40 -top-40 h-[500px] w-[500px] rounded-full bg-[#18B878]/10 blur-[120px]" />
        <div className="absolute bottom-0 left-1/3 h-64 w-64 rounded-full bg-[#18B878]/5 blur-[100px]" />

        <div className="relative mx-auto grid max-w-7xl gap-14 px-6 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-28">
          <div className="flex flex-col justify-center">
            <div className="mb-7 flex items-center gap-3 text-xs font-semibold tracking-[0.2em] text-[#18B878]">
              <span className="h-px w-10 bg-[#18B878]" />
              VEHICLE FINANCE, SIMPLIFIED
            </div>

            <h1 className="max-w-3xl text-5xl font-bold leading-[1.02] tracking-[-0.04em] sm:text-6xl lg:text-[76px]">
              Finance your
              <br />
              next{" "}
              <span className="text-[#18B878]">journey.</span>
            </h1>

            <p className="mt-7 max-w-xl text-base leading-7 text-[#A8B5B0] sm:text-lg">
              Smart vehicle finance solutions built around your needs.
              Simple applications, transparent options and a smoother way
              to get on the road.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <a
                href="#finance"
                className="rounded-full bg-[#18B878] px-7 py-4 text-center text-sm font-bold text-white transition hover:-translate-y-0.5 hover:bg-[#20C986]"
              >
                Calculate Your EMI
              </a>

              <a
                href="#vehicles"
                className="rounded-full border border-white/10 bg-[#121C19] px-7 py-4 text-center text-sm font-semibold text-[#F2F5F3] transition hover:border-[#18B878]/40"
              >
                Explore Vehicles
              </a>
            </div>

            <div className="mt-12 flex gap-8 border-t border-white/[0.07] pt-7">
              <div>
                <p className="text-xl font-bold">Fast</p>
                <p className="mt-1 text-xs text-[#A8B5B0]">Application</p>
              </div>
              <div>
                <p className="text-xl font-bold">Flexible</p>
                <p className="mt-1 text-xs text-[#A8B5B0]">Options</p>
              </div>
              <div>
                <p className="text-xl font-bold">Clear</p>
                <p className="mt-1 text-xs text-[#A8B5B0]">Process</p>
              </div>
            </div>
          </div>

          {/* FINANCE CARD */}
          <div className="relative flex items-center">
            <div className="w-full rounded-[28px] border border-white/[0.07] bg-[#121C19] p-6 shadow-2xl shadow-black/30 sm:p-8">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-semibold tracking-[0.18em] text-[#18B878]">
                    QUICK FINANCE
                  </p>
                  <h2 className="mt-2 text-2xl font-bold">
                    Estimate your EMI
                  </h2>
                </div>

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#18B878]/10 text-[#18B878]">
                  â‚¹
                </div>
              </div>

              <div className="mt-8 space-y-6">
                <div>
                  <div className="mb-3 flex justify-between text-sm">
                    <span className="text-[#A8B5B0]">Vehicle price</span>
                    <span className="font-semibold">â‚¹8,00,000</span>
                  </div>

                  <div className="h-1.5 rounded-full bg-[#0B1110]">
                    <div className="h-1.5 w-[65%] rounded-full bg-[#18B878]" />
                  </div>
                </div>

                <div>
                  <div className="mb-3 flex justify-between text-sm">
                    <span className="text-[#A8B5B0]">Down payment</span>
                    <span className="font-semibold">â‚¹2,00,000</span>
                  </div>

                  <div className="h-1.5 rounded-full bg-[#0B1110]">
                    <div className="h-1.5 w-[35%] rounded-full bg-[#18B878]" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-2xl border border-white/[0.06] bg-[#0B1110] p-4">
                    <p className="text-xs text-[#A8B5B0]">Loan amount</p>
                    <p className="mt-2 text-lg font-bold">â‚¹6,00,000</p>
                  </div>

                  <div className="rounded-2xl border border-white/[0.06] bg-[#0B1110] p-4">
                    <p className="text-xs text-[#A8B5B0]">Tenure</p>
                    <p className="mt-2 text-lg font-bold">5 Years</p>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#18B878] p-5">
                  <p className="text-sm text-white/75">Estimated monthly EMI</p>
                  <p className="mt-1 text-3xl font-bold">â‚¹12,450</p>
                  <p className="mt-1 text-xs text-white/65">
                    Indicative estimate only
                  </p>
                </div>

                <a
                  href="#contact"
                  className="block rounded-full border border-[#18B878]/40 py-3.5 text-center text-sm font-semibold text-[#18B878] transition hover:bg-[#18B878]/10"
                >
                  Start Finance Application â†’
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* PRODUCTS */}
      <section id="finance" className="border-t border-white/[0.06]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] text-[#18B878]">
            FINANCE SOLUTIONS
          </p>

          <div className="mt-4 flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <h2 className="max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
              Finance that moves
              <br />
              <span className="text-[#18B878]">with you.</span>
            </h2>

            <p className="max-w-md leading-7 text-[#A8B5B0]">
              Straightforward finance solutions designed around your vehicle,
              your budget and your journey.
            </p>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {products.map((product) => (
              <article
                key={product.number}
                className="group rounded-3xl border border-white/[0.06] bg-[#121C19] p-7 transition duration-300 hover:-translate-y-1 hover:border-[#18B878]/30"
              >
                <span className="text-sm font-bold text-[#18B878]">
                  {product.number}
                </span>

                <h3 className="mt-14 text-2xl font-bold">
                  {product.title}
                </h3>

                <p className="mt-4 min-h-14 leading-7 text-[#A8B5B0]">
                  {product.text}
                </p>

                <a
                  href="#contact"
                  className="mt-8 inline-block text-sm font-bold text-[#18B878]"
                >
                  Learn more â†’
                </a>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* VEHICLES */}
      <section id="vehicles" className="bg-[#121C19]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] text-[#18B878]">
            VEHICLE CATEGORIES
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Find the right vehicle.
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {[
              ["01", "Cars", "Everyday vehicles"],
              ["02", "SUVs & Premium", "Comfort & performance"],
              ["03", "Commercial", "Business mobility"],
            ].map(([number, title, subtitle]) => (
              <div
                key={number}
                className="group relative flex h-72 overflow-hidden rounded-3xl border border-white/[0.06] bg-[#0B1110] p-7"
              >
                <div className="absolute right-5 top-3 text-8xl font-black text-white/[0.025]">
                  {number}
                </div>

                <div className="relative mt-auto">
                  <span className="text-xs font-bold text-[#18B878]">
                    {number}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold">{title}</h3>
                  <p className="mt-2 text-sm text-[#A8B5B0]">{subtitle}</p>
                  <p className="mt-5 text-sm font-semibold text-[#18B878]">
                    Explore finance â†’
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FINANCE PARTNERS */}
      <section id="partners" className="bg-[#0B1110]">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <p className="text-xs font-bold tracking-[0.2em] text-[#18B878]">
            FINANCE PARTNERS
          </p>

          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Trusted finance support.
          </h2>

          <p className="mt-5 max-w-2xl text-base leading-7 text-[#A8B5B0]">
            We work with established financial institutions to help you explore
            suitable finance options for vehicles and construction equipment,
            subject to eligibility, terms and approval.
          </p>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              ["01", "HDB FINANCIAL SERVICES LTD", "https://www.hdbfs.com/"],
              ["02", "HERO FINCORP LTD", "https://www.herofincorp.com/"],
              ["03", "POONAWALLA FINCORP LTD", "https://poonawallafincorp.com/"],
              ["04", "PIRAMAL FINCORP LTD", "https://www.piramalfinance.com/"],
              ["05", "MAHINDRA & MAHINDRA FINANCIAL SERVICES LTD", "https://www.mahindrafinance.com/"],
              ["06", "CHOLAMANDALAM INVESTMENT AND FINANCIAL SERVICES LTD", "https://www.cholamandalam.com/"],
              ["07", "ARKA FINCORP LTD", "https://www.arkafincap.com/"],
              ["08", "SURYODAYA SMALL FINANCE BANK LTD", "https://suryoday.bank.in/"],
              ["09", "INDUSIND BANK LTD", "https://www.indusind.bank.in/"],
              ["10", "HINDUJA FINANCIAL SERVICES LTD", "https://www.hindujaleylandfinance.com/"],
              ["11", "SUNDARAM FINANCE LTD", "https://sundaramfinance.in/"],
              ["12", "KOTAK MAHINDRA BANK", "https://www.kotak.com/"],
            ].map(([number, name, url]) => (
              <a
                key={number}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="group rounded-2xl border border-white/[0.08] bg-[#121C19] p-6 transition hover:-translate-y-1 hover:border-[#18B878]/40"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="text-xs font-bold tracking-[0.18em] text-[#18B878]">
                    {number}
                  </span>
                  <span className="text-[#18B878] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1">
                    ↗
                  </span>
                </div>

                <h3 className="mt-8 min-h-[56px] text-lg font-bold leading-7 text-[#F2F5F3]">
                  {name}
                </h3>

                <p className="mt-4 text-sm leading-6 text-[#A8B5B0]">
                  Official finance partner website ↗
                </p>
              </a>
            ))}
          </div>
        </div>
      </section>
      {/* PROCESS */}
      <section id="process">
        <div className="mx-auto max-w-7xl px-6 py-24 lg:px-8">
          <div className="text-center">
            <p className="text-xs font-bold tracking-[0.2em] text-[#18B878]">
              HOW IT WORKS
            </p>
            <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
              Simple from start to finish.
            </h2>
          </div>

          <div className="mt-14 grid gap-5 md:grid-cols-3">
            {steps.map(([number, title, text]) => (
              <div
                key={number}
                className="rounded-3xl border border-white/[0.06] bg-[#121C19] p-7"
              >
                <span className="text-sm font-bold text-[#18B878]">
                  {number}
                </span>

                <h3 className="mt-10 text-xl font-bold">{title}</h3>

                <p className="mt-3 leading-7 text-[#A8B5B0]">{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="contact" className="px-6 pb-24 lg:px-8">
        <div className="mx-auto max-w-7xl rounded-[32px] bg-[#18B878] px-7 py-14 sm:px-12 lg:py-16">
          <div className="flex flex-col justify-between gap-8 md:flex-row md:items-center">
            <div>
              <p className="text-xs font-bold tracking-[0.2em] text-white/70">
                READY WHEN YOU ARE
              </p>

              <h2 className="mt-3 max-w-2xl text-4xl font-bold tracking-tight sm:text-5xl">
                Your next journey starts here.
              </h2>
            </div>

            <a
              href="#finance"
              className="rounded-full bg-[#0B1110] px-7 py-4 text-center text-sm font-bold text-white transition hover:bg-[#121C19]"
            >
              Apply for Finance
            </a>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-10 text-sm text-[#A8B5B0] md:flex-row md:items-center md:justify-between lg:px-8">
          <div>
            <p className="font-bold tracking-[0.15em] text-[#F2F5F3]">
              <span className="brand-name">RASHMI RANJAN</span><span className="brand-fin">FIN</span>
            </p>
            <p className="mt-1">Smart vehicle finance, made simpler.</p>
          </div>

          <p>© 2026 RASHMI RANJAN FIN. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}




