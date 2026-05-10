import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { SiteHeader } from "@/Components/SiteHeader";
import { SiteFooter } from "@/Components/SiteFooter";

const contactSchema = z.object({
  nama: z.string().min(2, "Nama minimal 2 karakter").max(100),
  email: z.string().email("Email tidak valid"),
  pesan: z.string().min(10, "Pesan minimal 10 karakter").max(1000),
  rating: z.number().min(1, "Beri rating 1-5").max(5),
});

type ContactFormValues = z.infer<typeof contactSchema>;

const API_BASE_URL = "http://localhost:8000";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Lumen Studio" },
      { name: "description", content: "Hubungi Lumen Studio untuk konsultasi sesi fotografi Anda." },
      { property: "og:title", content: "Contact — Lumen Studio" },
      { property: "og:description", content: "Mari berkenalan." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      rating: 0,
    }
  });

  const ratingValue = watch("rating");

  async function onSubmit(data: ContactFormValues) {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/api/kritik-saran`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (!response.ok || !result.success) {
        throw new Error(result.message || "Terjadi kesalahan pada server");
      }
      
      setSuccess(true);
      toast.success("Pesan berhasil dikirim!");
      reset();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || "Gagal mengirim pesan. Silakan coba lagi.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-24 md:grid-cols-2 md:px-12 md:py-32">
        <div>
          <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">— Kontak</p>
          <h1 className="text-5xl leading-tight md:text-6xl">
            Mari <em className="italic text-accent">berkenalan</em>.
          </h1>
          <p className="mt-6 max-w-md text-muted-foreground">
            Kami merespons setiap pesan dalam 24 jam. Untuk konsultasi cepat, hubungi WhatsApp kami.
          </p>
          <div className="mt-10 space-y-6 text-sm">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Studio</p>
              <p className="mt-2">Singaraja.bali</p>
              <p className="text-muted-foreground">Senin – Sabtu, 10.00 – 18.00</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">Email</p>
              <p className="mt-2">hello@lumenstudio.co</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-muted-foreground">WhatsApp</p>
              <p className="mt-2">+62 812 3456 7890</p>
            </div>
          </div>
        </div>
        <div className="bg-secondary/40 p-8 md:p-12">
          <h2 className="font-display text-2xl">Kirim kritik dan saran anda </h2>
          
          {success ? (
            <div className="mt-6 bg-accent/10 border border-accent/20 p-6 text-center animate-in fade-in zoom-in duration-300">
              <p className="font-display text-2xl text-accent">Terima Kasih!</p>
              <p className="mt-2 text-sm text-muted-foreground">Pesan Anda telah kami terima. Tim kami akan segera menghubungi Anda.</p>
              <button 
                onClick={() => setSuccess(false)}
                className="mt-6 text-xs uppercase tracking-[0.2em] text-foreground border-b border-foreground pb-1 transition hover:text-accent hover:border-accent"
              >
                Kirim pesan lain
              </button>
            </div>
          ) : (
            <form className="mt-6 space-y-5" onSubmit={handleSubmit(onSubmit)}>
              <div>
                <label htmlFor="nama" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Nama</label>
                <input 
                  id="nama"
                  {...register("nama")}
                  disabled={loading}
                  className={`mt-2 w-full border-b bg-transparent py-3 outline-none transition-colors disabled:opacity-50 ${
                    errors.nama ? "border-destructive focus:border-destructive" : "border-border focus:border-accent"
                  }`} 
                />
                {errors.nama && <p className="mt-1 text-[10px] text-destructive uppercase tracking-wider">{errors.nama.message}</p>}
              </div>
              <div>
                <label htmlFor="email" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Email</label>
                <input 
                  id="email"
                  type="email"
                  {...register("email")}
                  disabled={loading}
                  className={`mt-2 w-full border-b bg-transparent py-3 outline-none transition-colors disabled:opacity-50 ${
                    errors.email ? "border-destructive focus:border-destructive" : "border-border focus:border-accent"
                  }`} 
                />
                {errors.email && <p className="mt-1 text-[10px] text-destructive uppercase tracking-wider">{errors.email.message}</p>}
              </div>
              <div>
                <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Rating</label>
                <div className="mt-2 flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      disabled={loading}
                      onClick={() => setValue("rating", star, { shouldValidate: true })}
                      className={`text-2xl transition-colors ${
                        ratingValue >= star ? "text-accent" : "text-muted"
                      }`}
                    >
                      ★
                    </button>
                  ))}
                </div>
                {errors.rating && <p className="mt-1 text-[10px] text-destructive uppercase tracking-wider">{errors.rating.message}</p>}
              </div>
              <div>
                <label htmlFor="pesan" className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Pesan</label>
                <textarea 
                  id="pesan"
                  rows={4} 
                  {...register("pesan")}
                  disabled={loading}
                  className={`mt-2 w-full border-b bg-transparent py-3 outline-none resize-none transition-colors disabled:opacity-50 ${
                    errors.pesan ? "border-destructive focus:border-destructive" : "border-border focus:border-accent"
                  }`} 
                />
                {errors.pesan && <p className="mt-1 text-[10px] text-destructive uppercase tracking-wider">{errors.pesan.message}</p>}
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="flex items-center justify-center gap-3 rounded-full bg-primary px-8 py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground hover:bg-accent disabled:bg-muted disabled:cursor-not-allowed transition-all"
              >
                {loading ? (
                  <>
                    <span className="h-3 w-3 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></span>
                    Mengirim...
                  </>
                ) : (
                  "Kirim"
                )}
              </button>
            </form>
          )}
        </div>
      </section>
      <SiteFooter />
    </div>
  );
}