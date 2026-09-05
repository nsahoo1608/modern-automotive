import { fetchLiveEquipmentCatalog } from "./live-equipment";

export async function fetchVolvoCECatalog() {
  return fetchLiveEquipmentCatalog({
    manufacturerId: "volvo-ce",
    manufacturerName: "Volvo Construction Equipment",
    officialUrl: "https://www.volvoce.com/india/en-in/",
    productUrl: "https://www.volvoce.com/india/en-in/products/",
    category: "Construction Equipment",
    equipmentType: "Construction / Mining Equipment",
  });
}
