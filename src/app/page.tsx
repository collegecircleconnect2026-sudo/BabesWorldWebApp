import { existsSync } from "node:fs";
import { join } from "node:path";

import CommunitySection from "@/components/CommunitySection";
import EmailSignup from "@/components/EmailSignup";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LessonSection from "@/components/LessonSection";
import WorldMap from "@/components/WorldMap";
import { mapArtwork } from "@/data/worlds";

/**
 * The whole site is one page with smooth-scrolling sections:
 * hero → world map → sample lesson → BABES community → email signup → footer.
 */
export default function HomePage() {
  // Checked at build time: when the real map scan exists in `public/`, the
  // map uses it; otherwise the built-in illustrated map is drawn instead.
  // (See `mapArtwork` in `src/data/worlds.ts` and the README.)
  const hasMapArtwork = existsSync(join(process.cwd(), "public", mapArtwork.src));

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <WorldMap hasMapArtwork={hasMapArtwork} />
        <LessonSection />
        <CommunitySection />
        <EmailSignup />
      </main>
      <Footer />
    </>
  );
}
