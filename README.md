# SHIFTBID 6100 - Cinematic Promotional Video

A production-ready Remotion project for creating a premium, cinematic promotional video showcasing the SHIFTBID 6100 website and mobile application.

## 🎬 Video Specifications

- **Duration**: 90 seconds (2700 frames @ 30fps)
- **Resolution**: 1920 × 1080 (Full HD)
- **Aspect Ratio**: 16:9
- **Format**: MP4 (H.264)
- **Frame Rate**: 30 FPS

## 🎨 Brand Identity

- **Brand**: SHIFTBID 6100
- **Company**: GROUP 2ONIA
- **Tagline**: "SHIFT FAST. BID SMART."
- **Colors**:
  - Crimson Red: `#C8102E`
  - Deep Red: `#8F001D`
  - Near Black: `#08080C`
  - Dark Charcoal: `#15151B`
  - White: `#FFFFFF`
  - Metallic Gray: `#A7A7AE`

## 📖 Storyboard (8 Scenes)

| Scene | Time | Description |
|-------|------|-------------|
| 1 | 0-8s | Cinematic Brand Intro - Engine rev, light sweep, vehicle silhouettes, logo reveal |
| 2 | 8-20s | Website Reveal - Desktop monitor, website loading, hero, stats, marketplace |
| 3 | 20-30s | Vehicle Discovery - Search, categories, card interactions, detail view |
| 4 | 30-42s | Secure Bidding - Bid modal, live bidding, confirmation, bid history |
| 5 | 42-55s | Mobile App Reveal - Monitor-to-phone morph, home, explore, detail, bids, profile |
| 6 | 55-68s | Logistics & Tracking - Animated map, timeline, status cards, delivery confirmation |
| 7 | 68-78s | Complete Ecosystem - Dual devices, connecting lines, value prop, keywords |
| 8 | 78-90s | Final Brand Reveal - Vehicle in red light, logo, tagline, brand statement |

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
cd shiftbid-promo-video
npm install
```

### Development Preview

Start the Remotion Studio for real-time preview:

```bash
npm start
```

This opens the Remotion Studio at `http://localhost:3000` where you can:
- Scrub through the timeline
- Preview individual scenes
- Inspect props and state
- Render test frames

### Render Final Video

```bash
# Full quality render (90 seconds)
npm run build

# Preview render (30 seconds, faster)
npm run build:preview
```

Output: `out/shiftbid-promo.mp4`

### Extract Still Frame

```bash
# Extract frame at 60 seconds (frame 1800)
npm run still
```

Output: `out/frame.png`

## 📁 Project Structure

```
shiftbid-promo-video/
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
├── remotion.config.ts     # Remotion render settings
├── README.md              # This file
└── src/
    ├── index.ts                   # Main exports
    ├── brand.ts                   # Brand system (colors, typography, animations)
    ├── composition.tsx            # Composition definitions
    ├── ShiftBidPromoVideo.tsx     # Main video component with scene orchestration
    ├── components/
    │   ├── index.ts
    │   ├── DesktopMonitor.tsx     # 3D desktop monitor mockup
    │   ├── Smartphone.tsx         # 3D smartphone mockup (iPhone-style)
    │   ├── WebsiteMockup.tsx      # Full website UI recreation
    │   └── MobileAppMockup.tsx    # Full mobile app UI recreation
    └── scenes/
        ├── index.ts
        ├── Scene1BrandIntro.tsx
        ├── Scene2WebsiteReveal.tsx
        ├── Scene3VehicleDiscovery.tsx
        ├── Scene4SecureBidding.tsx
        ├── Scene5MobileAppReveal.tsx
        ├── Scene6LogisticsTracking.tsx
        ├── Scene7CompleteEcosystem.tsx
        └── Scene8FinalBrandReveal.tsx
```

## 🎯 Key Features

### Cinematic Animations
- Custom easing functions (cinematic, elastic, bounce, expo, circ, back)
- Smooth camera movements with perspective
- 3D device rotations and transforms
- Particle systems and atmospheric effects
- Light sweeps and glow effects

### Professional UI Recreation
- **Website**: Exact recreation of the ShiftBid 6100 website.html prototype
  - Navigation bar with logo and links
  - Hero section with gradient background
  - Stats cards (Verified-first, Open bidding, End-to-end)
  - Vehicle marketplace grid with 6 premium vehicles
  - Search, filters, and category selection
  - Bid modals with validation

- **Mobile App**: Exact recreation of the ShiftBid 6100 app.html prototype
  - Home dashboard with greeting, search, categories
  - Explore screen with vehicle listings
  - Detail screen with specs grid and bid button
  - My Bids screen with active bids
  - Profile screen with verification status
  - Bottom tab navigation

