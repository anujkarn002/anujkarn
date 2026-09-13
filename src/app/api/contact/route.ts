import { NextRequest, NextResponse } from "next/server";
import { sql, isDbConfigured } from "../../../lib/db";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const { name, email, message, company } = body as {
    name?: string;
    email?: string;
    message?: string;
    company?: string; // honeypot — real users never fill this in
  };

  if (company) {
    // Bot filled the honeypot field — silently accept without doing anything.
    return NextResponse.json({ ok: true });
  }

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "Name, email, and message are required." }, { status: 400 });
  }

  let discordDelivered = false;
  if (process.env.DISCORD_WEBHOOK_URL) {
    try {
      const res = await fetch(process.env.DISCORD_WEBHOOK_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          embeds: [
            {
              title: "New contact form message",
              color: 0x5ee7ff,
              fields: [
                { name: "Name", value: name },
                { name: "Email", value: email },
                { name: "Message", value: message.slice(0, 1000) },
              ],
              timestamp: new Date().toISOString(),
            },
          ],
        }),
      });
      discordDelivered = res.ok;
    } catch {
      discordDelivered = false;
    }
  }

  if (isDbConfigured) {
    try {
      await sql!`
        insert into contact_messages (name, email, message, discord_delivered)
        values (${name}, ${email}, ${message}, ${discordDelivered})
      `;
    } catch {
      // Table not migrated yet (see sql/schema.sql) — the message still went to Discord if configured.
    }
  }

  if (!discordDelivered && !isDbConfigured) {
    return NextResponse.json(
      { error: "Contact form isn't fully configured yet — message was not delivered." },
      { status: 503 }
    );
  }

  return NextResponse.json({ ok: true });
}
