import Link from "next/link";
import type { Mode } from "../../lib/mode";
import type { GalleryImage } from "../../lib/gallery";
import FieldGrid from "./FieldGrid";
import { NAV_LABELS } from "./Nav";

export default function Field({ mode, images, standalone = false }: { mode: Mode; images: GalleryImage[]; standalone?: boolean }) {
  if (images.length === 0) return null;
  const heading = NAV_LABELS[mode].field;
  const shown = standalone ? images : images.slice(0, mode === "workshop" ? 4 : 6);

  if (mode === "instrument") {
    return (
      <section className={`gutter ${standalone ? "pt-16" : "pt-[120px]"}`}>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-6">
          <div className="md:col-span-3 label">{heading}</div>
          <div className={standalone ? "md:col-span-9" : "md:col-start-9 md:col-span-4"}>
            <FieldGrid images={shown} columns={standalone ? "grid-cols-2 md:grid-cols-4" : "grid-cols-3"} />
            {!standalone && images.length > shown.length && (
              <Link href="/field" className="label mt-3 inline-block" style={{ color: "var(--fg)" }}>All photographs →</Link>
            )}
          </div>
        </div>
      </section>
    );
  }

  if (mode === "workshop") {
    return (
      <section className="px-6 py-10 flex flex-col gap-5" style={{ background: "var(--bg)", borderBottom: "1px solid var(--line)" }}>
        <div className="label">§ 03 — {heading}</div>
        <div style={{ border: "1px solid var(--line)", background: "var(--line)" }}>
          <FieldGrid images={shown} columns={standalone ? "grid-cols-2 md:grid-cols-4" : "grid-cols-2 md:grid-cols-4"} gap={1} />
        </div>
        {!standalone && images.length > shown.length && (
          <Link href="/field" className="label" style={{ color: "var(--fg)" }}>Full bench →</Link>
        )}
      </section>
    );
  }

  return (
    <section className={`gutter ${standalone ? "pt-16" : "pt-[200px]"}`}>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-x-6 gap-y-6">
        <div className="md:col-span-3 label">{heading}</div>
        <div className="md:col-start-4 md:col-span-9">
          <FieldGrid images={shown} columns="grid-cols-2 md:grid-cols-3" gap={12} />
          {!standalone && images.length > shown.length && (
            <Link href="/field" className="label mt-4 inline-block" style={{ color: "var(--fg)" }}>All →</Link>
          )}
        </div>
      </div>
    </section>
  );
}
