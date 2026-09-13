import { getFlavor } from "../../../../lib/flavor.server";
import { getAllPosts, getSite } from "../../../../sanity/lib/queries";
import Writing from "../../../../components/sections/Writing";
import Contact from "../../../../components/sections/Contact";
import { NAV_LABELS } from "../../../../components/sections/Nav";

export const metadata = { title: "Writing — Anuj Karn" };

export default async function WritingPage() {
  const [flavor, site, posts] = await Promise.all([getFlavor(), getSite(), getAllPosts()]);

  if (posts.length === 0) {
    return (
      <>
        <section className={`${flavor === "workshop" ? "px-6" : "gutter"} pt-16 md:pt-24`}>
          <div className="label">{NAV_LABELS[flavor].writing}</div>
          <h1 className="display m-0 mt-6" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
            Nothing published yet.
          </h1>
        </section>
        <Contact flavor={flavor} site={site} />
      </>
    );
  }

  return (
    <>
      <Writing flavor={flavor} posts={posts} standalone />
      <Contact flavor={flavor} site={site} />
    </>
  );
}
