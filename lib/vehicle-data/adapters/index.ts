import type { ManufacturerAdapter } from "./utils";
import { fetchMahindraCommercial } from "./mahindra";
import { fetchTataCommercial } from "./tata";

export const manufacturerAdapters: Record<
  string,
  ManufacturerAdapter
> = {
  tata: { manufacturerId: "tata", fetchCatalog: fetchTataCommercial },
  mahindra: {
    manufacturerId: "mahindra",
    fetchCatalog: fetchMahindraCommercial,
  },
};

