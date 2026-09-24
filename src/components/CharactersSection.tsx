import CharacterSlideshow from "@/components/CharacterSlideshow";
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
      className="bg-linear-to-b from-cream via-sky-light to-cream px-4 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-3xl">
        <h2
          id="characters-heading"
          className="text-center font-display text-3xl font-bold text-navy sm:text-4xl"
        >
          {copy.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-lg leading-relaxed text-ink-soft">
          {copy.intro}
        </p>

        <div className="mt-10">
          <CharacterSlideshow characters={characters} />
        </div>
      </div>
    </section>
  );
}
