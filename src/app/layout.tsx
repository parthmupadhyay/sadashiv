import type { Metadata } from "next";
import { Noto_Serif_Devanagari, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const devanagari = Noto_Serif_Devanagari({
  subsets: ["devanagari", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-devanagari",
});

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-serif",
});

export const metadata: Metadata = {
  title: "सदाशिव | Sadashiv - Sacred Sanskrit Stotras",
  description: "Explore sacred Sanskrit stotras with word-by-word meanings, transliterations, and translations.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${devanagari.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased relative overflow-x-hidden selection:bg-amber-500/20 selection:text-amber-200">
        {/* Ambient background glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[500px] bg-gradient-to-b from-amber-500/10 via-amber-900/5 to-transparent blur-[120px] pointer-events-none -z-10" />
        {children}
      </body>
    </html>
  );
}
