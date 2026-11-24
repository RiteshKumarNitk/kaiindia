# Karate Association of India — website

The official website of the Karate Association of India (KAI), currently in its **pre-launch phase**. Every section of the site exists and can be navigated. Each page has its own heading and introduction, and shows a Coming Soon panel until the association approves official content.

No official facts are invented. Officeholders, committee members, state associations, policies, fees, contact details, news and media start out **empty**, and they appear only after they are added and marked `published`.

## Tech stack

- Next.js 16 (App Router, Turbopack), all pages statically prerendered
- React 19, TypeScript (strict)
- Plain CSS split by area in `styles/` (entry point `app/globals.css`), with no UI framework or animation library. Colours, type and spacing are tokens in `styles/tokens.css` (`--navy`, `--accent`, `--space-*` …).
- Self-hosted fonts via `next/font/local` (files in `assets/fonts/`): Barlow Condensed for display headings and Inter for body text, navigation and buttons
- pnpm 10.34.9, Node.js 24.x

## Routes

| Section | Routes |
| --- | --- |
| Home | `/` |
| About KAI | `/about`, `/about/director-message`, `/about/executive-members`, `/about/associate-states`, `/about/athlete-login`, `/about/coach-login`, `/about/judges-profile`, `/about/karate` |
| Committee | `/committee/anti-doping`, `/committee/referee`, `/committee/womens`, `/committee/kata`, `/committee/kumite`, `/committee/media`, `/committee/discipline`, `/committee/organise`, `/committee/technical`, `/committee/sports`, `/committee/athletes`, `/committee/sexual-harassment`, `/committee/medical-physio`, `/committee/objection`, `/committee/management`. There is no Committee landing page: the menu opens the list directly, shown in two columns on desktop. To add a committee: add its route to `routePaths` (`lib/types.ts`), add a page entry with `kind: "directory"` in `content/pages.ts`, add an empty member list in `content/people.ts`, add a menu item in `config/navigation.ts`, and copy any `app/committee/*/page.tsx`. Leave `focus: []` until the committee's role is confirmed. |
| Media | `/media`, `/media/news`, `/media/photo-gallery`, `/media/video-gallery` |
| Rules & Regulations | `/rules-regulations`, `/rules-regulations/kai-association-rules`, `/rules-regulations/karate-rules` |
| Membership | `/membership`, `/membership/club`, `/membership/academy` |
| Other pages | `/donations`, `/rti-governance`, `/contact`, `/privacy-policy`, `/refund-policy` (the two policy pages are linked from the footer) |
| SEO | `/sitemap.xml`, `/robots.txt` |
| Redirects | All old `/organisation/...` URLs, `/about/chairman-message`, `/organisation` (→ `/about`) and `/committee` (→ `/committee/anti-doping`). They are permanent (308) and listed in `movedPages` in `next.config.ts`. |

## Project structure

The project keeps **content** (what the association edits), **configuration** and **code** apart.

```text
app/                       Routes only. Each page.tsx is a few lines: metadata + <PageView path="…" />.
  layout.tsx               Root layout: fonts, header, footer, skip link, default metadata
  globals.css              Imports the stylesheets in /styles (order matters)
  sitemap.ts, robots.ts    Generated from the route list
content/                   Everything the client supplies or approves (edit here first)
  pages.ts                 Title, introduction, metadata, Coming Soon copy and layout for every route
  people.ts                Office bearers, executive members and committee members (+ photo paths)
  leadership.ts            Director's message and photo slider
  association.ts           Homepage introduction and mission
  states.ts                States/UTs list for the map, and verified state associations
  media.ts                 News, photo gallery and videos
  documents.ts             Rules and governance documents (PDFs)
  source/client-supplied.ts  The client's original wording, verbatim, and claims to verify
config/
  site.ts                  Name, crest, illustration, contact details, site URL
  navigation.ts            Header and footer menus
lib/                       Code helpers (no content)
  types.ts                 Route list (routePaths), ContentStatus and record types
  content-status.ts        published() / isPublished() — only "published" content is shown
  metadata.ts              Per-page <title> and description
  fonts.ts                 Self-hosted fonts via next/font
  format.ts, svg-path.ts   Date formatting; map path simplification
components/
  layout/                  Header, Navbar (desktop dropdowns), MobileMenu, Breadcrumbs, Footer
  home/                    Hero, DirectorSection, OfficeBearers, Introduction, Mission
  templates/PageView.tsx   Picks the page body for each route from content/pages.ts
  sections/<area>/         Page bodies grouped by site section:
                           about (leadership, executive members, states map), committee,
                           media, documents, membership, hub,
                           policies, donations, governance, contact
  ui/                      Reusable building blocks: ComingSoon, Icon, ImageSlider,
                           PageHero, PageContainer, SectionHeading
styles/                    tokens.css (colours, type, spacing), base, primitives,
                           layout/, components/, sections/, home.css, motion.css
assets/fonts/              Inter and Barlow Condensed (Latin subset) + OFL licences
public/                    Crest, illustration, people photos (assets/), director photos
```

