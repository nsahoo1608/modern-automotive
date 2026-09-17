import type { ManufacturerSource } from "../types";
import { manufacturerSources } from "../manufacturers";

export type OfficialSyncSource = ManufacturerSource & {
  /**
   * Whether the source is currently enabled for automatic synchronization.
   */
  syncEnabled: boolean;

  /**
   * Optional URL specifically intended for model/product discovery.
   * Falls back to vehicleUrl when omitted.
   */
  catalogUrl?: string;

  /**
   * Optional URL specifically intended for price discovery.
   */
  officialPriceUrl?: string;

  /**
   * Explicitly approved official domains for this manufacturer.
   *
   * This is required because some manufacturers operate multiple
   * official domains for different product divisions.
   */
  approvedDomains?: string[];
};

const additionalOfficialDomains: Record<
  string,
  string[]
> = {
  mahindra: [
    "mahindra.com",
    "auto.mahindra.com",
    "mahindratruckandbus.com",
  ],

  tata: [
    "tatamotors.com",
    "cv.tatamotors.com",
  ],

  "ashok-leyland": [
    "ashokleyland.com",
  ],

  eicher: [
    "eichertrucksandbuses.com",
  ],

  "force-motors": [
    "forcemotors.com",
  ],

  bharatbenz: [
    "bharatbenz.com",
    "daimlertruck.com",
  ],

  "sml-isuzu": [
    "smlisuzu.com",
  ],

  jcb: [
    "jcb.com",
  ],

  "tata-hitachi": [
    "tatahitachi.co.in",
  ],

  "volvo-ce": [
    "volvoce.com",
  ],

  komatsu: [
    "komatsu.com",
  ],

  sany: [
    "sany.in",
  ],
};

export const officialSyncSources: OfficialSyncSource[] =
  manufacturerSources.map((source) => ({
    ...source,
    syncEnabled: Boolean(source.vehicleUrl),
    catalogUrl: source.vehicleUrl,
    officialPriceUrl: source.priceUrl,
    approvedDomains:
      additionalOfficialDomains[source.id] ??
      [new URL(source.officialUrl).hostname],
  }));

export function getOfficialSyncSource(
  manufacturerId: string
): OfficialSyncSource | undefined {
  return officialSyncSources.find(
    (source) => source.id === manufacturerId
  );
}

function normalizeHostname(hostname: string): string {
  return hostname
    .toLowerCase()
    .replace(/^www\./, "");
}

function domainMatches(
  hostname: string,
  approvedDomain: string
): boolean {
  const normalizedHost =
    normalizeHostname(hostname);

  const normalizedDomain =
    normalizeHostname(approvedDomain);

  return (
    normalizedHost === normalizedDomain ||
    normalizedHost.endsWith(
      `.${normalizedDomain}`
    )
  );
}

export function isOfficialUrl(
  url: string,
  source: OfficialSyncSource
): boolean {
  try {
    const target = new URL(url);

    if (target.protocol !== "https:") {
      return false;
    }

    const approvedDomains =
      source.approvedDomains?.length
        ? source.approvedDomains
        : [new URL(source.officialUrl).hostname];

    return approvedDomains.some((domain) =>
      domainMatches(target.hostname, domain)
    );
  } catch {
    return false;
  }
}
