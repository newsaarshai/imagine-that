"use client";

import { useState } from "react";
import type { Snippet, SnippetCategory, TemplateType } from "@/lib/prompt-composer/types";
import { SnippetCard } from "./snippet-card";

interface SnippetListProps {
  snippets: Snippet[];
  templateName: string;
  templateTypes: TemplateType[];
  activeType: TemplateType | null;
  masterSnippets: Snippet[];
  onSave: (id: string, changes: { label: string; text: string; category: SnippetCategory }) => void;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
  onAdd: () => void;
  onRenameTemplate: (name: string) => void;
  onChangeType: (typeId: string | null) => void;
  onCreateType: (name: string) => void;
  usedCategories: SnippetCategory[];
}

export function SnippetList({
  snippets,
  templateName,
  templateTypes,
  activeType,
  masterSnippets,
  onSave,
  onDelete,
  onToggle,
  onAdd,
  onRenameTemplate,
  onChangeType,
  onCreateType,
  usedCategories,
}: SnippetListProps) {
  const [isRenamingTemplate, setIsRenamingTemplate] = useState(false);
  const [renameVal, setRenameVal] = useState("");
  const [isCreatingType, setIsCreatingType] = useState(false);
  const [newTypeName, setNewTypeName] = useState("");

  const isMaster = activeType
    ? templateTypes.some(
        (tt) => tt.id === activeType.id && tt.master_template_id !== ""
      )
    : false;

  const commitRename = () => {
    if (renameVal.trim()) {
      onRenameTemplate(renameVal.trim());
    }
    setIsRenamingTemplate(false);
  };

  const handleTypeChange = (value: string) => {
    if (value === "__new__") {
      setIsCreatingType(true);
      setNewTypeName("");
    } else if (value === "__blank__") {
      onChangeType(null);
    } else {
      onChangeType(value);
    }
  };

  const commitNewType = () => {
    if (newTypeName.trim()) {
      onCreateType(newTypeName.trim());
    }
    setIsCreatingType(false);
    setNewTypeName("");
  };

  return (
    <div
      style={{
        padding: "14px 14px 100px",
        overflowY: "auto",
        maxHeight: "calc(100vh - 194px)",
        borderRight: "1px solid #E2E8F0",
        background: "#F8FAFC",
      }}
    >
      {/* Template name + type header */}
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 6,
          }}
        >
          {isRenamingTemplate ? (
            <input
              autoFocus
              value={renameVal}
              onChange={(e) => setRenameVal(e.target.value)}
              onBlur={commitRename}
              onKeyDown={(e) => {
                if (e.key === "Enter") commitRename();
                if (e.key === "Escape") setIsRenamingTemplate(false);
              }}
              style={{
                fontSize: 16,
                fontWeight: 700,
                color: "#1E293B",
                padding: "2px 6px",
                border: "2px solid #6366F1",
                borderRadius: 6,
                outline: "none",
                fontFamily: "inherit",
                flex: 1,
                marginRight: 8,
              }}
            />
          ) : (
            <h2
              onDoubleClick={() => {
                setIsRenamingTemplate(true);
                setRenameVal(templateName);
              }}
              style={{
                margin: 0,
                fontSize: 16,
                fontWeight: 700,
                color: "#1E293B",
                cursor: "pointer",
                flex: 1,
              }}
              title="Double-click to rename"
            >
              {templateName}
              {activeType && isMaster && (
                <span
                  style={{
                    fontSize: 9,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    color: "#D97706",
                    background: "#FEF3C7",
                    padding: "2px 6px",
                    borderRadius: 4,
                    marginLeft: 8,
                    verticalAlign: "middle",
                  }}
                >
                  master
                </span>
              )}
            </h2>
          )}
          <button
            onClick={onAdd}
            style={{
              fontSize: 11,
              fontWeight: 600,
              padding: "4px 10px",
              borderRadius: 7,
              border: "1.5px dashed #6366F1",
              background: "#EEF2FF",
              color: "#4F46E5",
              cursor: "pointer",
              fontFamily: "inherit",
              flexShrink: 0,
            }}
          >
            + Add Snippet
          </button>
        </div>

        {/* Type dropdown */}
        <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span
            style={{
              fontSize: 10.5,
              fontWeight: 600,
              color: "#94A3B8",
              flexShrink: 0,
            }}
          >
            Type:
          </span>
          {isCreatingType ? (
            <div style={{ display: "flex", alignItems: "center", gap: 4, flex: 1 }}>
              <input
                autoFocus
                value={newTypeName}
                onChange={(e) => setNewTypeName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") commitNewType();
                  if (e.key === "Escape") {
                    setIsCreatingType(false);
                    setNewTypeName("");
                  }
                }}
                placeholder="Type name..."
                style={{
                  fontSize: 12,
                  padding: "3px 8px",
                  border: "1.5px solid #6366F1",
                  borderRadius: 6,
                  outline: "none",
                  fontFamily: "inherit",
                  flex: 1,
                }}
              />
              <button
                onClick={commitNewType}
                disabled={!newTypeName.trim()}
                style={{
                  fontSize: 10.5,
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: 6,
                  border: "none",
                  background: newTypeName.trim() ? "#4F46E5" : "#E2E8F0",
                  color: newTypeName.trim() ? "#fff" : "#94A3B8",
                  cursor: newTypeName.trim() ? "pointer" : "default",
                  fontFamily: "inherit",
                }}
              >
                Create
              </button>
              <button
                onClick={() => {
                  setIsCreatingType(false);
                  setNewTypeName("");
                }}
                style={{
                  fontSize: 10.5,
                  padding: "3px 8px",
                  borderRadius: 6,
                  border: "1px solid #E2E8F0",
                  background: "#fff",
                  color: "#64748B",
                  cursor: "pointer",
                  fontFamily: "inherit",
                }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <select
              value={activeType?.id ?? "__blank__"}
              onChange={(e) => handleTypeChange(e.target.value)}
              style={{
                fontSize: 12,
                padding: "3px 8px",
                border: "1px solid #E2E8F0",
                borderRadius: 6,
                outline: "none",
                fontFamily: "inherit",
                background: "#fff",
                color: "#334155",
                flex: 1,
                maxWidth: 220,
              }}
            >
              <option value="__blank__">Blank</option>
              <option value="__new__">New...</option>
              {templateTypes.map((tt) => (
                <option key={tt.id} value={tt.id}>
                  {tt.name}
                </option>
              ))}
            </select>
          )}
        </div>
      </div>

      {snippets.length === 0 && (
        <div
          style={{
            padding: 28,
            textAlign: "center",
            color: "#94A3B8",
            fontSize: 12.5,
            lineHeight: 1.6,
            border: "1.5px dashed #E2E8F0",
            borderRadius: 12,
          }}
        >
          No snippets yet.
          <br />
          Click <b>+ Add Snippet</b> to start building your prompt.
        </div>
      )}

      <div style={{ display: "flex", flexDirection: "column", gap: 7 }}>
        {snippets.map((s) => (
          <SnippetCard
            key={s.id}
            snippet={s}
            onSave={onSave}
            onDelete={onDelete}
            onToggle={onToggle}
            usedCategories={usedCategories}
            masterSnippets={masterSnippets}
            hasType={!!activeType}
          />
        ))}
      </div>
    </div>
  );
}
