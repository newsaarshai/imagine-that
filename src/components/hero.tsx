"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function Hero() {
  return (
    <section className="relative flex min-h-[85vh] flex-col items-center justify-center overflow-hidden px-6 pt-16">
      {/* Subtle dot grid */}
      <div className="dot-grid absolute inset-0 opacity-40" />

      {/* Content */}
      <div className="relative z-10 flex max-w-xl flex-col items-center text-center">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-5 text-5xl font-extrabold leading-tight tracking-tight sm:text-6xl"
        >
          imagine<span className="gradient-text">that</span>
          <motion.span
            animate={{ rotate: [0, 12, -8, 0] }}
            transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 4 }}
            className="inline-block origin-bottom-left"
          >
            .
          </motion.span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mb-4 max-w-md text-lg leading-relaxed text-muted"
        >
          Hi! I build small games, handy tools, and odd little
          experiments for the web. This is where they all live.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mb-10 text-base text-muted/70"
        >
          Have a look around — everything here is free to play with.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="flex flex-col gap-3 sm:flex-row"
        >
          <Link
            href="/projects"
            className="bouncy inline-flex h-11 items-center justify-center rounded-full bg-foreground px-7 text-sm font-semibold text-background"
          >
            See what I&apos;ve made →
          </Link>
          <Link
            href="/about"
            className="bouncy inline-flex h-11 items-center justify-center rounded-full border-2 border-card-border px-7 text-sm font-semibold text-foreground hover:border-foreground/40"
          >
            About this place
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
