import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { SiteHeader } from "@/Components/SiteHeader";
import { SiteFooter } from "@/Components/SiteFooter";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Lumen Studio — Jasa Fotografi Pernikahan & Editorial" },
      {
        name: "description",
        content:
          "Lumen Studio menangkap momen tak terlupakan dengan gaya editorial sinematik. Layanan foto pernikahan, prewedding, keluarga, dan produk.",
      },
      { property: "og:title", content: "Lumen Studio — Jasa Fotografi Editorial" },
      { property: "og:description", content: "Cerita yang abadi, dibingkai dengan cahaya." },
    ],
  }),
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

function Index() {
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

  const services = [
    { title: "Wedding", desc: "Cerita pernikahan sinematik dari pagi hingga resepsi.", price: "Mulai 8jt" },
    { title: "Prewedding", desc: "Sesi intim di lokasi pilihan, indoor maupun outdoor.", price: "Mulai 3jt" },
    { title: "Family", desc: "Potret keluarga hangat yang akan dikenang turun-temurun.", price: "Mulai 1.5jt" },
    { title: "Product", desc: "Foto produk editorial untuk brand & e-commerce.", price: "Mulai 2jt" },
  ];

  // Helper to get image URL
  const getImg = (index: number) => {
    if (apiItems[index] && apiItems[index].image) {
      return `${API_BASE_URL}/storage/${apiItems[index].image}`;
    }
    return ""; // Fallback
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <SiteHeader overlay />

      {/* Hero */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src={hero}
          alt="Pasangan berjalan di jalan berkabut saat matahari terbenam"
          width={1600}
          height={1920}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />
        <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-16 md:px-12 md:pb-24">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-primary-foreground/80">
            Est. 2018 — Jakarta, Indonesia
          </p>
          <h1 className="max-w-4xl text-5xl leading-[0.95] text-primary-foreground md:text-7xl lg:text-8xl">
            Cerita yang <em className="font-light italic text-accent">abadi</em>,
            <br /> dibingkai dengan cahaya.
          </h1>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <Link
              to="/portofolio"
              className="rounded-full bg-primary-foreground px-8 py-4 text-xs uppercase tracking-[0.25em] text-primary transition hover:bg-accent hover:text-accent-foreground"
            >
              Lihat Portofolio
            </Link>
          </div>
        </div>
      </section>

      {/* Intro */}
      <section className="mx-auto max-w-5xl px-6 py-24 md:px-12 md:py-32">
        <p className="mb-8 text-xs uppercase tracking-[0.4em] text-muted-foreground">— Tentang Kami</p>
        <h2 className="text-3xl leading-tight md:text-5xl">
          Kami percaya setiap momen punya cahaya tersendiri.
          <span className="text-muted-foreground">
            {" "}Tugas kami adalah menangkapnya — sederhana, jujur, dan tidak akan pernah memudar.
          </span>
        </h2>
        <Link to="/about" className="mt-8 inline-block text-xs uppercase tracking-[0.25em] text-accent">
          Selengkapnya tentang kami →
        </Link>
      </section>

      {/* Work / Gallery */}
      <section className="px-6 pb-24 md:px-12">
        {loading ? (
          <div className="flex h-96 items-center justify-center">
            <p className="animate-pulse text-xs uppercase tracking-[0.4em] text-muted-foreground">Loading Gallery...</p>
          </div>
        ) : apiItems.length > 0 ? (
          <div className="mx-auto grid max-w-7xl grid-cols-12 gap-4 md:gap-6">
            {/* Main Item */}
            <figure className="col-span-12 md:col-span-5 overflow-hidden">
              <Link to="/portofolio/$photoId" params={{ photoId: String(apiItems[0].id) }} className="block h-full">
                <img 
                  src={getImg(0)} 
                  alt={apiItems[0].title} 
                  width={800} height={1024} 
                  loading="lazy" 
                  className="h-full w-full object-cover transition duration-700 hover:scale-105" 
                />
              </Link>
            </figure>
            {/* Other Items */}
            <figure className="col-span-12 space-y-4 md:col-span-7 md:space-y-6">
              {apiItems[1] && (
                <Link to="/portofolio/$photoId" params={{ photoId: String(apiItems[1].id) }} className="block">
                  <img 
                    src={getImg(1)} 
                    alt={apiItems[1].title} 
                    width={1024} height={800} 
                    loading="lazy" 
                    className="h-auto w-full object-cover transition duration-700 hover:scale-105" 
                  />
                </Link>
              )}
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {apiItems[2] && (
                  <Link to="/portofolio/$photoId" params={{ photoId: String(apiItems[2].id) }} className="block">
                    <img 
                      src={getImg(2)} 
                      alt={apiItems[2].title} 
                      width={1024} height={800} 
                      loading="lazy" 
                      className="h-full w-full object-cover transition duration-700 hover:scale-105" 
                    />
                  </Link>
                )}
                {apiItems[3] && (
                  <Link to="/portofolio/$photoId" params={{ photoId: String(apiItems[3].id) }} className="block">
                    <img 
                      src={getImg(3)} 
                      alt={apiItems[3].title} 
                      width={800} height={1024} 
                      loading="lazy" 
                      className="h-full w-full object-cover transition duration-700 hover:scale-105" 
                    />
                  </Link>
                )}
              </div>
            </figure>
          </div>
        ) : (
          <div className="flex h-64 items-center justify-center border border-dashed border-border">
            <p className="text-xs uppercase tracking-[0.4em] text-muted-foreground">Belum ada foto di portofolio.</p>
          </div>
        )}
        <div className="mx-auto max-w-7xl mt-10 text-center">
          <Link to="/portofolio" className="inline-block text-xs uppercase tracking-[0.25em] text-foreground border-b border-foreground pb-1 hover:text-accent hover:border-accent">
            Lihat Semua Karya
          </Link>
        </div>
      </section>

      {/* Services */}
      <section className="border-t border-border bg-secondary/40">
        <div className="mx-auto max-w-7xl px-6 py-24 md:px-12 md:py-32">
          <div className="mb-16 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">— Layanan</p>
              <h2 className="max-w-xl text-4xl leading-tight md:text-6xl">
                Layanan yang dirancang untuk setiap cerita.
              </h2>
            </div>
            <p className="max-w-sm text-sm text-muted-foreground">
              Empat layanan utama. Lihat paket lengkap di halaman booking.
            </p>
          </div>

          <div className="divide-y divide-border border-y border-border">
            {services.map((s, i) => (
              <Link
                to="/booking"
                key={s.title}
                className="group grid grid-cols-12 items-center gap-4 py-8 transition hover:bg-background/60 md:py-10"
              >
                <span className="col-span-2 font-display text-xl text-muted-foreground md:col-span-1 md:text-2xl">
                  0{i + 1}
                </span>
                <h3 className="col-span-10 text-2xl md:col-span-3 md:text-3xl">{s.title}</h3>
                <p className="col-span-12 text-sm text-muted-foreground md:col-span-5">{s.desc}</p>
                <span className="col-span-8 text-xs uppercase tracking-[0.2em] text-foreground md:col-span-2">
                  {s.price}
                </span>
                <span className="col-span-4 text-right font-display text-2xl text-accent transition group-hover:translate-x-1 md:col-span-1">
                  →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonial */}
      <section className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
        <p className="mb-8 text-xs uppercase tracking-[0.4em] text-muted-foreground">— Kata Mereka</p>
        <blockquote className="font-display text-3xl leading-snug md:text-5xl">
          “Foto-fotonya bukan sekadar gambar — tapi sebuah memori yang bisa kami genggam kembali kapan pun kami mau.”
        </blockquote>
        <p className="mt-8 text-xs uppercase tracking-[0.3em] text-muted-foreground">
          Anya & Reza — Wedding 2024
        </p>
      </section>

      {/* Newsletter */}
      <section className="border-t border-border bg-background">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <p className="mb-6 text-xs uppercase tracking-[0.4em] text-muted-foreground">— Newsletter</p>
          <h2 className="text-3xl md:text-5xl">Dapatkan inspirasi cahaya langsung di inbox-mu.</h2>
          <form 
            className="mt-12 flex flex-col items-center justify-center gap-4 md:flex-row md:gap-0"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Terima kasih telah berlangganan!");
              (e.currentTarget as HTMLFormElement).reset();
            }}
          >
            <input 
              type="email" 
              placeholder="Email anda" 
              required
              className="w-full max-w-sm border-b border-border bg-transparent py-4 text-center outline-none focus:border-accent md:text-left"
            />
            <button 
              type="submit"
              className="ml-0 mt-4 rounded-full bg-primary px-10 py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground hover:bg-accent md:ml-6 md:mt-0"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto max-w-5xl px-6 py-24 text-center md:py-32">
          <h2 className="text-4xl leading-tight md:text-6xl">
            Punya momen yang ingin <em className="italic text-accent">diabadikan?</em>
          </h2>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-6">
            <Link to="/booking" className="rounded-full bg-accent px-8 py-4 text-xs uppercase tracking-[0.25em] text-accent-foreground hover:bg-primary-foreground hover:text-primary">
              Lihat Paket & Booking
            </Link>
            <Link to="/contact" className="text-xs uppercase tracking-[0.25em] text-primary-foreground/90 hover:text-accent">
              Konsultasi gratis →
            </Link>
          </div>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
