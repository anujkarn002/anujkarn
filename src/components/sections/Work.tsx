import Link from "next/link";
import type { Mode } from "../../lib/mode";
import type { Project } from "../../lib/projects";
import { ArmFigure } from "./Figures";

export default function Work({ mode, projects, standalone = false }: { mode: Mode; projects: Project[]; standalone?: boolean }) {
  if (mode === "instrument") {
    return (
      <section className={`gutter ${standalone ? "pt-16" : "pt-[120px]"}`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-6">
          <div className="md:col-span-3">
            <div className="label">Selected work</div>
            <div className="label mt-1.5">2023 — 2026</div>
          </div>
          <div className="md:col-span-9 flex flex-col">
            <div className="rule" />
            {projects.map((p, i) => (
              <Link
                key={p.id}
                href={`/work/${p.id}`}
                className="group grid grid-cols-12 gap-x-4 md:gap-x-6 py-5 items-baseline"
                style={{ borderBottom: "1px solid var(--line)" }}
              >
                <div className="label col-span-2 md:col-span-1">{String(i + 1).padStart(2, "0")}</div>
                <div className="display col-span-10 md:col-span-5 group-hover:italic" style={{ fontSize: "clamp(26px, 2.6vw, 34px)", lineHeight: 1 }}>
                  {p.title}
                </div>
                <div className="col-span-10 col-start-3 md:col-span-4 md:col-start-auto" style={{ fontSize: 14, color: "var(--muted)" }}>
                  {p.description}
                </div>
                <div className="label col-span-10 col-start-3 md:col-span-2 md:col-start-auto md:text-right">{p.stack.slice(0, 2).join(" · ")}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (mode === "workshop") {
    const cols = "80px minmax(0,1.2fr) minmax(0,1.4fr) 200px 100px";
    return (
      <section style={{ background: "var(--bg)" }}>
        <div className="grid grid-cols-1 md:grid-cols-12" style={{ borderTop: "1px solid var(--line)", borderBottom: "1px solid var(--line)" }}>
          <div className="md:col-span-3 p-6" style={{ borderRight: "1px solid var(--line)" }}>
            <div className="label">§ 01 — Fig. A</div>
            <div className="label mt-1.5">6-DOF manipulator, elevation</div>
          </div>
          <div className="md:col-span-9 px-6 pt-6 pb-3">
            <ArmFigure />
          </div>
        </div>

        <div className="hidden md:grid" style={{ gridTemplateColumns: cols, borderBottom: "1px solid var(--line)" }}>
          {["No.", "Project", "What it does", "Stack", "Year"].map((h, i, a) => (
            <div key={h} className="label px-6 py-3.5" style={{ borderRight: i < a.length - 1 ? "1px solid var(--line)" : undefined }}>
              {h}
            </div>
          ))}
        </div>
        {projects.map((p, i) => (
          <Link
            key={p.id}
            href={`/work/${p.id}`}
            className="grid grid-cols-1 md:grid transition-colors hover:bg-surface"
            style={{ gridTemplateColumns: undefined, borderBottom: "1px solid var(--line)" }}
          >
            <div className="hidden md:grid" style={{ gridTemplateColumns: cols }}>
              <div className="label px-6 py-6" style={{ color: "var(--accent)", borderRight: "1px solid var(--line)" }}>
                {String(i + 1).padStart(3, "0")}
              </div>
              <div className="display px-6 py-6 uppercase" style={{ fontSize: 28, letterSpacing: "-0.03em", fontWeight: 800, borderRight: "1px solid var(--line)" }}>
                {p.title}
              </div>
              <div className="px-6 py-6" style={{ fontSize: 15, color: "var(--muted)", borderRight: "1px solid var(--line)" }}>
                {p.description}
              </div>
              <div className="label px-6 py-6" style={{ color: "var(--fg)", borderRight: "1px solid var(--line)" }}>
                {p.stack.slice(0, 2).join(" · ")}
              </div>
              <div className="label px-6 py-6" style={{ color: "var(--fg)" }}>
                {p.year}
              </div>
            </div>
            <div className="md:hidden px-6 py-5 flex flex-col gap-2">
              <div className="flex justify-between">
                <span className="label" style={{ color: "var(--accent)" }}>{String(i + 1).padStart(3, "0")}</span>
                <span className="label">{p.year}</span>
              </div>
              <div className="display uppercase" style={{ fontSize: 26, letterSpacing: "-0.03em", fontWeight: 800 }}>{p.title}</div>
              <div style={{ fontSize: 15, color: "var(--muted)" }}>{p.description}</div>
            </div>
          </Link>
        ))}
      </section>
    );
  }

  const spans = ["md:col-span-7", "md:col-start-9 md:col-span-4 md:mt-40", "md:col-start-2 md:col-span-4", "md:col-start-7 md:col-span-6 md:mt-[120px]"];
  const ratios = ["16 / 10", "4 / 5", "4 / 5", "16 / 10"];
  return (
    <section className={`gutter ${standalone ? "pt-16" : "pt-24"}`}>
      {!standalone && (
        <div className="mb-24" style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--line-strong) 30%, var(--line-strong) 70%, transparent)" }} />
      )}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-16 md:gap-y-24">
        <div className="md:col-span-12 flex justify-between items-baseline">
          <div className="label">Selected work</div>
          <div className="label">{String(projects.length).padStart(2, "0")} projects</div>
        </div>
        {projects.map((p, i) => (
          <Link key={p.id} href={`/work/${p.id}`} className={`group flex flex-col gap-6 ${spans[i % spans.length]}`}>
            <div
              className="transition-colors"
              style={{
                aspectRatio: ratios[i % ratios.length],
                background: "linear-gradient(160deg, #1a1a1e, #0f0f12)",
                border: "1px solid var(--line)",
              }}
            />
            <div className="flex justify-between items-baseline gap-6 flex-wrap">
              <div className="font-light" style={{ fontSize: i === 0 ? 40 : 30, letterSpacing: "-0.02em" }}>{p.title}</div>
              <div className="label">{p.stack.slice(0, 2).join(" · ")} · {p.year}</div>
            </div>
            {i === 0 && (
              <p className="m-0 font-light max-w-[520px]" style={{ fontSize: 18, color: "var(--muted)" }}>
                {p.description}
              </p>
            )}
          </Link>
        ))}
      </div>
    </section>
  );
}
