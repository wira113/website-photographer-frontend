import { createFileRoute, useSearch } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { z } from "zod";
import { SiteHeader } from "@/Components/SiteHeader";
import { SiteFooter } from "@/Components/SiteFooter";
import { packages, formatIDR, type Pkg } from "@/data/packages";

const searchSchema = z.object({
  pkg: z.string().optional(),
});

export const Route = createFileRoute("/booking")({
  validateSearch: searchSchema,
  head: () => ({
    meta: [
      { title: "Booking & Paket — Lumen Studio" },
      { name: "description", content: "Pilih paket fotografi pernikahan, prewedding, keluarga, atau produk dan kirim formulir booking." },
      { property: "og:title", content: "Booking & Paket — Lumen Studio" },
      { property: "og:description", content: "Paket fotografi lengkap dengan harga transparan." },
    ],
  }),
  component: BookingPage,
});

const categories = ["Semua", "Wedding", "Prewedding", "Family", "Product"] as const;
type Cat = (typeof categories)[number];

const formSchema = z.object({
  name: z.string().trim().min(1, "Nama wajib diisi").max(100),
  email: z.string().trim().email("Email tidak valid").max(255),
  phone: z.string().trim().min(8, "Nomor telepon tidak valid").max(20),
  date: z.string().min(1, "Tanggal wajib diisi"),
  packageId: z.string().min(1, "Pilih paket"),
  notes: z.string().trim().max(1000).optional(),
});

