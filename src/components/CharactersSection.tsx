import CharacterSlideshow from "@/components/CharacterSlideshow";
import SectionHeading from "@/components/SectionHeading";
import { site } from "@/config/site";
import { characters } from "@/data/characters";

/**
 * "Meet the BABES Characters" — a photo slideshow of the costumed characters.
 * The photos, names and captions live in `src/data/characters.ts`.
 */
export default function CharactersSection() {
  const copy = site.sections.characters;

  if (characters.length === 0) return null;

  return (
    <section
      id={copy.id}
      aria-labelledby="characters-heading"
      className="bg-linear-to-b from-cream via-sky-light to-cream px-4 py-20 sm:py-28"
    >
      <div className="mx-auto max-w-3xl">
        <SectionHeading
          id="characters-heading"
          eyebrow="Buttons, Bows & friends"
          title={copy.title}
          intro={copy.intro}
        />

        <div className="mt-10">
          <CharacterSlideshow characters={characters} />
        </div>
      </div>
    </section>
  );
}
