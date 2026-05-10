import g1 from "@/assets/g1.jpg";
import g2 from "@/assets/g2.jpg";
import g3 from "@/assets/g3.jpg";
import g4 from "@/assets/g4.jpg";
import hero from "@/assets/hero.jpg";

export const portfolioCategories = ["Wedding", "Sunmori", "Party", "Family"] as const;
export type PortfolioCategory = (typeof portfolioCategories)[number];

export type PortfolioItem = {
  id: string;
  src: string;
  title: string;
  cat: PortfolioCategory;
  date: string;
  description: string;
  span: string;
};

export const portfolioItems: PortfolioItem[] = [
  {
    id: "anya-reza",
    src: hero,
    title: "Anya & Reza",
    cat: "Wedding",
    date: "12 Januari 2025",
    description: "Sesi prewedding senja dengan nuansa sinematik yang hangat dan romantis.",
    span: "md:col-span-8 md:row-span-2",
  },
  {
    id: "sunset-vows",
    src: g2,
    title: "Sunset Vows",
    cat: "Wedding",
    date: "03 Maret 2025",
    description: "Momen sakral akad sore hari dengan cahaya matahari keemasan.",
    span: "md:col-span-4",
  },
  {
    id: "morning-ride",
    src: g1,
    title: "Morning Ride",
    cat: "Sunmori",
    date: "14 Februari 2025",
    description: "Dokumentasi komunitas riding pagi dengan tone natural dan clean.",
    span: "md:col-span-6",
  },
  {
    id: "sunmori-hills",
    src: g2,
    title: "Sunmori Hills",
    cat: "Sunmori",
    date: "22 Februari 2025",
    description: "Perjalanan sunmori menuju area perbukitan dengan suasana adventure.",
    span: "md:col-span-6",
  },
  {
    id: "night-party",
    src: g3,
    title: "Night Party",
    cat: "Party",
    date: "09 April 2025",
    description: "Keseruan pesta malam dengan pencahayaan lampu ambient berwarna.",
    span: "md:col-span-5",
  },
  {
    id: "after-party-lights",
    src: hero,
    title: "After Party Lights",
    cat: "Party",
    date: "16 April 2025",
    description: "Dokumentasi after party dengan style editorial dan vibe modern.",
    span: "md:col-span-7",
  },
  {
    id: "pratama-family",
    src: g4,
    title: "Pratama Family",
    cat: "Family",
    date: "04 Mei 2025",
    description: "Sesi keluarga outdoor yang hangat, candid, dan penuh cerita.",
    span: "md:col-span-7",
  },
  {
    id: "family-portrait",
    src: g1,
    title: "Family Portrait",
    cat: "Family",
    date: "11 Mei 2025",
    description: "Potret keluarga studio dengan komposisi klasik dan elegan.",
    span: "md:col-span-5",
  },
];
