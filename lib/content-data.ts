import type {
  CommitteeKey,
  CommitteeMember,
  ContentStatus,
  DocumentCollection,
  GalleryPhoto,
  NewsArticle,
  OfficialDocument,
  LeadershipMessage,
  SliderImage,
  StateAssociation,
  VideoItem,
} from "./types";

/**
 * Approved KAI records.
 *
 * Every list starts empty on purpose: nothing is published until the association supplies
 * and approves it. Add records with `status: "draft"` while they are under review — drafts are
 * never rendered — and change the status to "published" once approved.
 * See README.md → "Publishing approved content" for worked examples.
 */

export const committees: Record<CommitteeKey, CommitteeMember[]> = {
  executive: [],
  "anti-doping": [],
  referee: [],
  womens: [],
  kata: [],
  kumite: [],
  media: [],
  judges: [],
};

/**
 * Chairman photographs and message — supplied by the client.
 */
export const chairmanImages: SliderImage[] = [
  {
    src: "/chairman/chairman1.jpeg",
    alt: "Mr. Likha Tara Ji, Chairman of the Karate Association of India",
    caption: "Mr. Likha Tara Ji — Chairman, Karate Association of India",
    width: 960,
    height: 639,
  },
  {
    src: "/chairman/chairman2.jpeg",
    alt: "Mr. Likha Tara Ji presiding at an official KAI event",
    caption: "Mr. Likha Tara Ji presiding at an official KAI event",
    width: 656,
    height: 768,
  },
  {
    src: "/chairman/chairman3.jpeg",
    alt: "Mr. Likha Tara Ji, Chairman of Karate Association of India",
    caption: "Mr. Likha Tara Ji — Championing karate across India",
    width: 1080,
    height: 1079,
  },
];

export const chairmanMessage: LeadershipMessage = {
  status: "published",
  name: "Mr. Likha Tara Ji",
  designation: "Chairman, Karate Association of India",
  portrait: "/chairman/chairman1.jpeg",
  images: chairmanImages,
  paragraphs: [
    "It gives me immense pleasure to welcome all athletes, coaches, referees, officials and martial arts enthusiasts to the Karate Association of India.",
    "Karate is much more than a combat sport; it is a way of life built on the core pillars of discipline, respect, perseverance and self-control. Through rigorous training and healthy competition, our young karatekas not only sharpen their physical agility and mental focus but also learn the values of humility and sportsmanship that stay with them far beyond the dojo.",
    "At the Karate Association of India, our mission is to nurture grassroots talent and provide a transparent, world-class platform where every dedicated athlete can rise to represent our state and nation on the international stage. Events like this play a vital role in testing their mettle and uniting the karate fraternity in the true spirit of Budo.",
    "I extend my heartfelt gratitude to the organising committee, dedicated coaches, parents and supporters whose tireless efforts make our vision possible. I wish all participating athletes the very best — compete with honour, give your absolute best, and let the spirit of karate shine through.",
  ],
};

/**
 * Association introduction for the homepage — client-supplied statements, edited for
 * grammar and punctuation only (verbatim source in lib/client-supplied.ts).
 * The full set of statements appears on /about (see lib/page-content.ts).
 */
export const associationIntro = {
  status: "published" as ContentStatus,
  title: "Karate Association of India",
  subtitle: "Promoting and Developing Karate Sport in India Since 2013",
  paragraphs: [
    "The Karate Association of India (KAI) was incorporated in 2013 as a not-for-profit company under Section 8, registered with the Registrar of Companies, and was established for the overall promotion and development of karate as a sport in India.",
    "KAI is a nationwide association with the strength of 33 affiliated state associations and karate clubs and academies. KAI is the only national federation of karate in India.",
    "KAI's overall aim is to popularise karate, a tremendous martial art of self-defence, among the youth and growing children of India.",
  ],
  mission: {
    lead: "The Karate Association of India aims to produce Asian Games medallists and Asian and world champions.",
    goals: [
      {
        title: "Promote karate throughout India",
        text: "Popularising karate as a martial art of self-defence across the country.",
      },
      {
        title: "Encourage young athletes and children",
        text: "Bringing karate to the youth and growing children of India.",
      },
      {
        title: "Organise karate events and training",
        text: "Training seminars, self-defence camps and tournaments at district, state, national, school and university level.",
      },
      {
        title: "Develop national and international competitors",
        text: "Preparing athletes to become Asian Games medallists and Asian and world champions.",
      },
    ],
  },
};

export const stateAssociations: StateAssociation[] = [];

export const newsArticles: NewsArticle[] = [];

export const galleryPhotos: GalleryPhoto[] = [];

export const videos: VideoItem[] = [];

export const documents: Record<DocumentCollection, OfficialDocument[]> = {
  "association-rules": [],
  "karate-rules": [],
  governance: [],
};

/** Only approved items are ever shown publicly. */
export function published<T extends { status: ContentStatus }>(items: T[]): T[] {
  return items.filter((item) => item.status === "published");
}

export function isPublished(item: { status: ContentStatus }): boolean {
  return item.status === "published";
}
