"use client";
import { useState } from "react";
import type { Mode } from "../../lib/mode";
import { site } from "../../lib/site";

type Status = "idle" | "sending" | "sent" | "error";

export default function NoteComposer({ mode }: { mode: Mode }) {
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");
  const [from, setFrom] = useState("");
  const [note, setNote] = useState("");

  async function send() {
    if (!note.trim() || !from.trim()) return;
    setStatus("sending");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: from, email: from, message: note }),
      });
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Couldn't send that.");
        setStatus("error");
        return;
      }
      setStatus("sent");
      setNote("");
    } catch {
      setError("Network error.");
      setStatus("error");
    }
  }

  const mono = { fontFamily: "var(--font-mono)", fontSize: mode === "workshop" ? 16 : 14, color: "var(--fg)" } as const;
  const field = {
    ...mono,
    background: "transparent",
    border: "none",
    borderBottom: "1px solid var(--line-strong)",
    padding: "10px 0",
    outline: "none",
    width: "100%",
  } as const;

  if (status === "sent") {
    return (
      <p style={mono} className="m-0">
        {mode === "workshop" ? "> sent. I'll read it." : "Sent — I'll read it."}
      </p>
    );
  }

  return (
    <form
      className="flex flex-col gap-5 max-w-[560px]"
      onSubmit={(e) => {
        e.preventDefault();
        send();
      }}
    >
      {mode === "workshop" && (
        <div style={{ ...mono, color: "var(--faint)" }}>
          <span style={{ color: "var(--accent)" }}>$</span> mail {site.email}
          <br />
          <span>{"// or leave a note — it lands in my Discord"}</span>
        </div>
      )}
      <input
        style={field}
        placeholder={mode === "workshop" ? "> your email" : "Your email"}
        value={from}
        onChange={(e) => setFrom(e.target.value)}
        type="email"
        required
        aria-label="Your email"
      />
      <textarea
        style={{ ...field, resize: "none", minHeight: 96 }}
        placeholder={mode === "workshop" ? "> note" : "A note"}
        value={note}
        onChange={(e) => setNote(e.target.value)}
        required
        aria-label="Your note"
      />
      <div className="flex items-center gap-6">
        <button type="submit" disabled={status === "sending"} className="label disabled:opacity-50" style={{ color: "var(--fg)", borderBottom: "1px solid var(--fg)", paddingBottom: 3 }}>
          {status === "sending" ? "Sending…" : mode === "workshop" ? "Send ↵" : "Send"}
        </button>
        {status === "error" && <span className="label" style={{ color: "var(--accent)" }}>{error}</span>}
      </div>
    </form>
  );
}
