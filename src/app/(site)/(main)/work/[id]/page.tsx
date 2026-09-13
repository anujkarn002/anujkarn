import { notFound } from "next/navigation";
import Link from "next/link";
import { getMode } from "../../../../../lib/mode.server";
import { getProject, projects } from "../../../../../lib/projects";
import Contact from "../../../../../components/sections/Contact";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [mode, project] = await Promise.all([getMode(), Promise.resolve(getProject(id))]);
  if (!project) notFound();

  const index = projects.findIndex((p) => p.id === id);
  const label = mode === "workshop" ? `§ 01 — No. ${String(index + 1).padStart(3, "0")}` : `Work ${String(index + 1).padStart(2, "0")}`;
  const padded = mode === "workshop" ? "px-6" : "gutter";

  return (
    <>
      <article className={`${padded} pt-16 md:pt-24`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8">
          <div className="md:col-span-3 flex flex-col gap-1.5">
            <div className="label">{label}</div>
            <div className="label">{project.year}</div>
          </div>
          <div className="md:col-span-8 flex flex-col gap-8">
            <h1
              className={`display m-0 ${mode === "workshop" ? "uppercase" : ""}`}
              style={{ fontSize: "clamp(44px, 6.5vw, 96px)", lineHeight: 0.95, letterSpacing: mode === "workshop" ? "-0.045em" : "-0.03em" }}
            >
              {project.title}
            </h1>
            <p className="m-0 max-w-[620px]" style={{ fontSize: 20, lineHeight: 1.5, color: "var(--muted)", fontWeight: mode === "deepfield" ? 300 : undefined }}>
              {project.description}
            </p>
            <div className="flex flex-wrap gap-x-8 gap-y-3 items-baseline">
              <div className="label">{project.stack.join(" · ")}</div>
              {project.link && (
                <a href={project.link} target="_blank" rel="noopener noreferrer" className="label" style={{ color: "var(--fg)", borderBottom: "1px solid var(--fg)", paddingBottom: 2 }}>
                  Source ↗
                </a>
              )}
              <Link href="/work" className="label">
                ← All work
              </Link>
            </div>
          </div>
        </div>
      </article>
      <Contact mode={mode} />
    </>
  );
}
