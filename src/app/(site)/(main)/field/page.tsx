import { getFlavor } from "../../../../lib/flavor.server";
import { getSite, getPhotos } from "../../../../sanity/lib/queries";
import Field from "../../../../components/sections/Field";
import Contact from "../../../../components/sections/Contact";
import { NAV_LABELS } from "../../../../components/sections/Nav";

export const metadata = { title: "Field — Anuj Karn" };

export default async function FieldPage() {
  const [flavor, site, photos] = await Promise.all([getFlavor(), getSite(), getPhotos()]);

  return (
    <>
      {photos.length === 0 ? (
        <section className={`${flavor === "workshop" ? "px-6" : "gutter"} pt-16 md:pt-24`}>
          <div className="label">{NAV_LABELS[flavor].field}</div>
          <h1 className="display m-0 mt-6" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
            No photographs yet.
          </h1>
        </section>
      ) : (
        <Field flavor={flavor} photos={photos} standalone />
      )}
      <Contact flavor={flavor} site={site} />
    </>
  );
}
