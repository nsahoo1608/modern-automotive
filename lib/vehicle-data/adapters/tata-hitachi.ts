import { fetchLiveEquipmentCatalog } from "./live-equipment";

export async function fetchTataHitachiCatalog() {
  return fetchLiveEquipmentCatalog({
    manufacturerId: "tata-hitachi",
    manufacturerName: "Tata Hitachi",
    officialUrl: "https://www.tatahitachi.co.in/",
    productUrl: "https://www.tatahitachi.co.in/all-products/",
    category: "Mining Equipment",
    equipmentType: "Mining / Earthmoving Equipment",
  });
}
