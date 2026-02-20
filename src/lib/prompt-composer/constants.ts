import type { DefaultTemplate, SnippetCategory } from "./types";

export const APP_SUBTITLE = "Modular Image Prompt Builder";

export const CATEGORIES: SnippetCategory[] = [
  "Product",
  "Material",
  "Structure",
  "Illustration",
  "Theme",
  "Reference",
  "Photography",
  "Constraints",
];

export const CAT_COLORS: Record<
  SnippetCategory,
  { bg: string; border: string; dot: string }
> = {
  Product: { bg: "#FEF3C7", border: "#F59E0B", dot: "#D97706" },
  Material: { bg: "#DBEAFE", border: "#3B82F6", dot: "#2563EB" },
  Structure: { bg: "#E0E7FF", border: "#6366F1", dot: "#4F46E5" },
  Illustration: { bg: "#FCE7F3", border: "#EC4899", dot: "#DB2777" },
  Theme: { bg: "#D1FAE5", border: "#10B981", dot: "#059669" },
  Reference: { bg: "#FEE2E2", border: "#EF4444", dot: "#DC2626" },
  Photography: { bg: "#F3E8FF", border: "#A855F7", dot: "#9333EA" },
  Constraints: { bg: "#F1F5F9", border: "#64748B", dot: "#475569" },
};

const SKYLINE_SNIPPETS = [
  {
    category: "Product" as SnippetCategory,
    label: "Product Description",
    active: true,
    sort_order: 0,
    text: "A product photograph of a decorative panel set made from PET-felt material. The product consists of {panelCount} interlocking panels that stand upright on a surface, forming a {shape} panoramic city-skyline silhouette.",
  },
  {
    category: "Material" as SnippetCategory,
    label: "Material & Texture",
    active: true,
    sort_order: 1,
    text: "The panels are made of PET-felt — a thick, soft, matte textile with a fine fibrous surface texture similar to craft felt. The felt color is {feltColor}. The material has visible micro-fiber texture and soft rounded edges where cut.",
  },
  {
    category: "Structure" as SnippetCategory,
    label: "Two-Layer Construction",
    active: true,
    sort_order: 2,
    text: "Each panel is constructed from two layers of PET-felt. The front layer features detailed illustrations painted or printed directly onto the felt surface. The back layer is a solid-colored felt backing that is slightly larger than the front, creating a {borderWidth} border/frame effect around each panel.",
  },
  {
    category: "Theme" as SnippetCategory,
    label: "Skyline Silhouette",
    active: true,
    sort_order: 3,
    text: "The top edge of the panels follows the roofline silhouette of {cityName}, with recognizable landmarks and building shapes cut into the felt. The skyline reads as a continuous panorama across all panels.",
  },
  {
    category: "Illustration" as SnippetCategory,
    label: "Illustration Style",
    active: true,
    sort_order: 4,
    text: "The illustrations on the front layer are rendered in a {illustrationStyle} style with {colorPalette} colors. The artwork depicts the {cityName} skyline with fine detail and a hand-crafted, artisanal quality.",
  },
  {
    category: "Photography" as SnippetCategory,
    label: "Shot & Lighting",
    active: true,
    sort_order: 5,
    text: "Professional product photograph, shot straight-on at eye level against a clean {bgColor} background. Soft, even studio lighting with gentle shadows underneath and behind the panels. Sharp focus throughout.",
  },
  {
    category: "Reference" as SnippetCategory,
    label: "Reference Image",
    active: false,
    sort_order: 6,
    text: "Use the uploaded reference image ({refImageFile}) as a guide for the overall product form, panel arrangement, and construction style. Match the same type of felt material, two-layer construction, and illustration-on-felt aesthetic.",
  },
  {
    category: "Constraints" as SnippetCategory,
    label: "Constraints",
    active: false,
    sort_order: 7,
    text: "Do not add any people, hands, or props. Do not add text or labels unless specified. Keep the background clean. The felt must read as soft textile, not paper or cardboard.",
  },
];

const FACADE_SNIPPETS = [
  {
    category: "Product" as SnippetCategory,
    label: "Product Description",
    active: true,
    sort_order: 0,
    text: "A product photograph of a decorative panel set made from PET-felt material. The product consists of {panelCount} interlocking panels that stand upright, depicting the front facade of a {buildingStyle} building.",
  },
  {
    category: "Material" as SnippetCategory,
    label: "Material & Texture",
    active: true,
    sort_order: 1,
    text: "The panels are made of PET-felt — a thick, soft, matte textile with a fine fibrous surface texture similar to craft felt. The felt color is {feltColor}. The material has visible micro-fiber texture and soft rounded edges where cut.",
  },
  {
    category: "Structure" as SnippetCategory,
    label: "Two-Layer Construction",
    active: true,
    sort_order: 2,
    text: "Each panel is constructed from two layers of PET-felt. The front layer features detailed illustrations of the building facade painted onto the felt surface. The back layer is a solid-colored felt backing, slightly larger than the front, creating a {borderWidth} border effect.",
  },
  {
    category: "Theme" as SnippetCategory,
    label: "Facade Details",
    active: true,
    sort_order: 3,
    text: "The panels together form the front elevation of a {buildingStyle} building. Architectural details include {archDetails}. The center panels feature a {doorwayType} that creates an actual opening/portal through the felt.",
  },
  {
    category: "Illustration" as SnippetCategory,
    label: "Illustration Style",
    active: true,
    sort_order: 4,
    text: "The illustrations are rendered in a {illustrationStyle} style with {colorPalette} colors. Windows, doors, balconies, and greenery are depicted with fine detail. The artwork has a hand-crafted, artisanal quality.",
  },
  {
    category: "Photography" as SnippetCategory,
    label: "Shot & Lighting",
    active: true,
    sort_order: 5,
    text: "Professional product photograph, shot straight-on at eye level against a clean {bgColor} background. Soft, even studio lighting with gentle shadows. Sharp focus throughout.",
  },
  {
    category: "Reference" as SnippetCategory,
    label: "Reference Image",
    active: false,
    sort_order: 6,
    text: "Use the uploaded reference image ({refImageFile}) as a guide for the overall product form and construction style. Match the felt material, two-layer construction, and illustration-on-felt aesthetic.",
  },
  {
    category: "Constraints" as SnippetCategory,
    label: "Constraints",
    active: false,
    sort_order: 7,
    text: "Do not add any people, hands, or props. Keep the background clean. The felt must read as soft textile, not paper or cardboard.",
  },
];

export const DEFAULT_TEMPLATES: DefaultTemplate[] = [
  { name: "Blank", snippets: [] },
  { name: "Skyline", snippets: SKYLINE_SNIPPETS },
  { name: "Building Facade", snippets: FACADE_SNIPPETS },
];

export const TIPS = [
  { bold: "Describe scenes narratively", text: "write like briefing a photographer, not keyword lists." },
  { bold: "Front-load subject", text: "product type and main idea first, then details." },
  { bold: "Be specific about materials", text: 'naming matters \u2014 "PET-felt" vs "felt" vs "fabric" gives different results.' },
  { bold: "Use photography language", text: "lighting, lens, angle, framing terms guide the model." },
  { bold: "State constraints explicitly", text: '"no watermark", "no people", "no text".' },
  { bold: "Reference images + description", text: "of what to match from them are powerful." },
  { bold: "Iterate one change at a time", text: "for predictable results." },
];
