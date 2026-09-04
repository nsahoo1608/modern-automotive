import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { latitude, longitude } = await request.json();

    if (!latitude || !longitude) {
      return NextResponse.json(
        { error: "Latitude and longitude are required." },
        { status: 400 }
      );
    }

    const url =
      "https://nominatim.openstreetmap.org/reverse" +
      `?format=jsonv2&lat=${encodeURIComponent(latitude)}` +
      `&lon=${encodeURIComponent(longitude)}` +
      "&addressdetails=1";

    const response = await fetch(url, {
      headers: {
        "User-Agent": "RashmiRanjanFinSolution/1.0",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: "Unable to fetch address." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const a = data.address || {};

    return NextResponse.json({
      address: data.display_name || "",

      village:
        a.village ||
        a.hamlet ||
        a.locality ||
        a.suburb ||
        a.neighbourhood ||
        "",

      ward:
        a.ward ||
        a.quarter ||
        "",

      policeStation:
        a.police_station ||
        a.police ||
        "",

      panchayat:
        a.panchayat ||
        a.local_administrative_area ||
        "",

      municipality:
        a.municipality ||
        a.city_district ||
        "",

      nac:
        a.town ||
        a.municipality ||
        "",

      city:
        a.city ||
        a.town ||
        a.municipality ||
        a.village ||
        "",

      district:
        a.state_district ||
        a.district ||
        a.county ||
        "",

      state: a.state || "",

      pincode:
        a.postcode ||
        "",

      country:
        a.country ||
        "",

      latitude: String(latitude),
      longitude: String(longitude),
    });
  } catch {
    return NextResponse.json(
      { error: "Geocoding request failed." },
      { status: 500 }
    );
  }
}
