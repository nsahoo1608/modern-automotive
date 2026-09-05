import { fetchLiveEquipmentCatalog } from "./live-equipment";

export async function fetchKomatsuCatalog() {
  return fetchLiveEquipmentCatalog({
    manufacturerId: "komatsu",
    manufacturerName: "Komatsu",
    officialUrl: "https://www.komatsuindia.in/",
    productUrl: "https://www.komatsuindia.in/products",
    category: "Mining Equipment",
    equipmentType: "Mining / Construction Equipment",
  });
}
