/**
 * Default High-Fidelity Transparent Vector Assets for Hero Section.
 * These serve as the default transparent PNG placeholders so that the website
 * renders instantly with crisp, appetizing visual fidelity without external image dependencies.
 */

// Transparent Strawberry Ice Cream Cone
export const DEFAULT_HERO_CONE_PNG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 750" fill="none">
  <defs>
    <filter id="coneGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="15" flood-color="#3a1000" flood-opacity="0.45"/>
    </filter>
    <radialGradient id="berryGlow" cx="45%" cy="35%" r="60%">
      <stop offset="0%" stop-color="#FFA4B4"/>
      <stop offset="45%" stop-color="#FF5A78"/>
      <stop offset="85%" stop-color="#D92246"/>
      <stop offset="100%" stop-color="#A8102E"/>
    </radialGradient>
    <linearGradient id="waffleCone" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#F2BA74"/>
      <stop offset="35%" stop-color="#D98A3C"/>
      <stop offset="80%" stop-color="#A6581C"/>
      <stop offset="100%" stop-color="#6B340B"/>
    </linearGradient>
    <pattern id="wafflePattern" width="28" height="28" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
      <rect width="28" height="28" fill="none"/>
      <line x1="0" y1="0" x2="28" y2="0" stroke="#7A390C" stroke-width="2.5" stroke-opacity="0.6"/>
      <line x1="0" y1="0" x2="0" y2="28" stroke="#7A390C" stroke-width="2.5" stroke-opacity="0.6"/>
      <rect x="2" y="2" width="24" height="24" fill="#F8C986" fill-opacity="0.25"/>
    </pattern>
  </defs>

  <g filter="url(#coneGlow)">
    <!-- WAFFLE CONE (Pointing downwards to the bottom edge) -->
    <path d="M125 360 L250 720 L375 360 Z" fill="url(#waffleCone)"/>
    <path d="M125 360 L250 720 L375 360 Z" fill="url(#wafflePattern)"/>
    <!-- Cone shading curve -->
    <path d="M250 360 C320 360 375 360 375 360 L250 720 Z" fill="#000000" fill-opacity="0.18"/>

    <!-- CONE RIM / WAFFLE COLLAR -->
    <ellipse cx="250" cy="360" rx="128" ry="24" fill="#C27529"/>
    <ellipse cx="250" cy="358" rx="126" ry="22" fill="#D98A3C"/>

    <!-- LUSCIOUS DOUBLE STRAWBERRY SCOOP -->
    <!-- Base scoop shadow -->
    <path d="M110 355 C105 320 120 280 150 250 C180 220 220 210 250 210 C280 210 320 220 350 250 C380 280 395 320 390 355 C370 390 340 405 250 405 C160 405 130 390 110 355 Z" fill="#B31535"/>

    <!-- Main Scoop body -->
    <path d="M115 340 C108 280 135 220 185 170 C220 135 280 135 315 170 C365 220 392 280 385 340 C370 385 330 395 250 395 C170 395 130 385 115 340 Z" fill="url(#berryGlow)"/>

    <!-- Top Scoop Swirl / Ripple -->
    <path d="M150 210 C180 120 320 120 350 210 C370 250 360 290 340 310 C320 330 290 340 250 340 C210 340 180 330 160 310 C140 290 130 250 150 210 Z" fill="url(#berryGlow)"/>

    <!-- Cream folds, drips, and textured ridges -->
    <path d="M135 335 C145 365 170 375 185 350 C195 335 205 335 215 360 C225 385 250 385 260 355 C270 335 285 340 295 370 C305 395 330 385 345 350 C360 320 375 340 375 355 C375 380 340 405 250 405 C160 405 125 380 125 355 Z" fill="#D92246"/>

    <!-- Melting ice cream drip hanging down cone -->
    <path d="M190 360 C185 390 195 420 205 445 C210 455 220 455 222 440 C225 410 230 380 235 360 Z" fill="#FF5A78"/>
    <circle cx="213" cy="450" r="7" fill="#FF5A78"/>

    <path d="M295 360 C290 385 285 415 280 435 C278 442 272 442 270 430 C265 405 268 380 270 360 Z" fill="#FF5A78"/>
    <circle cx="276" cy="440" r="5.5" fill="#FF5A78"/>

    <!-- Highlights & seed speckles -->
    <ellipse cx="210" cy="190" rx="35" ry="20" transform="rotate(-25 210 190)" fill="#FFFFFF" fill-opacity="0.32"/>
    <ellipse cx="280" cy="230" rx="20" ry="12" transform="rotate(15 280 230)" fill="#FFFFFF" fill-opacity="0.25"/>

    <!-- Real strawberry seeds -->
    <g fill="#FFF0A0" fill-opacity="0.8">
      <ellipse cx="170" cy="240" rx="2.5" ry="4" transform="rotate(20 170 240)"/>
      <ellipse cx="210" cy="270" rx="2.5" ry="4" transform="rotate(-15 210 270)"/>
      <ellipse cx="260" cy="260" rx="2.5" ry="4" transform="rotate(10 260 260)"/>
      <ellipse cx="310" cy="250" rx="2.5" ry="4" transform="rotate(-25 310 250)"/>
      <ellipse cx="230" cy="320" rx="2.5" ry="4" transform="rotate(35 230 320)"/>
      <ellipse cx="280" cy="315" rx="2.5" ry="4" transform="rotate(-10 280 315)"/>
      <ellipse cx="335" cy="300" rx="2.5" ry="4" transform="rotate(15 335 300)"/>
    </g>

    <!-- Fresh Mint Garnish on top -->
    <path d="M250 145 C230 110 250 80 270 95 C280 115 270 140 250 145 Z" fill="#4E8C1C"/>
    <path d="M250 145 C265 125 295 130 295 150 C285 165 265 160 250 145 Z" fill="#6CB82D"/>
    <path d="M250 145 C235 130 215 140 215 155 C230 170 245 155 250 145 Z" fill="#3D7314"/>
  </g>
