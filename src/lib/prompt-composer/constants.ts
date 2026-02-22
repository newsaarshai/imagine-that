import type { DefaultTemplate, GlobalCategory } from "./types";

export const APP_SUBTITLE = "Modular Prompt Builder";

// Global categories for untyped (Blank) templates
export const GLOBAL_CATEGORIES: GlobalCategory[] = [
  "Blank",
  "Product",
  "Material",
  "Structure",
  "Illustration",
  "Theme",
  "Reference",
  "Photography",
  "Constraints",
];

// Colors for known categories. For unknown (custom) categories, use a default.
export const CAT_COLORS: Record<string, { bg: string; border: string; dot: string }> = {
  Blank: { bg: "#F1F5F9", border: "#94A3B8", dot: "#64748B" },
  Product: { bg: "#FEF3C7", border: "#F59E0B", dot: "#D97706" },
  Material: { bg: "#DBEAFE", border: "#3B82F6", dot: "#2563EB" },
  Structure: { bg: "#E0E7FF", border: "#6366F1", dot: "#4F46E5" },
  Illustration: { bg: "#FCE7F3", border: "#EC4899", dot: "#DB2777" },
  Theme: { bg: "#D1FAE5", border: "#10B981", dot: "#059669" },
  Reference: { bg: "#FEE2E2", border: "#EF4444", dot: "#DC2626" },
  Photography: { bg: "#F3E8FF", border: "#A855F7", dot: "#9333EA" },
  Constraints: { bg: "#F1F5F9", border: "#64748B", dot: "#475569" },
  // 4W categories
  ROLE: { bg: "#DBEAFE", border: "#3B82F6", dot: "#2563EB" },
  OBJECTIVE: { bg: "#FEF3C7", border: "#F59E0B", dot: "#D97706" },
  "CONTEXT PACKAGE": { bg: "#E0E7FF", border: "#6366F1", dot: "#4F46E5" },
  WORKFLOW: { bg: "#D1FAE5", border: "#10B981", dot: "#059669" },
  "CONTEXT-HANDLING RULES": { bg: "#FCE7F3", border: "#EC4899", dot: "#DB2777" },
  "OUTPUT FORMAT": { bg: "#F3E8FF", border: "#A855F7", dot: "#9333EA" },
  "FIRST ACTION": { bg: "#FEE2E2", border: "#EF4444", dot: "#DC2626" },
  // AI Teammate categories
  "WHY IT MATTERS": { bg: "#FEF3C7", border: "#F59E0B", dot: "#D97706" },
  LIMITS: { bg: "#FEE2E2", border: "#EF4444", dot: "#DC2626" },
  "DEFINITION OF DONE": { bg: "#D1FAE5", border: "#10B981", dot: "#059669" },
  "REQUIRED OUTPUTS": { bg: "#E0E7FF", border: "#6366F1", dot: "#4F46E5" },
  "INTERIM CHECKPOINT": { bg: "#FCE7F3", border: "#EC4899", dot: "#DB2777" },
  "FINAL CHECKS": { bg: "#F3E8FF", border: "#A855F7", dot: "#9333EA" },
  ASK: { bg: "#FEF3C7", border: "#F59E0B", dot: "#D97706" },
};

export const DEFAULT_CAT_COLOR = { bg: "#F1F5F9", border: "#94A3B8", dot: "#64748B" };

export function getCatColor(category: string) {
  return CAT_COLORS[category] ?? DEFAULT_CAT_COLOR;
}

// ── Default templates for new accounts ──────────────────────────

const FOURW_SNIPPETS = [
  { category: "ROLE", label: "Role", active: true, sort_order: 0, text: "You are {persona}" },
  { category: "OBJECTIVE", label: "Objective", active: true, sort_order: 1, text: "Help me {outcome}" },
  { category: "CONTEXT PACKAGE", label: "Context Package", active: true, sort_order: 2, text: "Audience: {who}\nVoice and tone: {tone}\nLength target: {length}\nKey facts / data / links to use:\n1) ...\n2) ...\n3) ...\nConstraints / boundaries:\n..." },
  { category: "WORKFLOW", label: "Workflow", active: true, sort_order: 3, text: "Step 1) Gap check: list missing info and ask concise questions\nStep 2) Plan: outline structure and wait for approval\nStep 3) Draft: create v1\nStep 4) Review: ask for feedback\nStep 5) Revise: improve with feedback" },
  { category: "CONTEXT-HANDLING RULES", label: "Context-Handling Rules", active: true, sort_order: 4, text: "- If source text is long, summarize first and ask whether to keep it in context\n- If external knowledge is needed, list what is missing" },
  { category: "OUTPUT FORMAT", label: "Output Format", active: true, sort_order: 5, text: "Return in {markdown / bullets / plain text}\nReference facts by source number [1], [2], [3]" },
  { category: "FIRST ACTION", label: "First Action", active: true, sort_order: 6, text: "Start with Gap check" },
];

const AI_TEAMMATE_SNIPPETS = [
  { category: "ROLE", label: "Role", active: true, sort_order: 0, text: "Act as my AI teammate." },
  { category: "OBJECTIVE", label: "Objective", active: true, sort_order: 1, text: "{what we're trying to accomplish}" },
  { category: "WHY IT MATTERS", label: "Why It Matters", active: true, sort_order: 2, text: "{business/user reason}" },
  { category: "LIMITS", label: "Limits", active: true, sort_order: 3, text: "{what you can/can't change}" },
  { category: "DEFINITION OF DONE", label: "Definition of Done", active: true, sort_order: 4, text: "{clear quality bar}" },
  { category: "REQUIRED OUTPUTS", label: "Required Outputs", active: true, sort_order: 5, text: "{final deliverables}" },
  { category: "INTERIM CHECKPOINT", label: "Interim Checkpoint", active: true, sort_order: 6, text: "{what to show me before final}" },
  { category: "FINAL CHECKS", label: "Final Checks", active: true, sort_order: 7, text: "{tests/criteria to verify before completion}" },
  { category: "ASK", label: "Ask", active: true, sort_order: 8, text: "If anything is underspecified, ask questions before starting." },
];

export const DEFAULT_TEMPLATES: DefaultTemplate[] = [
  { name: "4W", snippets: FOURW_SNIPPETS },
  { name: "AI Teammate", snippets: AI_TEAMMATE_SNIPPETS },
];

export const TIPS = [
  { bold: "Describe scenes narratively", text: "write like briefing a photographer, not keyword lists." },
  { bold: "Front-load subject", text: "product type and main idea first, then details." },
  { bold: "Be specific about materials", text: 'naming matters — "PET-felt" vs "felt" vs "fabric" gives different results.' },
  { bold: "Use photography language", text: "lighting, lens, angle, framing terms guide the model." },
  { bold: "State constraints explicitly", text: '"no watermark", "no people", "no text".' },
  { bold: "Reference images + description", text: "of what to match from them are powerful." },
  { bold: "Iterate one change at a time", text: "for predictable results." },
];
