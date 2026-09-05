import { fetchLiveEquipmentCatalog } from "./live-equipment";

export async function fetchSANYCatalog() {
  return fetchLiveEquipmentCatalog({
    manufacturerId: "sany",
    manufacturerName: "SANY",
    officialUrl: "https://www.sany.in/",
    productUrl: "https://www.sany.in/",
    category: "Construction Equipment",
    equipmentType: "Construction / Mining / Road Equipment",
  });
}
