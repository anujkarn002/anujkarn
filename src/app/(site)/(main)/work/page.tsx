import { getMode } from "../../../../lib/mode.server";
import { projects } from "../../../../lib/projects";
import Work from "../../../../components/sections/Work";
import Contact from "../../../../components/sections/Contact";

export const metadata = { title: "Work — Anuj Karn" };

export default async function WorkPage() {
  const mode = await getMode();
  return (
    <>
      <Work mode={mode} projects={projects} standalone />
      <Contact mode={mode} />
    </>
  );
}
