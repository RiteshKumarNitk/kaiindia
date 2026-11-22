/**
 * Client-supplied source text, kept VERBATIM for reference and audit.
 *
 * The website renders lightly edited versions of this text (grammar and punctuation only,
 * no new facts) from `lib/page-content.ts` and `lib/content-data.ts`. When the client
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
  "Mr. Likha Tara Ji as Chairman of the Karate Association of India.",
] as const;
