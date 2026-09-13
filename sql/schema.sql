-- Run once against your Neon database (Neon SQL editor, or `psql "$DATABASE_URL" -f sql/schema.sql`).
-- Not run automatically by the app.

create table if not exists contact_messages (
  id serial primary key,
  name text not null,
  email text not null,
  message text not null,
  discord_delivered boolean not null default false,
  created_at timestamptz not null default now()
);
