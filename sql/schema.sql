-- Run once against your Neon database (Neon SQL editor, or `psql "$DATABASE_URL" -f sql/schema.sql`).
-- Not run automatically by the app.

create table if not exists gallery_images (
  id serial primary key,
  url text not null,
  caption text,
  tags text[] default '{}',
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists contact_messages (
  id serial primary key,
  name text not null,
  email text not null,
  message text not null,
  discord_delivered boolean not null default false,
  created_at timestamptz not null default now()
);
