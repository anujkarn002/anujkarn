import { getMode } from "../../lib/mode.server";
import { projects } from "../../lib/projects";
import { getAllPosts } from "../../sanity/lib/queries";
import { getGalleryImages } from "../../lib/gallery";
import Hero from "../../components/sections/Hero";
import Work from "../../components/sections/Work";
import Experience from "../../components/sections/Experience";
import Writing from "../../components/sections/Writing";
import Field from "../../components/sections/Field";
import Contact from "../../components/sections/Contact";

export default async function Home() {
  const [mode, posts, images] = await Promise.all([getMode(), getAllPosts(), getGalleryImages()]);

  return (
    <>
      <Hero mode={mode} />
      <Work mode={mode} projects={projects} />
      <Experience mode={mode} />
      <Writing mode={mode} posts={posts.slice(0, 3)} />
      <Field mode={mode} images={images} />
      <Contact mode={mode} />
    </>
  );
}
