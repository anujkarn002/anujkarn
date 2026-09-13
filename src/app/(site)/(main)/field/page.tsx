import { getMode } from "../../../../lib/mode.server";
import { getGalleryImages } from "../../../../lib/gallery";
import Field from "../../../../components/sections/Field";
import Contact from "../../../../components/sections/Contact";
import { NAV_LABELS } from "../../../../components/sections/Nav";

export const metadata = { title: "Field — Anuj Karn" };

export default async function FieldPage() {
  const [mode, images] = await Promise.all([getMode(), getGalleryImages()]);

  if (images.length === 0) {
    return (
      <>
        <section className={`${mode === "workshop" ? "px-6" : "gutter"} pt-16 md:pt-24`}>
          <div className="label">{NAV_LABELS[mode].field}</div>
          <h1 className="display m-0 mt-6" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
            No photographs yet.
          </h1>
        </section>
        <Contact mode={mode} />
      </>
    );
  }

  return (
    <>
      <Field mode={mode} images={images} standalone />
      <Contact mode={mode} />
    </>
  );
}
