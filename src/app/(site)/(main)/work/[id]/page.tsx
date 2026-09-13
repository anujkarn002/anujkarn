import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { getFlavor } from "../../../../../lib/flavor.server";
import { getSite, getProjects } from "../../../../../sanity/lib/queries";
import Contact from "../../../../../components/sections/Contact";

export default async function ProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const [flavor, site, projects] = await Promise.all([getFlavor(), getSite(), getProjects()]);
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) notFound();
  const project = projects[index];

  const label = flavor === "workshop" ? `§ 01 — No. ${String(index + 1).padStart(3, "0")}` : `Work ${String(index + 1).padStart(2, "0")}`;
  const light = flavor === "deepfield" ? 300 : undefined;

  return (
    <>
      <article className={`${flavor === "workshop" ? "px-6" : "gutter"} pt-16 md:pt-24`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-8">
          <div className="md:col-span-3 flex flex-col gap-1.5">
            <div className="label">{label}</div>
            {project.year && <div className="label">{project.year}</div>}
            {project.client && <div className="label mt-4">{project.client}</div>}
          </div>
          <div className="md:col-span-8 flex flex-col gap-8">
            <h1
              className={`display m-0 ${flavor === "workshop" ? "uppercase" : ""}`}
              style={{
                fontSize: "clamp(44px, 6.5vw, 96px)",
                lineHeight: 0.95,
                letterSpacing: flavor === "workshop" ? "-0.045em" : "-0.03em",
                textWrap: "balance",
              }}
            >
              {project.title}
            </h1>
            {project.imageUrl && (
              <div className="relative w-full" style={{ aspectRatio: "16 / 9", background: "var(--surface)" }}>
                <Image src={project.imageUrl} alt="" fill className="object-cover" sizes="(max-width: 768px) 100vw, 900px" priority />
              </div>
            )}
            <p className="m-0 max-w-[620px]" style={{ fontSize: 22, lineHeight: 1.45, fontWeight: light }}>
              {project.description}
            </p>
            <div className="flex flex-col gap-5 max-w-[640px]">
              {project.detail.map((d, i) => (
                <p key={i} className="m-0" style={{ fontSize: 17, lineHeight: 1.6, color: "var(--muted)", fontWeight: light }}>
                  {d}
                </p>
              ))}
            </div>
            <div className="flex flex-wrap gap-x-8 gap-y-3 items-baseline">
              {project.stack.length > 0 && <div className="label">{project.stack.join(" · ")}</div>}
              {project.link && (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="label"
                  style={{ color: "var(--fg)", borderBottom: "1px solid var(--fg)", paddingBottom: 2 }}
                >
                  Visit ↗
                </a>
              )}
              <Link href="/work" className="label">
                ← All work
              </Link>
            </div>
          </div>
        </div>
      </article>
      <Contact flavor={flavor} site={site} />
    </>
  );
}
