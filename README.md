# Karate Association of India — website

The official website of the Karate Association of India (KAI), currently in its **pre-launch phase**. Every section of the site exists and can be navigated. Each page has its own heading and introduction, and shows a Coming Soon panel until the association approves official content.

No official facts are invented. Officeholders, committee members, state associations, policies, fees, contact details, news and media start out **empty**, and they appear only after they are added and marked `published`.

## Tech stack

- Next.js 16 (App Router, Turbopack), all pages statically prerendered
- React 19, TypeScript (strict)
- Plain CSS in `app/globals.css`, with no UI framework or animation library. Colours, type and spacing are CSS tokens at the top of the file (`--navy`, `--accent`, `--space-*` …).
- Self-hosted fonts: `@fontsource/barlow-condensed` for display headings and `@fontsource-variable/inter` for body text, navigation and buttons
- pnpm 10.34.9, Node.js 24.x

## Routes

| Section | Routes |
| --- | --- |
| Home | `/` |
| About KAI | `/about`, `/about/athlete-login`, `/about/coach-login`, `/about/judges-profile`, `/about/karate` |
| Organisation | `/organisation`, `/organisation/president-message`, `/organisation/executive-committee`, `/organisation/anti-doping-committee`, `/organisation/referee-committee`, `/organisation/womens-committee`, `/organisation/kata-committee`, `/organisation/kumite-committee`, `/organisation/media-committee`, `/organisation/associate-states` |
| Media | `/media`, `/media/news`, `/media/photo-gallery`, `/media/video-gallery` |
| Rules & Regulations | `/rules-regulations`, `/rules-regulations/kai-association-rules`, `/rules-regulations/karate-rules` |
| Membership | `/membership`, `/membership/club`, `/membership/academy` |
| Other pages | `/donations`, `/rti-governance`, `/contact`, `/privacy-policy`, `/refund-policy` (the two policy pages are linked from the footer) |
| SEO | `/sitemap.xml`, `/robots.txt` |

## Project structure

```text
app/                     Route folders. Each page.tsx is a few lines long.
  layout.tsx             Header, footer, skip link and default metadata
  sitemap.ts, robots.ts  Generated from the route list
components/
  layout/                Header, Navbar (desktop dropdowns), MobileMenu, Breadcrumbs, Footer
  home/                  Hero (original poster), QuickLinks (section directory)
  shared/                ComingSoon, PageHero, PageView, SectionHeading, PageContainer, Icon
  sections/              Page templates: hubs (landing-page layouts), directories, media, documents, portal, info pages, contact
lib/
  types.ts               Route list (routePaths), ContentStatus and record types
  navigation.ts          Header and footer menus
  page-content.ts        Title, introduction, metadata and Coming Soon copy for every route
  content-data.ts        Approved records: committee members, news, photos, videos, documents, states
  site-config.ts         Name, crest, illustration, contact details and site URL
  metadata.ts            Per-page <title> and description
public/
  kai-crest.jpg          Original client-supplied crest. Do not replace it.
  karate.webp            Karate illustration (see "Assets" below)
```

Only `Navbar` and `MobileMenu` are client components. All other components render on the server.

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

## Editing guide

### Navigation

Edit `lib/navigation.ts`.

- `mainNav` controls the header, including dropdowns and the mobile accordion.
- `footerNav` controls the footer columns.

Every `href` is checked against `routePaths` in `lib/types.ts`, so a mistyped link fails `pnpm typecheck`.

**To add a new page:**

1. Add the path to `routePaths` in `lib/types.ts`.
2. Add an entry to `pages` in `lib/page-content.ts`. TypeScript reports an error until you do.
3. Create `app/<path>/page.tsx`, copying any existing three-line page.
4. Add the page to `mainNav` or `footerNav` if it should appear in a menu.

The sitemap updates automatically.

### Headings, introductions and Coming Soon messages

All page copy is in `lib/page-content.ts`:

- `title`: the H1. It is also used for the browser tab title.
- `eyebrow`: the small label above the H1.
- `intro`: the paragraph under the H1.
- `metaDescription`: the search-engine description.
- `summaries` (bottom of the file): the one-line descriptions shown in directory rows and landing-page cards.
- `body.layout` on section landing pages: `editorial` (About), `directory` (Organisation), `features` (Media), `documents` (Rules) or `pathways` (Membership).
- `comingSoon.title` and `comingSoon.description`: the page's Coming Soon panel.

Keep the copy factual. Do not name officeholders, affiliations, recognitions or legal obligations until the association confirms them in writing.

The panel itself is `components/shared/ComingSoon.tsx`:

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
2. Add members to `lib/content-data.ts`:

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

For the President's message, fill in `presidentMessage` (`name`, `designation`, `portrait` and `paragraphs`) and set its `status` to `"published"`.

For associate states, add entries to `stateAssociations`. Set `recognitionStatus` **only** if the recognition has been verified.

### Publish news, photographs and videos

All three lists are in `lib/content-data.ts`. Store images under `public/media/…`.

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

Place PDFs in `public/documents/`. Then add entries to `documents["association-rules"]`, `documents["karate-rules"]` or `documents.governance` in `lib/content-data.ts`. Each entry takes `title`, `description`, `category`, `version`, `publishedOn` and `file`.

### Membership, governance and policy text

The membership and RTI & Governance sections are defined in `lib/page-content.ts`. To publish a section:

1. Set its `status` to `"published"`.
2. Add a `body` array of approved paragraphs.

The privacy and refund policies remain "Document pending" until the official text is supplied. Replace the `policy` body in their entries with an `info` body that contains the approved sections.

### Contact details

Fill in `siteConfig.contact` (`email`, `phone`, `address`) in `lib/site-config.ts` with verified details only. The Contact page and footer then show them automatically.

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
