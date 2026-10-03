import { manufacturerSources } from "../manufacturers";
import { createOfficialDirectoryAdapter } from "./official-directory";
import type { ManufacturerAdapter } from "./utils";

import { fetchAshokLeylandCatalog } from "./ashok-leyland";
import { fetchBharatBenzCatalog } from "./bharatbenz";
import { fetchEicherCatalog } from "./eicher";
import { fetchForceMotorsCatalog } from "./force-motors";
import { fetchMahindraCommercial } from "./mahindra";
import { fetchSmlIsuzuCatalog } from "./sml-isuzu";
import { fetchTataCommercial } from "./tata";
import { fetchJCBCatalog } from "./jcb";
import { fetchTataHitachiCatalog } from "./tata-hitachi";
import { fetchVolvoCECatalog } from "./volvo-ce";
import { fetchKomatsuCatalog } from "./komatsu";
import { fetchSANYCatalog } from "./sany";

export const manufacturerAdapters: Record<
  string,
  ManufacturerAdapter & { mode?: "official-directory" }
> = {
  tata: {
    manufacturerId: "tata",
    fetchCatalog: fetchTataCommercial,
  },

  mahindra: {
    manufacturerId: "mahindra",
    fetchCatalog: fetchMahindraCommercial,
  },

  "ashok-leyland": {
    manufacturerId: "ashok-leyland",
    fetchCatalog: fetchAshokLeylandCatalog,
  },

  eicher: {
    manufacturerId: "eicher",
    fetchCatalog: fetchEicherCatalog,
  },

  "force-motors": {
    manufacturerId: "force-motors",
    fetchCatalog: fetchForceMotorsCatalog,
  },

  bharatbenz: {
    manufacturerId: "bharatbenz",
    fetchCatalog: fetchBharatBenzCatalog,
  },

  "sml-isuzu": {
    manufacturerId: "sml-isuzu",
    fetchCatalog: fetchSmlIsuzuCatalog,
  },
  jcb: {
    manufacturerId: "jcb",
    fetchCatalog: fetchJCBCatalog,
  },

  "tata-hitachi": {
    manufacturerId: "tata-hitachi",
    fetchCatalog: fetchTataHitachiCatalog,
  },

  "volvo-ce": {
    manufacturerId: "volvo-ce",
    fetchCatalog: fetchVolvoCECatalog,
  },

  komatsu: {
    manufacturerId: "komatsu",
    fetchCatalog: fetchKomatsuCatalog,
  },

  sany: {
    manufacturerId: "sany",
    fetchCatalog: fetchSANYCatalog,
  },
};

for (const source of manufacturerSources) { if (!manufacturerAdapters[source.id]) manufacturerAdapters[source.id] = createOfficialDirectoryAdapter(source); }
