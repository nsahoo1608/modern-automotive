import { manufacturerSources } from "./manufacturers";
import { brandGroups, additionalBrandCategories } from "./global-brands";
import type { VehicleType } from "./types";
const curated = new Set(["mahindra","tata","ashok-leyland","eicher","force-motors","bharatbenz","sml-isuzu","jcb","tata-hitachi","volvo-ce","komatsu","sany","honda"]);
const commercial = new Set(["mahindra","tata","ashok-leyland","eicher","force-motors","bharatbenz","sml-isuzu","isuzu"]);
const motorcycle = new Set(["hero-motocorp","honda-two-wheelers","tvs","bajaj","royal-enfield","yamaha","suzuki-motorcycle"]);
const equipment = new Set(["jcb","tata-hitachi","volvo-ce","komatsu","sany"]);
const agriculture = new Set(["swaraj","sonalika","john-deere","new-holland","tafe","kubota"]);
export type BrandDirectoryEntry = { id:string; name:string; officialUrl:string; category:VehicleType; parentCompany:string; relationship:string; ownershipSource:string; coverage:"Model catalogue"|"Official website" };
export const brandDirectory: BrandDirectoryEntry[] = manufacturerSources.map(source => {
  const group = brandGroups.find(group => group.brandIds.includes(source.id));
  const category = additionalBrandCategories[source.id] ?? (commercial.has(source.id) ? "Commercial Vehicle" : motorcycle.has(source.id) ? "Two Wheeler" : equipment.has(source.id) ? "Construction Equipment" : agriculture.has(source.id) ? "Agricultural Equipment" : source.id === "piaggio" ? "Three Wheeler" : ["ola-electric","ather"].includes(source.id) ? "Electric Vehicle" : "Passenger Vehicle");
  return { id:source.id, name:source.name, officialUrl:source.vehicleUrl ?? source.officialUrl, category, parentCompany:group?.name ?? "Other manufacturers", relationship:group?.relationship ?? "Manufacturer reference; parent ownership not verified", ownershipSource:group?.sourceUrl ?? source.officialUrl, coverage:curated.has(source.id) ? "Model catalogue" : "Official website" };
});
