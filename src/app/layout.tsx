import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="min-h-screen bg-neutral-50 text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100 antialiased">
        {children}
      </body>
    </html>
  );
}
