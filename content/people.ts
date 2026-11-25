import type { CommitteeKey, CommitteeMember } from "@/lib/types";

/*
 * People — office bearers, executive members and committee members.
 * Each record starts as "draft" while under review; only "published" records are shown.
 * When replacing a photo, use a NEW file name (e.g. Name-2.jpeg): optimised images are
 * cached by URL, so a file replaced under the same name keeps showing the old picture.
 */

/**
 * Office bearers — names, designations, affiliations and photographs supplied by the client
 * (November 2026). Listed in the client's order of precedence. Shown on the homepage and on
 * the Executive Members page (/about/executive-members).
 */
const officeBearerList: CommitteeMember[] = [
  {
    status: "published",
    name: "Mr. Likha Tara Ji",
    // Client, 25 Nov 2026: Chairman (the "Director" title now belongs to Dr. Nilkanth Kunjilal Kawde).
    designation: "Chairman",
    photo: "/assets/Likha.jpeg",
  },
  {
    status: "published",
    name: "Amit Thaker Ji",
    designation: "President",
    affiliation: "MLA, Vejalpur, Gujarat",
    photo: "/assets/Amit.jpeg",
  },
  {
    status: "published",
    name: "Baikunth Singh",
    designation: "Acting President",
    photo: "/assets/Baikunth.jpeg",
  },
  {
    status: "published",
    name: "Pawan Kharkhoda",
    designation: "Vice President",
    affiliation: "MLA, Kharkhoda, Haryana",
    photo: "/assets/Pawan.jpeg",
  },
  {
    status: "published",
    // Name and designation corrected by the client, 25 Nov 2026 (previously "Dr. Neelkanth
    // Kunjilal Kawade", General Secretary). Position in the list and photograph unchanged.
    name: "Dr. Nilkanth Kunjilal Kawde",
    designation: "Director & Acting President",
    // Replaced photo uses a new file name so cached copies of the old one are not served.
    photo: "/assets/Neelkanth-2.jpeg",
    photoFocus: "46% 22%",
  },
  {
    status: "published",
    name: "Yogesh Kalra", // spelling corrected by the client, 25 Nov 2026
    designation: "Co-Acting Secretary",
    photo: "/assets/Yogesh.jpeg",
  },
  // Added by the client, 25 Nov 2026: listed immediately after the Co-Acting Secretary.
  // No photograph supplied yet — the card shows initials and "Photo awaited".
  {
    status: "published",
    name: "Dr. Kyoshi Kola Partap Kumar",
    designation: "Joint Secretary",
  },
  {
    status: "published",
    name: "Mahesh Kumawat",
    designation: "Joint Secretary",
    photo: "/assets/Mahesh.jpeg",
  },
  {
    status: "published",
    name: "Jwala Turkar",
    designation: "Joint Secretary",
    // Replaced photo uses a new file name so cached copies of the old one are not served.
    photo: "/assets/Jwala-2.jpeg",
  },
  // Added by the client, 25 Nov 2026, as an additional Joint Secretary. No photograph supplied yet.
  {
    status: "published",
    name: "Vishal Mehta",
    designation: "Joint Secretary",
  },
];

/** Executive members (not office bearers) — supplied by the client, 23 November 2026. */
const executiveMembers: CommitteeMember[] = [
  {
    status: "published",
    name: "Anjali",
    designation: "Executive Member",
    photo: "/assets/anjali.jpeg",
  },
];

/** Office bearers only, in order of precedence (used on the homepage). */
export const officeBearers = officeBearerList;

/**
 * Executive positions, in order of office, for the Executive Members page.
 * - Members are matched to a position by their `designation`.
 * - `alwaysShow`: the position is listed even when no member has been supplied for it, with
 *   `vacantText` (default "Member details will be updated soon.") — no name or photo is invented.
 * - `showOnHomepage: false`: holders of this position are not featured on the homepage.
 * Positions without members and without `alwaysShow` are simply not listed.
 */
export type ExecutiveRole = {
  title: string;
  alwaysShow?: boolean;
  showOnHomepage?: boolean;
  vacantText?: string;
};

export const executiveRoles: ExecutiveRole[] = [
  { title: "Chairman" },
  { title: "President" },
  { title: "Acting President" },
  { title: "Vice President" },
  { title: "Director & Acting President" },
  { title: "General Secretary" },
  { title: "Co-Acting Secretary" },
  { title: "Joint Secretary", alwaysShow: true, showOnHomepage: false },
  // Client asked for the Treasurer to be shown; name and photograph not yet supplied.
  { title: "Treasurer", alwaysShow: true, vacantText: "Name Awaited" },
  { title: "Executive Member" },
];

/** Office bearers featured on the homepage (excludes positions marked showOnHomepage: false). */
export const homepageOfficeBearers = officeBearerList.filter(
  (m) => executiveRoles.find((r) => r.title === m.designation)?.showOnHomepage !== false,
);

export const committees: Record<CommitteeKey, CommitteeMember[]> = {
  executive: [...officeBearerList, ...executiveMembers],
  "anti-doping": [],
  // Supplied by the client, 23 November 2026.
  referee: [
    {
      status: "published",
      name: "Sushil Sharma", // spelling corrected by the client, 25 Nov 2026
      designation: "Secretary, Referee Commission",
      photo: "/assets/Susil.jpeg",
    },
  ],
  // Supplied by the client, 23 November 2026.
  womens: [
    {
      status: "published",
      name: "Vijeta Mundlia",
      designation: "Women's Commission",
      photo: "/assets/Vijeta.jpeg",
    },
  ],
  kata: [],
  kumite: [],
  // Supplied by the client, 23 November 2026.
  media: [
    {
      status: "published",
      name: "Aashish Poonia",
      designation: "Media Director",
      photo: "/assets/Ashish.jpeg",
    },
  ],
  discipline: [],
  organise: [],
  technical: [],
  sports: [],
  athletes: [],
  "sexual-harassment": [],
  medical: [],
  objection: [],
  management: [],
  judges: [],
};
