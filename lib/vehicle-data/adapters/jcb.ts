import { fetchLiveEquipmentCatalog } from "./live-equipment";

export async function fetchJCBCatalog() {
  return fetchLiveEquipmentCatalog({
    manufacturerId: "jcb",
    manufacturerName: "JCB",
    officialUrl: "https://www.jcb.com/en-IN/",
    productUrl: "https://www.jcb.com/en-IN/",
    category: "Construction Equipment",
    equipmentType: "Earthmoving / Construction Equipment",
  });
}
