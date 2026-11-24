import type { StateAssociation } from "@/lib/types";

/**
 * States and union territories of India (28 states, 8 union territories), current as of 2026.
 *
 * `mapIds` are the region ids in the @svg-maps/india data. That data predates the 2019–2020
 * reorganisations, so:
 *   - Ladakh has no separate region; it is part of the "jk" region on the map.
 *   - Dadra and Nagar Haveli and Daman and Diu (merged in 2020) spans two regions, "dn" and "dd".
 */
export type Region = {
  /** Anchor id used by the list and map links. */
  code: string;
  name: string;
  kind: "state" | "ut";
  mapIds: string[];
  /** Shown when the region does not have its own outline on the map. */
  mapNote?: string;
};

export const states: Region[] = [
  { code: "ap", name: "Andhra Pradesh", kind: "state", mapIds: ["ap"] },
  { code: "ar", name: "Arunachal Pradesh", kind: "state", mapIds: ["ar"] },
  { code: "as", name: "Assam", kind: "state", mapIds: ["as"] },
  { code: "br", name: "Bihar", kind: "state", mapIds: ["br"] },
  { code: "ct", name: "Chhattisgarh", kind: "state", mapIds: ["ct"] },
  { code: "ga", name: "Goa", kind: "state", mapIds: ["ga"] },
  { code: "gj", name: "Gujarat", kind: "state", mapIds: ["gj"] },
  { code: "hr", name: "Haryana", kind: "state", mapIds: ["hr"] },
  { code: "hp", name: "Himachal Pradesh", kind: "state", mapIds: ["hp"] },
  { code: "jh", name: "Jharkhand", kind: "state", mapIds: ["jh"] },
  { code: "ka", name: "Karnataka", kind: "state", mapIds: ["ka"] },
  { code: "kl", name: "Kerala", kind: "state", mapIds: ["kl"] },
  { code: "mp", name: "Madhya Pradesh", kind: "state", mapIds: ["mp"] },
  { code: "mh", name: "Maharashtra", kind: "state", mapIds: ["mh"] },
  { code: "mn", name: "Manipur", kind: "state", mapIds: ["mn"] },
  { code: "ml", name: "Meghalaya", kind: "state", mapIds: ["ml"] },
  { code: "mz", name: "Mizoram", kind: "state", mapIds: ["mz"] },
  { code: "nl", name: "Nagaland", kind: "state", mapIds: ["nl"] },
  { code: "or", name: "Odisha", kind: "state", mapIds: ["or"] },
  { code: "pb", name: "Punjab", kind: "state", mapIds: ["pb"] },
  { code: "rj", name: "Rajasthan", kind: "state", mapIds: ["rj"] },
  { code: "sk", name: "Sikkim", kind: "state", mapIds: ["sk"] },
  { code: "tn", name: "Tamil Nadu", kind: "state", mapIds: ["tn"] },
  { code: "tg", name: "Telangana", kind: "state", mapIds: ["tg"] },
  { code: "tr", name: "Tripura", kind: "state", mapIds: ["tr"] },
  { code: "up", name: "Uttar Pradesh", kind: "state", mapIds: ["up"] },
  { code: "ut", name: "Uttarakhand", kind: "state", mapIds: ["ut"] },
  { code: "wb", name: "West Bengal", kind: "state", mapIds: ["wb"] },
];

export const unionTerritories: Region[] = [
  { code: "an", name: "Andaman and Nicobar Islands", kind: "ut", mapIds: ["an"] },
  { code: "ch", name: "Chandigarh", kind: "ut", mapIds: ["ch"] },
  {
    code: "dnhdd",
    name: "Dadra and Nagar Haveli and Daman and Diu",
    kind: "ut",
    mapIds: ["dn", "dd"],
  },
  { code: "dl", name: "Delhi", kind: "ut", mapIds: ["dl"] },
  { code: "jk", name: "Jammu and Kashmir", kind: "ut", mapIds: ["jk"] },
  {
    code: "la",
    name: "Ladakh",
    kind: "ut",
    mapIds: [],
    mapNote: "Shown within the Jammu and Kashmir outline on this map.",
  },
  { code: "ld", name: "Lakshadweep", kind: "ut", mapIds: ["ld"] },
  { code: "py", name: "Puducherry", kind: "ut", mapIds: ["py"] },
];

export const allRegions: Region[] = [...states, ...unionTerritories];

/** Map region id → the region(s) it represents (the "jk" outline covers J&K and Ladakh). */
export function regionsForMapId(mapId: string): Region[] {
  const direct = allRegions.filter((r) => r.mapIds.includes(mapId));
  if (mapId === "jk") return [...direct, ...allRegions.filter((r) => r.code === "la")];
  return direct;
}

/** Verified state associations. A table appears on /about/associate-states once any is published. */
export const stateAssociations: StateAssociation[] = [];
