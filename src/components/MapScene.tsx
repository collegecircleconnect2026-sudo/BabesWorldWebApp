/**
 * Decorative background illustration for the world map.
 *
 * It is a plain SVG so it stays crisp on every screen and costs no bandwidth.
 * Swap it for real artwork later: replace this file's contents with an <img />
 * pointing at your illustration, e.g.
 *
 *   <img src="/images/map.png" alt="" className="h-full w-full object-cover" />
 *
 * It is marked aria-hidden because the clickable markers on top carry all of
 * the meaning for screen-reader users.
 */
export default function MapScene() {
  return (
    <svg
      viewBox="0 0 1000 620"
      preserveAspectRatio="xMidYMid slice"
      className="h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      {/* Water */}
      <rect width="1000" height="620" fill="#b5ddef" />

      {/* Gentle waves */}
      <g stroke="#99cfe6" strokeWidth="4" fill="none" strokeLinecap="round">
        <path d="M40 90 q18 -12 36 0 t36 0" />
        <path d="M880 140 q18 -12 36 0 t36 0" />
        <path d="M120 560 q18 -12 36 0 t36 0" />
        <path d="M640 520 q18 -12 36 0 t36 0" />
        <path d="M470 350 q18 -12 36 0 t36 0" />
      </g>

      {/* Main island */}
      <path
        d="M150 470 C80 430 90 300 180 250 C230 220 250 150 340 130
           C430 110 470 160 560 130 C660 96 720 140 780 180
           C860 230 900 320 860 400 C820 480 700 520 600 505
           C500 490 420 540 320 530 C250 522 200 500 150 470 Z"
        fill="#f2ddb2"
      />
      <path
        d="M150 470 C80 430 90 300 180 250 C230 220 250 150 340 130
           C430 110 470 160 560 130 C660 96 720 140 780 180
           C860 230 900 320 860 400 C820 480 700 520 600 505
           C500 490 420 540 320 530 C250 522 200 500 150 470 Z"
        fill="none"
        stroke="#dfc290"
        strokeWidth="10"
      />

      {/* Grass */}
      <path
        d="M200 450 C150 415 165 315 235 275 C285 246 285 190 355 175
           C430 158 470 200 555 175 C645 148 700 185 745 215
           C815 260 845 330 810 395 C775 460 680 490 595 477
           C505 464 430 505 340 495 C280 488 240 476 200 450 Z"
        fill="#9fd694"
      />

      {/* Winding path between the worlds */}
      <path
        d="M190 320 C260 250 330 230 390 220 C470 208 520 250 600 235
           C680 220 760 260 810 330 C845 380 800 430 720 440
           C630 450 560 420 470 445 C400 464 330 450 250 420"
        fill="none"
        stroke="#f7f0e2"
        strokeWidth="16"
        strokeLinecap="round"
        strokeDasharray="2 34"
      />

      {/* Little trees */}
      <g fill="#45a065">
        <circle cx="300" cy="300" r="16" />
        <circle cx="330" cy="330" r="12" />
        <circle cx="640" cy="180" r="14" />
        <circle cx="700" cy="420" r="16" />
        <circle cx="420" cy="500" r="12" />
        <circle cx="250" cy="230" r="12" />
      </g>

      {/* Clouds */}
      <g fill="#ffffff" opacity="0.85">
        <ellipse cx="140" cy="90" rx="52" ry="24" />
        <ellipse cx="176" cy="80" rx="36" ry="20" />
        <ellipse cx="860" cy="520" rx="48" ry="22" />
        <ellipse cx="826" cy="512" rx="32" ry="18" />
      </g>
    </svg>
  );
}
