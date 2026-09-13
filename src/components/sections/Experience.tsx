import type { Mode } from "../../lib/mode";
import type { SiteContent, ExperienceItem } from "../../lib/site";

export default function Experience({
  mode,
  site,
  experience,
  standalone = false,
}: {
  mode: Mode;
  site: SiteContent;
  experience: ExperienceItem[];
  standalone?: boolean;
}) {
  const education = { school: site.school, degree: site.degree, years: site.educationYears };
  if (experience.length === 0) return null;
  if (mode === "instrument") {
    return (
      <section className={`gutter ${standalone ? "pt-16" : "pt-[120px]"}`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-6">
          <div className="md:col-span-3">
            <div className="label">Experience</div>
            <div className="label mt-1.5">
              {experience[experience.length - 1].from.slice(-4)} — {experience[0].to}
            </div>
          </div>
          <div className="md:col-span-9 flex flex-col">
            <div className="rule" />
            {experience.map((e) => (
              <div key={e.company} className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-2 py-6" style={{ borderBottom: "1px solid var(--line)" }}>
                <div className="md:col-span-3 flex flex-col gap-1">
                  <div className="label" style={{ color: "var(--fg)" }}>
                    {e.from} — {e.to}
                  </div>
                  <div className="label">{e.where}</div>
                </div>
                <div className="md:col-span-9 flex flex-col gap-2">
                  <div className="display" style={{ fontSize: "clamp(24px, 2.4vw, 30px)", lineHeight: 1.05 }}>
                    {e.role}
                    {e.current && <span className="label ml-3 align-middle">Current</span>}
                  </div>
                  <div style={{ fontSize: 16, color: "var(--fg)" }}>{e.company}</div>
                  <p className="m-0 mt-1 max-w-[560px]" style={{ fontSize: 14, lineHeight: 1.55, color: "var(--muted)" }}>
                    {e.note}
                  </p>
                </div>
              </div>
            ))}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-2 py-6" style={{ borderBottom: "1px solid var(--line)" }}>
              <div className="md:col-span-3 label" style={{ color: "var(--fg)" }}>
                {education.years}
              </div>
              <div className="md:col-span-9 flex flex-col gap-1">
                <div className="display" style={{ fontSize: "clamp(22px, 2vw, 26px)", lineHeight: 1.05 }}>
                  {education.degree}
                </div>
                <div style={{ fontSize: 16 }}>{education.school}</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (mode === "workshop") {
    const cols = "180px minmax(0,1fr) minmax(0,1.4fr) 200px";
    return (
      <section style={{ background: "var(--bg)", borderTop: standalone ? undefined : "1px solid var(--line)" }}>
        <div className="px-6 py-4 label" style={{ borderBottom: "1px solid var(--line)" }}>
          § 02 — Service record
        </div>
        <div className="hidden md:grid" style={{ gridTemplateColumns: cols, borderBottom: "1px solid var(--line)" }}>
          {["Period", "Post", "Duties", "Station"].map((h, i, a) => (
            <div key={h} className="label px-6 py-3.5" style={{ borderRight: i < a.length - 1 ? "1px solid var(--line)" : undefined }}>
              {h}
            </div>
          ))}
        </div>
        {experience.map((e) => (
          <div key={e.company} style={{ borderBottom: "1px solid var(--line)" }}>
            <div className="hidden md:grid" style={{ gridTemplateColumns: cols }}>
              <div className="label px-6 py-6" style={{ color: e.current ? "var(--accent)" : "var(--fg)", borderRight: "1px solid var(--line)" }}>
                {e.from}
                <br />
                {e.to}
              </div>
              <div className="px-6 py-6 flex flex-col gap-2" style={{ borderRight: "1px solid var(--line)" }}>
                <div className="display uppercase" style={{ fontSize: 22, letterSpacing: "-0.03em", fontWeight: 800, lineHeight: 1 }}>
                  {e.role}
                </div>
                <div className="label" style={{ color: "var(--fg)" }}>
                  {e.company}
                </div>
              </div>
              <div className="px-6 py-6" style={{ fontSize: 14, lineHeight: 1.55, color: "var(--muted)", borderRight: "1px solid var(--line)" }}>
                {e.note}
              </div>
              <div className="label px-6 py-6" style={{ color: "var(--fg)" }}>
                {e.where}
              </div>
            </div>
            <div className="md:hidden px-6 py-5 flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="label" style={{ color: e.current ? "var(--accent)" : "var(--fg)" }}>
                  {e.from} — {e.to}
                </span>
                <span className="label">{e.where}</span>
              </div>
              <div className="display uppercase" style={{ fontSize: 22, letterSpacing: "-0.03em", fontWeight: 800 }}>
                {e.role}
              </div>
              <div className="label" style={{ color: "var(--fg)" }}>
                {e.company}
              </div>
              <div style={{ fontSize: 14, lineHeight: 1.55, color: "var(--muted)" }}>{e.note}</div>
            </div>
          </div>
        ))}
        <div className="grid grid-cols-1 md:grid" style={{ gridTemplateColumns: undefined, borderBottom: "1px solid var(--line)" }}>
          <div className="px-6 py-5 flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8">
            <span className="label" style={{ color: "var(--fg)" }}>
              {education.years}
            </span>
            <span className="display uppercase" style={{ fontSize: 18, letterSpacing: "-0.02em", fontWeight: 800 }}>
              {education.degree}
            </span>
            <span className="label">{education.school}</span>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className={`gutter ${standalone ? "pt-16" : "pt-[200px]"}`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-6">
        <div className="md:col-span-3 label">Experience</div>
        <div className="md:col-start-4 md:col-span-8 flex flex-col">
          {experience.map((e) => (
            <div key={e.company} className="grid grid-cols-1 md:grid-cols-8 gap-x-6 gap-y-3 py-8" style={{ borderTop: "1px solid var(--line)" }}>
              <div className="md:col-span-2 flex flex-col gap-1.5">
                <div className="label" style={{ color: "var(--fg)" }}>
                  {e.from} — {e.to}
                </div>
                <div className="label">{e.where}</div>
              </div>
              <div className="md:col-span-6 flex flex-col gap-2">
                <div className="font-light" style={{ fontSize: "clamp(24px, 2.4vw, 32px)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                  {e.role}
                </div>
                <div className="font-light" style={{ fontSize: 18, color: "var(--muted)" }}>
                  {e.company}
                </div>
                <p className="m-0 mt-2 font-light max-w-[560px]" style={{ fontSize: 16, lineHeight: 1.6, color: "var(--faint)" }}>
                  {e.note}
                </p>
              </div>
            </div>
          ))}
          <div className="grid grid-cols-1 md:grid-cols-8 gap-x-6 gap-y-3 py-8" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
            <div className="md:col-span-2 label" style={{ color: "var(--fg)" }}>
              {education.years}
            </div>
            <div className="md:col-span-6 flex flex-col gap-2">
              <div className="font-light" style={{ fontSize: "clamp(22px, 2vw, 28px)", letterSpacing: "-0.02em", lineHeight: 1.05 }}>
                {education.degree}
              </div>
              <div className="font-light" style={{ fontSize: 18, color: "var(--muted)" }}>
                {education.school}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
