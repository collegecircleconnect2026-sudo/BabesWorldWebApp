import CommunitySection from "@/components/CommunitySection";
import EmailSignup from "@/components/EmailSignup";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import LessonSection from "@/components/LessonSection";
import WorldMap from "@/components/WorldMap";

/**
 * The whole site is one page with smooth-scrolling sections:
 * hero → world map → sample lesson → BABES community → email signup → footer.
 */
export default function HomePage() {
  return (
    <>
      <Header />
      <main id="main">
        <Hero />
        <WorldMap />
        <LessonSection />
        <CommunitySection />
        <EmailSignup />
      </main>
      <Footer />
    </>
  );
}
