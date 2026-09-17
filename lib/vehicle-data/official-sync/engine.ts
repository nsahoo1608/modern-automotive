import type { VehicleModel } from "../types";

import {
  extractPageData,
  type ExtractedPageData,
} from "./extract";

import {
  normalizeOfficialPage,
  type NormalizedOfficialCatalog,
} from "./normalize";

import {
  getOfficialSyncSource,
  isOfficialUrl,
} from "./sources";

export type OfficialSyncResult = {
  success: boolean;
  manufacturerId: string;
  requestedUrl: string;
  status?: number;
  fetchedAt: string;
  page?: ExtractedPageData;
  catalog?: NormalizedOfficialCatalog;
  vehicle?: NormalizedOfficialCatalog["vehicles"][number];
  error?: string;
};

export type OfficialSyncOptions = {
  manufacturerId: string;
  url: string;
  category?: VehicleModel["category"];
  timeoutMs?: number;
  userAgent?: string;
};

const DEFAULT_TIMEOUT_MS = 15_000;

const DEFAULT_USER_AGENT =
  "ModernAutomotive-OfficialVehicleSync/1.0";

export async function syncOfficialVehicle(
  options: OfficialSyncOptions
): Promise<OfficialSyncResult> {
  const fetchedAt =
    new Date().toISOString();

  const source =
    getOfficialSyncSource(
      options.manufacturerId
    );

  if (!source) {
    return {
      success: false,
      manufacturerId:
        options.manufacturerId,
      requestedUrl: options.url,
      fetchedAt,
      error:
        `No official sync source configured for manufacturer "${options.manufacturerId}".`,
    };
  }

  if (!source.syncEnabled) {
    return {
      success: false,
      manufacturerId:
        options.manufacturerId,
      requestedUrl: options.url,
      fetchedAt,
      error:
        `Official synchronization is disabled for "${options.manufacturerId}".`,
    };
  }

  if (
    !isOfficialUrl(
      options.url,
      source
    )
  ) {
    return {
      success: false,
      manufacturerId:
        options.manufacturerId,
      requestedUrl: options.url,
      fetchedAt,
      error:
        "The requested URL is not on the configured official manufacturer domain.",
    };
  }

  const timeoutMs =
    options.timeoutMs ??
    DEFAULT_TIMEOUT_MS;

  const controller =
    new AbortController();

  const timeout = setTimeout(
    () =>
      controller.abort(),
    timeoutMs
  );

  try {
    const response =
      await fetch(
        options.url,
        {
          method: "GET",
          redirect: "follow",
          signal:
            controller.signal,
          headers: {
            Accept:
              "text/html,application/xhtml+xml,application/json;q=0.9,*/*;q=0.8",
            "User-Agent":
              options.userAgent ??
              DEFAULT_USER_AGENT,
          },
          cache: "no-store",
        }
      );

    if (!response.ok) {
      return {
        success: false,
        manufacturerId:
          options.manufacturerId,
        requestedUrl:
          options.url,
        status:
          response.status,
        fetchedAt,
        error:
          `Official page returned HTTP ${response.status}.`,
      };
    }

    const finalUrl =
      response.url ||
      options.url;

    if (
      !isOfficialUrl(
        finalUrl,
        source
      )
    ) {
      return {
        success: false,
        manufacturerId:
          options.manufacturerId,
        requestedUrl:
          options.url,
        status:
          response.status,
        fetchedAt,
        error:
          "The official page redirected outside the configured manufacturer domain.",
      };
    }

    const html =
      await response.text();

    const page =
      extractPageData(
        html,
        finalUrl,
        source
      );

    const catalog =
      normalizeOfficialPage(
        page,
        source,
        options.manufacturerId,
        options.category,
        fetchedAt
      );

    return {
      success: true,
      manufacturerId:
        options.manufacturerId,
      requestedUrl:
        options.url,
      status:
        response.status,
      fetchedAt,
      page,
      catalog,
      vehicle:
        catalog.vehicles[0],
    };
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : String(error);

    return {
      success: false,
      manufacturerId:
        options.manufacturerId,
      requestedUrl:
        options.url,
      fetchedAt,
      error:
        message ||
        "Unknown official synchronization error.",
    };
  } finally {
    clearTimeout(
      timeout
    );
  }
}
