"use client";

import type { VehicleBrand, VehicleManufacturer, VehicleModel } from "@/lib/vehicle-data/types";

import { useEffect, useState } from "react";
import Image from "next/image";
import VehicleSelectionDetails from "./VehicleSelectionDetails";
import { brandDirectory } from "@/lib/vehicle-data/brand-directory";
import { vehicleCategoryNames } from "@/lib/vehicle-data/categories";


const inputStyle = {
  width: "100%",
  boxSizing: "border-box" as const,
  border: "1px solid #30413A",
  borderRadius: 9,
  padding: "10px 12px",
  background: "#0B1110",
  color: "#F2F5F3",
  outline: "none",
  fontSize: 14,
};

export default function ApplyForm({ initialCategory, initialBrand, initialModel }: { initialCategory: string; initialBrand: string; initialModel: string }) {
  const [vehicles, setVehicles] = useState<VehicleManufacturer[]>([]);
  const [selectedVehicleType, setSelectedVehicleType] = useState(initialCategory);
  const [selectedBrand, setSelectedBrand] = useState(initialBrand);
  const [selectedModel, setSelectedModel] = useState(initialModel);
  const [selectedVariant, setSelectedVariant] = useState("");

  const [catalogueError, setCatalogueError] = useState("");
  const [catalogueLoading, setCatalogueLoading] = useState(true);
  const [reload, setReload] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    fetch("/api/vehicles", { signal: controller.signal })
      .then(async (res) => { if (!res.ok) throw new Error("Vehicle catalogue is unavailable."); return res.json(); })
      .then((data) => { setVehicles(data.manufacturers ?? []); if (Object.keys(data.errors ?? {}).length) setCatalogueError("Some live catalogues could not load. Official brand links and exact model entry remain available."); })
      .catch((error) => { if (error.name !== "AbortError") setCatalogueError("We could not load the live catalogue. Use the official brand links and enter your exact model, or retry."); })
      .finally(() => { if (!controller.signal.aborted) setCatalogueLoading(false); });
    return () => controller.abort();
  }, [reload]);
  const categories = vehicleCategoryNames;

  const availableBrands = vehicles
    .flatMap((manufacturer: VehicleManufacturer) => manufacturer.brands ?? [])
    .filter((brand: VehicleBrand) =>
      (brand.models ?? []).some(
        (model: VehicleModel) => model.category === selectedVehicleType
      )
    );

  const directoryBrands = brandDirectory.filter(brand => brand.category === selectedVehicleType && !availableBrands.some(item => item.name === brand.name));
  const otherDirectoryBrands = brandDirectory.filter(brand => brand.category !== selectedVehicleType && !availableBrands.some(item => item.name === brand.name));
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

  const modelPrices = (selectedModelData?.variants ?? []).map(variant => variant.price?.amount).filter((amount): amount is number => amount != null && Number.isFinite(amount) && amount > 0);
  const officialModelPrice = modelPrices.length ? Math.min(...modelPrices).toString() : "";

  const availableVariants = selectedModelData?.variants ?? [];

  const selectedVariantData = availableVariants.find(
    (variant) => variant.id === selectedVariant
  );

  const selectedVariantPrice =
    selectedVariantData ? selectedVariantData.price?.amount?.toString() ?? "" : officialModelPrice;



  const [form, setForm] = useState({ name: "", mobile: "", email: "", city: "", state: "", category: initialCategory, brand: initialBrand, model: initialModel, condition: "", price: "", loan: "", message: "", latitude: "", longitude: "", address: "", village: "", ward: "", policeStation: "", panchayat: "", nac: "", municipality: "", district: "", pincode: "" });

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
    if (submitting) return;
    if (!form.name.trim() || !/^[6-9]\d{9}$/.test(form.mobile)) {
      setSubmitMessage("Please enter your full name and a valid Indian mobile number.");
      return;
    }

    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) { setSubmitMessage("Please enter a valid email address."); return; }
    if (form.loan && (!Number.isFinite(Number(form.loan)) || Number(form.loan) <= 0)) { setSubmitMessage("Please enter a loan amount greater than zero."); return; }
    setSubmitting(true);
    setSubmitMessage("");

    try {
      const response = await fetch("/api/finance-application", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, price: selectedVariantPrice, variant: selectedVariantData?.name ?? selectedVariant }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to submit application.");
      }

      setSubmitMessage("Application submitted successfully. Our finance team will contact you shortly.");
      setSelectedVehicleType("");
      setSelectedBrand("");
      setSelectedModel("");
      setSelectedVariant("");
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
    <main className="application-page"
      style={{
        minHeight: "100vh",
        background: "#0B1110",
        color: "#F2F5F3",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div className="application-visual container"><Image src="/images/finance.webp" width={1200} height={420} alt="Illustrative vehicle finance planning conversation" priority /></div>
      {/* HERO */}
      <section
        style={{
          maxWidth: "none",
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
          Your next move.
          <br />
          <span style={{ color: "#18B878" }}>Starts here.</span>
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
          maxWidth: "none",
          margin: "0 auto",
          padding: "20px 24px 80px",
        }}
      >
        <form onSubmit={(event) => { event.preventDefault(); void handleSubmit(); }}
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
            Tell us what you need.
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

          <div className="client-input-grid"
            style={{
              display: "grid",
              gridTemplateColumns:
                "repeat(auto-fit,minmax(260px,1fr))",
              gap: 20,
            }}
          >
            <div className="client-section-heading"><span>01</span><div><h3>Your contact details</h3><p>Use the name and mobile number our team can reach you on.</p></div></div>
            {/* NAME */}
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>
                Full name *
              </span>

              <input
                type="text" required autoComplete="name" maxLength={150}
                placeholder="Enter your full name"
                value={form.name}
                onChange={(e) => updateField("name", e.target.value)}
                style={inputStyle}
              />
            </label>

            {/* MOBILE */}
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>
                Mobile number *
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
                  required autoComplete="tel-national" pattern="[6-9][0-9]{9}" placeholder="10-digit mobile number"
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
                Email address (optional)
              </span>

              <input
                type="email" autoComplete="email"
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

            {/* GEO LOCATION */}
            <div className="client-location-panel" style={{
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
                Enter your address manually, or use location detection to fill available details. You can correct every field.
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
                gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 200px), 1fr))",
                gap: 10,
                marginTop: 14,
              }}>
                <input
                  type="text"
                  aria-label="Village / Locality" placeholder="Village / Locality"
                  value={form.village}
                  onChange={(e) => updateField("village", e.target.value)}
                  name="village"
                  style={inputStyle}
                />

                <input
                  type="text"
                  aria-label="Ward" placeholder="Ward"
                  value={form.ward}
                  onChange={(e) => updateField("ward", e.target.value)}
                  name="ward"
                  style={inputStyle}
                />

                <input
                  type="text"
                  aria-label="Police Station" placeholder="Police Station"
                  value={form.policeStation}
                  onChange={(e) => updateField("policeStation", e.target.value)}
                  name="policeStation"
                  style={inputStyle}
                />

                <input
                  type="text"
                  aria-label="Panchayat" placeholder="Panchayat"
                  value={form.panchayat}
                  onChange={(e) => updateField("panchayat", e.target.value)}
                  name="panchayat"
                  style={inputStyle}
                />

                <input
                  type="text"
                  aria-label="NAC / Town" placeholder="NAC / Town"
                  value={form.nac}
                  onChange={(e) => updateField("nac", e.target.value)}
                  name="nac"
                  style={inputStyle}
                />

                <input
                  type="text"
                  aria-label="Municipality" placeholder="Municipality"
                  value={form.municipality}
                  onChange={(e) => updateField("municipality", e.target.value)}
                  name="municipality"
                  style={inputStyle}
                />

                <input
                  type="text"
                  aria-label="District" placeholder="District"
                  value={form.district}
                  onChange={(e) => updateField("district", e.target.value)}
                  name="district"
                  style={inputStyle}
                />

                <input
                  type="text"
                  aria-label="PIN Code" placeholder="PIN Code"
                  value={form.pincode}
                  onChange={(e) => updateField("pincode", e.target.value)}
                  name="pincode"
                  style={inputStyle}
                />

                <input
                  type="text"
                  aria-label="Full Address" placeholder="Full Address"
                  value={form.address}
                  onChange={(e) => updateField("address", e.target.value)}
                  name="address"
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
            <div className="client-section-heading"><span>02</span><div><h3>Your vehicle</h3><p>Choose the category, brand and exact model you need.</p></div></div>
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
                  setSelectedVariant("");
                  setForm(prev => ({ ...prev, category: value, brand: "", model: "", price: "" }));
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
                  setSelectedVariant("");
                  setForm(prev => ({ ...prev, brand: e.target.value, model: "", price: "" }));
                }}
              >
                <option value="">Select brand</option>
                <optgroup label="Brands for this category">{directoryBrands.map(brand => <option key={brand.id} value={brand.name}>{brand.name}</option>)}
                {availableBrands.map((brand: VehicleBrand) => (
                    <option key={brand.name} value={brand.name}>
                      {brand.name}
                    </option>
                  ))}</optgroup><optgroup label="All other registered brands">{otherDirectoryBrands.map(brand => <option key={brand.id} value={brand.name}>{brand.name}</option>)}</optgroup>
              </select>
            </label>

            {selectedBrand && availableModels.length === 0 && !catalogueLoading && <p className="directory-note client-price-note">Open this manufacturer’s official catalogue below, then enter your exact model and variant here.</p>}
            {/* MODEL */}
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>
                Vehicle Model
              </span>

              {!catalogueLoading && selectedBrand && availableModels.length === 0 ? <input name="model" type="text" maxLength={150} placeholder="Exact model from the official catalogue" style={inputStyle} value={selectedModel} onChange={(e) => { setSelectedModel(e.target.value); setSelectedVariant(""); updateField("model", e.target.value); }} /> : <select
                style={inputStyle}
                value={selectedModel}
                disabled={!selectedBrand}
                onChange={(e) => {
                  setSelectedModel(e.target.value);
                  setSelectedVariant("");
                  setForm(prev => ({ ...prev, model: e.target.value, price: "" }));
                }}
              >
                <option value="">Select model</option>
                {availableModels.map((model: VehicleModel) => (
                <option key={model.id} value={model.name}>
                {model.name}
                 </option>
                  ))}
              </select>}
            </label>

            {!catalogueLoading && selectedBrand && availableModels.length === 0 && <label style={{ display: "grid", gap: 8 }}><span style={{ fontSize: 13, fontWeight: 800 }}>Vehicle variant / trim</span><input name="variant" type="text" maxLength={150} placeholder="Variant, trim or equipment configuration" style={inputStyle} value={selectedVariant} onChange={(e) => setSelectedVariant(e.target.value)} /></label>}
            <VehicleSelectionDetails key={`${selectedBrand}-${selectedModel}-${selectedVariant}`} name={selectedBrand} brand={selectedBrandData} model={selectedModelData} variant={selectedVariantData} />
            {/* VARIANT */}
            {selectedModelData && availableVariants.length > 0 && (
              <label style={{ display: "grid", gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 800 }}>
                  Vehicle Variant
                </span>

                <select
                  style={inputStyle}
                  value={selectedVariant}
                  onChange={(e) => {
                    const value = e.target.value;
                    setSelectedVariant(value);

                    const variant = availableVariants.find(
                      (item) => item.id === value
                    );

                    updateField(
                      "price",
                      variant?.price?.amount?.toString() ??
                        officialModelPrice
                    );
                  }}
                  disabled={!selectedModel}
                >
                  <option value="">Select variant</option>

                  {availableVariants.map((variant) => (
                    <option key={variant.id} value={variant.id}>
                      {variant.name}
                    </option>
                  ))}
                </select>
              </label>
            )}

            <div className="client-section-heading"><span>03</span><div><h3>Your finance requirement</h3><p>Tell us the vehicle condition and the amount you want to finance.</p></div></div>
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
                {selectedVariant ? "Published Variant Price" : "Published Starting Price"}
              </span>

              <div
                style={{
                  ...inputStyle,
                  display: "flex",
                  alignItems: "center",
                  minHeight: 50,
                  boxSizing: "border-box",
                  fontWeight: 800,
                  fontSize: 16,
                  color: "#F2F5F3",
                }}
              >
                {selectedVariantPrice
                  ? `₹${Number(selectedVariantPrice).toLocaleString("en-IN")}`
                  : "Official price unavailable"}
              </div>
            </label>
              <div className="client-price-note" style={{ fontSize: 12, lineHeight: 1.5, color: "#AEBAB5", marginTop: 6 }}>
                Price may change. Actual price will be as applicable in your state, including government taxes, fees, and prevailing policies.
              </div>

            {/* LOAN */}
            <label style={{ display: "grid", gap: 8 }}>
              <span style={{ fontSize: 13, fontWeight: 800 }}>
                Required loan amount (₹)
              </span>

              <input
                type="number" min="1"
                placeholder="e.g. 500000"
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

          {catalogueLoading && <p role="status">Loading vehicle catalogue… You can fill in your details while we load.</p>}
          {catalogueError && <p role="alert">{catalogueError} <button type="button" onClick={() => { setCatalogueLoading(true); setCatalogueError(""); setReload(value => value + 1); }}>Retry catalogue</button></p>}
          {/* SUBMIT */}
          <button
            disabled={submitting}
            type="submit"
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
                color: submitMessage.includes("successfully") ? "#67d9ac" : "#f2b38c",
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
        </form>
      </section>


    </main>
  );
}
