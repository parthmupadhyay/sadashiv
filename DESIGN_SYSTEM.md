# Sadashiv Design System: "Spiritual Sanctuary & Editorial Modern"

## Visual Philosophy
Sadashiv is a sacred Sanskrit stotra reader. It must look like a high-end, editorial digital sanctuary (inspired by modern apps like Linear, Raycast, and Apple Music Classical), NOT a school project or generic admin dashboard.

## 1. Color Palette & Surfaces
- Canvas: Deep pitch `#09090b` (Tailwind zinc-950)
- Surface Cards: Semi-translucent `bg-zinc-900/40` with `backdrop-blur-md`
- Subtle Keyline Borders: `border-white/[0.08]` (default)
- Active / Hover Borders: `hover:border-amber-500/40`
- Accents & Glows: Warm amber/gold (`amber-400`, `amber-500/20` background tint)
- Text Hierarchy:
  - Heading / Primary: `text-zinc-100`
  - Verse Sanskrit: `text-amber-100`
  - Transliteration: `text-zinc-400 italic`
  - Metadata / Badges: `text-zinc-400 font-mono text-xs uppercase tracking-wider`

## 2. Typography Token Strategy
- Devanagari Verses: MUST use `Noto_Serif_Devanagari` (loaded via Next font variable `--font-devanagari`). Line-height must be generous (`leading-[2.2]`).
- English Serifs & Quotes: `Cormorant_Garamond` (loaded via Next font variable `--font-serif`).
- UI & Metadata: Default Sans (`Inter` or `Geist`).

## 3. Atomic Component Specs (to be placed in `src/components/ui/`)
- `Badge.tsx`: Pill badge with micro-dot indicator, subtle border, monospace typography.
- `Card.tsx`: Glass container with 1px border keyline, rounded-2xl, soft ambient hover glow.
- `LanguageToggle.tsx`: Segmented control pill switcher ("English" / "हिंदी") with amber accent highlight on the active tab.

## 4. Stanza & Page Layout Standards
- Ambient background: Top radial gradient glow (amber-500/10 fading to transparent).
- Stanza cards: Center-aligned Devanagari text, with roman transliteration below it, translation quote container, and a collapsible line-by-line breakdown (Anvaya).