function BookingPage() {
  const search = useSearch({ from: "/booking" });
  const [cat, setCat] = useState<Cat>("Semua");
  const [selected, setSelected] = useState<string>(search.pkg ?? "");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const filtered = useMemo(
    () => (cat === "Semua" ? packages : packages.filter((p) => p.category === cat)),
    [cat],
  );

  const selectedPkg: Pkg | undefined = packages.find((p) => p.id === selected);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const parsed = formSchema.safeParse({
      name: data.get("name"),
      email: data.get("email"),
      phone: data.get("phone"),
      date: data.get("date"),
      packageId: selected,
      notes: data.get("notes") || undefined,
    });
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      {/* Hero */}
      <section className="mx-auto max-w-7xl px-6 pt-16 pb-12 md:px-12 md:pt-24">
        <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">— Booking</p>
        <h1 className="max-w-3xl text-5xl leading-tight md:text-7xl">
          Pilih paket, <em className="italic text-accent">kunci tanggalmu</em>.
        </h1>
        <p className="mt-6 max-w-xl text-muted-foreground">
          Semua paket sudah termasuk konsultasi, editing profesional, dan galeri online pribadi. Booking butuh DP 30%.
        </p>
      </section>

      {/* Category filter */}
      <section className="mx-auto max-w-7xl px-6 md:px-12">
        <div className="flex flex-wrap gap-2 border-y border-border py-4">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`rounded-full px-5 py-2 text-xs uppercase tracking-[0.2em] transition ${
                cat === c
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </section>

      {/* Packages grid */}
      <section className="mx-auto max-w-7xl px-6 py-12 md:px-12 md:py-16">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p) => {
            const isSelected = selected === p.id;
            return (
              <article
                key={p.id}
                className={`flex flex-col border p-8 transition ${
                  isSelected ? "border-accent bg-accent/5" : "border-border bg-background hover:border-foreground/40"
                }`}
              >
                <p className="text-xs uppercase tracking-[0.3em] text-accent">{p.category}</p>
                <h2 className="mt-3 font-display text-3xl">{p.name}</h2>
                <p className="mt-2 text-sm text-muted-foreground">{p.duration}</p>
                <p className="mt-6 font-display text-4xl text-foreground">{formatIDR(p.price)}</p>
                <ul className="mt-6 flex-1 space-y-2 text-sm">
                  {p.highlights.map((h) => (
                    <li key={h} className="flex gap-3 border-b border-border py-2 text-muted-foreground">
                      <span className="text-accent">—</span> {h}
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => {
                    setSelected(p.id);
                    document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
                  }}
                  className={`mt-8 rounded-full px-6 py-3 text-xs uppercase tracking-[0.25em] transition ${
                    isSelected
                      ? "bg-accent text-accent-foreground"
                      : "bg-primary text-primary-foreground hover:bg-accent"
                  }`}
                >
                  {isSelected ? "Terpilih ✓" : "Pilih Paket"}
                </button>
              </article>
            );
          })}
        </div>
      </section>

      {/* Booking form */}
      <section id="booking-form" className="border-t border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-20 md:grid-cols-5 md:px-12 md:py-28">
          <div className="md:col-span-2">
            <p className="mb-4 text-xs uppercase tracking-[0.4em] text-muted-foreground">— Form Booking</p>
            <h2 className="text-4xl leading-tight md:text-5xl">Ringkasan</h2>
            <div className="mt-8 border border-border bg-background p-6">
              {selectedPkg ? (
                <>
                  <p className="text-xs uppercase tracking-[0.3em] text-accent">{selectedPkg.category}</p>
                  <p className="mt-2 font-display text-2xl">{selectedPkg.name}</p>
                  <p className="mt-1 text-sm text-muted-foreground">{selectedPkg.duration}</p>
                  <div className="mt-4 flex items-end justify-between border-t border-border pt-4">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Total</span>
                    <span className="font-display text-2xl">{formatIDR(selectedPkg.price)}</span>
                  </div>
                  <div className="mt-2 flex items-end justify-between">
                    <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground">DP 30%</span>
                    <span className="text-sm">{formatIDR(selectedPkg.price * 0.3)}</span>
                  </div>
                </>
              ) : (
                <p className="text-sm text-muted-foreground">Belum ada paket yang dipilih. Pilih dari daftar di atas.</p>
              )}
            </div>
          </div>

          <div className="md:col-span-3">
            {submitted ? (
              <div className="border border-accent bg-background p-10 text-center">
                <p className="font-display text-3xl">Terima kasih!</p>
                <p className="mt-3 text-muted-foreground">
                  Permintaan booking{selectedPkg ? ` untuk ${selectedPkg.name}` : ""} sudah kami terima.
                  Tim kami akan menghubungi dalam 24 jam untuk konfirmasi tanggal & DP.
                </p>
                <button
                  onClick={() => { setSubmitted(false); setSelected(""); }}
                  className="mt-8 rounded-full bg-primary px-8 py-3 text-xs uppercase tracking-[0.25em] text-primary-foreground hover:bg-accent"
                >
                  Booking Lagi
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5 bg-background border border-border p-8 md:p-10">
                <Field label="Nama Lengkap" name="name" error={errors.name} maxLength={100} />
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  <Field label="Email" name="email" type="email" error={errors.email} maxLength={255} />
                  <Field label="No. WhatsApp" name="phone" error={errors.phone} maxLength={20} />
                </div>
                <Field label="Tanggal Acara" name="date" type="date" error={errors.date} />
                {errors.packageId && (
                  <p className="text-xs text-destructive">{errors.packageId}</p>
                )}
                <div>
                  <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Catatan (opsional)</label>
                  <textarea
                    name="notes"
                    rows={4}
                    maxLength={1000}
                    className="mt-2 w-full border-b border-border bg-transparent py-3 outline-none focus:border-accent resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full rounded-full bg-primary px-8 py-4 text-xs uppercase tracking-[0.25em] text-primary-foreground hover:bg-accent transition"
                >
                  Kirim Permintaan Booking
                </button>
                <p className="text-xs text-muted-foreground text-center">
                  Dengan mengirim, kamu menyetujui kebijakan booking & DP 30%.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

function Field({
  label, name, type = "text", error, maxLength,
}: { label: string; name: string; type?: string; error?: string; maxLength?: number }) {
  return (
    <div>
      <label className="text-xs uppercase tracking-[0.2em] text-muted-foreground">{label}</label>
      <input
        name={name}
        type={type}
        maxLength={maxLength}
        className="mt-2 w-full border-b border-border bg-transparent py-3 outline-none focus:border-accent"
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}