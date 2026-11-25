/**
 * Client-supplied source text, kept VERBATIM for reference and audit.
 *
 * The website renders lightly edited versions of this text (grammar and punctuation only,
 * no new facts) from `content/pages.ts` and the other files in `content/`. When the client
 * revises wording, update this file first, then the edited copies.
 *
 * Received: November 2026.
 */

export const kaiIntroductionOriginal = [
  "Karate Association of India - KAI (2013) incorporated as a non profitable company under section 8 of Registrar of Companies, and established for the overall promotion and development of Karate Sport in India.",
  'The overall aim of KAI is to popularise this tremendous Martial Art of self defence "KARATE" amongst youth and growing children of India by conducting training seminars, self defence camps, tournaments etc. at district, state, national, school, university level.',
  "KAI is the national widespread Association with the strength of 33 affiliated state associations and Karate clubs/Academy.",
  "KAI is the only National Federation of Karate Sport in India.",
  "Most of the National champions and Internationally renowned Players, WKF & AKF qualified Judges/Referees, Coaches and Masters are associated with KAI.",
  "India is one of the major country in the world in Karate where millions of people are learning and practicing the art of Karate.",
  "Karate Association of India aim is to produce Asian Games Medalists and Asian, World champions players.",
] as const;

/**
 * The message was first supplied as the "Chairman's Message". On 23 November 2026 the client
 * instructed that Mr. Likha Tara Ji's title is Director; the site now shows it as the
 * Director's Message. The message text itself is unchanged.
 */
export const chairmanMessageOriginal = {
  title: "CHAIRMAN'S MESSAGE",
  subtitle: "Message from the Chairman",
  paragraphs: [
    "It gives me immense pleasure to welcome all athletes, coaches, referees, officials, and martial arts enthusiasts to Karate Association of India.",
    "Karate is much more than a combat sport; it is a way of life built on the core pillars of discipline, respect, perseverance, and self-control. Through rigorous training and healthy competition, our young karatekas not only sharpen their physical agility and mental focus but also learn the values of humility and sportsmanship that stay with them far beyond the dojo.",
    "At Karate Association of India, our mission is to nurture grassroots talent and provide a transparent, world-class platform where every dedicated athlete can rise to represent our state and nation on the international stage. Events like this play a vital role in testing their mettle and uniting the karate fraternity in the true spirit of Budo.",
    "I extend my heartfelt gratitude to the organizing committee, dedicated coaches, parents, and supporters whose tireless efforts make our vision possible. I wish all participating athletes the very best—compete with honor, give your absolute best, and let the spirit of karate shine through.",
  ],
  name: "Mr. Likha Tara Ji",
  designation: "Chairman, Karate Association of India",
} as const;

/** Office bearers as supplied by the client on 23 November 2026, verbatim, in the given order. */
export const officeBearersOriginal = {
  order: [
    "Director",
    "President",
    "Acting President",
    "Vice President",
    "General secretary",
    "Co-Acting secretary",
    "Joint Secretary",
  ],
  entries: [
    "Likha Tara Ji / Director Karate Association of India",
    "Amit Thaker ji ( MLA - Vejalpur Gujarat) / President / Karate Association of India",
    "Baikunth singh / Acting President / Karate Association of India",
    "Pawan Kharkhoda / MLA Kharkhoda Haryana / Vice President / Karate Association of India",
    "Dr. Neelkanth Kunjilal Kawade / General Secretary, / Karate Association of India",
    "Yogesh kalara / Co - Acting Secretary / Karate Association of India",
    "Mahesh Kumawat / Joint Secretary / Karate association of India",
    "Jwala Turkar / Joint Secretary / Karate Association of India",
  ],
  photos: "public/assets/<FirstName>.jpeg, supplied by the client",
} as const;

/** Media committee as supplied by the client on 23 November 2026, verbatim. */
export const mediaCommitteeOriginal = {
  entries: ["Aashish Poonia / Media Director"],
  photos: "public/assets/Ashish.jpeg, supplied by the client",
} as const;

/** Referee committee as supplied by the client on 23 November 2026, verbatim. */
export const refereeCommitteeOriginal = {
  entries: ["Susil Sharma / Referee commission / Secretary / Karate association of India"],
  photos: "public/assets/Susil.jpeg, supplied by the client",
} as const;