### Motion Design Techniques
- Staggered entrance animations
- Morphing transitions (website → mobile)
- Parallax and depth effects
- Kinetic typography
- Floating UI elements
- Data visualization (animated map route, bid numbers)
- Timeline with connecting lines

### Audio-Ready Structure
- Voiceover timing data included (12 segments, 90 seconds)
- Sound effect cues marked in code
- Music build-up points identified

## 🎙️ Voiceover Script

The project includes timed voiceover segments matching the storyboard:

1. (0-8s) "Buying and selling vehicles should be easier."
2. (8-14s) "Introducing ShiftBid 6100."
3. (14-20s) "A smarter digital marketplace designed to bring buyers and sellers together."
4. (20-28s) "Discover vehicles. Explore detailed listings. And experience a more organized bidding process."
5. (28-36s) "With verified users, transparent bidding, and payment guidance, every step becomes easier to navigate."
6. (36-42s) "And the experience doesn't stop there."
7. (42-50s) "From shipment scheduling to delivery tracking, ShiftBid helps users stay informed throughout the transaction."
8. (50-58s) "Whether you're using our website or mobile application, your vehicle marketplace is always within reach."
9. (58-66s) "One platform. A smarter way to buy and sell vehicles."
10. (66-74s) "ShiftBid 6100."
11. (74-82s) "Shift Fast. Bid Smart."
12. (82-90s) "The future of vehicle transactions."

## ⚙️ Render Settings

Configured in `remotion.config.ts`:
- Video format: JPEG (high quality)
- JPEG quality: 95%
- CRF: 18 (visually lossless)
- Pixel format: yuv420p (broad compatibility)
- Concurrency: 4 threads

## 🔧 Customization

### Modify Scene Timing
Edit the `scenes` array in `src/ShiftBidPromoVideo.tsx`:

```typescript
const scenes = [
  { id: 1, name: "Brand Intro", start: 0, end: 8, component: Scene1BrandIntro },
  { id: 2, name: "Website Reveal", start: 8, end: 20, component: Scene2WebsiteReveal },
  // ... adjust start/end times
];
```

### Update Brand Colors
Modify `src/brand.ts`:

```typescript
export const BrandColors = {
  crimsonRed: "#C8102E",
  deepRed: "#8F001D",
  // ... add your brand colors
};
```

### Add Custom Vehicles
Update `sampleVehicles` in `src/brand.ts`:

```typescript
export const sampleVehicles = [
  { id: 1, make: "Your Brand", model: "Model", year: 2024, price: 100000, ... },
  // ... your vehicles
];
```

### Change Duration
Update `durationInFrames` in `src/composition.tsx`:

```typescript
// 120 seconds at 30fps = 3600 frames
durationInFrames={3600}
```

## 📦 Output

After rendering, you'll have:
- `out/shiftbid-promo.mp4` - Final promotional video (90s, 1080p, H.264)
- `out/shiftbid-promo-preview.mp4` - Preview version (30s)
- `out/frame.png` - Thumbnail frame

## 🎵 Audio Integration

To add professional audio:

1. **Voiceover**: Record the script above, import as audio track in Remotion
2. **Music**: License cinematic tech commercial music (suggestions: Artlist, Epidemic Sound, Musicbed)
3. **Sound Effects**: Add at marked timestamps:
   - 0s: Engine rev
   - 0.5s: Deep cinematic impact
   - 1-8s: Red light sweep whoosh
   - 8s: Monitor power-on sound
   - 20-30s: UI clicks, typing sounds
   - 30-42s: Bid pulse sounds, confirmation chime
   - 42s: Morph transition whoosh
   - 55s: Map draw sound
   - 78s: Bass impact
   - 82s: Final logo hit

## 📋 Quality Checklist

Before final delivery, verify:

- [ ] Official ShiftBid logo is accurate throughout
- [ ] Both website and mobile app are showcased
- [ ] Website-to-app transition is smooth (Scene 5)
- [ ] Interface text is readable at 1080p
- [ ] Red/black/white branding is consistent
- [ ] Video pacing feels professional (not rushed, not dragging)
- [ ] Voiceover timing matches scenes
- [ ] No unimplemented features claimed as operational
- [ ] Final logo reveal is memorable
- [ ] Video plays correctly in target players

## 🎓 Use Cases

- University business pitching
- Startup product demonstrations  
- Investor presentations
- Social media promotion (cut into 15-30s clips)
- Website landing page hero video
- Product launch presentations
- Trade show booth loops

## 🛠️ Tech Stack

- **Remotion 4.x** - React-based video generation
- **React 18** - Component framework
- **TypeScript** - Type safety
- **CSS-in-JS** - Styled components via inline styles
- **SVG** - Vector graphics for logos and UI elements

## 📄 License

This project is created for the SHIFTBID 6100 / GROUP 2ONIA promotional campaign.

---

**Built with ❤️ using Remotion** — Making videos programmatically in React.