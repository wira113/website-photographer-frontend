import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/Components/SiteHeader";
import { SiteFooter } from "@/Components/SiteFooter";
import {
  portfolioCategories,
  type PortfolioCategory,
} from "@/data/portfolio";

export const Route = createFileRoute("/portofolio")({
  head: () => ({
    meta: [
      { title: "Portofolio — Lumen Studio" },
      { name: "description", content: "Kumpulan karya fotografi pernikahan, prewedding, keluarga, dan produk dari Lumen Studio." },
      { property: "og:title", content: "Portofolio — Lumen Studio" },
      { property: "og:description", content: "Karya editorial sinematik kami." },
    ],
  }),
  component: PortofolioPage,
});

const API_BASE_URL = "http://localhost:8000";

interface PortfolioItemApi {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  created_at: string;
}

function PortofolioPage() {
  const [selectedCat, setSelectedCat] = useState<PortfolioCategory>("Wedding");
  const [apiItems, setApiItems] = useState<PortfolioItemApi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/portofolio`)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          // res.data is the paginated object, res.data.data is the array
          setApiItems(res.data.data || []);
        }
      })
      .catch((err) => console.error("Error fetching portfolio:", err))
      .finally(() => setLoading(false));
  }, []);

  const filteredItems = useMemo(() => {
    return apiItems
      .filter((it) => it.category.toLowerCase() === selectedCat.toLowerCase())
      .map((it, index) => ({
        id: String(it.id),
        src: it.image ? `${API_BASE_URL}/storage/${it.image}` : "",
        title: it.title,
        cat: it.category,
        description: it.description || "",
        // Determine span based on index
        span: index % 3 === 0 ? "md:col-span-8 md:row-span-2" : "md:col-span-4",
      }));
  }, [apiItems, selectedCat]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-12 md:pt-24">
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">— Portofolio</p>
        <h1 className="text-5xl leading-tight md:text-7xl">Karya pilihan.</h1>
        <div className="mt-8 flex flex-wrap gap-3">
          {portfolioCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCat(cat)}
              className={`rounded-full border px-5 py-2 text-xs uppercase tracking-[0.2em] transition ${
                selectedCat === cat
                  ? "border-accent bg-accent text-accent-foreground"
                  : "border-border text-foreground hover:border-accent hover:text-accent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>
      <section className="px-6 pb-24 md:px-12">
        {loading ? (
          <div className="flex h-64 items-center justify-center">
            <p className="animate-pulse text-xs uppercase tracking-[0.4em] text-muted-foreground">Loading...</p>
          </div>
        ) : filteredItems.length > 0 ? (
          <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 md:grid-cols-12 md:gap-6 auto-rows-[280px]">
            {filteredItems.map((it) => (
              <figure key={it.id} className={`group relative overflow-hidden ${it.span}`}>
                <Link to="/portofolio/$photoId" params={{ photoId: it.id }} className="block h-full">
                  <img src={it.src} alt={it.title} loading="lazy" className="h-full w-full object-cover transition duration-700 group-hover:scale-105" />
                  <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <p className="text-xs uppercase tracking-[0.3em] text-primary-foreground/70">{it.cat}</p>
                    <p className="font-display text-2xl text-primary-foreground">{it.title}</p>
                  </figcaption>
                </Link>
              </figure>
            ))}
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Belum ada karya di kategori ini.</p>
          </div>
        )}
      </section>
      <section className="border-t border-border">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:px-12">
          <h2 className="text-3xl md:text-4xl">Suka dengan apa yang kamu lihat?</h2>
          <Link to="/booking" className="mt-8 inline-block rounded-full bg-primary px-8 py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground hover:bg-accent">
            Booking Sesi
          </Link>
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}
