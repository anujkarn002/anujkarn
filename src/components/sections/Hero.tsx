import Link from "next/link";
import type { Mode } from "../../lib/mode";
import { site } from "../../lib/site";
import { OrbitFigure } from "./Figures";

const previous = site.experience.filter((e) => !e.current).map((e) => e.company.split(" ")[0]);

export default function Hero({ mode }: { mode: Mode }) {
  if (mode === "instrument") {
    return (
      <section className="gutter pt-16 md:pt-[72px]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-12">
          <div className="md:col-span-7 flex flex-col gap-10">
            <h1
              className="display rise m-0"
              style={{ fontSize: "clamp(52px, 8vw, 116px)", lineHeight: 0.94, letterSpacing: "-0.02em", textWrap: "balance" }}
            >
              Software that has to <em>survive</em> contact with the real world.
            </h1>
            <p className="rise rise-2 m-0 max-w-[560px]" style={{ fontSize: 19, lineHeight: 1.5, color: "var(--muted)" }}>
              {site.role} at {site.company}. {site.summary} Previously {previous.join(", ")}.
            </p>
            <div className="rise rise-3 flex gap-8 items-center">
              <Link href="/work" className="label pb-1" style={{ color: "var(--fg)", borderBottom: "1px solid var(--fg)" }}>
                Selected work ↓
              </Link>
              <a href={site.resume} className="label" download>
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

  if (mode === "workshop") {
    return (
      <section className="grid grid-cols-1 md:grid-cols-12" style={{ background: "var(--bg)" }}>
        <div className="md:col-span-8 px-6 pt-16 pb-14 flex flex-col gap-10" style={{ borderRight: "1px solid var(--line)" }}>
          <div className="label">§ 00 — Statement</div>
          <h1
            className="display rise m-0 uppercase"
            style={{ fontSize: "clamp(56px, 9vw, 128px)", lineHeight: 0.88, letterSpacing: "-0.045em" }}
          >
            Build it.
            <br />
            Ship it.
            <br />
            <span style={{ color: "var(--accent)" }}>Keep it running.</span>
          </h1>
          <p className="rise rise-2 m-0 max-w-[620px] font-medium" style={{ fontSize: 18, lineHeight: 1.5, color: "var(--muted)" }}>
            {site.role} at {site.company}. Mobile, web and backend, end to end — lately agentic AI and data platforms on
            Databricks, GCP and Azure.
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
              {site.stack.languages.map((s) => s.toLowerCase()).join(" · ")}
              <br />
              {site.stack.platforms.slice(0, 3).map((s) => s.toLowerCase()).join(" · ")}
              <br />
              {site.stack.infra.slice(0, 3).map((s) => s.toLowerCase()).join(" · ")}
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
        I build the quiet software behind loud machines.
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
          <div className="label mt-4">Before</div>
          <div className="font-light" style={{ fontSize: 18 }}>
            {previous.join(" · ")}
          </div>
        </div>
      </div>
    </section>
  );
}
