"use client";
import { MODES, MODE_LABELS, type Mode } from "../../lib/mode";
import { useMode } from "./ModeProvider";

export default function ModeSwitcher() {
  const { mode, setMode, switching } = useMode();

  return (
    <label className="relative inline-flex items-center gap-2 cursor-pointer">
      <span className="label hidden sm:inline" style={{ color: "var(--faint)" }}>
        Mode
      </span>
      <span className="relative inline-flex items-center">
        <select
          value={mode}
          disabled={switching}
          onChange={(e) => setMode(e.target.value as Mode)}
          aria-label="Design mode"
          className="label appearance-none cursor-pointer disabled:cursor-wait"
          style={{
            color: "var(--fg)",
            background: "transparent",
            border: "1px solid var(--line-strong)",
            padding: "8px 28px 8px 12px",
            lineHeight: 1,
            outline: "none",
          }}
        >
          {MODES.map((m) => (
            <option key={m} value={m} style={{ background: "var(--bg)", color: "var(--fg)" }}>
              {MODE_LABELS[m].short} — {MODE_LABELS[m].name}
            </option>
          ))}
        </select>
        <svg
          aria-hidden="true"
          width="10"
          height="10"
          viewBox="0 0 10 10"
          className="absolute right-3 pointer-events-none"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <path d="M1.5 3.5 5 7l3.5-3.5" />
        </svg>
      </span>
    </label>
  );
}
