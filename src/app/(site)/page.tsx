import { getMode } from "../../lib/mode.server";
import { getSite, getExperience, getProjects, getAllPosts, getPhotos } from "../../sanity/lib/queries";
import Hero from "../../components/sections/Hero";
import Work from "../../components/sections/Work";
import Experience from "../../components/sections/Experience";
import Writing from "../../components/sections/Writing";
import Field from "../../components/sections/Field";
import Contact from "../../components/sections/Contact";

export default async function Home() {
  const [mode, site, experience, projects, posts, photos] = await Promise.all([
    getMode(),
    getSite(),
    getExperience(),
    getProjects(),
    getAllPosts(),
    getPhotos(),
  ]);

  return (
    <>
      <Hero mode={mode} site={site} experience={experience} />
      <Work mode={mode} projects={projects} />
      <Experience mode={mode} site={site} experience={experience} />
      <Writing mode={mode} posts={posts.slice(0, 3)} />
      <Field mode={mode} photos={photos} />
      <Contact mode={mode} site={site} />
    </>
  );
}
