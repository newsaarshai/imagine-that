"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

function FloatingOrb({
  delay,
  size,
  x,
  y,
  color,
}: {
  delay: number;
  size: number;
  x: string;
  y: string;
  color: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full blur-3xl"
      style={{
        width: size,
        height: size,
        left: x,
        top: y,
        background: color,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, 15, 0],
        scale: [1, 1.1, 1],
        opacity: [0.3, 0.5, 0.3],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

export function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      container.style.setProperty("--mouse-x", `${x}%`);
      container.style.setProperty("--mouse-y", `${y}%`);
    };

    container.addEventListener("mousemove", handleMouseMove);
    return () => container.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      ref={containerRef}
      className="spotlight relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6"
    >
      {/* Floating orbs */}
      <FloatingOrb delay={0} size={400} x="10%" y="20%" color="rgba(108, 92, 231, 0.15)" />
      <FloatingOrb delay={2} size={300} x="70%" y="10%" color="rgba(253, 121, 168, 0.1)" />
      <FloatingOrb delay={4} size={350} x="50%" y="60%" color="rgba(162, 155, 254, 0.1)" />

      {/* Grid background */}
      <div className="grid-bg absolute inset-0" />

      {/* Content */}
      <div className="relative z-10 flex max-w-3xl flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-accent/20 bg-accent/5 px-4 py-1.5 text-xs text-accent-light"
        >
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-light opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-accent-light" />
          </span>
          A playground for creative apps
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-6 text-5xl font-bold leading-tight tracking-tight sm:text-7xl"
        >
          imagine
          <span className="gradient-text">that</span>
          <span className="text-accent-light">.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-10 max-w-lg text-lg leading-relaxed text-muted"
        >
          A collection of mini games, creative tools, and experiments.
          Built for fun, made to share.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col gap-4 sm:flex-row"
        >
          <Link
            href="/projects"
            className="group relative inline-flex h-12 items-center justify-center gap-2 overflow-hidden rounded-xl bg-accent px-8 text-sm font-medium text-white transition-all hover:bg-accent/90 hover:shadow-lg hover:shadow-accent/25"
          >
            <span className="relative z-10">Explore Projects</span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-accent via-accent-light to-accent"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              style={{ opacity: 0.3 }}
            />
          </Link>
          <Link
            href="/about"
            className="inline-flex h-12 items-center justify-center rounded-xl border border-white/10 px-8 text-sm font-medium text-muted transition-all hover:border-white/20 hover:text-foreground"
          >
            Learn More
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <ArrowDown className="h-5 w-5 text-muted/40" />
        </motion.div>
      </motion.div>
    </section>
  );
}
