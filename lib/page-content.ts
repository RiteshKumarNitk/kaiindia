import type { PageEntry, RoutePath } from "./types";

/**
 * Headings, introductions, metadata and Coming Soon copy for every route.
 *
 * Editing guidance
 * - Keep `intro` and `metaDescription` factual. Do not state officeholders, affiliations,
 *   recognitions or legal obligations until the association has confirmed them.
 * - To publish a section, set its `status` to "published" and add `body` paragraphs.
 * - Typed as Record<RoutePath, PageEntry>: every route must have an entry.
 */
const pending = "Details for this section will be published once the association approves them.";

export const pages: Record<RoutePath, PageEntry> = {
  "/": {
    title: "Karate Association of India",
    shortTitle: "Home",
    eyebrow: "Karate Association of India",
    intro:
      "The official national federation for the promotion and development of karate as a sport in India since 2013. Nurturing grassroots talent and empowering athletes for the national and international stage.",
    metaDescription:
      "Official website of the Karate Association of India (KAI) — national federation promoting karate sport across India for athletes, coaches, officials and clubs.",
    comingSoon: {
      title: "Karate Association of India",
      description:
        "Official national federation for karate sport in India, incorporated in 2013.",
    },
    body: { kind: "home" },
  },

  /* ------------------------------------------------------------------ About */
  "/about": {
    title: "About KAI",
    eyebrow: "About the association",
    intro:
      "The Karate Association of India was established in 2013 for the overall promotion and development of karate as a sport in India.",
    metaDescription:
      "About the Karate Association of India: background, objectives and mission, promotion of karate in India, and athlete and coach development.",
    comingSoon: {
      title: "Association profile",
      description: "Further details about the association will be published here once approved.",
    },
    // Client-supplied statements (verbatim source: lib/client-supplied.ts), edited for grammar only.
    body: {
      kind: "info",
      sections: [
        {
          id: "introduction",
          title: "Introduction to Karate Association of India",
          status: "published",
          body: [
            "The Karate Association of India (KAI) was established for the overall promotion and development of karate as a sport in India.",
            "KAI is the only national federation of karate in India.",
          ],
        },
        {
          id: "background",
          title: "Association Background",
          status: "published",
          body: [
            "KAI was incorporated in 2013 as a not-for-profit company under Section 8, registered with the Registrar of Companies.",
            "It is a nationwide association with the strength of 33 affiliated state associations and karate clubs and academies.",
          ],
        },
        {
          id: "objectives",
          title: "Objectives and Mission",
          status: "published",
          body: [
            "The overall aim of KAI is to popularise karate, a tremendous martial art of self-defence, among the youth and growing children of India.",
            "The association's aim is to produce Asian Games medallists and Asian and world champions.",
          ],
        },
        {
          id: "promotion",
          title: "Promotion of Karate in India",
          status: "published",
          body: [
            "To popularise karate, KAI conducts training seminars, self-defence camps and tournaments at district, state, national, school and university level.",
            "India is one of the major karate countries in the world, with millions of people learning and practising the art of karate.",
          ],
        },
        {
          id: "development",
          title: "Athlete and Coach Development",
          status: "published",
          body: [
            "Most of India's national champions and internationally renowned players, as well as WKF- and AKF-qualified judges and referees, coaches and masters, are associated with KAI.",
          ],
        },
      ],
      related: {
        title: "In this section",
        links: ["/about/athlete-login", "/about/coach-login", "/about/judges-profile", "/about/karate"],
      },
    },
  },
  "/about/athlete-login": {
    title: "Athlete Portal",
    shortTitle: "Athlete Login",
    eyebrow: "About KAI · Athletes",
    intro:
      "A secure portal for registered karate athletes is planned for a future phase of this website. Sign-in is not available yet.",
    metaDescription:
      "Preview of the planned Karate Association of India athlete portal. Athlete sign-in is not yet available.",
    comingSoon: {
      title: "Athlete sign-in not yet available",
      description:
        "Athlete accounts have not been opened. Registration and sign-in details will be announced by the association when the portal launches.",
    },
    body: {
      kind: "portal",
      role: "Athlete",
      features: [
        "View your registration and profile details",
        "Follow event entries and participation history",
        "Access announcements relevant to athletes",
        "Download approved certificates and documents",
      ],
    },
  },
  "/about/coach-login": {
    title: "Coach Portal",
    shortTitle: "Coach Login",
    eyebrow: "About KAI · Coaches",
    intro:
      "A dedicated portal for coaches is planned to support athlete management and coaching resources. Sign-in is not available yet.",
    metaDescription:
      "Preview of the planned Karate Association of India coach portal. Coach sign-in is not yet available.",
    comingSoon: {
      title: "Coach sign-in not yet available",
      description:
        "Coach accounts have not been opened. Eligibility and access details will be shared by the association when the portal is ready.",
    },
    body: {
      kind: "portal",
      role: "Coach",
      features: [
        "Manage the athletes you coach",
        "Submit and track event entries",
        "Access coaching resources and circulars",
        "Keep your coaching profile up to date",
      ],
    },
  },
  "/about/judges-profile": {
    title: "Judges Profile",
    eyebrow: "About KAI · Officials",
    intro:
      "Judges and referees are central to fair competition. This directory will present the profiles of technical officials once verified records are supplied by the association.",
    metaDescription:
      "Directory of karate judges and technical officials. Verified profiles will be published once supplied by the Karate Association of India.",
    comingSoon: {
      title: "Profiles to be announced",
      description:
        "Verified judge profiles, including officiating grades and states, will appear here once the association supplies and approves them.",
    },
    body: {
      kind: "directory",
      committee: "judges",
      focus: ["Officiating grade", "Home state", "Officiating experience", "Profile photograph"],
    },
  },
  "/about/karate": {
    title: "About Karate",
    shortTitle: "Karate",
    eyebrow: "About KAI · The sport",
    intro:
      "Karate is a striking martial art that is practised worldwide as a self-development discipline, a method of self-defence and an international competitive sport.",
    metaDescription:
      "An introduction to karate as a martial art and sport, covering kata, kumite, and the discipline of training.",
    comingSoon: {
      title: "KAI programmes",
      description:
        "Information on the association's own training programmes, grading and development pathways will be published once approved.",
    },
    body: {
      kind: "info",
      sections: [
        {
          id: "introduction",
          title: "Introduction to Karate",
          status: "published",
          body: [
            "Karate developed in Okinawa, in what is now southern Japan, drawing on indigenous fighting methods and influences from Chinese martial arts. It spread to mainland Japan in the early twentieth century and from there around the world.",
            "The word karate is commonly translated as “empty hand”, reflecting its emphasis on unarmed techniques — punches, strikes, kicks, blocks and stances. Karate made its Olympic debut at the Tokyo 2020 Games.",
          ],
        },
        {
          id: "kata",
          title: "Kata",
          status: "published",
          body: [
            "Kata are pre-arranged sequences of techniques performed alone against imaginary opponents. They preserve the technical heritage of each style and train precision, balance, rhythm and focus.",
            "In competition, kata performances are assessed by judges on technical and athletic qualities.",
          ],
        },
        {
          id: "kumite",
          title: "Kumite",
          status: "published",
          body: [
            "Kumite means sparring. In sport karate, two athletes face each other and score with controlled techniques delivered to permitted target areas, under the supervision of a refereeing panel.",
            "Control, timing, distance and respect for the opponent are as important as speed and power.",
          ],
        },
        {
          id: "discipline",
          title: "Discipline and Training",
          status: "published",
          body: [
            "Karate training builds fitness, coordination and confidence alongside self-control and respect. Practice is typically structured around basics (kihon), kata and kumite.",
            "Students progress through coloured-belt (kyu) grades towards black-belt (dan) grades, with grading standards set by the style or organisation they train with.",
          ],
        },
      ],
      pending: {
        title: "KAI programmes",
        description:
          "Details of KAI-specific training programmes, grading standards and resources will be published here after approval.",
      },
    },
  },

  /* ------------------------------------------------------------ Organisation */
  "/organisation": {
    title: "Organisation",
    eyebrow: "Structure and leadership",
    intro:
      "This section will set out how the Karate Association of India is organised — its leadership, committees and the state associations it works with.",
    metaDescription:
      "Organisational structure of the Karate Association of India, including leadership, committees and associate states.",
    comingSoon: {
      title: "Committee details in preparation",
      description:
        "Committee memberships and the state association directory will be published here once verified. The Chairman's message is available now.",
    },
    body: {
      kind: "hub",
      layout: "directory",
      groups: [
        { title: "Leadership", links: ["/organisation/chairman-message", "/organisation/executive-committee"] },
        {
          title: "Committees",
          links: [
            "/organisation/anti-doping-committee",
            "/organisation/referee-committee",
            "/organisation/womens-committee",
            "/organisation/kata-committee",
            "/organisation/kumite-committee",
            "/organisation/media-committee",
          ],
        },
        { title: "States", links: ["/organisation/associate-states"] },
      ],
    },
  },
  "/organisation/chairman-message": {
    title: "Chairman's Message",
    eyebrow: "Organisation · Leadership",
    intro: "Message from the Chairman",
    metaDescription:
      "A message from Mr. Likha Tara Ji, Chairman of the Karate Association of India, to athletes, coaches, referees, officials and martial arts enthusiasts.",
    // Fallback only; the message is published in lib/content-data.ts.
    comingSoon: {
      title: "Message to be published",
      description: "The Chairman's message will appear here once approved for publication.",
    },
    body: { kind: "message" },
  },
  "/organisation/executive-committee": {
    title: "Executive Committee",
    eyebrow: "Organisation · Committees",
    intro:
      "The Executive Committee is responsible for the overall direction and administration of an association. Its officeholders will be listed here once the official records are confirmed.",
    metaDescription: "Members of the Karate Association of India Executive Committee, to be published once confirmed.",
    comingSoon: {
      title: "Members to be announced",
      description: "Officeholders and members will be listed here after the association confirms the official records.",
    },
    body: {
      kind: "directory",
      committee: "executive",
      focus: ["Strategic direction", "Administration and finance", "Coordination with state units", "Governance oversight"],
    },
  },
  "/organisation/anti-doping-committee": {
    title: "Anti-Doping Committee",
    eyebrow: "Organisation · Committees",
    intro:
      "Clean sport protects every athlete. This page will introduce the committee responsible for anti-doping awareness and education within the association.",
    metaDescription: "Anti-doping committee and clean-sport information from the Karate Association of India.",
    comingSoon: {
      title: "Members to be announced",
      description:
        "Committee members, education resources and official anti-doping guidance will be published once approved.",
    },
    body: {
      kind: "directory",
      committee: "anti-doping",
      focus: ["Athlete education", "Clean-sport awareness", "Guidance for support personnel", "Official resources"],
    },
  },
  "/organisation/referee-committee": {
    title: "Referee Committee",
    eyebrow: "Organisation · Committees",
    intro:
      "Consistent, impartial officiating underpins every competition. This page will present the committee that oversees refereeing standards, official training and seminars.",
    metaDescription: "Referee committee of the Karate Association of India — officiating standards and referee development.",
    comingSoon: {
      title: "Members to be announced",
      description: "Committee members, referee seminars and officiating updates will be published here after approval.",
    },
    body: {
      kind: "directory",
      committee: "referee",
      focus: ["Officiating standards", "Referee seminars", "Panel appointments", "Rules interpretation"],
    },
  },
  "/organisation/womens-committee": {
    title: "Women's Committee",
    eyebrow: "Organisation · Committees",
    intro:
      "This page will feature the committee working to support the participation, development and leadership of women and girls in karate.",
    metaDescription: "Women's committee of the Karate Association of India — participation and leadership in karate.",
    comingSoon: {
      title: "Members to be announced",
      description: "Committee members, initiatives and opportunities will be shared here once confirmed by the association.",
    },
    body: {
      kind: "directory",
      committee: "womens",
      focus: ["Participation", "Coaching and officiating pathways", "Safe-sport awareness", "Leadership development"],
    },
  },
  "/organisation/kata-committee": {
    title: "Kata Committee",
    eyebrow: "Organisation · Committees",
    intro:
      "Kata is one of karate's two competition disciplines. This page will introduce the committee concerned with kata technical standards, training and athlete development.",
    metaDescription: "Kata committee of the Karate Association of India — technical standards and kata development.",
    comingSoon: {
      title: "Members to be announced",
      description: "Committee members and kata development activities will be listed here after approval.",
    },
    body: {
      kind: "directory",
      committee: "kata",
      focus: ["Technical standards", "Coaching clinics", "Athlete development", "Judging liaison"],
    },
  },
  "/organisation/kumite-committee": {
    title: "Kumite Committee",
    eyebrow: "Organisation · Committees",
    intro:
      "Kumite — sparring — is karate's second competition discipline. This page will present the committee responsible for kumite technical development and athlete preparation.",
    metaDescription: "Kumite committee of the Karate Association of India — sparring standards and athlete preparation.",
    comingSoon: {
      title: "Members to be announced",
      description: "Committee members and kumite development activities will be listed here after approval.",
    },
    body: {
      kind: "directory",
      committee: "kumite",
      focus: ["Technical development", "Athlete preparation", "Safety and control", "Coaching clinics"],
    },
  },
  "/organisation/media-committee": {
    title: "Media Committee",
    eyebrow: "Organisation · Committees",
    intro:
      "This page will introduce the committee responsible for the association's communications, publicity and official media coverage of events.",
    metaDescription: "Media committee of the Karate Association of India — communications and event coverage.",
    comingSoon: {
      title: "Members to be announced",
      description: "Committee members and media contacts will be published here after the association confirms them.",
    },
    body: {
      kind: "directory",
      committee: "media",
      focus: ["Official communications", "Event coverage", "Media accreditation", "Digital channels"],
    },
  },
  "/organisation/associate-states": {
    title: "Associate States",
    eyebrow: "Organisation · States",
    intro:
      "This directory will list the state-level karate associations that work with the Karate Association of India, with their representatives and contact details.",
    metaDescription: "Directory of state karate associations working with the Karate Association of India, to be published once verified.",
    comingSoon: {
      title: "State listings to be announced",
      description:
        "State associations will be listed only after their details and status have been verified by the association.",
    },
    body: { kind: "states" },
  },

  /* ------------------------------------------------------------------ Media */
  "/media": {
    title: "Media",
    eyebrow: "News and highlights",
    intro:
      "Follow official announcements, event photographs and video highlights from the Karate Association of India.",
    metaDescription: "News, photo gallery and video gallery from the Karate Association of India.",
    comingSoon: {
      title: "Media content in preparation",
      description: "Official news, photographs and videos will be published as they are approved by the association.",
    },
    body: { kind: "hub", layout: "features", groups: [{ links: ["/media/news", "/media/photo-gallery", "/media/video-gallery"] }] },
  },
  "/media/news": {
    title: "News",
    eyebrow: "Media · Announcements",
    intro: "Official news, announcements and event updates from the Karate Association of India will be published here.",
    metaDescription: "Official news and announcements from the Karate Association of India.",
    comingSoon: {
      title: "No announcements published yet",
      description: "No announcements have been published yet. Approved news and event updates will appear here.",
    },
    body: { kind: "news" },
  },
  "/media/photo-gallery": {
    title: "Photo Gallery",
    eyebrow: "Media · Photographs",
    intro: "A visual record of championships, training camps and association activities.",
    metaDescription: "Official photographs from Karate Association of India events and activities.",
    comingSoon: {
      title: "Gallery in preparation",
      description:
        "Official event photographs and karate highlights will be featured in this gallery as they become available.",
    },
    body: { kind: "photos" },
  },
  "/media/video-gallery": {
    title: "Video Gallery",
    eyebrow: "Media · Videos",
    intro: "Match highlights, event recordings and educational videos approved by the association.",
    metaDescription: "Official videos and highlights from the Karate Association of India.",
    comingSoon: {
      title: "Videos in preparation",
      description: "Official videos will appear here once they are approved for publication.",
    },
    body: { kind: "videos" },
  },

  /* ------------------------------------------------------- Rules & Regulations */
  "/rules-regulations": {
    title: "Rules & Regulations",
    eyebrow: "Official documents",
    intro:
      "Find the association's governing documents and the competition rules applied to karate events. Each document will be listed with its category, version and publication date.",
    metaDescription: "Association rules and karate competition rules published by the Karate Association of India.",
    comingSoon: {
      title: "Documents in preparation",
      description: "Official documents will be available for download once approved for publication.",
    },
    body: {
      kind: "hub",
      layout: "documents",
      groups: [{ links: ["/rules-regulations/kai-association-rules", "/rules-regulations/karate-rules"] }],
    },
  },
  "/rules-regulations/kai-association-rules": {
    title: "KAI Association Rules",
    eyebrow: "Rules & Regulations · Governance",
    intro:
      "The association's own governing documents — such as its constitution, by-laws and internal regulations — will be published on this page.",
    metaDescription: "Governing documents of the Karate Association of India, to be published once approved.",
    comingSoon: {
      title: "No documents published yet",
      description: "Approved governing documents will be listed here with version details and PDF downloads.",
    },
    body: { kind: "documents", collection: "association-rules" },
  },
  "/rules-regulations/karate-rules": {
    title: "Karate Rules",
    eyebrow: "Rules & Regulations · Competition",
    intro:
      "Karate competitions are conducted under written rules covering kata and kumite, scoring, officiating, conduct and athlete safety. The rulebook applicable to KAI events will be published here.",
    metaDescription: "Karate competition rules applicable to Karate Association of India events, to be published once confirmed.",
    comingSoon: {
      title: "Rulebook to be published",
      description:
        "The official rulebook and any amendments will be available to download once the association confirms the applicable edition.",
    },
    body: { kind: "documents", collection: "karate-rules" },
  },

  /* ------------------------------------------------------------- Membership */
  "/membership": {
    title: "Membership",
    eyebrow: "Join the network",
    intro:
      "Information for karate clubs and academies seeking to become members of the association will be published in this section.",
    metaDescription: "Club and academy membership information from the Karate Association of India.",
    comingSoon: {
      title: "Membership guidelines in preparation",
      description:
        "Club and academy membership details will be published after the relevant guidelines and application process are finalised.",
    },
    body: { kind: "hub", layout: "pathways", groups: [{ links: ["/membership/club", "/membership/academy"] }] },
  },
  "/membership/club": {
    title: "Club Membership",
    shortTitle: "Club",
    eyebrow: "Membership · Clubs",
    intro:
      "This will be the information portal for karate clubs interested in association membership, covering eligibility, documents, process and fees.",
    metaDescription: "Club membership information for the Karate Association of India, to be published once finalised.",
    comingSoon: {
      title: "Applications not yet open",
      description: "Applications are not open. Guidelines for clubs will be published once finalised by the association.",
    },
    body: {
      kind: "membership",
      sections: [
        { id: "eligibility", title: "Eligibility", status: "coming-soon", pending: "Eligibility criteria for clubs are being finalised." },
        { id: "documents", title: "Required documents", status: "coming-soon", pending: "The list of required documents will be confirmed." },
        { id: "process", title: "Membership process", status: "coming-soon", pending: "The step-by-step membership process will be published." },
        { id: "fees", title: "Fees", status: "coming-soon", pending: "Fees have not been announced." },
        { id: "application", title: "Application procedure", status: "coming-soon", pending: "How and where to apply will be announced." },
      ],
    },
  },
  "/membership/academy": {
    title: "Academy Membership",
    shortTitle: "Academy",
    eyebrow: "Membership · Academies",
    intro:
      "This will be the information portal for karate academies and training centres interested in association membership.",
    metaDescription: "Academy membership information for the Karate Association of India, to be published once finalised.",
    comingSoon: {
      title: "Applications not yet open",
      description: "Applications are not open. Guidelines for academies will be published once finalised by the association.",
    },
    body: {
      kind: "membership",
      sections: [
        { id: "eligibility", title: "Eligibility", status: "coming-soon", pending: "Eligibility criteria for academies are being finalised." },
        { id: "documents", title: "Required documents", status: "coming-soon", pending: "The list of required documents will be confirmed." },
        { id: "process", title: "Membership process", status: "coming-soon", pending: "The step-by-step membership process will be published." },
        { id: "fees", title: "Fees", status: "coming-soon", pending: "Fees have not been announced." },
        { id: "application", title: "Application procedure", status: "coming-soon", pending: "How and where to apply will be announced." },
      ],
    },
  },

  /* ---------------------------------------------------------------- Policies */
  "/privacy-policy": {
    title: "Privacy Policy",
    eyebrow: "Policies",
    intro: "The association's privacy policy will explain how personal information is handled in connection with this website and its services.",
    metaDescription: "Privacy policy of the Karate Association of India website — document pending approval.",
    comingSoon: {
      title: "Official policy in preparation",
      description: "The official privacy policy is being prepared and will be published here once approved by the association.",
    },
    body: { kind: "policy" },
  },
  "/refund-policy": {
    title: "Refund Policy",
    eyebrow: "Policies",
    intro: "The refund policy will set out how any payments made to the association through this website are handled.",
    metaDescription: "Refund policy of the Karate Association of India website — document pending approval.",
    comingSoon: {
      title: "Official policy in preparation",
      description: "The official refund policy will be published here once approved. No payments are currently accepted through this website.",
    },
    body: { kind: "policy" },
  },

  /* --------------------------------------------------------------- Donations */
  "/donations": {
    title: "Donations",
    eyebrow: "Support karate in India",
    intro: "Supporters who wish to contribute to the development of karate will be able to find information about donating here.",
    metaDescription: "Information about supporting the Karate Association of India. Online donations are not yet available.",
    comingSoon: {
      title: "Online donations not yet available",
      description:
        "Online donation facilities are not yet available, and this website does not accept payments. Please do not send money in response to any request claiming to be made through this site.",
    },
    body: { kind: "donations" },
  },

  /* ---------------------------------------------------------- RTI & Governance */
  "/rti-governance": {
    title: "RTI & Governance",
    eyebrow: "Transparency",
    intro: "This page will bring together the association's governance documents, official disclosures and related information.",
    metaDescription: "Governance documents and official disclosures from the Karate Association of India, to be published once approved.",
    comingSoon: {
      title: "Governance records in preparation",
      description: "Governance records and disclosures will be published here once verified and approved by the association.",
    },
    body: {
      kind: "governance",
      topics: [
        { id: "documents", title: "Governance Documents", status: "coming-soon", pending: "Approved governance documents will be listed here." },
        { id: "disclosures", title: "Official Disclosures", status: "coming-soon", pending: "Official disclosures will be published once approved." },
        { id: "updates", title: "Governance Updates", status: "coming-soon", pending: "Updates on governance matters will be shared here." },
        { id: "rti", title: "RTI Information", status: "coming-soon", pending: "Information on requests for information will be published once the association confirms the applicable process." },
      ],
    },
  },

  /* ----------------------------------------------------------------- Contact */
  "/contact": {
    title: "Contact Us",
    eyebrow: "Get in touch",
    intro: "Contact details for the Karate Association of India will be published on this page.",
    metaDescription: "Contact information for the Karate Association of India.",
    comingSoon: {
      title: "Contact details to be announced",
      description: "Official contact information will be available soon.",
    },
    body: { kind: "contact" },
  },
};

