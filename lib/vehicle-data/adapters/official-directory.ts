import type { ManufacturerSource, VehicleManufacturer } from "../types";
import type { ManufacturerAdapter } from "./utils";
export function createOfficialDirectoryAdapter(source: ManufacturerSource): ManufacturerAdapter & { mode: "official-directory" } {
  return {
    manufacturerId: source.id,
    mode: "official-directory",
    async fetchCatalog(): Promise<VehicleManufacturer> {
      return { id:source.id, name:source.name, officialUrl:source.officialUrl, sources:[source], brands:[{ id:source.id, name:source.name, officialUrl:source.vehicleUrl ?? source.officialUrl, models:[] }] };
    },
  };
}
