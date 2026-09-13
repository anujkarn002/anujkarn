import Link from "next/link";
import type { Mode } from "../../lib/mode";
import type { SiteContent } from "../../lib/site";
import NoteComposer from "./NoteComposer";

function Socials({ site, vertical = false }: { site: SiteContent; vertical?: boolean }) {
  return (
    <div className={`flex ${vertical ? "flex-col items-end gap-1.5" : "gap-8 items-baseline flex-wrap"}`}>
      <a className="label" style={{ color: "var(--fg)" }} href={`mailto:${site.email}`}>{site.email}</a>
      <a className="label" style={{ color: "var(--fg)" }} href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
      <a className="label" style={{ color: "var(--fg)" }} href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
      <a className="label" style={{ color: "var(--fg)" }} href={site.resume} target="_blank" rel="noopener noreferrer">CV</a>
    </div>
  );
}

export default function Contact({ mode, site, full = false }: { mode: Mode; site: SiteContent; full?: boolean }) {
  if (mode === "instrument") {
    return (
      <section className={`gutter ${full ? "pt-16" : "pt-[140px]"} pb-16`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-10 items-end">
          <div className="md:col-span-8">
            <div className="rule" />
            <h2 className="display m-0 mt-7" style={{ fontSize: "clamp(36px, 4.6vw, 64px)", lineHeight: 1, letterSpacing: "-0.01em" }}>
              {site.contactInstrument}{" "}
              {full ? (
                <span>{site.contactInstrumentLink}</span>
              ) : (
                <Link href="/contact" style={{ borderBottom: "2px solid var(--fg)" }}>{site.contactInstrumentLink}</Link>
              )}
            </h2>
          </div>
          <div className="md:col-start-10 md:col-span-3 md:justify-self-end">
            <Socials site={site} vertical />
          </div>
          {full && (
            <div className="md:col-span-8 mt-6">
              <NoteComposer mode={mode} email={site.email} />
            </div>
          )}
        </div>
      </section>
    );
  }

  if (mode === "workshop") {
    return (
      <section className="px-6 pt-14 pb-16 flex flex-col gap-6" style={{ background: "var(--bg)" }}>
        <div className="label">§ 05 — Contact</div>
        {full ? (
          <NoteComposer mode={mode} email={site.email} />
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
          <Socials site={site} />
        </div>
      </section>
    );
  }

  return (
    <section className={`gutter ${full ? "pt-16" : "pt-[220px]"} pb-20 flex flex-col gap-10`}>
      <h2 className="display m-0" style={{ fontSize: "clamp(48px, 6.6vw, 96px)", lineHeight: 0.95, letterSpacing: "-0.03em", maxWidth: 1000 }}>
        <em>{site.contactDeepfieldEmphasis}</em> {site.contactDeepfield}
      </h2>
      <Socials site={site} />
      {full && (
        <div className="mt-6">
          <NoteComposer mode={mode} email={site.email} />
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
