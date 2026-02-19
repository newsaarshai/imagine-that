"use client";

import { motion } from "framer-motion";
import { Gamepad2, Palette, Zap, Users } from "lucide-react";

const features = [
  {
    icon: Gamepad2,
    title: "Mini Games",
    description: "Quick, fun games you can play in your browser. No downloads needed.",
  },
  {
    icon: Palette,
    title: "Creative Tools",
    description: "Useful utilities and generators for designers, developers, and creators.",
  },
  {
    icon: Zap,
    title: "Experiments",
    description: "Wild ideas and interactive prototypes pushing what's possible on the web.",
  },
  {
    icon: Users,
    title: "Community",
    description: "Share scores, save progress, and see what others are building.",
  },
];

export function FeaturesSection() {
  return (
    <section className="relative border-y border-white/5 bg-card-bg/50">
      <div className="mx-auto max-w-6xl px-6 py-24">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, i) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="group text-center"
            >
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent-light transition-colors group-hover:bg-accent/20">
                <feature.icon className="h-5 w-5" />
              </div>
              <h3 className="mb-2 text-sm font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
