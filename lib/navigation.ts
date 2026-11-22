import type { NavItem, NavLink } from "./types";

/**
 * Main header navigation. Every `href` is type-checked against `routePaths`
 * in `lib/types.ts`, so a typo here fails `pnpm typecheck` instead of shipping a dead link.
 */
export const mainNav: NavItem[] = [
  { label: "Home", href: "/" },
  {
    label: "About KAI",
    href: "/about",
    children: [
      { label: "About KAI", href: "/about" },
      { label: "Athlete Login", href: "/about/athlete-login" },
      { label: "Coach Login", href: "/about/coach-login" },
      { label: "Judges Profile", href: "/about/judges-profile" },
      { label: "Karate", href: "/about/karate" },
    ],
  },
  {
    label: "Organisation",
    href: "/organisation",
    children: [
      { label: "Organisation Overview", href: "/organisation" },
      { label: "Chairman's Message", href: "/organisation/chairman-message" },
      { label: "Executive Committee", href: "/organisation/executive-committee" },
      { label: "Anti-Doping Committee", href: "/organisation/anti-doping-committee" },
      { label: "Referee Committee", href: "/organisation/referee-committee" },
      { label: "Women's Committee", href: "/organisation/womens-committee" },
      { label: "Kata Committee", href: "/organisation/kata-committee" },
      { label: "Kumite Committee", href: "/organisation/kumite-committee" },
      { label: "Media Committee", href: "/organisation/media-committee" },
      { label: "Associate States", href: "/organisation/associate-states" },
    ],
  },
  {
    label: "Media",
    href: "/media",
    children: [
      { label: "Media Overview", href: "/media" },
      { label: "News", href: "/media/news" },
      { label: "Photo Gallery", href: "/media/photo-gallery" },
      { label: "Video Gallery", href: "/media/video-gallery" },
    ],
  },
  {
    label: "Rules & Regulations",
    href: "/rules-regulations",
    children: [
      { label: "Rules Overview", href: "/rules-regulations" },
      { label: "KAI Association Rules", href: "/rules-regulations/kai-association-rules" },
      { label: "Karate Rules", href: "/rules-regulations/karate-rules" },
    ],
  },
  {
    label: "Membership",
    href: "/membership",
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
      { label: "About KAI", href: "/about" },
      { label: "Karate", href: "/about/karate" },
      { label: "Media", href: "/media" },
      { label: "Membership", href: "/membership" },
      { label: "Donations", href: "/donations" },
    ],
  },
  {
    heading: "Organisation",
    links: [
      { label: "Organisation Overview", href: "/organisation" },
      { label: "Chairman's Message", href: "/organisation/chairman-message" },
      { label: "Executive Committee", href: "/organisation/executive-committee" },
      { label: "Associate States", href: "/organisation/associate-states" },
      { label: "Judges Profile", href: "/about/judges-profile" },
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
