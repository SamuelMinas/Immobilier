import { Link } from "@tanstack/react-router";

export function Logo({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="TransMedia, accueil">
      <span className="relative grid size-9 place-items-center rounded-xl bg-primary text-primary-foreground shadow-card">
        <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <path d="M3 11.5 12 4l9 7.5" />
          <path d="M5.5 10v9.5h13V10" />
          <path d="M10 19.5v-5h4v5" />
        </svg>
        <span className="absolute -right-1 -top-1 size-3 rounded-full border-2 border-background bg-gold" />
      </span>
      <span className={`font-display text-xl font-semibold tracking-tight ${inverted ? "text-ink-foreground" : "text-foreground"}`}>
        Trans<span className="text-accent">Media</span>
      </span>
    </Link>
  );
}
