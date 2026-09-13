"use client";

import type { VehicleBrand, VehicleManufacturer, VehicleModel, VehicleVariant } from "@/lib/vehicle-data/types";

import { useEffect, useState } from "react";
import Link from "next/link";


const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  border: "1px solid #30413A",
  borderRadius: 12,
  padding: "14px 15px",
  background: "#0B1110",
  color: "#F2F5F3",
  outline: "none",
  fontSize: 14,
};

export default function ApplyPage() {
  const [vehicles, setVehicles] = useState<VehicleManufacturer[]>([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [selectedVariant, setSelectedVariant] = useState("");

  useEffect(() => {
    fetch("/api/vehicles")
      .then((res) => res.json())
      .then((data) => {
        console.log("VEHICLE API DATA:", data.manufacturers);
        setVehicles(data.manufacturers ?? []);
      })
      .catch(console.error);
  }, []);

  const categories = [
    "Commercial Vehicle",
    "Passenger Vehicle",
    "Electric Vehicle",
    "Two Wheeler",
  ];

  console.log("VEHICLES STATE:", vehicles);
  console.log("SELECTED TYPE:", selectedVehicleType);

  const availableBrands = vehicles
    .flatMap((manufacturer: VehicleManufacturer) => manufacturer.brands ?? [])
    .filter((brand: VehicleBrand) =>
      (brand.models ?? []).some(
        (model: VehicleModel) => model.category === selectedVehicleType
      )
    );
  console.log("AVAILABLE BRANDS:", availableBrands.map((brand: VehicleBrand) => brand.name));

  const selectedBrandData = availableBrands.find(
    (brand: VehicleBrand) => brand.name === selectedBrand
  );

  const availableModels =
    selectedBrandData?.models.filter(
      (model: VehicleModel) => model.category === selectedVehicleType
    ) ?? [];

  const selectedModelData = availableModels.find(
    (model: VehicleModel) => model.name === selectedModel
  );

  const availableVariants = selectedModelData?.variants ?? [];
  const [form, setForm] = useState({ name: "", mobile: "", email: "", city: "", state: "", category: "", brand: "", model: "", condition: "", price: "", loan: "", message: "", latitude: "", longitude: "", address: "", village: "", ward: "", policeStation: "", panchayat: "", nac: "", municipality: "", district: "", pincode: "" });

  const captureLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by this browser.");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;

        updateField("latitude", latitude.toString());
        updateField("longitude", longitude.toString());

        try {
          const response = await fetch("/api/geocode", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              latitude,
              longitude,
            }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || "Unable to fetch address.");
          }

          updateField("address", data.address || "");
          updateField("village", data.village || "");
          updateField("ward", data.ward || "");
          updateField("policeStation", data.policeStation || "");
          updateField("panchayat", data.panchayat || "");
          updateField("nac", data.nac || "");
          updateField("municipality", data.municipality || "");
          updateField("city", data.city || "");
          updateField("district", data.district || "");
          updateField("state", data.state || "");
          updateField("pincode", data.pincode || "");
        } catch {
          alert("Location captured, but address could not be fetched.");
        }
      },
      () => {
        alert("Please allow location access to continue.");
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0,
      }
    );
  };
  const updateField = (field: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };
  const [submitting, setSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const handleSubmit = async () => {
    if (!form.name.trim() || form.mobile.length !== 10) {
      alert("Please enter your full name and a valid 10-digit mobile number.");
      return;
    }

    setSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/finance-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit application.");
      }

      setSubmitMessage("Application submitted successfully. Our finance team will contact you shortly.");
      setForm({
        name: "",
        mobile: "",
        email: "",
        city: "",
        state: "",
        category: "",
        brand: "",
        model: "",
        condition: "",
        price: "",
        loan: "",
        message: "",
        latitude: "",
        longitude: "",
        address: "",
        village: "",
        ward: "",
        policeStation: "",
        panchayat: "",
        nac: "",
        municipality: "",
        district: "",
        pincode: "",
      });
    } catch (error) {
      const message = error instanceof Error ? error.message : "Something went wrong.";
      setSubmitMessage(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        background: "#0B1110",
        color: "#F2F5F3",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* NAVBAR */}
      <nav
        style={{
          minHeight: 72,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 20,
          padding: "12px 6%",
          borderBottom: "1px solid #1E2925",
          background: "#0B1110",
          flexWrap: "wrap",
        }}
      >
        <Link
          href="/"
          style={{
            textDecoration: "none",
            color: "#F2F5F3",
            fontWeight: 900,
            fontSize: 20,
            letterSpacing: 0.8,
          }}
        >
          RASHMI RANJAN{" "}
          <span style={{ color: "#18B878" }}>FIN</span>{" "}
          <span style={{ color: "#E7A23B" }}>SOLUTION</span>
        </Link>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 20,
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              color: "#A8B5B0",
              fontSize: 13,
              fontWeight: 700,
            }}
          >
            ☎ Support:{" "}
            <span style={{ color: "#18B878" }}>
              +91-99938307231
            </span>
          </div>

          <Link
            href="/"
            style={{
              textDecoration: "none",
              color: "#A8B5B0",
              fontSize: 14,
              fontWeight: 700,
            }}
          >
            ← Home
          </Link>
        </div>
      </nav>

      {/* HERO */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "70px 24px 40px",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "8px 14px",
            borderRadius: 30,
            background: "#12231D",
            color: "#18B878",
            fontSize: 12,
            fontWeight: 800,
            letterSpacing: 1,
          }}
        >
          VEHICLE FINANCE
        </div>

        <h1
          style={{
            fontSize: "clamp(40px, 6vw, 72px)",
            lineHeight: 0.95,
            margin: "22px 0 18px",
            fontWeight: 950,
            letterSpacing: -2,
          }}
        >
          DRIVE NOW.
          <br />
          <span style={{ color: "#18B878" }}>PAY SMART.</span>
        </h1>

        <p
          style={{
            maxWidth: 680,
            color: "#A8B5B0",
            fontSize: 18,
            lineHeight: 1.7,
          }}
        >
          Apply for vehicle and equipment finance through our network of
          trusted financial partners. New or used — we help you find the
          right financing solution.
        </p>
      </section>

      {/* APPLICATION */}
      <section
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "20px 24px 80px",
        }}
      >
        <div
          style={{
            background: "#121C19",
            border: "1px solid #263630",
            borderRadius: 24,
            padding: "clamp(22px, 4vw, 38px)",
            boxShadow: "0 25px 80px rgba(0,0,0,.25)",
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: 30,
              fontWeight: 900,
            }}
          >
            Finance Application
          </h2>

          <p
            style={{
              color: "#A8B5B0",
              marginTop: 8,
              marginBottom: 30,
            }}
          >
            Share your requirement and our finance team will contact you.
          </p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: 20,
            }}
          >
            {/* NAME */}
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>
                Full Name
              </span>

              <input
                type="text"
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                style={inputStyle}
              />
            </label>

            {/* MOBILE */}
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>
                Applicant Mobile Number
              </span>

              <div
                style={{
                  display: "flex",
                  border: "1px solid #30413A",
                  borderRadius: 12,
                  overflow: "hidden",
                  background: "#0B1110",
                }}
              >
                <span
                  style={{
                    padding: "14px 15px",
                    color: "#18B878",
                    fontWeight: 900,
                    borderRight: "1px solid #30413A",
                  }}
                >
                  +91
                </span>

                <input
                  type="tel"
                  inputMode="numeric"
                  maxLength={10}
                  placeholder="10-digit mobile number"
                  value={form.mobile}
                  onChange={(e) => updateField("mobile", e.target.value.replace(/\D/g, "").slice(0, 10))}
                  style={{
                    ...inputStyle,
                    border: 0,
                    borderRadius: 0,
                  }}
                />
              </div>
            </label>

            {/* EMAIL */}
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>
                Email Address
              </span>

              <input
                type="email"
                placeholder="Enter your email address"
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                style={inputStyle}
              />
            </label>

            {/* CITY */}
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>
                City
              </span>

              <input
                type="text"
                placeholder="Enter your city"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                style={inputStyle}
              />
            </label>

            {/* GEO LOCATION */}
            <div style={{
              marginTop: 18,
              padding: 20,
              border: "1px solid #30413A",
              borderRadius: 16,
              background: "#121C19",
            }}>
              <div style={{ fontSize: 14, fontWeight: 900, marginBottom: 6 }}>
                Applicant Location
              </div>

              <div style={{ fontSize: 12, color: "#A8B5B0", marginBottom: 14 }}>
                Detect your current location to automatically fetch your address.
              </div>

              <button
                type="button"
                onClick={captureLocation}
                style={{
                  width: "100%",
                  border: 0,
                  borderRadius: 10,
                  padding: "13px 16px",
                  background: "#18B878",
                  color: "#06100C",
                  fontWeight: 900,
                  cursor: "pointer",
                }}
              >
                Detect My Location
              </button>

              <div style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 10,
                marginTop: 14,
              }}>
                <input
                  type="text"
                  placeholder="Village / Locality"
                  value={form.village}
                  readOnly
                  style={inputStyle}
                />

                <input
                  type="text"
                  placeholder="Ward"
                  value={form.ward}
                  readOnly
                  style={inputStyle}
                />

                <input
                  type="text"
                  placeholder="Police Station"
                  value={form.policeStation}
                  readOnly
                  style={inputStyle}
                />

                <input
                  type="text"
                  placeholder="Panchayat"
                  value={form.panchayat}
                  readOnly
                  style={inputStyle}
                />

                <input
                  type="text"
                  placeholder="NAC / Town"
                  value={form.nac}
                  readOnly
                  style={inputStyle}
                />

                <input
                  type="text"
                  placeholder="Municipality"
                  value={form.municipality}
                  readOnly
                  style={inputStyle}
                />

                <input
                  type="text"
                  placeholder="District"
                  value={form.district}
                  readOnly
                  style={inputStyle}
                />

                <input
                  type="text"
                  placeholder="PIN Code"
                  value={form.pincode}
                  readOnly
                  style={inputStyle}
                />

                <input
                  type="text"
                  placeholder="Full Address"
                  value={form.address}
                  readOnly
                  style={{ ...inputStyle, gridColumn: "1 / -1" }}
                />
              </div>

              {form.latitude && form.longitude && (
                <div style={{
                  marginTop: 10,
                  fontSize: 11,
                  color: "#A8B5B0",
                }}>
                  GPS: {form.latitude}, {form.longitude}
                </div>
              )}
            </div>
            {/* STATE */}
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>
                State
              </span>

              <select style={inputStyle} value={form.state} onChange={(e) => updateField("state", e.target.value)}>
                <option value="" disabled>
                  Select state
                </option>
                <option>Odisha</option>
                <option>West Bengal</option>
                <option>Jharkhand</option>
                <option>Chhattisgarh</option>
                <option>Andhra Pradesh</option>
                <option>Telangana</option>
                <option>Other</option>
              </select>
            </label>

            {/* VEHICLE TYPE */}
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>
                Vehicle Type
              </span>

              <select
                style={inputStyle}
                value={selectedVehicleType}
                onChange={(e) => {
                  const value = e.target.value;
                  setSelectedVehicleType(value);
                  setSelectedBrand("");
                  setSelectedModel("");
                  updateField("category", value);
                }}
              >
                <option value="">Select vehicle type</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </label>

            {/* BRAND */}
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>
                Vehicle Brand
              </span>

              <select
                style={inputStyle}
                value={selectedBrand}
                disabled={!selectedVehicleType}
                onChange={(e) => {
                  setSelectedBrand(e.target.value);
                  setSelectedModel("");
                  updateField("brand", e.target.value);
                }}
              >
                <option value="">Select brand</option>
                {availableBrands.map((brand: VehicleBrand) => (
                    <option key={brand.name} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}
              </select>
            </label>

            {/* MODEL */}
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>
                Vehicle Model
              </span>

              <select
                style={inputStyle}
                value={selectedModel}
                disabled={!selectedBrand}
                onChange={(e) => {
                  setSelectedModel(e.target.value);
                  updateField("model", e.target.value);
                }}
              >
                <option value="">Select model</option>
                {availableModels.map((model: VehicleModel) => (
                <option key={model.id} value={model.name}>
                {model.name}
                 </option>
                  ))}
              </select>
            </label>

            {selectedModelData && selectedModelData.images && selectedModelData.images.length > 0 && (
  <div
    style={{
      marginTop: 16,
      padding: 16,
      border: "1px solid #30413A",
      borderRadius: 16,
      background: "#121C19",
    }}
  >
    <img
      src={selectedModelData.images[0].url}
      alt={selectedModelData.images[0].alt || selectedModelData.name}
      style={{
        width: "100%",
        maxHeight: 280,
        objectFit: "contain",
        borderRadius: 12,
      }}
    />

    <div
      style={{
        marginTop: 10,
        color: "#F2F5F3",
        fontWeight: 600,
        fontSize: 16,
      }}
    >
      {selectedModelData.name}
    </div>
  </div>
)}

            {/* CONDITION */}
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>
                Vehicle Condition
              </span>

              <select style={inputStyle} value={form.condition} onChange={(e) => updateField("condition", e.target.value)}>
                <option value="" disabled>
                  Select condition
                </option>
                <option>New</option>
                <option>Used</option>
              </select>
            </label>

            {/* PRICE */}
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>
                Approx. Vehicle Price
              </span>

              <input
                type="number"
                placeholder="Enter amount"
                value={form.price}
                onChange={(e) => updateField("price", e.target.value)}
                style={inputStyle}
              />
            </label>

            {/* LOAN */}
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>
                Required Loan Amount
              </span>

              <input
                type="number"
                placeholder="Enter amount"
                value={form.loan}
                onChange={(e) => updateField("loan", e.target.value)}
                style={inputStyle}
              />
            </label>

          </div>

          {/* MESSAGE */}
          <label
            style={{
              display: "grid",
              gap: 8,
              marginTop: 20,
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 800 }}>
              Additional Requirement
            </span>

            <textarea
              placeholder="Tell us about the vehicle, showroom or finance requirement..."
              rows={5}
              value={form.message}
              onChange={(e) => updateField("message", e.target.value)}
              style={{
                ...inputStyle,
                resize: "vertical",
              }}
            />
          </label>

          {/* SUBMIT */}
          <button onClick={handleSubmit}
            disabled={submitting}
            type="button"
            style={{
              marginTop: 26,
              width: "100%",
              border: 0,
              borderRadius: 14,
              padding: "17px 22px",
              background: "#18B878",
              color: "#07100D",
              fontSize: 15,
              fontWeight: 900,
              cursor: "pointer",
              letterSpacing: 0.5,
            }}
          >
            {submitting ? "SUBMITTING..." : "SUBMIT FINANCE REQUEST"}
          </button>

          {submitMessage && (
            <p
              style={{
                textAlign: "center",
                color: "#18B878",
                fontSize: 13,
                fontWeight: 700,
                marginTop: 16,
              }}
            >
              {submitMessage}
            </p>
          )}


          <p
            style={{
              textAlign: "center",
              color: "#71807B",
              fontSize: 12,
              marginTop: 16,
            }}
          >
            Our finance team will contact you regarding your application.
          </p>
        </div>
      </section>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: "1px solid #1E2925",
          padding: "28px 24px",
          textAlign: "center",
          color: "#71807B",
          fontSize: 12,
        }}
      >
        <div style={{ marginBottom: 8 }}>
          <strong style={{ color: "#F2F5F3" }}>
            RASHMI RANJAN{" "}
            <span style={{ color: "#18B878" }}>FIN</span>{" "}
            <span style={{ color: "#E7A23B" }}>SOLUTION</span>
          </strong>
        </div>

        <div>
          ☎ Support:{" "}
          <span style={{ color: "#18B878" }}>
            +91-99938307231
          </span>
        </div>

        <div style={{ marginTop: 8 }}>
          Vehicle Finance · Equipment Finance · Insurance
        </div>
      </footer>
    </main>
  );
}



