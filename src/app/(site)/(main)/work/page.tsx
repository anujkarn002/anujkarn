import { getMode } from "../../../../lib/mode.server";
import { getSite, getExperience, getProjects } from "../../../../sanity/lib/queries";
import Work from "../../../../components/sections/Work";
import Experience from "../../../../components/sections/Experience";
import Contact from "../../../../components/sections/Contact";

export const metadata = { title: "Work — Anuj Karn" };

export default async function WorkPage() {
  const [mode, site, experience, projects] = await Promise.all([getMode(), getSite(), getExperience(), getProjects()]);
  return (
    <>
      <Work mode={mode} projects={projects} standalone />
      <Experience mode={mode} site={site} experience={experience} />
      <Contact mode={mode} site={site} />
    </>
  );
}
