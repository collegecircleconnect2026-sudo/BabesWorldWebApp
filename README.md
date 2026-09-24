# BABES World — marketing + demo website

A small, fast, single-page website for **BABES World** — **Beginning Awareness
Basic Education Studies** — an evidence-based program helping young people from
preschool through 12th grade build life skills for happy, healthy, empowered,
productive lives free of self-defeating behavior, featuring Buttons and Bows
and all their friends. Taglines: *"An Evidence-Based Program"* and *"BABES Is
Not Just For Babies"*. Public site: [babesworld.org](https://babesworld.org).

It contains:

1. **Hero** — name, full program name, mission and an "Explore the Map" button
2. **Interactive BABES World map** — the real hand-painted map
   (`public/images/babes-world-map.png`) with a round button on each clickable
   place: Feeling Forest, Coping Canyon, Peer Pressure Pier, Helping Harbor,
   Party Park, Safe City, Prevention Place, Decision Delta, Divergent Paths,
   Prizes Galore, Teen Institute, Children's Adventure, Clinicians, Educators,
   Community/Activists and the "Building a Community" rainbow. (BABES Choir,
   Self Help Groups, BABES Alive and Smoking Cessation Clinic are painted
   labels only, not buttons.) The same places are listed as big, easy-to-tap
   buttons under the map
3. **Lesson viewer** — slide-by-slide lesson with Next/Back, a progress bar and a
   read-aloud button (browser speech, nothing sent to a server)
4. **Building a BABES Community** — a rainbow graphic of the seven community
   tiers (Families → Schools → Social Agencies → Faith-Based Organizations →
   Media → Business → Government) supporting the licensing vision
