import Link from "next/link";
import type { Mode } from "../../lib/mode";
import type { SiteContent } from "../../lib/site";
import ModeSwitcher from "../mode/ModeSwitcher";

export const NAV_LABELS: Record<Mode, { work: string; writing: string; field: string; contact: string }> = {
  instrument: { work: "Work", writing: "Notes", field: "Field", contact: "Contact" },
  deepfield: { work: "Work", writing: "Writing", field: "Field", contact: "Contact" },
  workshop: { work: "Index", writing: "Log", field: "Bench", contact: "Contact" },
};

function Links({ mode }: { mode: Mode }) {
  const l = NAV_LABELS[mode];
  return (
    <nav style={{ display: "flex", gap: "clamp(16px, 2.5vw, 32px)" }}>
      <Link className="label" style={{ color: "var(--fg)" }} href="/work">{l.work}</Link>
      <Link className="label" style={{ color: "var(--fg)" }} href="/writing">{l.writing}</Link>
      <Link className="label" style={{ color: "var(--fg)" }} href="/field">{l.field}</Link>
      <Link className="label" style={{ color: "var(--fg)" }} href="/contact">{l.contact}</Link>
    </nav>
  );
}

export default function Nav({ mode, site }: { mode: Mode; site: SiteContent }) {
  const initials = site.name
    .split(" ")
    .map((w) => w[0])
    .join(". ");

  if (mode === "instrument") {
    return (
      <header className="gutter pt-7">
        <div className="grid grid-cols-2 md:grid-cols-12 gap-x-6 gap-y-3 items-baseline">
          <Link href="/" className="label md:col-span-3" style={{ color: "var(--fg)" }}>
            {site.name} — Engineer
          </Link>
          <div className="label hidden md:block md:col-span-3">Sheet 01 / Index</div>
          <div className="label hidden md:block md:col-span-3">{site.location}</div>
          <div className="col-span-2 md:col-span-3 flex items-center justify-between md:justify-end gap-6">
            <Links mode={mode} />
            <ModeSwitcher />
          </div>
        </div>
        <div className="rule mt-5" />
      </header>
    );
  }

  if (mode === "workshop") {
    return (
      <header className="grid grid-cols-2 md:grid-cols-4" style={{ borderBottom: "1px solid var(--line)", background: "var(--bg)" }}>
        <Link href="/" className="label px-6 py-4" style={{ color: "var(--fg)", borderRight: "1px solid var(--line)" }}>
          {site.name}
        </Link>
        <div className="label px-6 py-4 hidden md:block" style={{ borderRight: "1px solid var(--line)" }}>
          Full-stack · Systems
        </div>
        <div className="label px-6 py-4 hidden md:block" style={{ borderRight: "1px solid var(--line)" }}>
          {site.coordinates}
        </div>
        <div className="px-6 py-3 flex items-center justify-end gap-6">
          <Links mode={mode} />
          <ModeSwitcher />
        </div>
      </header>
    );
  }

  return (
    <header className="gutter flex items-center justify-between py-9">
      <Link href="/" className="label" style={{ color: "var(--fg)" }}>
        {initials.slice(0, initials.lastIndexOf(". ") + 2)}
        {site.name.split(" ").slice(-1)[0]}
      </Link>
      <div className="flex items-center gap-6">
        <Links mode={mode} />
        <ModeSwitcher />
      </div>
    </header>
  );
}
