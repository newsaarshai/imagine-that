"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const floatingEmojis = [
  { emoji: "🎮", x: "12%", y: "18%", delay: 0, className: "float text-3xl" },
  { emoji: "🧪", x: "85%", y: "22%", delay: 0.5, className: "float float-delay-1 text-2xl" },
  { emoji: "🎨", x: "8%", y: "70%", delay: 1, className: "float float-delay-2 text-2xl" },
  { emoji: "⚡", x: "90%", y: "65%", delay: 1.5, className: "float text-xl" },
  { emoji: "🌈", x: "75%", y: "80%", delay: 2, className: "float float-delay-1 text-3xl" },
  { emoji: "🔮", x: "20%", y: "85%", delay: 0.8, className: "float float-delay-2 text-xl" },
];

export function Hero() {
  return (
    <section className="relative flex min-h-[90vh] flex-col items-center justify-center overflow-hidden px-6 pt-16">
      <div className="dot-grid absolute inset-0 opacity-50" />

      <div className="absolute left-[10%] top-[20%] h-72 w-72 rounded-full bg-accent/[0.06] blur-3xl" />
      <div className="absolute right-[10%] top-[30%] h-64 w-64 rounded-full bg-coral/[0.06] blur-3xl" />
      <div className="absolute bottom-[20%] left-[30%] h-56 w-56 rounded-full bg-amber/[0.06] blur-3xl" />

      {floatingEmojis.map((item, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.8 + item.delay, type: "spring", stiffness: 200 }}
          className={`absolute select-none ${item.className}`}
          style={{ left: item.x, top: item.y }}
        >
          {item.emoji}
        </motion.span>
      ))}

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.15 }}
        transition={{ delay: 1.2 }}
        className="spin-slow absolute right-[15%] top-[15%] text-6xl text-amber select-none"
      >
        ✦
      </motion.div>

      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border-2 border-dashed border-accent/30 bg-accent/5 px-5 py-2 text-sm font-medium text-accent"
        >
          <span className="hover-wiggle inline-block">🚀</span>
          A playground for curious minds
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-6 text-5xl font-extrabold leading-tight tracking-tight sm:text-7xl"
        >
          imagine
          <span className="gradient-text">that</span>
          <motion.span
            animate={{ rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
            className="inline-block origin-bottom"
          >
            .
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-10 max-w-md text-lg leading-relaxed text-muted"
        >
          Mini games, creative tools, and weird experiments
          — all living under one roof.{" "}
          <span className="squiggle">Come play.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.45 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/projects"
            className="bouncy inline-flex h-12 items-center justify-center gap-2 rounded-full bg-foreground px-8 text-sm font-semibold text-background"
          >
            Browse Projects →
          </Link>
          <Link
            href="/about"
            className="bouncy inline-flex h-12 items-center justify-center rounded-full border-2 border-card-border px-8 text-sm font-semibold text-foreground hover:border-foreground"
          >
            What is this?
          </Link>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="absolute bottom-6"
      >
        <motion.p
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="text-sm text-muted/40"
        >
          scroll ↓
        </motion.p>
      </motion.div>
    </section>
  );
}
