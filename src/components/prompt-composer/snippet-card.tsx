"use client";

import { useState, useEffect, useCallback } from "react";
import type { Snippet, SnippetCategory } from "@/lib/prompt-composer/types";
import { getCatColor, GLOBAL_CATEGORIES } from "@/lib/prompt-composer/constants";
import { extractPlaceholders, camelToLabel, PH_RE } from "@/lib/prompt-composer/utils";
import { HighlightedTextarea } from "./highlighted-textarea";

interface SnippetCardProps {
  snippet: Snippet;
  onSave: (id: string, changes: { label: string; text: string; category: SnippetCategory }) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  usedCategories: SnippetCategory[];
  masterSnippets: Snippet[];
  hasType: boolean;
}

/** Check if a selection overlaps with any existing {placeholder} */
function selectionOverlapsPlaceholder(text: string, start: number, end: number): boolean {
  const re = new RegExp(PH_RE.source, PH_RE.flags);
  let m: RegExpExecArray | null;
  while ((m = re.exec(text)) !== null) {
    const phStart = m.index;
    const phEnd = m.index + m[0].length;
    // Overlap if selection intersects with the placeholder range
    if (start < phEnd && end > phStart) return true;
  }
  return false;
}

export function SnippetCard({
  snippet,
  onSave,
  onDelete,
  onToggle,
  usedCategories,
  masterSnippets,
  hasType,
}: SnippetCardProps) {
  const colors = getCatColor(snippet.category);
  const [open, setOpen] = useState(false);
  const [draftLabel, setDraftLabel] = useState(snippet.label);
  const [draftText, setDraftText] = useState(snippet.text);
  const [draftCategory, setDraftCategory] = useState<SnippetCategory>(snippet.category);
  const [selection, setSelection] = useState<{ start: number; end: number; text: string } | null>(null);

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

  // Build category options based on whether the template has a type
  const categoryOptions: { value: string; label: string; disabled: boolean }[] = [];

  if (hasType) {
    categoryOptions.push({ value: "Blank", label: "Blank", disabled: false });
    for (const ms of masterSnippets) {
      const taken = usedCategories.includes(ms.category) && ms.category !== snippet.category;
      categoryOptions.push({
        value: ms.category,
        label: `${ms.category} — ${ms.label}`,
        disabled: taken,
      });
    }
  } else {
    for (const cat of GLOBAL_CATEGORIES) {
      const taken = usedCategories.includes(cat) && cat !== snippet.category;
      categoryOptions.push({ value: cat, label: cat, disabled: taken });
    }
  }

  if (!categoryOptions.some((o) => o.value === snippet.category)) {
    categoryOptions.push({ value: snippet.category, label: snippet.category, disabled: false });
  }

  const handleCategoryChange = (newCategory: string) => {
    setDraftCategory(newCategory);
    if (hasType && newCategory !== "Blank") {
      const masterSnippet = masterSnippets.find((ms) => ms.category === newCategory);
      if (masterSnippet) {
        setDraftLabel(masterSnippet.label);
        setDraftText(masterSnippet.text);
      }
    } else if (newCategory === "Blank") {
      if (snippet.category === "Blank" && !snippet.text) {
        setDraftLabel("New Snippet");
        setDraftText("");
      }
    }
  };

  // ── Placeholder operations ──────────────────────────────

  /** Remove {braces} from a placeholder, converting it back to normal text */
  const handleUnwrapPlaceholder = useCallback(
    (ph: string) => {
      // Replace first occurrence of {ph} with just ph
      setDraftText((prev) => prev.replace(`{${ph}}`, ph));
      setSelection(null);
    },
    []
  );

  /** Wrap the current selection in {braces} to make it a placeholder */
  const handleWrapSelection = useCallback(() => {
    if (!selection) return;
    const before = draftText.substring(0, selection.start);
    const selected = draftText.substring(selection.start, selection.end);
    const after = draftText.substring(selection.end);
    setDraftText(before + "{" + selected + "}" + after);
    setSelection(null);
  }, [selection, draftText]);

  // Can we show the + button? Only if selection exists and doesn't overlap an existing placeholder
  const canWrapSelection =
    selection &&
    selection.text.trim().length > 0 &&
    !selectionOverlapsPlaceholder(draftText, selection.start, selection.end);

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
            <div style={{ width: 200, flexShrink: 0 }}>
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
                onChange={(e) => handleCategoryChange(e.target.value)}
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
                {categoryOptions.map((opt) => (
                  <option
                    key={opt.value}
                    value={opt.value}
                    disabled={opt.disabled}
                    style={{ color: opt.disabled ? "#CBD5E1" : "#334155" }}
                  >
                    {opt.label}
                    {opt.disabled ? " (used)" : ""}
                  </option>
                ))}
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
            onSelectionChange={setSelection}
            rows={4}
          />

          {/* Placeholder tags + wrap button */}
          {(draftPlaceholders.length > 0 || canWrapSelection) && (
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                alignItems: "center",
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
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {camelToLabel(ph)}
                  <button
                    onClick={() => handleUnwrapPlaceholder(ph)}
                    title="Convert back to normal text"
                    style={{
                      background: "none",
                      border: "none",
                      color: "#D97706",
                      cursor: "pointer",
                      padding: 0,
                      fontSize: 12,
                      lineHeight: 1,
                      fontWeight: 700,
                      display: "inline-flex",
                      alignItems: "center",
                    }}
                  >
                    ×
                  </button>
                </span>
              ))}

              {canWrapSelection && (
                <button
                  onClick={handleWrapSelection}
                  title={`Make "${selection!.text}" a placeholder`}
                  style={{
                    fontSize: 10.5,
                    fontWeight: 600,
                    fontFamily:
                      "var(--font-ibm-plex-mono), 'IBM Plex Mono', monospace",
                    background: "#EEF2FF",
                    color: "#4F46E5",
                    border: "1.5px dashed #818CF8",
                    borderRadius: 5,
                    padding: "2px 8px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 3,
                    animation: "fadeIn 0.15s ease-in",
                  }}
                >
                  + Make placeholder
                </button>
              )}
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
