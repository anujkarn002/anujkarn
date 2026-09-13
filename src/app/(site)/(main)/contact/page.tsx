import { getMode } from "../../../../lib/mode.server";
import { getSite } from "../../../../sanity/lib/queries";
import Contact from "../../../../components/sections/Contact";

export const metadata = { title: "Contact — Anuj Karn" };

export default async function ContactPage() {
  const [mode, site] = await Promise.all([getMode(), getSite()]);
  return <Contact mode={mode} site={site} full />;
}
