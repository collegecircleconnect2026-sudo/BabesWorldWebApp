/**
 * Built-in illustrated map of BABES World — a stand-in background shown only
 * if the real artwork at `public/images/babes-world-map.png` is missing
 * (see `mapArtwork` in `src/data/mapButtons.ts`).
 *
 * It loosely sketches the hand-painted map: a round island world on a sky
 * of clouds, with the snowy mountain and canyon up top, Peer Pressure Pier
 * on the left, Helping Harbor's lighthouse, the Feeling Forest ring around
 * the fountain in the middle, sunny fields on the right, and the
 * seven-colour rainbow sweeping down to the Drug Free Community goal.
 *
 * The button positions in `src/data/mapButtons.ts` are tuned to the real
 * artwork, so on this drawing they only land roughly in the right areas.
 *
 * It is marked aria-hidden because the clickable markers on top carry all of
 * the meaning for screen-reader users.
 */
export default function MapScene() {
  return (
    <svg
      viewBox="0 0 855 925"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <linearGradient id="babes-sky" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#9fd4ef" />
          <stop offset="1" stopColor="#dff2fb" />
        </linearGradient>
        <linearGradient id="babes-falls" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#eaf7fd" />
          <stop offset="1" stopColor="#8ec8e8" />
        </linearGradient>
      </defs>

      {/* Sky-and-clouds border */}
      <rect width="855" height="925" fill="url(#babes-sky)" />
      <g fill="#ffffff" opacity="0.9">
        <ellipse cx="90" cy="60" rx="70" ry="26" />
        <ellipse cx="150" cy="45" rx="46" ry="20" />
        <ellipse cx="700" cy="45" rx="64" ry="24" />
        <ellipse cx="770" cy="65" rx="46" ry="18" />
        <ellipse cx="40" cy="480" rx="44" ry="18" />
        <ellipse cx="820" cy="370" rx="42" ry="18" />
        <ellipse cx="70" cy="880" rx="60" ry="22" />
        <ellipse cx="780" cy="870" rx="66" ry="24" />
        <ellipse cx="430" cy="905" rx="52" ry="18" />
      </g>

      {/* The round world */}
      <path
        d="M427 28
           C610 30 780 150 806 330
           C830 490 822 660 730 780
           C640 890 520 905 420 900
           C300 895 170 850 100 730
           C36 620 30 460 60 330
           C95 170 250 26 427 28 Z"
        fill="#f3e5c0"
        stroke="#dbc492"
        strokeWidth="8"
      />

      {/* Green hills — left edge and bottom */}
      <path
        d="M60 330 C95 170 250 26 427 28 L300 60
           C200 110 130 220 110 340
           C90 470 95 600 140 720
           C170 800 220 860 300 890
           C200 860 130 800 100 730 C36 620 30 460 60 330 Z"
        fill="#7fbb7a"
        opacity="0.9"
      />
      <path
        d="M120 700 C200 760 340 800 470 810 C420 880 300 890 230 850
           C170 815 135 760 120 700 Z"
        fill="#8cc98a"
      />
      {/* Dark green ridge on the right edge */}
      <path
        d="M806 330 C830 490 822 660 730 780 C760 660 770 480 740 360
           C720 280 690 210 640 150 C720 190 790 240 806 330 Z"
        fill="#5f9459"
        opacity="0.9"
      />

      {/* Water — top-left lake behind the mountain */}
      <path
        d="M110 150 C170 100 260 90 300 130 C310 180 260 230 190 235
           C130 238 90 195 110 150 Z"
        fill="#5fa8d6"
      />

      {/* Snowy mountain and canyon (top) */}
      <path
        d="M250 250 L310 70 L360 130 L400 50 L470 240 Z"
        fill="#b9a8cd"
      />
      <path d="M300 95 L310 70 L360 130 L400 50 L430 130 L390 115 L355 150 L325 120 Z" fill="#ffffff" />
      <path
        d="M255 250 C280 180 320 160 350 170 C330 210 320 245 325 280
           C295 285 265 275 255 250 Z"
        fill="#c98d5a"
      />

      {/* Waterfall from the mountain down to the forest */}
      <path
        d="M470 240 C480 320 470 400 440 470 L410 470
           C445 400 455 320 445 245 Z"
        fill="url(#babes-falls)"
      />

      {/* Pink lowland around the pier */}
      <path
        d="M150 280 C230 260 330 270 380 310 C400 360 370 420 300 440
           C230 460 160 430 140 380 C128 340 130 300 150 280 Z"
        fill="#f2cdd9"
      />
      {/* Pier water + planks */}
      <path
        d="M205 330 C270 315 330 325 355 355 C360 390 320 415 265 415
           C215 415 185 385 190 355 Z"
        fill="#7796c9"
      />
      <g fill="#a9744a">
        <rect x="215" y="318" width="110" height="14" rx="4" transform="rotate(14 270 325)" />
        <rect x="228" y="336" width="8" height="26" />
        <rect x="262" y="344" width="8" height="26" />
        <rect x="296" y="352" width="8" height="26" />
      </g>

      {/* Helping Harbor — framed lighthouse */}
      <rect x="500" y="140" width="140" height="110" rx="12" fill="#4c7fb5" />
      <rect x="508" y="148" width="124" height="94" rx="8" fill="#8ec8e8" />
      <path d="M560 236 L570 170 L586 170 L596 236 Z" fill="#ffffff" />
      <rect x="566" y="158" width="24" height="14" rx="4" fill="#c0392f" />
      <rect x="536" y="236" width="86" height="8" rx="4" fill="#a9744a" />

      {/* Prevention Place — gift-wrapped house (top right) */}
      <rect x="690" y="80" width="86" height="82" rx="10" fill="#c94f5e" />
      <rect x="726" y="80" width="14" height="82" fill="#f2b8c6" />
      <rect x="690" y="112" width="86" height="14" fill="#f2b8c6" />
      <path d="M718 80 C720 62 746 62 748 80 Z" fill="#f2b8c6" />

      {/* Sunny yellow fields on the right */}
      <path
        d="M520 300 C620 280 720 300 760 370 C790 430 785 540 750 620
           C715 700 640 740 560 720 C500 705 470 650 480 580
           C490 500 480 380 520 300 Z"
        fill="#f2d95c"
        opacity="0.95"
      />
      {/* Party Park hedge */}
      <path
        d="M540 340 C600 320 660 330 680 360 C670 395 610 410 565 400
           C535 392 528 362 540 340 Z"
        fill="#4f9e58"
      />

      {/* The Feeling Forest ring + fountain */}
      <circle cx="390" cy="590" r="140" fill="#8cc98a" />
      <circle cx="390" cy="590" r="140" fill="none" stroke="#3f7d4e" strokeWidth="34" />
      <g fill="#3f7d4e">
        <circle cx="300" cy="500" r="22" />
        <circle cx="480" cy="500" r="22" />
        <circle cx="265" cy="590" r="20" />
        <circle cx="515" cy="590" r="20" />
        <circle cx="300" cy="678" r="22" />
        <circle cx="480" cy="678" r="22" />
        <circle cx="390" cy="452" r="22" />
        <circle cx="390" cy="728" r="22" />
      </g>
      {/* Fountain spires */}
      <ellipse cx="390" cy="628" rx="58" ry="16" fill="#9fd4ef" />
      <path d="M390 505 L404 615 L376 615 Z" fill="#e6ddf2" />
      <path d="M360 540 L372 618 L348 618 Z" fill="#cfc2e6" />
      <path d="M420 540 L432 618 L408 618 Z" fill="#cfc2e6" />
      {/* Sun by the forest */}
      <circle cx="452" cy="668" r="16" fill="#f2c94c" stroke="#e8a921" strokeWidth="4" />

      {/* Winding red paths (the Divergent Paths) */}
      <g fill="none" stroke="#d95b43" strokeWidth="13" strokeLinecap="round" opacity="0.9">
        <path d="M150 130 C200 190 210 260 235 320 C255 370 290 420 330 455" />
        <path d="M330 80 C400 70 460 80 520 120 C560 145 600 170 640 180" />
        <path d="M735 150 C710 230 700 320 695 420 C690 520 680 600 655 665" />
        <path d="M462 95 C470 150 480 190 500 230" />
      </g>

      {/* The rainbow — seven arcs to the Drug Free Community */}
      <g fill="none" strokeLinecap="round">
        <path d="M500 520 C440 640 350 720 245 775" stroke="#c0392f" strokeWidth="13" />
        <path d="M512 530 C452 655 360 738 252 792" stroke="#d97a26" strokeWidth="13" />
        <path d="M524 540 C464 670 372 754 261 808" stroke="#dfa215" strokeWidth="13" />
        <path d="M536 550 C478 685 385 770 272 824" stroke="#3d8b57" strokeWidth="13" />
        <path d="M548 560 C492 700 400 786 285 839" stroke="#2a8a8f" strokeWidth="13" />
        <path d="M560 570 C506 714 414 800 299 853" stroke="#2e6fae" strokeWidth="13" />
        <path d="M572 580 C520 728 428 814 313 866" stroke="#5b4a9e" strokeWidth="13" />
      </g>

      {/* Drug Free Community goal */}
      <circle cx="222" cy="790" r="30" fill="#e8a921" stroke="#c8891a" strokeWidth="6" />

      {/* A few loose trees */}
      <g fill="#45a065">
        <circle cx="170" cy="470" r="14" />
        <circle cx="120" cy="620" r="13" />
        <circle cx="620" cy="640" r="14" />
        <circle cx="700" cy="720" r="13" />
        <circle cx="540" cy="270" r="12" />
      </g>
    </svg>
  );
}
