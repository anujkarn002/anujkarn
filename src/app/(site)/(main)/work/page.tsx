import { getFlavor } from "../../../../lib/flavor.server";
import { getSite, getExperience, getProjects } from "../../../../sanity/lib/queries";
import Work from "../../../../components/sections/Work";
import Experience from "../../../../components/sections/Experience";
import Contact from "../../../../components/sections/Contact";

export const metadata = { title: "Work — Anuj Karn" };

export default async function WorkPage() {
  const [flavor, site, experience, projects] = await Promise.all([getFlavor(), getSite(), getExperience(), getProjects()]);
  return (
    <>
      <Work flavor={flavor} projects={projects} standalone />
      <Experience flavor={flavor} site={site} experience={experience} />
      <Contact flavor={flavor} site={site} />
    </>
  );
}
