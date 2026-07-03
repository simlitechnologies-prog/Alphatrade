import { type LucideIcon } from "lucide-react";

export function PageHero({
  eyebrow,
  title,
  description,
  icon: Icon,
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon?: LucideIcon;
}) {
  return (
    <section className="relative overflow-hidden bg-brand-primary py-16 lg:py-20">
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "linear-gradient(to right, white 1px, transparent 1px), linear-gradient(to bottom, white 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />
      <div className="relative mx-auto max-w-4xl px-6 text-center">
        {Icon && (
          <span className="mx-auto mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-secondary/20 text-brand-secondary">
            <Icon size={22} />
          </span>
        )}
        <p className="font-display text-sm font-semibold uppercase tracking-wider text-brand-accent">
          {eyebrow}
        </p>
        <h1 className="font-display mt-3 text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
          {title}
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-base text-white/65">
          {description}
        </p>
      </div>
    </section>
  );
}
