"use client";

import { motion } from "framer-motion";

const items = [
  { emoji: "🎮", label: "Games", color: "bg-coral/10 text-coral" },
  { emoji: "🔧", label: "Tools", color: "bg-accent/10 text-accent" },
  { emoji: "🧪", label: "Experiments", color: "bg-amber/10 text-amber" },
  { emoji: "📱", label: "Apps", color: "bg-mint/10 text-mint" },
  { emoji: "🎮", label: "Games", color: "bg-coral/10 text-coral" },
  { emoji: "🔧", label: "Tools", color: "bg-accent/10 text-accent" },
  { emoji: "🧪", label: "Experiments", color: "bg-amber/10 text-amber" },
  { emoji: "📱", label: "Apps", color: "bg-mint/10 text-mint" },
];

export function FeaturesSection() {
  return (
    <section className="overflow-hidden border-y border-card-border/60 bg-warm-gray/50 py-5">
      <div className="flex w-max marquee">
        {[...items, ...items].map((item, i) => (
          <motion.div
            key={i}
            className="flex items-center gap-6 px-6"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold ${item.color}`}>
              <span className="text-lg">{item.emoji}</span>
              {item.label}
            </div>
            <span className="text-card-border">✦</span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
