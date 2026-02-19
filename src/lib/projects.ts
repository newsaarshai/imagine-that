export interface Project {
  id: string;
  title: string;
  description: string;
  category: "game" | "tool" | "experiment" | "app";
  href: string;
  image?: string;
  tags: string[];
  status: "live" | "coming-soon" | "beta";
}

export const projects: Project[] = [
  {
    id: "example-game",
    title: "Color Match",
    description: "A fast-paced color matching game that tests your reflexes and pattern recognition.",
    category: "game",
    href: "/projects/color-match",
    tags: ["game", "puzzle", "casual"],
    status: "coming-soon",
  },
  {
    id: "example-tool",
    title: "Palette Generator",
    description: "Generate beautiful color palettes powered by AI. Export to CSS, Tailwind, or Figma.",
    category: "tool",
    href: "/projects/palette-generator",
    tags: ["design", "ai", "colors"],
    status: "coming-soon",
  },
  {
    id: "example-experiment",
    title: "Particle Playground",
    description: "An interactive physics simulation where you create and control particle systems.",
    category: "experiment",
    href: "/projects/particle-playground",
    tags: ["physics", "interactive", "creative"],
    status: "coming-soon",
  },
];

export const categories = [
  { id: "all", label: "All" },
  { id: "game", label: "Games" },
  { id: "tool", label: "Tools" },
  { id: "experiment", label: "Experiments" },
  { id: "app", label: "Apps" },
] as const;