export const pendingDefault = pending;

export function getPage(path: RoutePath): PageEntry {
  return pages[path];
}

export function pageLabel(path: RoutePath): string {
  const page = pages[path];
  return page.shortTitle ?? page.title;
}

/** One-line descriptions used in directory listings and landing pages. */
const summaries: Partial<Record<RoutePath, string>> = {
  "/about": "Background, objectives and mission of the association.",
  "/about/athlete-login": "Planned online portal for registered athletes.",
  "/about/coach-login": "Planned online portal for coaches.",
  "/about/judges-profile": "Directory of verified judges and technical officials.",
  "/about/karate": "Karate as a martial art and sport: kata, kumite and training.",
  "/organisation": "Leadership, committees and state associations.",
  "/organisation/chairman-message": "A message from Mr. Likha Tara Ji, Chairman of KAI.",
  "/organisation/executive-committee": "Officeholders responsible for direction and administration.",
  "/organisation/anti-doping-committee": "Clean-sport education and awareness.",
  "/organisation/referee-committee": "Officiating standards and referee development.",
  "/organisation/womens-committee": "Participation and leadership of women in karate.",
  "/organisation/kata-committee": "Technical standards and development in kata.",
  "/organisation/kumite-committee": "Technical development and preparation in kumite.",
  "/organisation/media-committee": "Communications and official event coverage.",
  "/organisation/associate-states": "State karate associations working with KAI.",
  "/media": "News, photographs and video highlights.",
  "/media/news": "Official announcements and event updates.",
  "/media/photo-gallery": "Photographs from championships and association activities.",
  "/media/video-gallery": "Highlights, event recordings and educational videos.",
  "/rules-regulations": "Governing documents and competition rules.",
  "/rules-regulations/kai-association-rules": "Constitution, by-laws and internal regulations of the association.",
  "/rules-regulations/karate-rules": "The competition rulebook applied at KAI events.",
  "/membership": "Membership information for clubs and academies.",
  "/membership/club": "Membership information for karate clubs.",
  "/membership/academy": "Membership information for academies and training centres.",
  "/donations": "Supporting the development of karate.",
  "/rti-governance": "Governance documents and official disclosures.",
  "/contact": "How to reach the association.",
};

export function pageSummary(path: RoutePath): string {
  return summaries[path] ?? pages[path].metaDescription;
}
