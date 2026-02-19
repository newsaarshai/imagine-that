import { Sparkles } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-white/5 bg-background">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-accent-light" />
            <span className="text-sm font-semibold tracking-tight">
              imagine<span className="gradient-text">that</span>
            </span>
          </div>

          <div className="flex items-center gap-6">
            <Link
              href="/projects"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Projects
            </Link>
            <Link
              href="/about"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              About
            </Link>
            <Link
              href="/contact"
              className="text-sm text-muted transition-colors hover:text-foreground"
            >
              Contact
            </Link>
          </div>

          <p className="text-xs text-muted/60">
            &copy; {new Date().getFullYear()} imaginethat.one
          </p>
        </div>
      </div>
    </footer>
  );
}