/** Further members supplied by the client on 23 November 2026, verbatim. */
export const additionalMembersOriginal = {
  entries: [
    "Anjali / Executive member / Karate association of India (photo: public/assets/anjali.jpeg)",
    "Vijeta mundlia / Woman commission / Karate association of India / Women commitee (photo: public/assets/Vijeta.jpeg)",
  ],
  newCommittees: ["Medical & Physio. Committee", "Objection Committee", "Management committee"],
} as const;

/** Official email supplied by the client on 24 November 2026 ("use this mail where ever required"). */
export const officialEmailOriginal = "kaikarateassociation@gmail.com";

/** Change request supplied by the client on 25 November 2026 (verbatim values). */
export const changeRequest20261125 = {
  leadership: {
    "Dr. Nilkanth Kunjilal Kawde": "Director & Acting President (corrects 'Dr. Neelkanth Kunjilal Kawade', previously General Secretary)",
    "Mr. Likha Tara Ji": "Chairman — the request refers to the 'Chairman's Message' attributed to him",
  },
  executiveMembers: {
    added: ["Dr. Kyoshi Kola Partap Kumar — Joint Secretary (after Acting Secretary)", "Vishal Mehta — Joint Secretary"],
    corrected: ["Yogesh Kalara → Yogesh Kalra"],
    treasurer: "Name and photograph requested but not supplied",
  },
  referee: "Sushil Sharma (corrects 'Susil Sharma')",
  membershipFees: { newMembership: "₹5,100 for one year", renewal: "₹3,100 for one year", appliesTo: "Club and Academy" },
  officeHours: ["Monday to Saturday: 10:00 AM – 5:00 PM", "Sunday: Closed"],
  donations: { bank: "IDFC Bank" },
  youtubeChannel: "https://youtube.com/@karateassociationofindiakai?si=IPAgCD0R3hicK-5e",
} as const;

/**
 * State association banners supplied by the client on 25 November 2026 (originally in public/map/,
 * moved to public/associate-states/ with consistent names). Details in content/states.ts are
 * transcribed from these banners. The Jammu & Kashmir phone number is printed with 11 digits.
 */
export const stateBannersSupplied = [
  "haryana.jpeg", "arunachal.jpeg", "bihar.jpeg", "chhattisgarh.jpeg",
  "jammukashmir.jpeg", "madhyapardesh.jpeg", "maharashtra.jpeg", "panjab.jpeg",
] as const;

/**
 * Statements published as supplied by the client that should be confirmed with documentary
 * evidence before a public production launch. They are shown as the association's own
 * statements and are never labelled as verified or officially endorsed on the site.
 */
export const claimsRequiringVerification = [
  "Incorporation in 2013 as a not-for-profit Section 8 company (certificate of incorporation).",
  "33 affiliated state associations (current affiliation list).",
  "KAI is the only national federation of karate in India (recognition documents).",
  "Association of national champions, internationally renowned players and WKF/AKF-qualified judges, referees, coaches and masters with KAI.",
  "Millions of people in India learning and practising karate (source of figure).",
  "Mr. Likha Tara Ji as Chairman, and Dr. Nilkanth Kunjilal Kawde as Director & Acting President (Baikunth Singh is also listed as Acting President).",
  "Office bearer names, designations and photographs, and the MLA affiliations of Amit Thaker Ji and Pawan Kharkhoda.",
  "Written consent of each office bearer and committee member to publish their name and photograph.",
  "Aashish Poonia as Media Director (name spelling, title and photograph).",
  "Sushil Sharma as Secretary of the Referee Commission (title and photograph).",
  "Photographs for Dr. Kyoshi Kola Partap Kumar and Vishal Mehta; Treasurer's name and photograph.",
  "Whether the General Secretary position is now vacant (its holder became Director & Acting President).",
  "State association details transcribed from the eight banners (names, titles, phones, emails, websites); J&K phone '97973933989' has 11 digits.",
  "IDFC Bank account holder, account number, IFSC, branch and account type (verified in writing).",
  "Anjali as Executive Member (full name, title and photograph).",
  "Vijeta Mundlia of the Women's Commission (exact title and photograph).",
] as const;
