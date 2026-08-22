import type { Metadata, Viewport } from "next";
import { Fraunces, Nunito } from "next/font/google";

import { site } from "@/config/site";
import "./globals.css";

/** Body text — rounded, highly legible for early readers. */
const bodyFont = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-body",
});

/** Headings — a warm storybook serif with an established, editorial feel. */
const displayFont = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display-face",
  axes: ["SOFT", "opsz"],
});

export const metadata: Metadata = {
  title: `${site.name} — ${site.fullName}`,
  description: `${site.taglines.evidenceBased}. ${site.tagline}`,
};

export const viewport: Viewport = {
  themeColor: "#1e2f5c",
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
