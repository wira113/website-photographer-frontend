import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteHeader } from "@/Components/SiteHeader";
import { SiteFooter } from "@/Components/SiteFooter";

const API_BASE_URL = "http://localhost:8000";

interface PortfolioItemApi {
  id: number;
  title: string;
  category: string;
  image: string;
  description: string;
  created_at: string;
}

export const Route = createFileRoute("/portofolio/$photoId")({
  loader: async ({ params }) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/portofolio/${params.photoId}`);
      const data = await res.json();
      
      if (!data.success || !data.data) {
        throw notFound();
      }
      
      const it: PortfolioItemApi = data.data;
      return {
        id: String(it.id),
        src: it.image ? `${API_BASE_URL}/storage/${it.image}` : "",
        title: it.title,
        cat: it.category,
        date: new Date(it.created_at).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
        description: it.description || "",
      };
    } catch (error) {
      console.error("Error loading portfolio detail:", error);
      throw notFound();
    }
  },
  component: PortofolioDetailsPage,
});

function PortofolioDetailsPage() {
  const item = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <section className="mx-auto max-w-5xl px-6 pt-16 pb-12 md:px-12 md:pt-24">
        <Link
          to="/portofolio"
          className="text-xs uppercase tracking-[0.25em] text-muted-foreground hover:text-accent"
        >
          ← Kembali ke Portofolio
        </Link>
        <p className="mt-6 text-xs uppercase tracking-[0.3em] text-accent">
          {item.cat}
        </p>
        <h1 className="mt-3 text-5xl leading-tight md:text-7xl">{item.title}</h1>
        <p className="mt-4 text-sm uppercase tracking-[0.2em] text-muted-foreground">
          Tanggal: {item.date}
        </p>
      </section>

      <section className="mx-auto max-w-5xl px-6 pb-16 md:px-12">
        <img
          src={item.src}
          alt={item.title}
          className="h-[420px] w-full object-cover md:h-[560px]"
        />
        <div className="mt-8 border-l-2 border-accent pl-5">
          <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">
            Deskripsi
          </p>
          <p className="mt-3 text-base leading-relaxed text-foreground/90">
            {item.description}
          </p>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}
