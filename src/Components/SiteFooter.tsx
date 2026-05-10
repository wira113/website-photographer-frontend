import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-3 md:px-12">
        <div>
          <p className="font-display text-3xl">Lumen<span className="text-accent">.</span></p>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/70">
            Studio fotografi editorial yang membingkai cerita dengan cahaya jujur.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/60">Navigasi</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li><Link to="/portofolio" className="hover:text-accent">Portofolio</Link></li>
            <li><Link to="/booking" className="hover:text-accent">Booking</Link></li>
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/60">Kontak</p>
          <ul className="mt-4 space-y-2 text-sm">
            <li>hello@lumenstudio.co</li>
            <li>+62 812 3456 7890</li>
            <li>Jl. Senopati 21, Jakarta</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-primary-foreground/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 text-xs text-primary-foreground/50 md:flex-row md:px-12">
          <p>© 2025 Lumen Studio.</p>
          <p className="uppercase tracking-[0.3em]">Crafted with light</p>
        </div>
      </div>
    </footer>
  );
}