Only `Navbar`, `MobileMenu` and `ImageSlider` are client components. Everything else renders on the server and ships no JavaScript.

### Why no Tailwind or UI library

The site already uses a small token-based CSS system: all colours, fonts and spacing are variables in `styles/tokens.css`. The whole stylesheet is about 9 KB compressed.

Moving to Tailwind would mean rewriting every component, with no speed benefit and a real risk of visual regressions. A component library would add JavaScript the site does not need. If the team later prefers Tailwind, it can be adopted gradually by mapping its theme to the same tokens.

## Performance

These optimisations are in place:

- **Images.** All images go through `next/image` with accurate `sizes`. Browsers get AVIF or WebP at the size actually displayed. For example, the header crest is now a ~3 KB 128 px image instead of the 29 KB original. Off-screen photos load lazily, and the hero illustration is preloaded.
- **Fonts.** Fonts are self-hosted with `next/font` (Latin subset only). They are preloaded, and metric-matched fallbacks prevent layout shift. The heavy weight used only by the homepage title loads on the homepage only.
- **Map.** The India map's coordinates are simplified when the site is built, at a precision finer than a screen pixel. This cut the Associate States HTML from 142 KB to 58 KB. Because other pages prefetch that page, this also saves bandwidth site-wide.
- **Prefetching.** Footer links don't prefetch (`prefetch={false}`), so scrolling to the footer no longer downloads about 20 other pages.
- **Rendering.** Every page is static HTML generated at build time.

Measured on a throttled mobile connection (slow 4G, 4× CPU slowdown, empty cache), compared with the previous version:

| Page | Data before → after | Largest Contentful Paint |
| --- | --- | --- |
| Home | 876 KB → 459 KB | 3.5 s → 1.4 s |
| Director's Message | 636 KB → 370 KB | 2.6 s → 1.0 s |
| Executive Members | 544 KB → 341 KB | ~0.6–0.8 s (unchanged) |
| Associate States | 514 KB → 329 KB | ~0.7–0.8 s (unchanged) |

**When adding photos,** keep originals at around 1,600 px or less on the long side; `next/image` resizes them. To replace a photo, use a new file name (see "Office bearers").

## Local setup

Use Node.js 24.x and pnpm 10.34.9. With Corepack available, you can run `corepack pnpm` in place of `pnpm`.

```sh
pnpm install --frozen-lockfile
pnpm dev          # development server
pnpm typecheck    # route types and TypeScript
pnpm build        # production build (all pages static)
pnpm start        # serve the production build
```

## Deployment (Vercel)

1. Push the repository to GitHub and import it in Vercel with the **Next.js** preset. Keep the default install, build and output settings. The committed pnpm lockfile tells Vercel which package manager to use.
2. Optional: once the production domain is **confirmed**, set the environment variable `NEXT_PUBLIC_SITE_URL` (for example `https://example.org`, with no trailing slash).
   - With the variable set, every page gets a canonical URL, and the sitemap and robots.txt use that domain.
   - Without it, no canonical URLs are emitted. The sitemap uses Vercel's production hostname (`VERCEL_PROJECT_PRODUCTION_URL`), or `http://localhost:3000` locally.
3. Deploy. Do not use `www.kai.org` until the client confirms it is their domain.

