"use client";

import { useState } from "react";

export default function Page() {
  const [vehiclePrice, setVehiclePrice] = useState(800000);
  const [downPayment, setDownPayment] = useState(200000);
  const [interestRate, setInterestRate] = useState(10);
  const [tenureYears, setTenureYears] = useState(5);

  const loanAmount = Math.max(vehiclePrice - downPayment, 0);
  const monthlyRate = interestRate / 12 / 100;
  const totalMonths = tenureYears * 12;

  const emi =
    loanAmount === 0
      ? 0
      : monthlyRate === 0
        ? loanAmount / totalMonths
        : (loanAmount * monthlyRate * Math.pow(1 + monthlyRate, totalMonths)) /
          (Math.pow(1 + monthlyRate, totalMonths) - 1);

  const formatINR = (value: number) =>
    "Rs. " + Math.round(value).toLocaleString("en-IN");

  const brands = [
    "MARUTI SUZUKI",
    "HYUNDAI",
    "TATA MOTORS",
    "MAHINDRA",
    "TOYOTA",
    "KIA",
    "HONDA",
    "RENAULT",
    "NISSAN",
    "VOLKSWAGEN",
    "SKODA",
    "MG MOTOR",
    "JEEP",
    "CITROËN",
    "BYD",
    "ISUZU",
    "MERCEDES-BENZ",
    "BMW",
    "AUDI",
    "VOLVO",
    "LEXUS",
    "ASHOK LEYLAND",
    "EICHER",
    "BHARATBENZ",
    "FORCE MOTORS",
    "JCB",
    "TATA HITACHI",
    "CATERPILLAR",
    "KOMATSU",
    "VOLVO CE",
    "KOBELCO",
    "CASE CONSTRUCTION",
    "JAGUAR",
    "LAND ROVER",
  ];

  const banks = [
    ["HDB FINANCIAL SERVICES LTD", "https://www.hdbfs.com"],
    ["HERO FINCORP LTD", "https://www.herofincorp.com"],
    ["POONAWALLA FINCORP LTD", "https://www.poonawallafincorp.com"],
    ["PIRAMAL FINANCE", "https://www.piramalfinance.com"],
    ["MAHINDRA FINANCE", "https://www.mahindrafinance.com"],
    ["CHOLAMANDALAM FINANCE", "https://www.cholamandalam.com"],
    ["ARKA FINCORP LTD", "https://www.arkafincap.com"],
    ["SURYODAY BANK", "https://www.suryodaybank.com"],
    ["INDUSIND BANK LTD", "https://www.indusind.com"],
    ["HINDUJA LEYLAND FINANCE", "https://www.hindujaleylandfinance.com"],
    ["SUNDARAM FINANCE LTD", "https://www.sundaramfinance.in"],
    ["KOTAK MAHINDRA BANK", "https://www.kotak.com"],
  ];

  return (
    <main
      style={{
        background: "#0b1110",
        color: "#f2f5f3",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          height: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 6%",
          borderBottom: "1px solid #1d2925",
          background: "#080d0c",
        }}
      >
        <div style={{ fontWeight: 900, letterSpacing: 2, fontSize: 18 }}>
          <span style={{ color: "#f2f5f3" }}>RASHMI RANJAN</span>{" "}
          <span style={{ color: "#18b878" }}>FIN</span>{" "}
          <span style={{ color: "#d98b3a" }}>SOLUTION</span>
        </div>

        <div style={{ display: "flex", gap: 28, fontSize: 13 }}>
          <a href="/apply" style={{ color: "#aaa", textDecoration: "none" }}>
            Finance
          </a>
          <a href="#vehicles" style={{ color: "#aaa", textDecoration: "none" }}>
            Vehicles
          </a>
          <a href="#brands" style={{ color: "#aaa", textDecoration: "none" }}>
            Brands
          </a>
          <a href="#partners" style={{ color: "#aaa", textDecoration: "none" }}>
            Partners
          </a>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "90px 6% 55px",
        }}
      >
        <div style={{ maxWidth: 850 }}>
          <div
            style={{
              color: "#18b878",
              fontSize: 12,
              fontWeight: 800,
              letterSpacing: 3,
            }}
          >
            NEW & USED VEHICLE FINANCE
          </div>

          <h1
            style={{
              fontSize: "clamp(44px, 7vw, 82px)",
              lineHeight: 0.95,
              margin: "18px 0",
              fontWeight: 900,
            }}
          >
            DRIVE YOUR DREAM.
            <br />
            <span style={{ color: "#18b878" }}>FINANCE</span> MADE SIMPLE.
          </h1>

          <p
            style={{
              color: "#a8b5b0",
              fontSize: 18,
              lineHeight: 1.7,
              maxWidth: 650,
            }}
          >
            New and used vehicle finance solutions for cars, SUVs, commercial
            vehicles and construction equipment — all under one roof.
          </p>

          <div style={{ display: "flex", gap: 14, marginTop: 28, flexWrap: "wrap" }}>
            <a
              href="/apply"
              style={{
                background: "#18b878",
                color: "white",
                padding: "15px 24px",
                borderRadius: 10,
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              Calculate EMI
            </a>

            <a
              href="#vehicles"
              style={{
                border: "1px solid #34433e",
                color: "#f2f5f3",
                padding: "15px 24px",
                borderRadius: 10,
                textDecoration: "none",
                fontWeight: 800,
              }}
            >
              Explore Vehicles
            </a>
          </div>
        </div>
      </section>

      {/* SCROLLING BRANDS */}
      <section
        id="brands"
        style={{
          overflow: "hidden",
          borderTop: "1px solid #1d2925",
          borderBottom: "1px solid #1d2925",
          background: "#121c19",
          padding: "24px 0",
        }}
      >
        <div
          style={{
            color: "#18b878",
            textAlign: "center",
            fontSize: 11,
            fontWeight: 800,
            letterSpacing: 3,
            marginBottom: 18,
          }}
        >
          VEHICLE & EQUIPMENT BRANDS
        </div>

        <div className="brand-marquee">
          <div className="brand-track">
            {[...brands, ...brands].map((brand, index) => (
              <div className="brand-item" key={`${brand}-${index}`}>
                <span className="brand-dot" />
                {brand}
              </div>
            ))}
          </div>
        </div>

        <style jsx>{`
          .brand-marquee {
            overflow: hidden;
            width: 100%;
          }

          .brand-track {
            display: flex;
            width: max-content;
            animation: scrollBrands 55s linear infinite;
          }

          .brand-item {
            display: flex;
            align-items: center;
            gap: 10px;
            white-space: nowrap;
            margin-right: 48px;
            color: #f2f5f3;
            font-size: 15px;
            font-weight: 800;
            letter-spacing: 0.08em;
          }

          .brand-dot {
            width: 8px;
            height: 8px;
            border-radius: 50%;
            background: #18b878;
            display: inline-block;
          }

          @keyframes scrollBrands {
            from {
              transform: translateX(0);
            }
            to {
              transform: translateX(-50%);
            }
          }

          .brand-marquee:hover .brand-track {
            animation-play-state: paused;
          }
        `}</style>
      </section>

      {/* VEHICLES */}
      <section id="vehicles" style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 6%" }}>
        <div style={{ color: "#18b878", fontSize: 12, fontWeight: 800, letterSpacing: 3 }}>
          VEHICLES
        </div>

        <h2 style={{ fontSize: 42, marginTop: 12, fontWeight: 900 }}>
          New & Used Vehicles
        </h2>

        <p style={{ color: "#a8b5b0", maxWidth: 650, lineHeight: 1.7 }}>
          Compare vehicle prices, categories and finance options. Explore
          quality used vehicles with photos, videos and 360° views where
          available.
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(220px,1fr))",
            gap: 16,
            marginTop: 35,
          }}
        >
          {[
            ["01", "Private Cars", "New & Used"],
            ["02", "SUV & Premium", "New & Used"],
            ["03", "Commercial Vehicles", "New & Used"],
            ["04", "Construction Equipment", "New & Used"],
          ].map(([no, title, text]) => (
            <div
              key={no}
              style={{
                background: "#121c19",
                border: "1px solid #263630",
                borderRadius: 18,
                padding: 26,
              }}
            >
              <div style={{ color: "#18b878", fontWeight: 900 }}>{no}</div>
              <h3 style={{ marginTop: 30, fontSize: 20 }}>{title}</h3>
              <p style={{ color: "#a8b5b0", marginTop: 8 }}>{text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FINANCE */}
      <section id="finance" style={{ background: "#121c19", padding: "80px 6%" }}>
        <div style={{ maxWidth: 1280, margin: "0 auto" }}>
          <div style={{ color: "#18b878", fontSize: 12, fontWeight: 800, letterSpacing: 3 }}>
            FINANCE
          </div>

          <h2 style={{ fontSize: 42, marginTop: 12, fontWeight: 900 }}>
            Vehicle EMI Calculator
          </h2>

          <p style={{ color: "#a8b5b0", marginTop: 10, maxWidth: 650 }}>
            Calculate your estimated monthly vehicle loan EMI based on price, down payment, interest rate and tenure.
          </p>

          <div
            style={{
              marginTop: 35,
              background: "#0b1110",
              border: "1px solid #263630",
              borderRadius: 20,
              padding: 30,
              maxWidth: 760,
            }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
              <div>
                <label style={{ display: "block", color: "#a8b5b0", marginBottom: 8 }}>
                  Vehicle Price
                </label>
                <input
                  type="number"
                  min="0"
                  value={vehiclePrice}
                  onChange={(e) => setVehiclePrice(Number(e.target.value) || 0)}
                  style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid #263630", background: "#121c19", color: "#f2f5f3", fontSize: 16 }}
                />
              </div>

              <div>
                <label style={{ display: "block", color: "#a8b5b0", marginBottom: 8 }}>
                  Down Payment
                </label>
                <input
                  type="number"
                  min="0"
                  max={vehiclePrice}
                  value={downPayment}
                  onChange={(e) => setDownPayment(Math.min(Number(e.target.value) || 0, vehiclePrice))}
                  style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid #263630", background: "#121c19", color: "#f2f5f3", fontSize: 16 }}
                />
              </div>

              <div>
                <label style={{ display: "block", color: "#a8b5b0", marginBottom: 8 }}>
                  Interest Rate (%)
                </label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Number(e.target.value) || 0)}
                  style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid #263630", background: "#121c19", color: "#f2f5f3", fontSize: 16 }}
                />
              </div>

              <div>
                <label style={{ display: "block", color: "#a8b5b0", marginBottom: 8 }}>
                  Tenure (Years)
                </label>
                <input
                  type="number"
                  min="1"
                  max="15"
                  value={tenureYears}
                  onChange={(e) => setTenureYears(Math.max(1, Number(e.target.value) || 1))}
                  style={{ width: "100%", padding: 14, borderRadius: 10, border: "1px solid #263630", background: "#121c19", color: "#f2f5f3", fontSize: 16 }}
                />
              </div>
            </div>

            <div
              style={{
                marginTop: 25,
                padding: 24,
                borderRadius: 14,
                background: "#121c19",
                border: "1px solid #263630",
              }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
                <div>
                  <small style={{ color: "#a8b5b0" }}>Loan Amount</small>
                  <strong style={{ display: "block", marginTop: 6, fontSize: 24 }}>
                    {formatINR(loanAmount)}
                  </strong>
                </div>

                <div>
                  <small style={{ color: "#a8b5b0" }}>Estimated Monthly EMI</small>
                  <strong style={{ display: "block", marginTop: 6, fontSize: 28, color: "#18b878" }}>
                    {formatINR(emi)}
                  </strong>
                </div>
              </div>
            </div>

            <div style={{ marginTop: 25 }}>
              <a
                href="/apply"
                style={{
                  display: "inline-block",
                  padding: "14px 24px",
                  borderRadius: 10,
                  background: "#18b878",
                  color: "#06100c",
                  fontWeight: 800,
                  textDecoration: "none",
                }}
              >
                Apply for Finance
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* FINANCE PARTNERS */}
      <section id="partners" style={{ maxWidth: 1280, margin: "0 auto", padding: "80px 6%" }}>
        <div style={{ color: "#18b878", fontSize: 12, fontWeight: 800, letterSpacing: 3 }}>
          FINANCE PARTNERS
        </div>

        <h2 style={{ fontSize: 42, marginTop: 12, fontWeight: 900 }}>
          Multiple finance options.
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit,minmax(230px,1fr))",
            gap: 15,
            marginTop: 35,
          }}
        >
          {banks.map(([name, url]) => (
            <a
              key={name}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                background: "#121c19",
                border: "1px solid #263630",
                borderRadius: 16,
                padding: 22,
                color: "#f2f5f3",
                textDecoration: "none",
                minHeight: 120,
              }}
            >
              <div style={{ color: "#18b878", fontSize: 12, fontWeight: 900 }}>
                FINANCE PARTNER
              </div>

              <div style={{ marginTop: 18, fontWeight: 800, lineHeight: 1.5 }}>
                {name}
              </div>

              <div style={{ marginTop: 10, color: "#a8b5b0", fontSize: 12 }}>
                Official Website ↗
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid #263630",
          padding: "35px 6%",
          color: "#a8b5b0",
          textAlign: "center",
          fontSize: 13,
        }}
      >
        © 2026 RASHMI RANJAN FIN SOLUTION. All rights reserved.
      </footer>
    </main>
  );
}
