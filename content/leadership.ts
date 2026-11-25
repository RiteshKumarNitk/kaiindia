import type { LeadershipMessage, SliderImage } from "@/lib/types";

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
    alt: "Mr. Likha Tara Ji, Chairman of the Karate Association of India",
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
