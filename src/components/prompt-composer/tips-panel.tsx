"use client";

import { TIPS } from "@/lib/prompt-composer/constants";

export function TipsPanel({ show }: { show: boolean }) {
  if (!show) return null;

  return (
    <div
      style={{
        margin: "10px 16px 0",
        padding: 14,
        background: "#FFFBEB",
        border: "1px solid #FDE68A",
        borderRadius: 10,
        fontSize: 12,
        lineHeight: 1.7,
        color: "#78350F",
      }}
    >
      <strong>Prompting Best Practices</strong>
      <div style={{ marginTop: 5, display: "grid", gap: 3 }}>
        {TIPS.map((tip, i) => (
          <span key={i}>
            → <b>{tip.bold}</b> — {tip.text}
          </span>
        ))}
      </div>
    </div>
  );
}
