import { NextResponse } from "next/server";

import { manufacturerAdapters } from "@/lib/vehicle-data/adapters";
import { manufacturerSources } from "@/lib/vehicle-data/manufacturers";
import { syncOfficialVehicle } from "@/lib/vehicle-data/official-sync/engine";

export const dynamic = "force-dynamic";

const HONDA_DETAILED_URLS: Record<string, string> = {
  "New City": "https://www.hondacarindia.com/check-price/honda-city",
  "New Amaze": "https://www.hondacarindia.com/check-price/honda-amaze",
  "Amaze - 2nd Gen":
    "https://www.hondacarindia.com/check-price/honda-amaze-2g",
  "All New ZR-V":
    "https://www.hondacarindia.com/check-price/honda-zrv",
  Elevate:
    "https://www.hondacarindia.com/check-price/honda-elevate",
};

export async function GET() {
  const results = [];
  const errors: Record<string, string> = {};

  for (const manufacturer of manufacturerSources) {
    const adapter = manufacturerAdapters[manufacturer.id];

    if (!adapter) {
      if (manufacturer.id === "honda" && manufacturer.priceUrl) {
        try {
          const landing = await syncOfficialVehicle({
            manufacturerId: "honda",
            url: manufacturer.priceUrl,
            category: "Passenger Vehicle",
            timeoutMs: 30000,
          });

          if (landing.success && landing.catalog?.vehicles.length) {
            const models = [];

            for (const landingVehicle of landing.catalog.vehicles) {
              const landingModel = landingVehicle.model;

              const detailedUrl =
                HONDA_DETAILED_URLS[landingModel.name] ??
                landingModel.officialUrl;

              let finalModel = {
                ...landingModel,
                variants: [...(landingModel.variants ?? [])],
              };

              if (detailedUrl) {
                try {
                  const detailed = await syncOfficialVehicle({
                    manufacturerId: "honda",
                    url: detailedUrl,
                    category: "Passenger Vehicle",
                    timeoutMs: 30000,
                  });

                  if (
                    detailed.success &&
                    detailed.catalog?.vehicles.length
                  ) {
                    const detailedModel =
                      detailed.catalog.vehicles[0].model;

                    if (detailedModel.variants?.length) {
                      finalModel = {
                        ...landingModel,
                        ...detailedModel,
                        id: landingModel.id,
                        name: landingModel.name,
                        officialUrl:
                          detailedModel.officialUrl ??
                          landingModel.officialUrl,
                        variants: [
                          ...detailedModel.variants,
                        ],
                        images:
                          detailedModel.images?.length
                            ? [
                                ...detailedModel.images,
                              ]
                            : [
                                ...(landingModel.images ??
                                  []),
                              ],
                      };
                    }
                  } else {
                    errors[`honda:${landingModel.id}`] =
                      detailed.error ??
                      "Honda detailed synchronization failed.";
                  }
                } catch (error) {
                  errors[`honda:${landingModel.id}`] =
                    error instanceof Error
                      ? error.message
                      : String(error);
                }
              }

              models.push(finalModel);
            }

            results.push({
              id: manufacturer.id,
              name: manufacturer.name,
              officialUrl: manufacturer.officialUrl,
              vehicleUrl: manufacturer.vehicleUrl,
              priceUrl: manufacturer.priceUrl,
              dealerLocatorUrl:
                manufacturer.dealerLocatorUrl,
              brands: [
                {
                  id: "honda",
                  name: "Honda",
                  officialUrl: manufacturer.officialUrl,
                  models,
                },
              ],
              dataStatus: "official-sync",
            });

            continue;
          }
        } catch (error) {
          errors[manufacturer.id] =
            error instanceof Error
              ? error.message
              : String(error);
        }
      }

      results.push({
        id: manufacturer.id,
        name: manufacturer.name,
        officialUrl: manufacturer.officialUrl,
        vehicleUrl: manufacturer.vehicleUrl,
        priceUrl: manufacturer.priceUrl,
        dealerLocatorUrl: manufacturer.dealerLocatorUrl,
        brands: [],
        dataStatus: "adapter-pending",
      });

      continue;
    }

    try {
      const catalog = await adapter.fetchCatalog();

      results.push({
        ...catalog,
        dataStatus: "live",
      });
    } catch (error) {
      errors[manufacturer.id] =
        error instanceof Error
          ? error.message
          : "Unknown adapter error";

      results.push({
        id: manufacturer.id,
        name: manufacturer.name,
        officialUrl: manufacturer.officialUrl,
        vehicleUrl: manufacturer.vehicleUrl,
        priceUrl: manufacturer.priceUrl,
        dealerLocatorUrl: manufacturer.dealerLocatorUrl,
        brands: [],
        dataStatus: "error",
      });
    }
  }

  return NextResponse.json({
    success: Object.keys(errors).length === 0,
    sourcePolicy: {
      pricing:
        "official-manufacturer-or-authorized-dealer",
      images: "official-manufacturer",
      logos: "official-brand",
      showroom: "authorized-dealer",
    },
    fetchedAt: new Date().toISOString(),
    manufacturers: results,
    errors,
  });
}
