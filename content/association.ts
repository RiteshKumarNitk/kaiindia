import type { ContentStatus } from "@/lib/types";

/**
 * Association introduction for the homepage — client-supplied statements, edited for
 * grammar and punctuation only (verbatim source in content/source/client-supplied.ts).
 * The full set of statements appears on /about (see content/pages.ts).
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
