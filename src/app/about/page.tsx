"use client";

import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="pt-16">
      <section className="mx-auto max-w-2xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            About <span className="gradient-text">this place</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6 text-lg leading-relaxed text-muted"
        >
          <p>
            I like making things. Small games, useful tools, weird interactive
            experiments — anything that sounds fun to build and fun to use.
          </p>
          <p>
            For a while these projects were scattered across different places.
            Some lived on random subdomains, others were just GitHub repos nobody
            would ever find. So I made this site to give them all a proper home.
          </p>
          <p>
            Everything here is built with <strong className="text-foreground">Next.js</strong>,{" "}
            <strong className="text-foreground">React</strong>, and{" "}
            <strong className="text-foreground">Tailwind CSS</strong>. When
            something needs a database or user accounts, I use{" "}
            <strong className="text-foreground">Supabase</strong>. The site is
            hosted on <strong className="text-foreground">Vercel</strong>.
          </p>
          <p>
            New stuff gets added regularly. If you have an idea for something
            you&apos;d like to see here, feel free to{" "}
            <a href="/contact" className="squiggle font-semibold text-foreground">
              reach out
            </a>
            .
          </p>
        </motion.div>
      </section>
    </div>
  );
}
