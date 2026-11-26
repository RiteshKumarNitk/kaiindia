import type { NavItem, NavLink } from "@/lib/types";

/**
 * Main header navigation. Every `href` is type-checked against `routePaths`
 * in `lib/types.ts`, so a typo here fails `pnpm typecheck` instead of shipping a dead link.
 */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About KAI",
    section: "/about",
    children: [
      { label: "About KAI", href: "/about" },
      { label: "Director's Message", href: "/about/director-message" },
      { label: "Executive Members", href: "/about/executive-members" },
      { label: "Associate States", href: "/about/associate-states" },
      { label: "Athlete Login", href: "/about/athlete-login" },
      { label: "Coach Login", href: "/about/coach-login" },
      { label: "Judges Profile", href: "/about/judges-profile" },
      { label: "Karate", href: "/about/karate" },
    ],
  },
  {
    // No landing page: the button opens the list of committees directly.
    label: "Committee",
    section: "/committee",
    children: [
      { label: "Anti-Doping Committee", href: "/committee/anti-doping" },
      { label: "Referee Committee", href: "/committee/referee" },
      { label: "Women's Committee", href: "/committee/womens" },
      { label: "Kata Committee", href: "/committee/kata" },
      { label: "Kumite Committee", href: "/committee/kumite" },
      { label: "Media Committee", href: "/committee/media" },
      { label: "Discipline Committee", href: "/committee/discipline" },
      { label: "Organise Committee", href: "/committee/organise" },
      { label: "Technical Committee", href: "/committee/technical" },
      { label: "Sports Committee", href: "/committee/sports" },
      { label: "Athletes Committee", href: "/committee/athletes" },
      { label: "Sexual Harassment Committee", href: "/committee/sexual-harassment" },
      { label: "Medical & Physio. Committee", href: "/committee/medical-physio" },
      { label: "Objection Committee", href: "/committee/objection" },
      { label: "Management Committee", href: "/committee/management" },
    ],
  },
  {
    label: "Media",
    section: "/media",
    children: [
      { label: "Media Overview", href: "/media" },
      { label: "News", href: "/media/news" },
      { label: "Photo Gallery", href: "/media/photo-gallery" },
      { label: "Video Gallery", href: "/media/video-gallery" },
    ],
  },
  {
    label: "Rules & Regulations",
    section: "/rules-regulations",
    children: [
      { label: "Rules Overview", href: "/rules-regulations" },
      { label: "KAI Association Rules", href: "/rules-regulations/kai-association-rules" },
      { label: "Karate Rules", href: "/rules-regulations/karate-rules" },
    ],
  },
  {
    label: "Membership",
    section: "/membership",
    children: [
      { label: "Membership Overview", href: "/membership" },
      { label: "Club", href: "/membership/club" },
      { label: "Academy", href: "/membership/academy" },
    ],
  },
  { label: "Donations", href: "/donations" },
  { label: "RTI & Governance", href: "/rti-governance" },
  { label: "Contact Us", href: "/contact" },
];

export type FooterColumn = { heading: string; links: NavLink[] };

export const footerNav: FooterColumn[] = [
  {
    heading: "Quick links",
    links: [
      { label: "Home", href: "/" },
      { label: "Karate", href: "/about/karate" },
      { label: "Media", href: "/media" },
      { label: "Membership", href: "/membership" },
      { label: "Donations", href: "/donations" },
      { label: "Contact Us", href: "/contact" },
    ],
  },
  {
    heading: "About KAI",
    links: [
      { label: "About KAI", href: "/about" },
      { label: "Director's Message", href: "/about/director-message" },
      { label: "Executive Members", href: "/about/executive-members" },
      { label: "Associate States", href: "/about/associate-states" },
      { label: "Judges Profile", href: "/about/judges-profile" },
    ],
  },
  {
    heading: "Committee",
    links: [
      { label: "Anti-Doping Committee", href: "/committee/anti-doping" },
      { label: "Referee Committee", href: "/committee/referee" },
      { label: "Women's Committee", href: "/committee/womens" },
      { label: "Kata Committee", href: "/committee/kata" },
      { label: "Kumite Committee", href: "/committee/kumite" },
      { label: "Media Committee", href: "/committee/media" },
    ],
  },
  {
    heading: "Policies & governance",
    links: [
      { label: "Rules & Regulations", href: "/rules-regulations" },
      { label: "RTI & Governance", href: "/rti-governance" },
      { label: "Privacy Policy", href: "/privacy-policy" },
      { label: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

/** Returns true when `pathname` is `href` or a descendant of it. */
export function isActivePath(pathname: string, href: string): boolean {
  if (href === "/") return pathname === "/";
  return pathname === href || pathname.startsWith(`${href}/`);
}
