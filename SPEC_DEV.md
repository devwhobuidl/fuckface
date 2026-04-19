# FUCKFACE - Meme Coin Web App Specification

## 1. Overview
FUCKFACE is the official web application for the $fuckface meme coin on Solana (Contract Address: `HQM27BReU9a4hKusbd5GEdw1cLbbVvRzKu36RMripump`). The application serves as a landing page, community hub, meme gallery, and token info center, designed to capture a dark, edgy, chaotic, and "degen" aesthetic.

## 2. Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS (Dark mode only) with pure black, blood red, toxic green accents, and custom meme fonts.
- **UI Components:** shadcn/ui + custom components.
- **Deployment target:** Vercel or Netlify.
- **Icons/Fonts:** Impact/meme-style bold fonts for headings, sans-serif for body text, Lucide icons + native emojis.

## 3. Visual Identity
- **Background:** Pure Black (`#000000`)
- **Accents:** Blood Red (`#FF0000` / `#E30613`) and Toxic Green (`#00FF00`)
- **Text:** White (`#FFFFFF`) with neon glows on active elements.
- **Core Meme:** Classic crying Wojak with middle finger raised, tears streaming, "fuck" and "face" labels. Used extensively across the site.
- **Typography:**
  - Headings: Impact (or equivalent meme font available via Google Fonts like 'Anton' or local web fonts if Impact is not broadly cross-platform, but Impact is web-safe).
  - Body: Inter or clean sans-serif.

## 4. Pages & Sections Architecture

### 4.1. Landing / Hero Section
- **Location:** Full-screen top section of home page (`/`).
- **Elements:**
  - Massive centered Wojak FUCKFACE meme.
  - "FUCKFACE" headline + Tagline: "the classic insult turned into a meme".
  - CA (Contract Address) box with 1-click copy functionality (using `clipboard` API).
  - Huge Red CTA: "BUY $fuckface" linking to pump.fun or Jupiter.
  - Scrolling Ticker: CSS infinite marquee with placeholder stats (MCAP, liquidity, holders).

### 4.2. Meme Gallery
- **Location:** Mid-page, below Hero.
- **Elements:**
  - 3-column CSS Grid displaying core memes: Original, SBF version, Sonic version.
  - "Submit your own" button (placeholder with tooltip/toast "coming soon - community memes").

### 4.3. Token Info
- **Location:** Mid-page.
- **Elements:**
  - Prominent CA display.
  - Tokenomics table or grid: Supply details, Tax (0/0), Locked Liquidity.
  - Badge: "All supply locked live on pump!" (Toxic green glowing border).

### 4.4. Community Hub
- **Location:** Lower mid-page.
- **Elements:**
  - Social Links: X/Twitter, Telegram, pump.fun link.
  - Animated members counter (starts at 72, maybe with a count-up animation component).
  - X posts embed placehoder (A styled card mimicking a Twitter embed).

### 4.5. Footer
- **Elements:**
  - "Built for the fuckface degens 🖕" text.
  - Disclaimers (Not financial advice, standard meme coin CYA).

### 4.6. Admin "Stats Update" Section
- **Location:** Hidden route `/admin` or a modal accessible via a secret key sequence.
- **Elements:**
  - Simple password gate.
  - Form to update the placeholder stats in the ticker (state kept in a simple global context or localized to localStorage for now, since no DB is requested yet).

## 5. Development Strategy
1. **Initialize Project:** Scaffold Next.js 15, setup Tailwind, shadcn, Lucide icons.
2. **Setup Global Styles:** Enforce pure black background, dark mode only, load web-safe meme fonts.
3. **Build Core UI Components:** Ticker component, Hero elements, Buttons.
4. **Implement Sections:**
   - Hero and Ticker
   - Gallery with placeholder images (we will generate images via tools if needed, or use placeholders).
   - Token Info
   - Community Hub
5. **Admin Section:** Minimal password-protected view (`/mod`) with dummy state management.
6. **Polish:** Add micro-animations (neon glows, hover effects), ensure responsive design (mobile-first).
7. **SEO Setup:** Add required `<title>` and `<meta>` description in `app/layout.tsx`.

## 6. Open Questions / Next Steps
- Meme Source Images: I will need to use image generation or placeholder image URLs representing the specified Wojak variants. Considering placeholders with text descriptions for now, or generating them.
- Admin stats: Without a backend, state changes will revert on reload unless stored via simple server actions or an edge KV. For the scope of this static-like site, they might just be hardcoded or use a simple client-side mock.

-- End of Spec --
