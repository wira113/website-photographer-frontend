import { Link } from "@tanstack/react-router";
import { useState } from "react";

const links = [
  { to: "/" as const, label: "Home" },
  { to: "/portofolio" as const, label: "Portofolio" },
  { to: "/about" as const, label: "About" },
  { to: "/contact" as const, label: "Contact" },
];

export function SiteHeader({ overlay = false }: { overlay?: boolean }) {
  const [open, setOpen] = useState(false);

  const textClass = overlay ? "text-primary-foreground" : "text-foreground";
  const subtle = overlay ? "text-primary-foreground/80" : "text-muted-foreground";
  const borderClass = overlay ? "border-primary-foreground/30" : "border-foreground/30";

  return (
    <header className={overlay ? "absolute top-0 left-0 right-0 z-20" : "relative z-20 border-b border-border"}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-6 md:px-12 md:py-8">
        <Link to="/" className={`font-display text-2xl tracking-wide ${textClass}`}>
          Mobile.Picture<span className="text-accent"></span>
        </Link>
        <ul className={`hidden items-center gap-10 text-xs uppercase tracking-[0.2em] md:flex ${subtle}`}>
          {links.map((l) => (
            <li key={l.to}>
              <Link to={l.to} className="transition hover:text-accent" activeProps={{ className: "text-accent" }}>
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <Link
          to="/booking"
          className={`hidden rounded-full border ${borderClass} px-5 py-2 text-xs uppercase tracking-[0.2em] ${textClass} transition hover:bg-accent hover:border-accent hover:text-accent-foreground md:inline-block`}
        >
          Booking Now
        </Link>
        <button
          onClick={() => setOpen(!open)}
          className={`md:hidden text-xs uppercase tracking-[0.2em] ${textClass}`}
          aria-label="Menu"
        >
          {open ? "Close" : "Menu"}
        </button>
      </nav>
      {open && (
        <div className="md:hidden bg-background border-t border-border px-6 py-6 space-y-4">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              onClick={() => setOpen(false)}
              className="block text-foreground text-sm uppercase tracking-[0.2em]"
            >
              {l.label}
            </Link>
          ))}
          <Link
            to="/booking"
            onClick={() => setOpen(false)}
            className="block text-accent text-sm uppercase tracking-[0.2em]"
          >
            Booking Now
          </Link>
        </div>
      )}
    </header>
  );
}