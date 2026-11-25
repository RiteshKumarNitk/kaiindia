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

/**
 * State association details — transcribed from the official banners supplied by the client
 * (25 Nov 2026), subject to the client's final approval. Banners live in /public/associate-states.
 *
 * To publish another state: add its banner file (JPG/JPEG/PNG/WebP) to /public/associate-states,
 * then add an entry below with `status: "published"` and only the details the association has
 * supplied. The page picks it up automatically — no UI changes needed.
 */
const supplied: Omit<StateAssociation, "status">[] = [
  {
    code: "hr",
    associationName: "Haryana Sports Karate Association",
    abbreviation: "HSKA",
    banner: { src: "/associate-states/haryana.jpeg", width: 1813, height: 463 },
    officials: [
      { role: "President", name: "Pawan Kharkhoda", note: "MLA, Kharkhoda, Haryana" },
      { role: "General Secretary", name: "Anoop Singh" },
    ],
    phones: ["8950338965"],
    email: "sportskarateassociationharyana@gmail.com",
  },
  {
    code: "ar",
    associationName: "Arunachal Karate-Do-Association",
    banner: { src: "/associate-states/arunachal-pradesh.jpeg", width: 1600, height: 408 },
    officials: [
      { role: "President", name: "Shri Likha Soni" },
      { role: "General Secretary", name: "Ajay Kumar" },
    ],
    phones: ["9436040371", "9436050311"],
    email: "arunachalkarateassociation@gmail.com",
    website: "https://www.arunachalkaratedoassociation.com",
  },
  {
    code: "br",
    associationName: "Traditional Karate Association of Bihar",
    abbreviation: "TKAB",
    banner: { src: "/associate-states/bihar.jpeg", width: 1600, height: 409 },
    officials: [
      { role: "President", name: "Amit Kumar" },
      { role: "Secretary", name: "Kaushal Kr. Singh" },
    ],
    phones: ["9308020043"],
    email: "shihanamitkumar@gmail.com",
  },
  {
    code: "ct",
    associationName: "Karate Association of Chhattisgarh",
    abbreviation: "KAC",
    banner: { src: "/associate-states/chhattisgarh.jpeg", width: 1600, height: 408 },
    officials: [
      { role: "President", name: "Sushil Kumar Chandra" },
      { role: "Secretary", name: "Avinash Prasad" },
    ],
    phones: ["9981433744", "9827494610"],
    email: "karateassociation.cg@gmail.com",
  },
  {
    code: "jk",
    associationName: "Jammu & Kashmir Sports Karate Federation",
    abbreviation: "JKSKF",
    banner: { src: "/associate-states/jammu-kashmir.jpeg", width: 1600, height: 409 },
    officials: [
      { role: "President", name: "Rambir Singh" },
      { role: "Secretary", name: "Abhimanyu Singh Charak" },
    ],
    // Printed on the banner with 11 digits — to be confirmed by the client before relying on it.
    phones: ["97973933989"],
    email: "acharak19@gmail.com",
  },
  {
    code: "mp",
    associationName: "Amateur Karate Association Madhya Pradesh",
    abbreviation: "AKA",
    banner: { src: "/associate-states/madhya-pradesh.jpeg", width: 1600, height: 409 },
    officials: [
      { role: "President", name: "Shihan Jaidev Sharma" },
      { role: "General Secretary", name: "Sensei Paritosh Sharma" },
    ],
    phones: ["9827392060", "9826037366"],
    email: "akamp2019@gmail.com",
  },
  {
    code: "mh",
    associationName: "Karate Organisation of Maharashtra",
    banner: { src: "/associate-states/maharashtra.jpeg", width: 1600, height: 408 },
    officials: [
      { role: "President", name: "Dr. Nilkanth Kunjilal Kawde" },
      { role: "Secretary", name: "Amitkumar Thakur" },
    ],
    phones: ["98907 09237", "92847 85726"],
    email: "karateorganization.maha@gmail.com",
  },
  {
    code: "pb",
    associationName: "Amateur Karate-do Foundation Punjab",
    abbreviation: "AKFP",
    banner: { src: "/associate-states/punjab.jpeg", width: 1600, height: 408 },
    officials: [
      { role: "President", name: "Raja K.S. Sidhu" },
      { role: "General Secretary", name: "Ajay Kumar" },
    ],
    phones: ["7888305968", "9336990004"],
    email: "akfpunjab@gmail.com",
    website: "https://www.akfpunjab.com",
  },
];

/** One record for every state and union territory: published where supplied, otherwise pending. */
export const stateAssociations: Record<string, StateAssociation> = Object.fromEntries(
  allRegions.map((r) => {
    const s = supplied.find((x) => x.code === r.code);
    return [r.code, s ? { ...s, status: "published" as const } : { code: r.code, status: "pending" as const }];
  }),
);
