This is the source for [anujkarn.dev](https://anujkarn.dev) — a [Next.js](https://nextjs.org) (App Router) site with three switchable design flavors, all content (bio, experience, projects, posts, photographs) managed in Sanity Studio, and a Discord-connected contact form.

## Getting started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000). The site renders from built-in fallback content until Sanity is configured; the contact form returns a friendly error until the Discord webhook is set.

## One-time setup

1. **Sanity (blog)** — create a free project at [sanity.io](https://sanity.io) (or run `bunx sanity@latest init` locally). Copy `.env.local.example` to `.env.local` and fill in `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`. Everything editable lives at `/studio`: **Site settings** (name, title, headlines, email, résumé PDF, education), **Posts**, **Projects**, **Experience** and **Photographs**.
2. **Neon (contact log)** — create a database, add its connection string as `DATABASE_URL`, then run the schema once:
   ```bash
   psql "$DATABASE_URL" -f sql/schema.sql
   ```
3. **Vercel Blob (Sanity backups)** — run `vercel link`, then `vercel blob create-store <name> --access public --yes` (or connect an existing store with `vercel storage connect <name> --auth oidc --yes`). This authenticates via short-lived OIDC tokens rather than a static secret, so run `vercel env pull` periodically in local dev to keep `VERCEL_OIDC_TOKEN` fresh.
4. **Discord contact form** — create a webhook on the target channel and set `DISCORD_WEBHOOK_URL`.
5. **Sanity backups (optional)** — set `SANITY_API_TOKEN` (a read-only token from sanity.io/manage) so the daily cron at `/api/cron/sanity-backup` (see `vercel.json`) can export the dataset into Blob. Set `CRON_SECRET` to restrict who can call it directly.

All of these are read from environment variables at runtime — see `.env.local.example` for the full list. Add the real values to your Vercel project's environment variables for production.

## Architecture

- **Blog**: Sanity Studio embedded at `/studio`; posts are queried server-side via GROQ (`src/sanity/lib/queries.ts`) and rendered at `/writing` and `/writing/[slug]`.
- **Photographs**: `photo` documents in Sanity, served through the Sanity image CDN at `/field`.
- **Everything else**: a `settings` singleton plus `project` and `experience` documents in Sanity, with code fallbacks in `src/lib/site.ts` and `src/lib/projects.ts` used only when a document is missing.
- **Design flavors**: three distinct layouts (Instrument, Deep Field, Workshop) selected by a `design-flavor` cookie and rendered server-side — see `src/lib/flavor.ts` and `src/components/sections/*`.
- **Contact**: `/contact` posts to `/api/contact`, which relays to the Discord webhook and logs a durable copy to Neon (`contact_messages` table).

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)

## Deploy on Vercel

Deploy via the [Vercel Platform](https://vercel.com/new), then add the environment variables from `.env.local.example` in the project settings.
