import { getMode } from "../../../../lib/mode.server";
import { getAllPosts, getSite } from "../../../../sanity/lib/queries";
import Writing from "../../../../components/sections/Writing";
import Contact from "../../../../components/sections/Contact";
import { NAV_LABELS } from "../../../../components/sections/Nav";

export const metadata = { title: "Writing — Anuj Karn" };

export default async function WritingPage() {
  const [mode, site, posts] = await Promise.all([getMode(), getSite(), getAllPosts()]);

  if (posts.length === 0) {
    return (
      <>
        <section className={`${mode === "workshop" ? "px-6" : "gutter"} pt-16 md:pt-24`}>
          <div className="label">{NAV_LABELS[mode].writing}</div>
          <h1 className="display m-0 mt-6" style={{ fontSize: "clamp(36px, 5vw, 64px)", lineHeight: 1, letterSpacing: "-0.02em" }}>
            Nothing published yet.
          </h1>
        </section>
        <Contact mode={mode} site={site} />
      </>
    );
  }

  return (
    <>
      <Writing mode={mode} posts={posts} standalone />
      <Contact mode={mode} site={site} />
    </>
  );
}
