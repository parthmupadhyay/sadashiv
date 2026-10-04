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

export const viewport = {
  themeColor: "#0c0a09",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${devanagari.variable} ${cormorant.variable}`}>
      <body className="min-h-screen bg-neutral-950 text-neutral-100 antialiased relative selection:bg-amber-500/20 selection:text-amber-200 w-full overflow-x-hidden flex flex-col">
        {/* Ambient background glow constrained to avoid horizontal scroll */}
        <div className="absolute top-0 left-0 w-full h-[500px] flex justify-center overflow-hidden pointer-events-none -z-10">
          <div className="w-[1000px] h-[500px] bg-gradient-to-b from-amber-500/10 via-amber-900/5 to-transparent blur-[120px]" />
        </div>
        {children}
      </body>
    </html>
  );
}
