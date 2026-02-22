"use client";

import { useState, useRef } from "react";
import type { TemplateWithSnippets, TemplateType } from "@/lib/prompt-composer/types";

interface TemplateBarProps {
  templates: TemplateWithSnippets[];
  templateTypes: TemplateType[];
  activeTemplateId: string;
  onSelect: (id: string) => void;
  onAdd: () => void;
  onRename: (id: string, name: string) => void;
  onReorder: (orderedIds: string[]) => void;
}

export function TemplateBar({
  templates,
  templateTypes,
  activeTemplateId,
  onSelect,
  onAdd,
  onRename,
  onReorder,
}: TemplateBarProps) {
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameVal, setRenameVal] = useState("");
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragIdRef = useRef<string | null>(null);

  const commitRename = () => {
    if (renamingId && renameVal.trim()) {
      onRename(renamingId, renameVal.trim());
    }
    setRenamingId(null);
  };

  const handleDragStart = (id: string) => {
    dragIdRef.current = id;
  };

  const handleDragOver = (e: React.DragEvent, id: string) => {
    e.preventDefault();
    if (dragIdRef.current && dragIdRef.current !== id) {
      setDragOverId(id);
    }
  };

  const handleDrop = (targetId: string) => {
    const fromId = dragIdRef.current;
    if (!fromId || fromId === targetId) {
      setDragOverId(null);
      dragIdRef.current = null;
      return;
    }

    const ids = templates.map((t) => t.id);
    const fromIdx = ids.indexOf(fromId);
    const toIdx = ids.indexOf(targetId);
    if (fromIdx === -1 || toIdx === -1) return;

    // Move the dragged item to the target position
    ids.splice(fromIdx, 1);
    ids.splice(toIdx, 0, fromId);

    onReorder(ids);
    setDragOverId(null);
    dragIdRef.current = null;
  };

  const handleDragEnd = () => {
    setDragOverId(null);
    dragIdRef.current = null;
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
        const type = t.type_id
          ? templateTypes.find((tt) => tt.id === t.type_id)
          : null;
        const isMaster = type
          ? type.master_template_id === t.id
          : false;
        const isDragOver = dragOverId === t.id;

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
          <div
            key={t.id}
            style={{ position: "relative", flexShrink: 0 }}
            draggable
            onDragStart={() => handleDragStart(t.id)}
            onDragOver={(e) => handleDragOver(e, t.id)}
            onDrop={() => handleDrop(t.id)}
            onDragEnd={handleDragEnd}
          >
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
                border: active
                  ? "2px solid #4F46E5"
                  : isDragOver
                    ? "2px solid #818CF8"
                    : "1.5px solid #E2E8F0",
                background: active ? "#EEF2FF" : isDragOver ? "#F5F3FF" : "#fff",
                color: active ? "#4338CA" : "#64748B",
                cursor: "grab",
                fontFamily: "inherit",
                transition: "all 0.15s",
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
              }}
            >
              {isMaster && (
                <span
                  style={{
                    fontSize: 8.5,
                    fontWeight: 700,
                    textTransform: "uppercase",
                    letterSpacing: "0.04em",
                    color: "#D97706",
                    background: "#FEF3C7",
                    padding: "1px 5px",
                    borderRadius: 4,
                    lineHeight: "14px",
                  }}
                >
                  master
                </span>
              )}
              {t.name}
              {type && (
                <span
                  style={{
                    fontSize: 9.5,
                    color: active ? "#818CF8" : "#94A3B8",
                    fontWeight: 400,
                  }}
                >
                  · {type.name}
                </span>
              )}
            </button>
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
        double-click to rename · drag to reorder
      </span>
    </div>
  );
}
