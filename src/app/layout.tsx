import type { Metadata, Viewport } from "next";
import { Baloo_2, Nunito } from "next/font/google";

import { site } from "@/config/site";
import "./globals.css";

/** Body text — rounded, highly legible for early readers. */
const bodyFont = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

/** Headings — chunky and playful. */
const displayFont = Baloo_2({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-face",
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.shortTagline}`,
  description: site.tagline,
};

export const viewport: Viewport = {
  themeColor: "#fff9f2",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${bodyFont.variable} ${displayFont.variable}`}>
      <body className="min-h-screen antialiased">{children}</body>
    </html>
  );
}
