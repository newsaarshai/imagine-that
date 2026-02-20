"use client";

import { APP_SUBTITLE } from "@/lib/prompt-composer/constants";

interface ComposerHeaderProps {
  showTips: boolean;
  onToggleTips: () => void;
}

export function ComposerHeader({ showTips, onToggleTips }: ComposerHeaderProps) {
  return (
    <header
      style={{
        background: "#fff",
        borderBottom: "1px solid #E2E8F0",
        padding: "12px 20px",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        position: "sticky",
        top: 64,
        zIndex: 30,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 28,
            height: 28,
            borderRadius: 7,
            background: "linear-gradient(135deg,#F59E0B,#EC4899)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
          }}
        >
          🎨
        </div>
        <div>
          <h1
            style={{
              margin: 0,
              fontSize: 16,
              fontWeight: 700,
              color: "#0F172A",
              lineHeight: 1.2,
            }}
          >
            Prompt Composer
          </h1>
          <p style={{ margin: 0, fontSize: 10.5, color: "#94A3B8" }}>
            {APP_SUBTITLE}
          </p>
        </div>
      </div>
      <button
        onClick={onToggleTips}
        style={{
          fontSize: 11.5,
          padding: "4px 12px",
          borderRadius: 7,
          border: "1px solid #E2E8F0",
          background: showTips ? "#EEF2FF" : "#fff",
          color: showTips ? "#4F46E5" : "#64748B",
          cursor: "pointer",
          fontFamily: "inherit",
          fontWeight: 500,
        }}
      >
        {showTips ? "Hide Tips" : "💡 Tips"}
      </button>
    </header>
  );
}
