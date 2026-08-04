# BABES World — marketing + demo website

A small, fast, single-page website for **BABES World**, an educational nonprofit
helping children ages 5–8 build healthy behaviors and make positive life
decisions.

It contains:

1. **Hero** — name, tagline and an "Explore the Worlds" button
2. **Interactive world map** — seven clickable worlds; clicking one opens a pop-up
3. **Lesson viewer** — slide-by-slide lesson with Next/Back, a progress bar and a
   read-aloud button (browser speech, nothing sent to a server)
4. **Email signup** — name + email, posted straight to [Formspree](https://formspree.io)
5. **Footer** — nonprofit name and a logo placeholder

Only **Feeling Forest** has a real lesson; the other six worlds show a friendly
"Coming soon" pop-up.

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

Everything a non-developer needs is in four clearly-commented files.

| I want to change…                                   | Edit this file            |
| --------------------------------------------------- | ------------------------- |
| Site name, tagline, button labels, headings, footer  | `src/config/site.ts`      |
| Brand colours                                        | `src/app/theme.css`       |
| World names, blurbs, marker positions, which world has a lesson | `src/data/worlds.ts` |
| Lesson slides (titles, text, questions, images)      | `src/data/lessons.ts`     |

In all of these, change the text **between the quote marks** and leave the
quotes, commas and brackets alone.

### Swap the colours

Open `src/app/theme.css` and change the hex codes:

```css
--color-coral: #c9401b; /* primary buttons */
--color-berry: #5b32ab; /* secondary accents */
--color-world-forest: #2f8f5b; /* the Feeling Forest marker */
```

Every button, badge and marker using that colour updates automatically.

### Swap the images

All artwork is placeholder SVG in the `public/images/` folder:

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

The illustrated map background is drawn in code in `src/components/MapScene.tsx`;
that file's comment shows how to replace it with a single image.

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

### Give another world a lesson

1. In `src/data/lessons.ts`, copy the whole `feelingForest` block, rename it, give
   it a new `id`, and add it to the `lessons` list at the bottom of the file.
2. In `src/data/worlds.ts`, find that world and change `lessonId: null` to
   `lessonId: "your-new-id"`.

That world now opens the lesson instead of "Coming soon."

### Move a marker on the map

In `src/data/worlds.ts`, each world has:

```ts
position: { x: 17, y: 32 },  // percent from the left, percent from the top
```

`x: 0` is the far left, `x: 100` the far right; `y: 0` is the top, `y: 100` the
bottom.

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
    page.tsx        the single page: hero → map → lesson → signup → footer
    globals.css     base styles
    theme.css       ← BRAND COLOURS
    icon.svg        browser tab icon
  components/
    Header.tsx      sticky nav with smooth-scroll links
    Hero.tsx
    WorldMap.tsx    the interactive map + pop-up handling
    MapScene.tsx    the drawn map background
    Modal.tsx       accessible pop-up (Escape, focus trap, focus return)
    LessonViewer.tsx slides, progress, Next/Back, read-aloud
    ComingSoon.tsx  pop-up for worlds without a lesson
    EmailSignup.tsx Formspree form
    Footer.tsx
  config/
    site.ts         ← ALL SITE TEXT
  data/
    worlds.ts       ← THE SEVEN WORLDS
    lessons.ts      ← LESSON SLIDES
  hooks/
    useSpeech.ts    read-aloud helper
public/images/      ← ALL PICTURES
```

## Accessibility notes

- Semantic landmarks (`header`, `main`, `section`, `footer`) and a "Skip to
  content" link.
- Map markers are real buttons: Tab reaches them, arrow keys move between them,
  Enter opens them. Every marker announces the world's name, status and blurb.
- The pop-up traps focus, closes with Escape or a click outside, and returns
  focus to the marker that opened it.
- The lesson announces each slide change, supports left/right arrow keys, and
  its progress bar is exposed to screen readers.
- Tap targets are at least 44×44 px, text is high-contrast, and animations are
  disabled for visitors who ask for reduced motion.
- Please keep filling in `alt` text when you swap images in.

## Scope

This is a starter/demo site on purpose: no database, user accounts, payments,
license keys or admin dashboard. Adding any of those means adding a backend —
worth discussing separately.
