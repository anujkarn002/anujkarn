import Link from "next/link";
import type { Flavor } from "../../lib/flavor";
import type { SiteContent, ExperienceItem } from "../../lib/site";
import { OrbitFigure } from "./Figures";

export default function Hero({ flavor, site, experience }: { flavor: Flavor; site: SiteContent; experience: ExperienceItem[] }) {
  const previous = experience.filter((e) => !e.current).map((e) => e.company);

  if (flavor === "instrument") {
    return (
      <section className="gutter pt-16 md:pt-[72px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12">
          <div className="md:col-span-7 flex flex-col gap-10">
            <h1
              className="display rise m-0"
              style={{ fontSize: "clamp(52px, 8vw, 116px)", lineHeight: 0.94, letterSpacing: "-0.02em", textWrap: "balance" }}
            >
              {site.headlineInstrument}
            </h1>
            <p className="rise rise-2 m-0 max-w-[560px]" style={{ fontSize: 19, lineHeight: 1.5, color: "var(--muted)" }}>
              {site.role} at {site.company}. {site.summary}
              {previous.length > 0 && ` Previously ${previous.join(", ")}.`}
            </p>
            <div className="rise rise-3 flex gap-8 items-center">
              <Link href="/work" className="label pb-1" style={{ color: "var(--fg)", borderBottom: "1px solid var(--fg)" }}>
                Selected work ↓
              </Link>
              <a href={site.resume} className="label" target="_blank" rel="noopener noreferrer">
                Résumé, PDF
              </a>
            </div>
          </div>
          <div className="md:col-start-9 md:col-span-4 hidden md:flex flex-col gap-3 items-end">
            <OrbitFigure />
            <div className="label text-right">Fig. 1 — Transfer orbit, not to scale</div>
          </div>
        </div>
      </section>
    );
  }

  if (flavor === "workshop") {
    const lines = site.headlineWorkshop.split("\n").filter(Boolean);
    const stack = site.stack.slice(0, 9);
    const rows = [stack.slice(0, 3), stack.slice(3, 6), stack.slice(6, 9)].filter((r) => r.length);
    return (
      <section className="grid grid-cols-1 md:grid-cols-12" style={{ background: "var(--bg)" }}>
        <div className="md:col-span-8 px-6 pt-16 pb-14 flex flex-col gap-10" style={{ borderRight: "1px solid var(--line)" }}>
          <div className="label">§ 00 — Statement</div>
          <h1 className="display rise m-0 uppercase" style={{ fontSize: "clamp(56px, 9vw, 128px)", lineHeight: 0.88, letterSpacing: "-0.045em" }}>
            {lines.map((line, i) => (
              <span key={i} style={{ display: "block", color: i === lines.length - 1 && lines.length > 1 ? "var(--accent)" : undefined }}>
                {line}
              </span>
            ))}
          </h1>
          <p className="rise rise-2 m-0 max-w-[620px] font-medium" style={{ fontSize: 18, lineHeight: 1.5, color: "var(--muted)" }}>
            {site.role} at {site.company}. {site.summary}
          </p>
        </div>
        <div className="md:col-span-4 grid grid-rows-3" style={{ borderTop: "1px solid var(--line)" }}>
          <div className="p-6 flex flex-col justify-between gap-6" style={{ borderBottom: "1px solid var(--line)" }}>
            <div className="label">Current</div>
            <div className="display" style={{ fontSize: 26, letterSpacing: "-0.02em", lineHeight: 1.1, fontWeight: 800 }}>
              {site.company}
            </div>
          </div>
          <div className="p-6 flex flex-col justify-between gap-6" style={{ borderBottom: "1px solid var(--line)" }}>
            <div className="label">Previously</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.6, color: "var(--muted)" }}>
              {previous.map((p) => (
                <div key={p}>{p}</div>
              ))}
            </div>
          </div>
          <div className="p-6 flex flex-col justify-between gap-6">
            <div className="label">Stack</div>
            <div style={{ fontFamily: "var(--font-mono)", fontSize: 13, lineHeight: 1.6, color: "var(--muted)" }}>
              {rows.map((r, i) => (
                <div key={i}>{r.join(" · ")}</div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="gutter pt-24 md:pt-[180px] flex flex-col gap-14">
      <h1
        className="display rise m-0"
        style={{ fontSize: "clamp(56px, 10.5vw, 152px)", lineHeight: 0.92, letterSpacing: "-0.035em", maxWidth: 1180, textWrap: "balance" }}
      >
        {site.headlineDeepfield}
      </h1>
      <div className="rise rise-2 grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-10">
        <p className="md:col-span-5 m-0 font-light" style={{ fontSize: 22, lineHeight: 1.45, color: "var(--muted)" }}>
          {site.role} at {site.company}. {site.summary}
        </p>
        <div className="md:col-start-9 md:col-span-4 flex flex-col gap-2.5 md:self-end">
          <div className="label">Currently</div>
          <div className="font-light" style={{ fontSize: 18 }}>
            {site.company}, {site.location}
          </div>
          {previous.length > 0 && (
            <>
              <div className="label mt-4">Before</div>
              <div className="font-light" style={{ fontSize: 18 }}>
                {previous.join(" · ")}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
}
