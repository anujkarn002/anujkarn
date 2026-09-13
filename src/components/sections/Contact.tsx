import Link from "next/link";
import type { Mode } from "../../lib/mode";
import { site } from "../../lib/site";
import NoteComposer from "./NoteComposer";

function Socials({ vertical = false }: { vertical?: boolean }) {
  return (
    <div className={`flex ${vertical ? "flex-col items-end gap-1.5" : "gap-8 items-baseline flex-wrap"}`}>
      <a className="label" style={{ color: "var(--fg)" }} href={`mailto:${site.email}`}>{site.email}</a>
      <a className="label" style={{ color: "var(--fg)" }} href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
      <a className="label" style={{ color: "var(--fg)" }} href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a className="label" style={{ color: "var(--fg)" }} href={site.resume} download>CV</a>
    </div>
  );
}

export default function Contact({ mode, full = false }: { mode: Mode; full?: boolean }) {
  if (mode === "instrument") {
    return (
      <section className={`gutter ${full ? "pt-16" : "pt-[140px]"} pb-16`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-10 items-end">
          <div className="md:col-span-8">
            <div className="rule" />
            <h2 className="display m-0 mt-7" style={{ fontSize: "clamp(36px, 4.6vw, 64px)", lineHeight: 1, letterSpacing: "-0.01em" }}>
              Working on something with atoms in it?{" "}
              {full ? (
                <span>Write to me.</span>
              ) : (
                <Link href="/contact" style={{ borderBottom: "2px solid var(--fg)" }}>Write to me.</Link>
              )}
            </h2>
          </div>
          <div className="md:col-start-10 md:col-span-3 md:justify-self-end">
            <Socials vertical />
          </div>
          {full && (
            <div className="md:col-span-8 mt-6">
              <NoteComposer mode={mode} />
            </div>
          )}
        </div>
      </section>
    );
  }

  if (mode === "workshop") {
    return (
      <section className="px-6 pt-14 pb-16 flex flex-col gap-6" style={{ background: "var(--bg)" }}>
        <div className="label">§ 04 — Contact</div>
        {full ? (
          <NoteComposer mode={mode} />
        ) : (
          <div style={{ fontFamily: "var(--font-mono)", fontSize: 22, lineHeight: 1.5 }}>
            <span style={{ color: "var(--accent)" }}>$</span> mail {site.email}
            <br />
            <span style={{ color: "var(--faint)" }}>{"// or "}<Link href="/contact" style={{ color: "var(--fg)", borderBottom: "1px solid var(--line-strong)" }}>leave a note</Link> — it lands in my Discord</span>
            <br />
            <span style={{ color: "var(--accent)" }}>&gt;</span> <span className="caret" />
          </div>
        )}
        <div className="mt-4">
          <Socials />
        </div>
      </section>
    );
  }

  return (
    <section className={`gutter ${full ? "pt-16" : "pt-[220px]"} pb-20 flex flex-col gap-10`}>
      <h2 className="display m-0" style={{ fontSize: "clamp(48px, 6.6vw, 96px)", lineHeight: 0.95, letterSpacing: "-0.03em", maxWidth: 1000 }}>
        <em>Say hello.</em> I read everything.
      </h2>
      <Socials />
      {full && (
        <div className="mt-6">
          <NoteComposer mode={mode} />
        </div>
      )}
      {!full && (
        <Link href="/contact" className="label" style={{ color: "var(--faint)" }}>
          Or leave a note here →
        </Link>
      )}
    </section>
  );
}
