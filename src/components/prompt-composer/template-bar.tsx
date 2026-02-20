"use client";

import { useState } from "react";
import type { TemplateWithSnippets } from "@/lib/prompt-composer/types";

interface TemplateBarProps {
  templates: TemplateWithSnippets[];
  activeTemplateId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onDelete: (id: string) => void;
  onRename: (id: string, name: string) => void;
}

export function TemplateBar({
  templates,
  activeTemplateId,
  onSelect,
  onAdd,
  onDelete,
  onRename,
}: TemplateBarProps) {
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameVal, setRenameVal] = useState("");

  const commitRename = () => {
    if (renamingId && renameVal.trim()) {
      onRename(renamingId, renameVal.trim());
    }
    setRenamingId(null);
  };

  return (
    <div
      style={{
        padding: "10px 16px",
        background: "#fff",
        borderBottom: "1px solid #E2E8F0",
        display: "flex",
        alignItems: "center",
        gap: 7,
        overflowX: "auto",
      }}
    >
      <span
        style={{
          fontSize: 10.5,
          fontWeight: 700,
          color: "#94A3B8",
          textTransform: "uppercase",
          letterSpacing: "0.06em",
          flexShrink: 0,
          marginRight: 2,
        }}
      >
        Templates
      </span>

      {templates.map((t) => {
        const active = t.id === activeTemplateId;

        if (renamingId === t.id) {
          return (
            <input
              key={t.id}
              autoFocus
              value={renameVal}
              onChange={(e) => setRenameVal(e.target.value)}
              onBlur={commitRename}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitRename();
                if (e.key === "Escape") setRenamingId(null);
              }}
              style={{
                fontSize: 12,
                padding: "4px 10px",
                borderRadius: 7,
                border: "2px solid #6366F1",
                outline: "none",
                fontFamily: "inherit",
                fontWeight: 600,
                width: 120,
              }}
            />
          );
        }

        return (
          <div key={t.id} style={{ position: "relative", flexShrink: 0 }}>
            <button
              onClick={() => onSelect(t.id)}
              onDoubleClick={() => {
                setRenamingId(t.id);
                setRenameVal(t.name);
              }}
              style={{
                fontSize: 12,
                fontWeight: active ? 700 : 500,
                padding: "4px 12px",
                borderRadius: 7,
                border: active ? "2px solid #4F46E5" : "1.5px solid #E2E8F0",
                background: active ? "#EEF2FF" : "#fff",
                color: active ? "#4338CA" : "#64748B",
                cursor: "pointer",
                fontFamily: "inherit",
                transition: "all 0.15s",
              }}
            >
              {t.name}
              <span style={{ fontSize: 9.5, marginLeft: 5, color: "#94A3B8" }}>
                ({t.snippets.filter((s) => s.active).length})
              </span>
            </button>
            {templates.length > 1 && active && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(t.id);
                }}
                title="Delete template"
                style={{
                  position: "absolute",
                  top: -5,
                  right: -5,
                  width: 15,
                  height: 15,
                  borderRadius: 8,
                  background: "#EF4444",
                  color: "#fff",
                  border: "none",
                  fontSize: 9,
                  lineHeight: "15px",
                  textAlign: "center",
                  cursor: "pointer",
                  padding: 0,
                }}
              >
                ×
              </button>
            )}
          </div>
        );
      })}

      <button
        onClick={onAdd}
        style={{
          fontSize: 14,
          fontWeight: 600,
          padding: "2px 10px",
          borderRadius: 7,
          border: "1.5px dashed #6366F1",
          background: "transparent",
          color: "#6366F1",
          cursor: "pointer",
          fontFamily: "inherit",
          flexShrink: 0,
        }}
      >
        +
      </button>

      <span
        style={{
          fontSize: 9.5,
          color: "#CBD5E1",
          marginLeft: "auto",
          flexShrink: 0,
        }}
      >
        double-click to rename
      </span>
    </div>
  );
}
