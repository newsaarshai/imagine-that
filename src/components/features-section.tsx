"use client";

const items = ["games", "tools", "experiments", "apps"];

export function FeaturesSection() {
  return (
    <section className="overflow-hidden border-y border-card-border/60 py-4">
      <div className="flex w-max marquee">
        {[...items, ...items, ...items, ...items].map((item, i) => (
          <div key={i} className="flex items-center gap-8 px-8">
            <span className="text-sm font-medium tracking-wide text-muted/50 uppercase">
              {item}
            </span>
            <span className="text-card-border text-xs">✦</span>
          </div>
        ))}
      </div>
    </section>
  );
}
