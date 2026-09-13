import { getFlavor } from "../../../../lib/flavor.server";
import { getSite } from "../../../../sanity/lib/queries";
import Contact from "../../../../components/sections/Contact";

export const metadata = { title: "Contact — Anuj Karn" };

export default async function ContactPage() {
  const [flavor, site] = await Promise.all([getFlavor(), getSite()]);
  return <Contact flavor={flavor} site={site} full />;
}
