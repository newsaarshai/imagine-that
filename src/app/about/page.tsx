"use client";

import { motion } from "framer-motion";
import { Sparkles, Rocket, Heart } from "lucide-react";

export default function AboutPage() {
  return (
    <div className="pt-16">
      <section className="mx-auto max-w-3xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            About <span className="gradient-text">imaginethat</span>
          </h1>
          <p className="mx-auto max-w-lg text-lg text-muted">
            A personal playground for creative software — games, tools, and
            experiments that are fun to build and fun to use.
          </p>
        </motion.div>

        <div className="space-y-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex gap-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
              <Sparkles className="h-5 w-5 text-accent-light" />
            </div>
            <div>
              <h2 className="mb-2 text-lg font-semibold">The Idea</h2>
              <p className="leading-relaxed text-muted">
                I love building things — small apps, games, and creative
                experiments. This site is a home for all of them. Think of it as a
                digital workshop where every project gets its own space.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex gap-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
              <Rocket className="h-5 w-5 text-accent-light" />
            </div>
            <div>
              <h2 className="mb-2 text-lg font-semibold">What You&apos;ll Find</h2>
              <p className="leading-relaxed text-muted">
                Mini games you can play right in your browser. Creative tools that
                help you make cool things. Interactive experiments that push what
                the web can do. New stuff added regularly.
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-5"
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10">
              <Heart className="h-5 w-5 text-accent-light" />
            </div>
            <div>
              <h2 className="mb-2 text-lg font-semibold">Built With</h2>
              <p className="leading-relaxed text-muted">
                Next.js, React, Tailwind CSS, and Framer Motion for smooth
                animations. Hosted on Vercel with Supabase for anything that needs
                a database. Everything is built to be fast, responsive, and fun.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
