"use client";

import { useState, useEffect } from "react";
import type { Snippet, SnippetCategory } from "@/lib/prompt-composer/types";
import { CAT_COLORS, CATEGORIES } from "@/lib/prompt-composer/constants";
import { extractPlaceholders, camelToLabel } from "@/lib/prompt-composer/utils";
import { HighlightedTextarea } from "./highlighted-textarea";

interface SnippetCardProps {
  snippet: Snippet;
  onSave: (id: string, changes: { label: string; text: string; category: SnippetCategory }) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  usedCategories: SnippetCategory[];
}

export function SnippetCard({
  snippet,
  onSave,
  onDelete,
  onToggle,
  usedCategories,
}: SnippetCardProps) {
  const colors = CAT_COLORS[snippet.category] || CAT_COLORS.Constraints;
  const [open, setOpen] = useState(false);
  const [draftLabel, setDraftLabel] = useState(snippet.label);
  const [draftText, setDraftText] = useState(snippet.text);
  const [draftCategory, setDraftCategory] = useState<SnippetCategory>(snippet.category);

  useEffect(() => {
    setDraftLabel(snippet.label);
    setDraftText(snippet.text);
    setDraftCategory(snippet.category);
  }, [snippet.label, snippet.text, snippet.category]);

  const dirty =
    draftLabel !== snippet.label ||
    draftText !== snippet.text ||
    draftCategory !== snippet.category;

  const placeholders = extractPlaceholders(snippet.text);
  const draftPlaceholders = extractPlaceholders(draftText);

  return (
    <div
      style={{
        background: snippet.active ? "#fff" : "#FAFAFA",
        border: `1.5px solid ${snippet.active ? colors.border : "#E2E8F0"}`,
        borderRadius: 12,
        opacity: snippet.active ? 1 : 0.55,
        transition: "all 0.2s",
        overflow: "hidden",
      }}
    >
      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          padding: "11px 14px",
          cursor: "pointer",
          userSelect: "none",
        }}
        onClick={() => setOpen(!open)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle(snippet.id);
          }}
          style={{
            width: 20,
            height: 20,
            borderRadius: 4,
            border: `2px solid ${snippet.active ? colors.dot : "#CBD5E1"}`,
            background: snippet.active ? colors.dot : "transparent",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            padding: 0,
          }}
        >
          {snippet.active && (
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6l3 3 5-5"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            color: colors.dot,
            background: colors.bg,
            padding: "2px 8px",
            borderRadius: 6,
            flexShrink: 0,
          }}
        >
          {snippet.category}
        </span>
        <span
          style={{
            fontSize: 13.5,
            fontWeight: 600,
            color: "#1E293B",
            flex: 1,
          }}
        >
          {snippet.label}
        </span>
        {placeholders.length > 0 && (
          <span style={{ fontSize: 10.5, color: "#94A3B8", flexShrink: 0 }}>
            {placeholders.length} var{placeholders.length > 1 ? "s" : ""}
          </span>
        )}
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          style={{
            transform: open ? "rotate(180deg)" : "rotate(0)",
            transition: "transform 0.2s",
            flexShrink: 0,
          }}
        >
          <path
            d="M4 6l4 4 4-4"
            stroke="#94A3B8"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Edit body */}
      {open && (
        <div style={{ padding: "0 14px 12px" }}>
          <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
            <div style={{ flex: 1 }}>
              <label
                style={{
                  fontSize: 10.5,
                  fontWeight: 600,
                  color: "#94A3B8",
                  display: "block",
                  marginBottom: 3,
                }}
              >
                Name
              </label>
              <input
                value={draftLabel}
                onChange={(e) => setDraftLabel(e.target.value)}
                style={{
                  width: "100%",
                  fontSize: 13,
                  padding: "6px 10px",
                  border: "1px solid #E2E8F0",
                  borderRadius: 8,
                  outline: "none",
                  fontFamily: "inherit",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ width: 150, flexShrink: 0 }}>
              <label
                style={{
                  fontSize: 10.5,
                  fontWeight: 600,
                  color: "#94A3B8",
                  display: "block",
                  marginBottom: 3,
                }}
              >
                Category
              </label>
              <select
                value={draftCategory}
                onChange={(e) =>
                  setDraftCategory(e.target.value as SnippetCategory)
                }
                style={{
                  width: "100%",
                  fontSize: 13,
                  padding: "6px 10px",
                  border: "1px solid #E2E8F0",
                  borderRadius: 8,
                  outline: "none",
                  fontFamily: "inherit",
                  background: "#fff",
                  boxSizing: "border-box",
                }}
              >
                {CATEGORIES.map((cat) => {
                  const taken =
                    usedCategories.includes(cat) && cat !== snippet.category;
                  return (
                    <option
                      key={cat}
                      value={cat}
                      disabled={taken}
                      style={{ color: taken ? "#CBD5E1" : "#334155" }}
                    >
                      {cat}
                      {taken ? " (used)" : ""}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <label
            style={{
              fontSize: 10.5,
              fontWeight: 600,
              color: "#94A3B8",
              display: "block",
              marginBottom: 3,
            }}
          >
            Prompt text
            <span style={{ fontWeight: 400, color: "#CBD5E1" }}>
              {" "}
              — wrap variables in {"{"}…{"}"}
            </span>
          </label>
          <HighlightedTextarea
            value={draftText}
            onChange={(e) => setDraftText(e.target.value)}
            rows={4}
          />
          {draftPlaceholders.length > 0 && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 5,
                marginTop: 7,
              }}
            >
              {draftPlaceholders.map((ph) => (
                <span
                  key={ph}
                  style={{
                    fontSize: 10.5,
                    fontFamily:
                      "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
                    background: "#FEF3C7",
                    color: "#92400E",
                    padding: "2px 7px",
                    borderRadius: 5,
                  }}
                >
                  {camelToLabel(ph)}
                </span>
              ))}
            </div>
          )}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: 10,
            }}
          >
            <button
              onClick={() => onDelete(snippet.id)}
              style={{
                fontSize: 11.5,
                color: "#EF4444",
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: "3px 6px",
                borderRadius: 6,
                fontFamily: "inherit",
              }}
            >
              Delete
            </button>
            <button
              onClick={() =>
                onSave(snippet.id, {
                  label: draftLabel,
                  text: draftText,
                  category: draftCategory,
                })
              }
              disabled={!dirty}
              style={{
                fontSize: 12,
                fontWeight: 600,
                padding: "5px 16px",
                borderRadius: 8,
                border: "none",
                background: dirty ? "#4F46E5" : "#E2E8F0",
                color: dirty ? "#fff" : "#94A3B8",
                cursor: dirty ? "pointer" : "default",
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
