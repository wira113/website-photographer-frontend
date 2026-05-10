export type Pkg = {
  id: string;
  category: "Wedding" | "Prewedding" | "Family" | "Product";
  name: string;
  price: number;
  duration: string;
  highlights: string[];
};

export const packages: Pkg[] = [
  {
    id: "wed-silver",
    category: "Wedding",
    name: "Silver Wedding",
    price: 8000000,
    duration: "6 jam liputan",
    highlights: ["1 fotografer", "150+ foto edit", "Online gallery", "USB box"],
  },
  {
    id: "wed-gold",
    category: "Wedding",
    name: "Gold Wedding",
    price: 14500000,
    duration: "10 jam liputan",
    highlights: ["2 fotografer", "350+ foto edit", "Album cetak 20 hal", "Cinematic teaser 1 menit"],
  },
  {
    id: "wed-platinum",
    category: "Wedding",
    name: "Platinum Wedding",
    price: 25000000,
    duration: "Full day + akad",
    highlights: ["3 fotografer + 1 videografer", "600+ foto edit", "Album premium 30 hal", "Film 5 menit + same day edit"],
  },
  {
    id: "pre-intimate",
    category: "Prewedding",
    name: "Intimate Session",
    price: 3000000,
    duration: "2 jam, 1 lokasi",
    highlights: ["50+ foto edit", "1 outfit", "Online gallery"],
  },
  {
    id: "pre-cinematic",
    category: "Prewedding",
    name: "Cinematic Story",
    price: 6500000,
    duration: "4 jam, 2 lokasi",
    highlights: ["120+ foto edit", "2 outfit", "Mini video 60 detik", "Mood board konsep"],
  },
  {
    id: "fam-classic",
    category: "Family",
    name: "Family Classic",
    price: 1500000,
    duration: "1 jam sesi",
    highlights: ["30+ foto edit", "1 lokasi outdoor/studio", "Online gallery"],
  },
  {
    id: "fam-story",
    category: "Family",
    name: "Family Story",
    price: 3500000,
    duration: "3 jam sesi",
    highlights: ["80+ foto edit", "Multi lokasi", "Cetak 10x15 sebanyak 20 lembar"],
  },
  {
    id: "prod-lookbook",
    category: "Product",
    name: "Lookbook",
    price: 2000000,
    duration: "Hingga 10 produk",
    highlights: ["Background bersih", "Edit warna profesional", "Format web & print"],
  },
  {
    id: "prod-editorial",
    category: "Product",
    name: "Editorial Brand",
    price: 5500000,
    duration: "Hingga 25 produk",
    highlights: ["Konsep mood", "Model opsional", "Foto flatlay & lifestyle", "Color grading sinematik"],
  },
];

export const formatIDR = (n: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(n);