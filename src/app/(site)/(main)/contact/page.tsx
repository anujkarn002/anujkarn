import { getMode } from "../../../../lib/mode.server";
import Contact from "../../../../components/sections/Contact";

export const metadata = { title: "Contact — Anuj Karn" };

export default async function ContactPage() {
  const mode = await getMode();
  return <Contact mode={mode} full />;
}