See [Vercel's GitHub integration](https://vercel.com/docs/git/vercel-for-github).

## Client-supplied content

The homepage introduction, office bearers, mission section, About KAI page, Executive Members and Director's Message use content supplied by the client.

- `content/source/client-supplied.ts` keeps the client's **original wording verbatim**, together with `claimsRequiringVerification`.
- The published versions are edited for grammar and punctuation only, with no new facts:
  - `associationIntro` in `content/association.ts`, `directorMessage` in `content/leadership.ts`, and the office bearers in `content/people.ts`;
  - the `/about` sections in `content/pages.ts`.
- Before a public production launch, confirm these statements with documentary evidence: Section 8 incorporation in 2013, 33 affiliated state associations, sole national federation status, the association of champions and WKF/AKF-qualified officials with KAI, the "millions of people" figure, the Director's name and title, the office bearers' names, designations, MLA affiliations and photographs, and each office bearer's consent to publication. The site presents them as the association's own statements and never labels them as verified or endorsed.
- Numerical highlights (counters or statistics) must use only verified, approved figures.

## Colour system

The tokens are defined at the top of `app/globals.css`.

| Token | Value | Use |
| --- | --- | --- |
| `--chakra-navy` | `#000080` | Navigation bar, headings, links, dark surfaces |
| `--india-saffron` | `#FF9933` | Primary buttons (with navy text), active-nav indicator, highlights |
| `--india-green` | `#138808` | Eyebrow labels, subtitles, secondary accents |
| `--india-white` | `#FFFFFF` | Main background, middle band of the tricolour accent |
| `--text-primary` / `--text-secondary` | `#172033` / `#576170` | Body text and secondary text |
| `--background-secondary` | `#F8FAFC` | Page heroes and alternate sections |
| `--border-color` | `#E5E7EB` | Borders |

Contrast rules:

- Saffron is too light for white text (about 2.1:1). Saffron buttons therefore use navy text (7.5:1).
- Saffron-coloured text on white uses `--accent-ink` (`#B35A00`, 4.8:1).
- The tricolour accent appears only under the header and at the top of the footer, plus one small rule in the homepage introduction.

## Editing guide

### Navigation

Edit `config/navigation.ts`.

- `mainNav` controls the header, including dropdowns and the mobile accordion.
- `footerNav` controls the footer columns.

Every `href` is checked against `routePaths` in `lib/types.ts`, so a mistyped link fails `pnpm typecheck`.

**To add a new page:**

1. Add the path to `routePaths` in `lib/types.ts`.
2. Add an entry to `pages` in `content/pages.ts`. TypeScript reports an error until you do.
3. Create `app/<path>/page.tsx`, copying any existing three-line page.
4. Add the page to `mainNav` or `footerNav` if it should appear in a menu.

The sitemap updates automatically.

### Headings, introductions and Coming Soon messages

All page copy is in `content/pages.ts`:

- `title`: the H1. It is also used for the browser tab title.
- `eyebrow`: the small label above the H1.
- `intro`: the paragraph under the H1.
- `metaDescription`: the search-engine description.
- `summaries` (bottom of the file): the one-line descriptions shown in directory rows and landing-page cards.
- `body.layout` on section landing pages: `editorial`, `directory` (grouped link rows), `features` (Media), `documents` (Rules) or `pathways` (Membership).
- `comingSoon.title` and `comingSoon.description`: the page's Coming Soon panel.

Keep the copy factual. Do not name officeholders, affiliations, recognitions or legal obligations until the association confirms them in writing.

The panel itself is `components/ui/ComingSoon.tsx`:

```tsx
<ComingSoon title="…" description="…" variant="hero | section | compact" icon="news" label="Coming soon" />
```

Use at most one Coming Soon state per page, and make the title describe the situation (for example "Members to be announced") rather than repeat the page heading.

### Content readiness: `coming-soon` → `draft` → `published`

Every KAI-specific record and section has a `status`:

| Status | Meaning | Shown publicly? |
| --- | --- | --- |
| `coming-soon` | Nothing supplied yet | No. A Coming Soon panel is shown instead. |
| `draft` | Supplied but not yet approved | **No, never** |
| `published` | Approved by the association | Yes |

**To publish material:**

1. Add it with `status: "draft"`.
2. Get written approval from the association.
3. Change the status to `"published"`.
4. Run `pnpm build` and deploy.

When at least one item in a list is published, the page swaps its Coming Soon panel for the real content.

### Add committee members or judges

1. Put photographs in `public/people/<committee>/`.
2. Add members to `content/people.ts`:

```ts
export const committees = {
  executive: [
    {
      status: "published",
      name: "Full Name",
      designation: "Official designation",
      state: "State",
      biography: "Short approved biography.",
      photo: "/people/executive/full-name.jpg",
    },
  ],
  // anti-doping, referee, womens, kata, kumite, media, judges …
};
```

The Director's message is published from `directorMessage` in `content/leadership.ts` (`name`, `designation`, `paragraphs`). Its photo slider uses `directorImages`, with the photographs stored in `public/director/`. Never use a stock or generated portrait.

### Office bearers

The office bearers are listed in `officeBearerList` in `content/people.ts`, in order of precedence. They appear on the homepage ("Office Bearers") and on the Executive Members page (`/about/executive-members`).

The positions and their order on Executive Members come from `executiveRoles` in `content/people.ts`:

- A member appears under the position that matches their `designation`.
- **Joint Secretary** is marked `alwaysShow: true`, so it is always listed. If nobody holds it, the page shows "Member details will be updated soon." with no invented name or photo.
- It is also marked `showOnHomepage: false`, so Joint Secretaries never appear on the homepage.

- Photographs live in `public/assets/`.
- Each entry takes `name`, `designation`, an optional `affiliation` (for example "MLA, Vejalpur, Gujarat") and `photo`.
- To add, remove or reorder someone, edit that list.
- Executive members who are not office bearers (for example Anjali) go in `executiveMembers`. They appear on the Executive Members page but not on the homepage.
- Other committees' members go in `committees.<key>`, for example `media`, `referee`, `womens`, `medical`, `objection` or `management`.
- **Replacing a photo:** save the new photo under a **new file name** (for example `Name-2.jpeg`) and update `photo`. Next.js caches optimised images by URL, so a file replaced under the same name keeps showing the old picture until the cache in `.next/cache/images` is cleared. If a face is cropped badly, set `photoFocus` (for example `"46% 22%"`).

### Associate States map

`/about/associate-states` shows a map of India with all 28 states and 8 union territories, each linked to its place in the list.

- The list is defined in `content/states.ts`.
- The map is drawn from the `@svg-maps/india` package (CC BY 4.0, credited under the map).
- That map data predates 2019, so Ladakh appears within the Jammu and Kashmir outline. The list notes this.
- Verified state associations go in `stateAssociations` in `content/states.ts`. A table of them appears below the map only once at least one is published; until then the page shows just the map and list.

For associate states, add entries to `stateAssociations`. Set `recognitionStatus` **only** if the recognition has been verified.

### Publish news, photographs and videos

All three lists are in `content/media.ts`. Store images under `public/media/…`.

```ts
export const newsArticles = [
  {
    status: "published",
    slug: "unique-slug",
    title: "Headline",
    date: "2027-01-15",
    summary: "One-paragraph summary.",
    image: { src: "/media/news/photo.jpg", alt: "Describe the photo" },
    href: "https://…", // optional link for "Read more"
  },
];

export const galleryPhotos = [
  {
    status: "published",
    src: "/media/gallery/event-01.jpg",
    alt: "What the photo shows",
    caption: "Event, place, date",
    width: 1600,
    height: 1200,
  },
];

export const videos = [
  {
    status: "published",
    title: "Title",
    date: "2027-01-15",
    youtubeId: "VIDEO_ID", // embedded via youtube-nocookie.com
  },
];
```

Use only official, approved photographs and videos. Never use stock imagery to represent KAI events.

### Publish rules and governance documents

Place PDFs in `public/documents/`. Then add entries to `documents["association-rules"]`, `documents["karate-rules"]` or `documents.governance` in `content/documents.ts`. Each entry takes `title`, `description`, `category`, `version`, `publishedOn` and `file`.

### Membership, governance and policy text

The membership and RTI & Governance sections are defined in `content/pages.ts`. To publish a section:

1. Set its `status` to `"published"`.
2. Add a `body` array of approved paragraphs.

The privacy and refund policies remain "Document pending" until the official text is supplied. Replace the `policy` body in their entries with an `info` body that contains the approved sections.

### Contact details

Fill in `siteConfig.contact` in `config/site.ts` with verified details only:

- `address`, `email`, `phone` and `officeHours`. Until a field is set, the Contact page shows it as "Awaiting confirmation".
- `mapUrl`. The "View on map" link appears only when both `address` and `mapUrl` are set.

### Contact form

`/contact` has a full enquiry form: name, email, phone, enquiry type, subject, message and consent. It validates input in the browser.

There is no backend yet, so **sending is switched off**. The button is disabled, a notice says "Enquiry submission will be available soon", and nothing is sent anywhere.

To switch it on later:

1. Create a server-side Route Handler, for example `app/api/contact/route.ts`. It should send the email through a provider such as Resend, SES or SMTP.
2. Store the provider's credentials in **server-side environment variables** only, never in client code.
3. In that handler:
   - validate the input again on the server;
   - ignore requests where the hidden `website` field is filled (this is the spam honeypot);
   - add rate limiting.
4. Set `contactForm.endpoint` in `config/site.ts` to `"/api/contact"`.
5. The form will then POST its fields as JSON. It shows the success message only when the endpoint returns a 2xx response.

Before enabling, publish the approved Privacy Policy, because the consent checkbox links to it.

### Enabling logins, membership applications or donations later

The athlete and coach pages describe the planned features only. They have no sign-in form and no input fields. There is no authentication, payment system or backend in this phase.

When the association approves a future phase:

1. Choose and set up the authentication or payment provider and the backend. This needs a privacy policy and a refund policy that the association has approved.
2. Replace `PortalPreview` in `components/sections/portal.tsx`, or add a new page body kind, with the real implementation. Use client components only where interaction is needed.
3. Publish the approved privacy and refund policies **before** collecting any personal data or payments.

## Assets

- `public/kai-crest.jpg` is the original crest supplied by the client. The header and footer serve this file directly.
- `public/karate.webp` is a separate illustration generated with the built-in ImageGen tool from this prompt:

  > A single Indian karate athlete performs a high side kick in a white gi and black belt. Full body, sumi-e black ink and dry brush on pure white, a vermilion sun disk behind the figure. Square composition, white margins, no lettering.
