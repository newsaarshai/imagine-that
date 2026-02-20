"use client";

import { camelToLabel } from "@/lib/prompt-composer/utils";

interface PlaceholderPanelProps {
  placeholders: string[];
  values: Record<string, string>;
  onChange: (key: string, value: string) => void;
}

export function PlaceholderPanel({
  placeholders,
  values,
  onChange,
}: PlaceholderPanelProps) {
  if (placeholders.length === 0) return null;

  const unfilledCount = placeholders.filter(
    (ph) => !values[ph]?.trim()
  ).length;

  return (
    <div
      style={{
        padding: "12px 14px",
        borderBottom: "1px solid #E2E8F0",
        background: "#fff",
        overflowY: "auto",
        maxHeight: "42%",
      }}
    >
      <h2
        style={{
          margin: "0 0 8px",
          fontSize: 11.5,
          fontWeight: 700,
          color: "#334155",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        Fill Placeholders
        {unfilledCount > 0 && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              background: "#FEF3C7",
              color: "#D97706",
              padding: "2px 7px",
              borderRadius: 10,
            }}
          >
            {unfilledCount} unfilled
          </span>
        )}
      </h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}
      >
        {placeholders.map((ph) => (
          <div key={ph}>
            <label
              style={{
                fontSize: 10.5,
                fontWeight: 600,
                color: "#64748B",
                display: "block",
                marginBottom: 2,
              }}
            >
              {camelToLabel(ph)}
            </label>
            <input
              type="text"
              value={values[ph] || ""}
              onChange={(e) => onChange(ph, e.target.value)}
              placeholder={camelToLabel(ph)}
              style={{
                width: "100%",
                fontSize: 12.5,
                padding: "5px 9px",
                border: "1px solid #E2E8F0",
                borderRadius: 7,
                outline: "none",
                fontFamily: "inherit",
                background: values[ph]?.trim() ? "#F0FDF4" : "#fff",
                boxSizing: "border-box",
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
