import { existsSync } from "node:fs";
import { join } from "node:path";

import CharactersSection from "@/components/CharactersSection";
import CommunitySection from "@/components/CommunitySection";
import EmailSignup from "@/components/EmailSignup";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LessonSection from "@/components/LessonSection";
import WorldMap from "@/components/WorldMap";
import { mapArtwork } from "@/data/mapButtons";

/**
 * The whole site is one page with smooth-scrolling sections:
 * hero → world map → sample lesson → meet the characters → BABES community → email signup → footer.
 */
export default function HomePage() {
  // Checked at build time: the map shows the real artwork from `public/`;
  // if that file is ever missing, a built-in drawing is shown instead.
  // (See `mapArtwork` in `src/data/mapButtons.ts` and the README.)
  const hasMapArtwork = existsSync(join(process.cwd(), "public", mapArtwork.src));

  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <WorldMap hasMapArtwork={hasMapArtwork} />
        <LessonSection />
        <CharactersSection />
        <CommunitySection />
        <EmailSignup />
      </main>
      <Footer />
    </>
  );
}
