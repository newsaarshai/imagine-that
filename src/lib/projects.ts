export interface Project {
  id: string;
  title: string;
  description: string;
  category: "game" | "tool" | "experiment" | "app";
  href: string;
  emoji: string;
  color: string;
  tags: string[];
  status: "live" | "coming-soon" | "beta";
}

export const projects: Project[] = [
  {
    id: "color-match",
    title: "Color Match",
    description: "A fast-paced color matching game that tests your reflexes and pattern recognition.",
    category: "game",
    href: "/projects/color-match",
    emoji: "🎨",
    color: "#ff6b6b",
    tags: ["puzzle", "casual", "fast"],
    status: "coming-soon",
  },
  {
    id: "palette-generator",
    title: "Palette Generator",
    description: "Generate beautiful color palettes powered by AI. Export to CSS, Tailwind, or Figma.",
    category: "tool",
    href: "/projects/palette-generator",
    emoji: "🌈",
    color: "#6c5ce7",
    tags: ["design", "ai", "colors"],
    status: "coming-soon",
  },
  {
    id: "particle-playground",
    title: "Particle Playground",
    description: "An interactive physics simulation where you create and control particle systems.",
    category: "experiment",
    href: "/projects/particle-playground",
    emoji: "✨",
    color: "#fcc419",
    tags: ["physics", "interactive", "creative"],
    status: "coming-soon",
  },
  {
    id: "word-rush",
    title: "Word Rush",
    description: "Race against the clock to form words from scrambled letters. How fast can you think?",
    category: "game",
    href: "/projects/word-rush",
    emoji: "💬",
    color: "#339af0",
    tags: ["words", "speed", "brain"],
    status: "coming-soon",
  },
  {
    id: "mood-radio",
    title: "Mood Radio",
    description: "Tell it how you feel and it curates an ambient soundscape just for you.",
    category: "app",
    href: "/projects/mood-radio",
    emoji: "📻",
    color: "#51cf66",
    tags: ["audio", "mood", "relaxation"],
    status: "coming-soon",
  },
];

export const categories = [
  { id: "all", label: "All", emoji: "🌟" },
  { id: "game", label: "Games", emoji: "🎮" },
  { id: "tool", label: "Tools", emoji: "🔧" },
  { id: "experiment", label: "Experiments", emoji: "🧪" },
  { id: "app", label: "Apps", emoji: "📱" },
] as const;