</svg>
`)}`;

// Transparent Strawberry Topping 1 (Fresh sliced strawberry)
export const DEFAULT_TOPPING_1_PNG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <defs>
    <filter id="topShadow1">
      <feDropShadow dx="0" dy="10" stdDeviation="8" flood-color="#2a0800" flood-opacity="0.4"/>
    </filter>
  </defs>
  <g filter="url(#topShadow1)" transform="rotate(-15 100 100)">
    <!-- Outer Red Rim -->
    <path d="M100 25 C145 25 180 65 175 115 C170 160 120 185 100 190 C80 185 30 160 25 115 C20 65 55 25 100 25 Z" fill="#D91E42"/>
    <!-- Inner Flesh -->
    <path d="M100 35 C138 35 165 70 160 112 C155 150 118 172 100 176 C82 172 45 150 40 112 C35 70 62 35 100 35 Z" fill="#FF5E7C"/>
    <!-- White core rays -->
    <path d="M100 65 C118 65 132 85 130 110 C128 130 110 142 100 145 C90 142 72 130 70 110 C68 85 82 65 100 65 Z" fill="#FFE2E8"/>
    <!-- Yellow seeds on perimeter -->
    <ellipse cx="48" cy="90" rx="2" ry="3.5" transform="rotate(-30 48 90)" fill="#FFF3A8"/>
    <ellipse cx="60" cy="140" rx="2" ry="3.5" transform="rotate(-60 60 140)" fill="#FFF3A8"/>
    <ellipse cx="140" cy="140" rx="2" ry="3.5" transform="rotate(60 140 140)" fill="#FFF3A8"/>
    <ellipse cx="152" cy="90" rx="2" ry="3.5" transform="rotate(30 152 90)" fill="#FFF3A8"/>
  </g>
</svg>
`)}`;

// Transparent Strawberry Topping 2 (Whole fresh strawberry with leafy calyx)
export const DEFAULT_TOPPING_2_PNG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 240" fill="none">
  <defs>
    <filter id="topShadow2">
      <feDropShadow dx="0" dy="12" stdDeviation="9" flood-color="#2a0800" flood-opacity="0.45"/>
    </filter>
    <radialGradient id="berryGrad2" cx="35%" cy="35%" r="65%">
      <stop offset="0%" stop-color="#FF6B86"/>
      <stop offset="60%" stop-color="#E01A42"/>
      <stop offset="100%" stop-color="#8C0D26"/>
    </radialGradient>
  </defs>
  <g filter="url(#topShadow2)" transform="rotate(20 110 120)">
    <!-- Strawberry body -->
    <path d="M110 40 C165 40 195 85 185 140 C175 190 130 225 110 230 C90 225 45 190 35 140 C25 85 55 40 110 40 Z" fill="url(#berryGrad2)"/>
    <!-- Shiny highlight -->
    <ellipse cx="85" cy="95" rx="20" ry="35" transform="rotate(-25 85 95)" fill="#FFFFFF" fill-opacity="0.3"/>
    <!-- Seeds -->
    <g fill="#FFF5A0">
      <ellipse cx="75" cy="130" rx="2.5" ry="4" transform="rotate(-15 75 130)"/>
      <ellipse cx="110" cy="115" rx="2.5" ry="4"/>
      <ellipse cx="145" cy="125" rx="2.5" ry="4" transform="rotate(15 145 125)"/>
      <ellipse cx="90" cy="170" rx="2.5" ry="4" transform="rotate(-25 90 170)"/>
      <ellipse cx="125" cy="165" rx="2.5" ry="4" transform="rotate(10 125 165)"/>
      <ellipse cx="110" cy="195" rx="2.5" ry="4"/>
    </g>
    <!-- Green Leaves (Calyx) -->
    <path d="M110 45 C100 15 70 20 60 30 C80 40 95 45 110 45 Z" fill="#58A825"/>
    <path d="M110 45 C120 15 150 20 160 30 C140 40 125 45 110 45 Z" fill="#4B941E"/>
    <path d="M110 45 C110 5 100 0 95 0 C95 15 105 35 110 45 Z" fill="#3D7D16"/>
    <path d="M110 45 C80 35 65 50 60 65 C75 60 95 55 110 45 Z" fill="#69C22E"/>
    <path d="M110 45 C140 35 155 50 160 65 C145 60 125 55 110 45 Z" fill="#58A825"/>
  </g>