5. **Email signup** — name + email, posted straight to [Formspree](https://formspree.io)
6. **Footer** — program name, mission, taglines and section links

Only the **Feeling Forest** has a real lesson; every other place shows a
friendly "coming in the full platform" pop-up.

**Tech:** Next.js (App Router) · TypeScript · Tailwind CSS v4. No database, no
accounts, no payments — the whole site is static and free to host on Vercel.

---

## 1. Run it locally

You need [Node.js](https://nodejs.org) 20 or newer.

```bash
npm install      # install dependencies (first time only)
npm run dev      # start the development server
```

Then open <http://localhost:3000>. Edits appear instantly.

Other commands:

```bash
npm run build    # production build (what Vercel runs)
npm run start    # serve the production build locally
npm run typecheck
```

---

## 2. Connect the email signup (Formspree)

The signup form posts directly to Formspree. Nothing is stored on this site's
server.

1. Create a free account at <https://formspree.io> and make a new form.
2. Formspree gives you an endpoint like `https://formspree.io/f/abcdwxyz`.
   The part you need is the last piece: **`abcdwxyz`**.
3. In the project folder, copy `.env.example` to `.env.local`:

   ```bash
   cp .env.example .env.local
   ```

4. Put your ID in it:

   ```
   NEXT_PUBLIC_FORMSPREE_ID=abcdwxyz
   ```

5. Restart `npm run dev`.

Until this is set, the form shows a friendly "not connected yet" note instead of
submitting. (You'll add the same variable to Vercel in step 5 below.)

---

## 3. Change the words, colours and pictures

Everything a non-developer needs is in five clearly-commented files.

| I want to change…                                        | Edit this file           |
| -------------------------------------------------------- | ------------------------ |
| Site name, taglines, mission, community tiers, footer    | `src/config/site.ts`     |
| Brand colours (navy, crimson, sky, rainbow)              | `src/app/theme.css`      |
| Map picture, and where each button sits on it            | `src/data/mapButtons.ts` |
| Map places' pop-up text, icons, which place has a lesson | `src/data/worlds.ts`     |
| Lesson slides (titles, text, questions, images)          | `src/data/lessons.ts`    |

In all of these, change the text **between the quote marks** and leave the
quotes, commas and brackets alone.

### Swap the colours

The brand system is **deep navy blue** (primary), **warm crimson red**
(accent) and a **seven-colour rainbow** for the community section, on a warm
parchment background. Open `src/app/theme.css` and change the hex codes:

```css
--color-navy: #1e2f5c; /* PRIMARY — headings, nav, read-aloud button */
--color-crimson: #b01f30; /* ACCENT — main buttons, highlights */
--color-rainbow-red: #c0392f; /* first arc of the community rainbow */
--color-world-forest: #2f8f5b; /* the Feeling Forest marker */
```

Every button, badge, arc and marker using that colour updates automatically.

### Edit the "Building a BABES Community" section

The seven community tiers (Families → Schools → Social Agencies → Faith-Based
Organizations → Media → Business → Government) live in `src/config/site.ts`
under `communityTiers` — each has a `name`, a one-line `blurb` and an `accent`
(one of the rainbow colour names above). The heading and intro/outro copy are
in `sections.community` in the same file. The rainbow itself is drawn in code
in `src/components/CommunitySection.tsx`; the arcs pick up the tiers and
colours automatically, innermost (Families) to outermost (Government).

### Swap the images

Apart from the map (see "Swap the map image" below), all artwork is
placeholder SVG in the `public/images/` folder:

```
public/images/logo-placeholder.svg          ← header + footer logo
public/images/hero-placeholder.svg          ← hero illustration
public/images/worlds/*.svg                  ← picture at the top of each world pop-up
public/images/lessons/feeling-forest/*.svg  ← one per lesson slide
src/app/icon.svg                            ← browser tab icon
```

To use your own picture:

1. Drop the file (`.png`, `.jpg` or `.svg`) into `public/images/…`.
2. Point to it in the matching data file, using a path that starts with `/images/`:
   - logo → `logo.src` in `src/config/site.ts`
   - hero → the `src` in `src/components/Hero.tsx`
   - a world → `image.src` in `src/data/worlds.ts`
   - a lesson slide → `image.src` in `src/data/lessons.ts`
3. Update the `alt` text to describe the picture — screen readers read it aloud.

### Swap the map image

The map is the picture at:

```
public/images/babes-world-map.png
```

To use a new version, replace that file with your new picture (same name),
then:

1. Open `src/data/mapButtons.ts` and, in the `mapArtwork` block at the top,
   set `width` and `height` to the new picture's size in pixels (the current
   one is `1060` × `921`). This keeps the map's shape while it loads.
2. If your picture is a `.jpg` or has a different name, drop it in
   `public/images/` and change `src` in that same block to match, e.g.
   `"/images/babes-world-map-2027.jpg"`.
3. Update `alt` in that block if the picture's content changed — screen
   readers read it aloud.
4. Check every button still sits on its place (next section). If the new
   picture is the same artwork at a different resolution, nothing moves:
   positions are percentages. If it is cropped or re-drawn, nudge them.

The picture is always shown whole — never stretched or cropped — and scales
to fit phones and desktops. (If the file were ever missing, a rough built-in
drawing from `src/components/MapScene.tsx` is shown instead.)

### Adjust the map button positions

Every button is one line in `src/data/mapButtons.ts`:

```ts
{ id: "feeling-forest", label: "Feeling Forest", x: 42, y: 71.5 },
```

- `x` — percent from the picture's **left** edge (0) to its **right** edge (100)
- `y` — percent from the picture's **top** edge (0) to its **bottom** edge (100)
- The numbers mark the **centre** of the round button. Because they are
  percentages of the picture, a button stays on its spot at every screen size.
- `label` — the place's name: read out by screen readers, shown on hover, and
  used in the list under the map.
- `id` — which place in `src/data/worlds.ts` the button opens.

**To nudge a button:** run `npm run dev`, open the map, and change `x`
(left/right) or `y` (up/down) by 0.5–1 at a time. Save and the page refreshes.

**To find a spot from scratch:** open the map picture in any viewer that shows
pixel positions (Preview, Paint, Photoshop, GIMP…), point at the spot, and
divide:

```
x = pixels from the left ÷ picture width  × 100
y = pixels from the top  ÷ picture height × 100
```

For example, 445 px from the left and 650 px from the top of the
1060 × 921 picture is `x: 42, y: 70.6`.

**To add or remove a button:** add or delete its line in
`src/data/mapButtons.ts`. A new place also needs an entry in
`src/data/worlds.ts` (name, pop-up text, icon) with the same `id`;
`npm run typecheck` flags an `id` that doesn't match. The order of the lines
is the Tab / arrow-key order and the order of the list under the map, so keep
Feeling Forest first.

### Edit the lesson

`src/data/lessons.ts` holds the Feeling Forest lesson. Each slide looks like:

```ts
{
  title: "Naming it helps",
  body: "When we say \"I feel sad,\" the feeling gets a little smaller…",
  prompt: "Try it: \"I feel ______ because ______.\"",   // optional talk-about-it box
  image: { src: "/images/lessons/feeling-forest/slide-4.svg", alt: "…" },
  // readAloud: "Optional different wording for the read-aloud button"
},
```

Copy a whole `{ … },` block to add a slide; delete one to remove it. The
progress bar counts slides automatically.

### Give another place a lesson

1. In `src/data/lessons.ts`, copy the whole `feelingForest` block, rename it, give
   it a new `id`, and add it to the `lessons` list at the bottom of the file.
2. In `src/data/worlds.ts`, find that place and change `lessonId: null` to
   `lessonId: "your-new-id"`.

That place now opens the lesson instead of the "coming soon" pop-up.

---

## 4. Read-aloud button

The lesson's "Read this to me" button uses the browser's built-in
`SpeechSynthesis` API — no account, no cost, no data leaving the device. It
works in current Chrome, Edge, Safari and Firefox. On browsers without it, the
button hides itself automatically. Voice quality depends on the visitor's
device.

---

## 5. Deploy to Vercel (free)

1. Push this project to a GitHub repository (already done if you're reading this
   there).
2. Go to <https://vercel.com> and sign in with GitHub.
3. Click **Add New… → Project**, find this repository, click **Import**.
4. Leave the defaults — Vercel detects Next.js on its own:
   - Framework preset: **Next.js**
   - Build command: `npm run build`
   - Output directory: (leave empty)
5. Open **Environment Variables** and add:
   - Name: `NEXT_PUBLIC_FORMSPREE_ID`
   - Value: your Formspree ID (e.g. `abcdwxyz`)
   - Environments: Production, Preview and Development
6. Click **Deploy**. After a minute you'll get a live URL like
   `babes-world.vercel.app`.
7. Every push to the `main` branch redeploys automatically. Pushing any other
   branch gives you a private preview URL to check before merging.

**Custom domain:** Project → **Settings → Domains → Add**, then follow Vercel's
DNS instructions at your domain registrar.

> If you change an environment variable later, redeploy for it to take effect
> (Deployments → ⋯ → Redeploy). `NEXT_PUBLIC_` variables are baked into the
> build, so they're visible in the browser — that's expected for a Formspree
> form ID, which is public by design. Never put a secret in a `NEXT_PUBLIC_`
> variable.

---

## Project structure

```
src/
  app/
    layout.tsx      fonts, page title, global wrapper
    page.tsx        the single page: hero → map → lesson → community → signup → footer
    globals.css     base styles
    theme.css       ← BRAND COLOURS
    icon.svg        browser tab icon
  components/
    Header.tsx      sticky nav with smooth-scroll links
    Hero.tsx
    WorldMap.tsx    the interactive map + buttons + pop-up handling
    MapScene.tsx    rough drawn stand-in, only if the map picture is missing
    Modal.tsx       accessible pop-up (Escape, focus trap, focus return)
    LessonViewer.tsx slides, progress, Next/Back, read-aloud
    CommunitySection.tsx  the "Building a BABES Community" rainbow
    ComingSoon.tsx  pop-up for worlds without a lesson
    EmailSignup.tsx Formspree form
    Footer.tsx
  config/
    site.ts         ← ALL SITE TEXT (incl. taglines + community tiers)
  data/
    mapButtons.ts   ← MAP PICTURE + BUTTON POSITIONS (x/y percentages)
    worlds.ts       ← MAP PLACES (pop-up text, icons, which has a lesson)
    lessons.ts      ← LESSON SLIDES
  hooks/
    useSpeech.ts    read-aloud helper
public/images/      ← ALL PICTURES
```

## Accessibility notes

- Semantic landmarks (`header`, `main`, `section`, `footer`) and a "Skip to
  content" link.
- Map buttons are real buttons: Tab reaches them, arrow keys move between them,
  Enter opens them. Each announces the place's name and whether it opens the
  sample lesson, shows its name on hover/focus, and gets a high-contrast focus
  ring that stays visible over the artwork.
- Every map place is also in the plain list of buttons under the map — the
  easiest way in on small screens.
- The pop-up traps focus, closes with Escape or a click outside, and returns
  focus to the marker that opened it.
- The lesson announces each slide change, supports left/right arrow keys, and
  its progress bar is exposed to screen readers.
- Buttons outside the map are at least 44×44 px (on phones the map's own
  buttons are smaller so they don't hide the artwork; the list under the map
  is the full-size alternative). Text is high-contrast, and animations are
  disabled for visitors who ask for reduced motion.
- Please keep filling in `alt` text when you swap images in.

## Scope

This is a starter/demo site on purpose: no database, user accounts, payments,
license keys or admin dashboard. Adding any of those means adding a backend —
worth discussing separately.
