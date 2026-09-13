import { getFlavor } from "../../lib/flavor.server";
import { getSite, getExperience, getProjects, getAllPosts, getPhotos } from "../../sanity/lib/queries";
import Hero from "../../components/sections/Hero";
import Work from "../../components/sections/Work";
import Experience from "../../components/sections/Experience";
import Writing from "../../components/sections/Writing";
import Field from "../../components/sections/Field";
import Contact from "../../components/sections/Contact";

export default async function Home() {
  const [flavor, site, experience, projects, posts, photos] = await Promise.all([
    getFlavor(),
    getSite(),
    getExperience(),
    getProjects(),
    getAllPosts(),
    getPhotos(),
  ]);

  return (
    <>
      <Hero flavor={flavor} site={site} experience={experience} />
      <Work flavor={flavor} projects={projects} />
      <Experience flavor={flavor} site={site} experience={experience} />
      <Writing flavor={flavor} posts={posts.slice(0, 3)} />
      <Field flavor={flavor} photos={photos} />
      <Contact flavor={flavor} site={site} />
    </>
  );
}
