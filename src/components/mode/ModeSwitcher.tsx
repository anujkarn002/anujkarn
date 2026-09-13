"use client";
import { MODES, MODE_LABELS } from "../../lib/mode";
import { useMode } from "./ModeProvider";

export default function ModeSwitcher() {
  const { mode, setMode } = useMode();

  return (
    <div role="radiogroup" aria-label="Design mode" className="flex items-center gap-1">
      {MODES.map((m) => {
        const active = m === mode;
        return (
          <button
            key={m}
            role="radio"
            aria-checked={active}
            title={`${MODE_LABELS[m].name} — ${MODE_LABELS[m].blurb}`}
            onClick={() => setMode(m)}
            className="label h-8 min-w-8 px-2 transition-colors"
            style={{
              color: active ? "var(--bg)" : "var(--faint)",
              background: active ? "var(--fg)" : "transparent",
              border: `1px solid ${active ? "var(--fg)" : "var(--line)"}`,
            }}
          >
            {MODE_LABELS[m].short}
          </button>
        );
      })}
    </div>
  );
}