</svg>
`)}`;

// Transparent Strawberry Topping 3 (Juicy berry half)
export const DEFAULT_TOPPING_3_PNG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="none">
  <defs>
    <filter id="topShadow3">
      <feDropShadow dx="0" dy="10" stdDeviation="7" flood-color="#2a0800" flood-opacity="0.38"/>
    </filter>
  </defs>
  <g filter="url(#topShadow3)" transform="rotate(-35 100 100)">
    <!-- Red outer skin -->
    <path d="M100 20 C140 20 175 60 170 105 C165 150 120 175 100 180 C80 175 35 150 30 105 C25 60 60 20 100 20 Z" fill="#C91438"/>
    <!-- Juicy Red Flesh -->
    <path d="M100 28 C134 28 162 62 158 102 C154 140 118 165 100 168 C82 165 46 140 42 102 C38 62 66 28 100 28 Z" fill="#F44365"/>
    <!-- Pale seed core -->
    <path d="M100 55 C115 55 125 75 124 100 C122 120 108 132 100 135 C92 132 78 120 76 100 C75 75 85 55 100 55 Z" fill="#FFCCD6"/>
    <!-- Perimeter Seeds -->
    <g fill="#FFF080">
      <circle cx="50" cy="75" r="2.5"/>
      <circle cx="45" cy="115" r="2.5"/>
      <circle cx="65" cy="148" r="2.5"/>
      <circle cx="150" cy="75" r="2.5"/>
      <circle cx="155" cy="115" r="2.5"/>
      <circle cx="135" cy="148" r="2.5"/>
    </g>
  </g>
</svg>
`)}`;

// Transparent Strawberry Topping 4 (Floating berry with small leaf stem)
export const DEFAULT_TOPPING_4_PNG = `data:image/svg+xml;utf8,${encodeURIComponent(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 220 220" fill="none">
  <defs>
    <filter id="topShadow4">
      <feDropShadow dx="0" dy="12" stdDeviation="8" flood-color="#2a0800" flood-opacity="0.4"/>
    </filter>
    <radialGradient id="berryGrad4" cx="40%" cy="30%" r="65%">
      <stop offset="0%" stop-color="#FF758F"/>
      <stop offset="55%" stop-color="#E62047"/>
      <stop offset="100%" stop-color="#800A20"/>
    </radialGradient>
  </defs>
  <g filter="url(#topShadow4)" transform="rotate(45 110 110)">
    <!-- Strawberry body -->
    <path d="M110 30 C155 30 185 70 178 125 C170 170 128 200 110 205 C92 200 50 170 42 125 C35 70 65 30 110 30 Z" fill="url(#berryGrad4)"/>
    <!-- Specular glow -->
    <ellipse cx="88" cy="80" rx="16" ry="28" transform="rotate(-20 88 80)" fill="#FFFFFF" fill-opacity="0.32"/>
    <!-- Seeds -->
    <g fill="#FFF59A">
      <circle cx="80" cy="115" r="2.5"/>
      <circle cx="110" cy="100" r="2.5"/>
      <circle cx="140" cy="110" r="2.5"/>
      <circle cx="95" cy="150" r="2.5"/>
      <circle cx="125" cy="145" r="2.5"/>
    </g>
    <!-- Green Crown -->
    <path d="M110 35 C100 10 75 15 65 25 C82 32 96 35 110 35 Z" fill="#58A825"/>
    <path d="M110 35 C120 10 145 15 155 25 C138 32 124 35 110 35 Z" fill="#468C1C"/>
    <path d="M110 35 C112 5 105 0 98 0 C98 12 104 25 110 35 Z" fill="#3D7D16"/>
  </g>
</svg>
`)}`;
