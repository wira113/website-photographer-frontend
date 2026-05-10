import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteHeader } from "@/Components/SiteHeader";
import { SiteFooter } from "@/Components/SiteFooter";
import g1 from "@/assets/g1.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Lumen Studio" },
      { name: "description", content: "Studio fotografi editorial yang membingkai cerita dengan cahaya jujur sejak 2018." },
      { property: "og:title", content: "About — Lumen Studio" },
      { property: "og:description", content: "Tim kecil dengan fokus besar pada momen autentik." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-24 md:grid-cols-2 md:px-12 md:py-32">
        <div>
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-muted-foreground">— Tentang Kami</p>
          <h1 className="text-5xl leading-tight md:text-6xl">
            Cahaya, kesabaran, dan rasa <em className="italic text-accent">hormat</em> pada momen.
          </h1>
          <p className="mt-8 text-base text-muted-foreground leading-relaxed">
            Lumen Studio dimulai tahun 2018 dari sebuah ruangan kecil di Jakarta Selatan. Kami percaya foto terbaik
            lahir dari kepercayaan — bukan dari pose atau peralatan termahal.
          </p>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
            Tim kami terdiri dari empat fotografer dan dua editor yang sudah menemani lebih dari 200 pasangan,
            keluarga, dan brand untuk membingkai momen mereka.
          </p>
          <Link to="/booking" className="mt-10 inline-block rounded-full bg-primary px-8 py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground transition hover:bg-accent">
            Mulai Booking
          </Link>
        </div>
        <div className="relative">
          <img src={g1} alt="Portrait" width={800} height={1024} loading="lazy" className="h-full w-full object-cover" />
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-20 md:grid-cols-4 md:px-12">
          {[
            ["200+", "Klien bahagia"],
            ["7", "Tahun pengalaman"],
            ["48", "Kota peliputan"],
            ["12", "Penghargaan industri"],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="font-display text-5xl text-foreground">{n}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{l}</p>
            </div>
          ))}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}