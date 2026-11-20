# Karate Association of India

A single coming-soon page built with Next.js App Router, TypeScript, and pnpm. It renders as static HTML at build time. The fonts and images are bundled with the project.

## Local development

Use Node.js 24.x and pnpm 10.34.9. With Corepack available, you can run `corepack pnpm` in place of `pnpm`.

```sh
pnpm install --frozen-lockfile
pnpm dev
```

Open the local address printed by Next.js. To check types and test the production build, run the following commands.

```sh
pnpm typecheck
pnpm build
pnpm start
```

## Publish to GitHub and Vercel

1. Create an empty GitHub repository for the client.
2. From this project's root, run the commands below with your repository URL.

   ```sh
   git remote add origin https://github.com/YOUR-ACCOUNT/YOUR-REPOSITORY.git
   git push -u origin main
   ```

3. In Vercel, choose **New Project**, connect GitHub, and import that repository.
4. Use the repository root and the **Next.js** framework preset. Keep the default install, build, and output settings. The committed pnpm lockfile identifies the package manager. The page requires no environment variables.
5. Select **Deploy**. Vercel provides a production URL and deploys subsequent pushes to the production branch.

See [Vercel's GitHub integration](https://vercel.com/docs/git/vercel-for-github) and [package manager detection](https://vercel.com/docs/package-managers).

## Edit the page

- `app/page.tsx` contains the announcement and association name.
- `app/globals.css` controls the layout and mobile styling.
- `app/layout.tsx` contains the browser title, description, and site icon.
- `public/kai-crest.jpg` is the original client-supplied JPEG. The header serves this file directly.
- `public/karate.webp` is the separate illustration generated with the built-in ImageGen tool using the following prompt.

  > A single Indian karate athlete performs a high side kick in a white gi and black belt. Full body, sumi-e black ink and dry brush on pure white, a vermilion sun disk behind the figure. Square composition, white margins, no lettering.
