import Link from "next/link";
import type { Flavor } from "../../lib/flavor";
import type { Photo } from "../../sanity/lib/queries";
import FieldGrid from "./FieldGrid";
import { NAV_LABELS } from "./Nav";

export default function Field({ flavor, photos, standalone = false }: { flavor: Flavor; photos: Photo[]; standalone?: boolean }) {
  if (photos.length === 0) return null;
  const heading = NAV_LABELS[flavor].field;
  const shown = standalone ? photos : photos.slice(0, flavor === "workshop" ? 4 : 6);
  const more = !standalone && photos.length > shown.length;

  if (flavor === "instrument") {
    return (
      <section className={`gutter ${standalone ? "pt-16" : "pt-[120px]"}`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-6">
          <div className="md:col-span-3 label">{heading}</div>
          <div className={standalone ? "md:col-span-9" : "md:col-start-9 md:col-span-4"}>
            <FieldGrid photos={shown} columns={standalone ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3"} />
            {more && (
              <Link href="/field" className="label mt-3 inline-block" style={{ color: "var(--fg)" }}>
                All photographs →
              </Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (flavor === "workshop") {
    return (
      <section className="px-6 py-10 flex flex-col gap-5" style={{ background: "var(--bg)", borderBottom: "1px solid var(--line)" }}>
        <div className="label">§ 04 — {heading}</div>
        <div style={{ border: "1px solid var(--line)", background: "var(--line)" }}>
          <FieldGrid photos={shown} columns="grid-cols-2 md:grid-cols-4" gap={1} />
        </div>
        {more && (
          <Link href="/field" className="label" style={{ color: "var(--fg)" }}>
            Full bench →
          </Link>
        )}
      </section>
    );
  }

  return (
    <section className={`gutter ${standalone ? "pt-16" : "pt-[200px]"}`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-6">
        <div className="md:col-span-3 label">{heading}</div>
        <div className="md:col-start-4 md:col-span-9">
          <FieldGrid photos={shown} columns="grid-cols-2 md:grid-cols-3" gap={12} />
          {more && (
            <Link href="/field" className="label mt-4 inline-block" style={{ color: "var(--fg)" }}>
              All →
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
