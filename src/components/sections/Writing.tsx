import Link from "next/link";
import type { Flavor } from "../../lib/flavor";
import type { Post } from "../../sanity/lib/queries";
import { NAV_LABELS } from "./Nav";

function fmt(date: string, flavor: Flavor) {
  const d = new Date(date);
  if (flavor === "workshop") return `${String(d.getFullYear()).slice(2)}.${String(d.getMonth() + 1).padStart(2, "0")}`;
  if (flavor === "deepfield") return new Intl.DateTimeFormat("en", { month: "short", year: "2-digit" }).format(d);
  return new Intl.DateTimeFormat("en", { month: "short", year: "numeric" }).format(d);
}

export default function Writing({ flavor, posts, standalone = false }: { flavor: Flavor; posts: Post[]; standalone?: boolean }) {
  if (posts.length === 0) return null;
  const heading = NAV_LABELS[flavor].writing;

  if (flavor === "instrument") {
    return (
      <section className={`gutter ${standalone ? "pt-16" : "pt-[120px]"}`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-6">
          <div className="md:col-span-3 label">{heading}</div>
          <div className="md:col-span-6 flex flex-col gap-6">
            {posts.map((p) => (
              <Link key={p._id} href={`/writing/${p.slug}`} className="group flex flex-col gap-1.5">
                <div className="display group-hover:italic" style={{ fontSize: 26, lineHeight: 1.1 }}>{p.title}</div>
                <div className="label">{fmt(p.publishedAt, flavor)}</div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (flavor === "workshop") {
    return (
      <section className="px-6 py-10 flex flex-col gap-5" style={{ background: "var(--bg)", borderBottom: "1px solid var(--line)" }}>
        <div className="label">§ 03 — {heading}</div>
        {posts.map((p) => (
          <Link key={p._id} href={`/writing/${p.slug}`} className="flex justify-between gap-6 items-baseline hover:text-accent transition-colors">
            <span className="display" style={{ fontSize: 22, letterSpacing: "-0.02em", fontWeight: 800 }}>{p.title}</span>
            <span className="label shrink-0">{fmt(p.publishedAt, flavor)}</span>
          </Link>
        ))}
      </section>
    );
  }

  return (
    <section className={`gutter ${standalone ? "pt-16" : "pt-[200px]"}`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-6">
        <div className="md:col-span-3 label">{heading}</div>
        <div className="md:col-start-4 md:col-span-7 flex flex-col">
          {posts.map((p, i) => (
            <Link
              key={p._id}
              href={`/writing/${p.slug}`}
              className="flex justify-between items-baseline gap-6 py-5 hover:text-muted transition-colors"
              style={{ borderTop: "1px solid var(--line)", borderBottom: i === posts.length - 1 ? "1px solid var(--line)" : undefined }}
            >
              <span className="font-light" style={{ fontSize: "clamp(22px, 2.2vw, 30px)", letterSpacing: "-0.01em" }}>{p.title}</span>
              <span className="label shrink-0">{fmt(p.publishedAt, flavor)}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
