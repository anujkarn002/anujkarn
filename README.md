This is the source for [anujkarn.dev](https://anujkarn.dev) — a [Next.js](https://nextjs.org) (App Router) site with a space/robotics theme, a Sanity-backed blog, a Neon + Vercel Blob gallery, and a Discord-connected contact form.

## Getting started

```bash
bun install
bun dev
```

Open [http://localhost:3000](http://localhost:3000). The site renders fine with no integrations configured — blog and gallery show an empty state, and the contact form returns a friendly error — until you set up the services below.

## One-time setup

1. **Sanity (blog)** — create a free project at [sanity.io](https://sanity.io) (or run `bunx sanity@latest init` locally). Copy `.env.local.example` to `.env.local` and fill in `NEXT_PUBLIC_SANITY_PROJECT_ID` / `NEXT_PUBLIC_SANITY_DATASET`. Visit `/studio` to write posts.
2. **Neon (gallery metadata + contact log)** — create a database, add its connection string as `DATABASE_URL`, then run the schema once:
   ```bash
   psql "$DATABASE_URL" -f sql/schema.sql
   ```
3. **Vercel Blob (gallery images + Sanity backups)** — run `vercel link`, then `vercel blob create-store <name> --access public --yes` (or connect an existing store with `vercel storage connect <name> --auth oidc --yes`). This authenticates via short-lived OIDC tokens rather than a static secret, so run `vercel env pull` periodically in local dev to keep `VERCEL_OIDC_TOKEN` fresh.
4. **Discord contact form** — create a webhook on the target channel and set `DISCORD_WEBHOOK_URL`.
5. **Gallery uploads** — set `GALLERY_UPLOAD_SECRET` to any random string; `POST /api/gallery` (multipart form: `file`, optional `caption`, `tags`, `sortOrder`) requires it in an `x-upload-secret` header.
6. **Sanity backups (optional)** — set `SANITY_API_TOKEN` (a read-only token from sanity.io/manage) so the daily cron at `/api/cron/sanity-backup` (see `vercel.json`) can export the dataset into Blob. Set `CRON_SECRET` to restrict who can call it directly.

All of these are read from environment variables at runtime — see `.env.local.example` for the full list. Add the real values to your Vercel project's environment variables for production.

## Architecture

- **Blog**: Sanity Studio embedded at `/studio`; posts are queried server-side via GROQ (`src/sanity/lib/queries.ts`) and rendered at `/posts` and `/posts/[slug]`.
- **Gallery**: image binaries live in Vercel Blob; metadata (caption/tags/order) lives in Neon (`gallery_images` table) and is queried directly from the `/gallery` page.
- **Contact**: `/contact` posts to `/api/contact`, which relays to the Discord webhook and logs a durable copy to Neon (`contact_messages` table).

## Learn more

- [Next.js Documentation](https://nextjs.org/docs)
- [Sanity Documentation](https://www.sanity.io/docs)
- [Neon Documentation](https://neon.tech/docs)
- [Vercel Blob Documentation](https://vercel.com/docs/storage/vercel-blob)

## Deploy on Vercel

Deploy via the [Vercel Platform](https://vercel.com/new), then add the environment variables from `.env.local.example` in the project settings.
