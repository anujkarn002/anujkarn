"use client";
import { useState, FormEvent } from "react";
import { FaPaperPlane } from "react-icons/fa";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.get("name"),
          email: data.get("email"),
          message: data.get("message"),
          company: data.get("company"),
        }),
      });

      if (!res.ok) {
        const { error } = await res.json().catch(() => ({ error: "Something went wrong." }));
        setErrorMessage(error || "Something went wrong.");
        setStatus("error");
        return;
      }

      setStatus("sent");
      form.reset();
    } catch {
      setErrorMessage("Network error — please try again.");
      setStatus("error");
    }
  }

  return (
    <main className="relative min-h-screen w-full flex flex-col items-center font-mono text-white">
      <div className="flex flex-col items-center w-full px-6 pt-24 pb-12" style={{ minHeight: '70vh' }}>
        <h1 className="text-4xl md:text-6xl font-orbitron font-black text-white mb-4 tracking-tight text-center retro-shadow glow-text-cyan">Contact</h1>
        <p className="text-white/60 text-sm text-center max-w-md mb-8">
          Send a message and it'll land straight in my Discord.
        </p>

        <form onSubmit={handleSubmit} className="hud-panel rounded-lg p-6 w-full max-w-md flex flex-col gap-4">
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            className="hidden"
            aria-hidden="true"
          />

          <label className="flex flex-col gap-1 text-sm text-white/70">
            Name
            <input
              name="name"
              required
              className="bg-black/40 border border-white/15 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-white/70">
            Email
            <input
              type="email"
              name="email"
              required
              className="bg-black/40 border border-white/15 rounded px-3 py-2 text-white focus:outline-none focus:border-accent"
            />
          </label>

          <label className="flex flex-col gap-1 text-sm text-white/70">
            Message
            <textarea
              name="message"
              required
              rows={5}
              className="bg-black/40 border border-white/15 rounded px-3 py-2 text-white focus:outline-none focus:border-accent resize-none"
            />
          </label>

          <button
            type="submit"
            disabled={status === "sending"}
            className="retro-link resume-btn flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <FaPaperPlane className="text-xs" />
            {status === "sending" ? "Sending…" : "Send message"}
          </button>

          {status === "sent" && (
            <p className="text-accent text-sm text-center">Message sent — thanks for reaching out!</p>
          )}
          {status === "error" && (
            <p className="text-amber text-sm text-center">{errorMessage}</p>
          )}
        </form>
      </div>
    </main>
  );
}
