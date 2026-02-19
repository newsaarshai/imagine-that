"use client";

import { motion } from "framer-motion";
import { Mail, MessageCircle } from "lucide-react";

export default function ContactPage() {
  return (
    <div className="pt-16">
      <section className="mx-auto max-w-2xl px-6 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Get in <span className="gradient-text">touch</span>
          </h1>
          <p className="text-lg text-muted">
            Have an idea, found a bug, or just want to say hi?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="space-y-6"
        >
          <a
            href="mailto:new.saar.shai@gmail.com"
            className="group flex items-center gap-4 rounded-2xl border border-card-border bg-card-bg p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5"
          >
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent-light transition-colors group-hover:bg-accent/20">
              <Mail className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Email</h3>
              <p className="text-sm text-muted">new.saar.shai@gmail.com</p>
            </div>
          </a>

          <div className="flex items-center gap-4 rounded-2xl border border-card-border bg-card-bg p-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent-light">
              <MessageCircle className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-semibold">Feedback</h3>
              <p className="text-sm text-muted">
                More ways to reach out coming soon — including a feedback form
                right here on the site.
              </p>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
}
