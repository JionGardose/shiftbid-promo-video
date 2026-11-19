/**
 * SHIFTBID 6100 Brand System
 * Official brand colors, typography, and design tokens
 */

export const BrandColors = {
  // Primary brand colors
  crimsonRed: "#C8102E",
  deepRed: "#8F001D",
  nearBlack: "#08080C",
  darkCharcoal: "#15151B",
  white: "#FFFFFF",
  metallicGray: "#A7A7AE",

  // UI colors from website
  bg: "#09090D",
  panel: "#131319",
  panel2: "#1B1B23",
  red: "#E31837",
  red2: "#A90F2B",
  muted: "#A5A5B1",
  line: "#30303A",
  green: "#35C98A",

  // App colors
  appBg: "#08080C",
  appPanel: "#15151D",
  appPanel2: "#20202A",
  appRed: "#E31837",
  appRed2: "#A90F2B",
  appMuted: "#A6A6B2",
  appLine: "#30303A",
  appGreen: "#32C98A",

  // Gradients
  heroGradient: "radial-gradient(circle at 85% 20%, #651126 0%, #220b13 35%, #101016 72%)",
  heroArtGradient: "linear-gradient(130deg, transparent, #5e1025aa)",
  carArtGradient: "linear-gradient(145deg, #292932, #101015)",
  detailHeroGradient: "linear-gradient(135deg, #33333e, #111)",
  phoneGradient: "linear-gradient(135deg, #30303a, #101016)",
} as const;

export const BrandTypography = {
  fontFamily: "'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', sans-serif",
  fontFamilyDisplay: "'Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'Segoe UI', sans-serif",

  // Scale
  xs: "11px",
  sm: "13px",
  base: "15px",
  lg: "17px",
  xl: "20px",
  "2xl": "25px",
  "3xl": "38px",
  "4xl": "48px",
  "5xl": "65px",
  "6xl": "95px",
  "7xl": "145px",

  // Weights
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,

  // Letter spacing
  tight: "-2.8px",
  tighter: "-1px",
  normalSpacing: "0",
  wide: "2.5px",
  wider: "4px",
} as const;

export const BrandSpacing = {
  xs: "4px",
  sm: "8px",
  md: "16px",
  lg: "24px",
  xl: "32px",
  "2xl": "48px",
  "3xl": "64px",
} as const;

export const BrandBorderRadius = {
  sm: "7px",
  md: "10px",
  lg: "12px",
  xl: "15px",
  "2xl": "16px",
  "3xl": "24px",
  full: "9999px",
} as const;

export const BrandShadows = {
  sm: "0 2px 8px rgba(0,0,0,0.3)",
  md: "0 8px 24px rgba(0,0,0,0.4)",
  lg: "0 20px 70px rgba(0,0,0,0.6)",
  xl: "0 0 70px rgba(0,0,0,0.8)",
  redGlow: "0 0 40px rgba(200, 16, 46, 0.4)",
  redGlowStrong: "0 0 80px rgba(200, 16, 46, 0.6)",
} as const;

export const BrandTransitions = {
  fast: "150ms cubic-bezier(0.4, 0, 0.2, 1)",
  normal: "300ms cubic-bezier(0.4, 0, 0.2, 1)",
  slow: "500ms cubic-bezier(0.4, 0, 0.2, 1)",
  cinematic: "800ms cubic-bezier(0.25, 0.1, 0.25, 1)",
} as const;

export const ZIndex = {
  base: 1,
  nav: 5,
  modal: 20,
  tabs: 5,
  overlay: 10,
} as const;

// Vehicle interface for type safety
export interface Vehicle {
  id: number;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  location: string;
  category: string;
  image: string;
  specs: string[];
  seller: string;
  verified: boolean;
  currentBid: number;
}

// Vehicle data matching the actual website/app
export const sampleVehicles: Vehicle[] = [
  {
    id: 1,
    make: "Porsche",
    model: "911 GT3 RS",
    year: 2024,
    price: 285000,
    mileage: 1200,
    location: "Stuttgart, Germany",
    category: "Supercar",
    image: "🏁",
    specs: ["4.0L Flat-6", "518 HP", "PDK", "AWD"],
    seller: "Porsche Zentrum Stuttgart",
    verified: true,
    currentBid: 285000,
  },
  {
    id: 2,
    make: "Ferrari",
    model: "296 GTB",
    year: 2024,
    price: 340000,
    mileage: 800,
    location: "Maranello, Italy",
    category: "Supercar",
    image: "🏎️",
    specs: ["3.0L V6 Hybrid", "819 HP", "8-Speed DCT", "RWD"],
    seller: "Ferrari Official Dealer",
    verified: true,
    currentBid: 340000,
  },
  {
    id: 3,
    make: "Lamborghini",
    model: "Huracán STO",
    year: 2023,
    price: 325000,
    mileage: 2100,
    location: "Sant'Agata, Italy",
    category: "Supercar",
    image: "🦬",
    specs: ["5.2L V10", "631 HP", "7-Speed LDF", "RWD"],
    seller: "Lamborghini Official",
    verified: true,
    currentBid: 325000,
  },
  {
    id: 4,
    make: "BMW",
    model: "M4 CSL",
    year: 2023,
    price: 145000,
    mileage: 3500,
    location: "Munich, Germany",
    category: "Performance",
    image: "🚗",
    specs: ["3.0L I6 Twin-Turbo", "543 HP", "8-Speed Auto", "RWD"],
    seller: "BMW M GmbH",
    verified: true,
    currentBid: 145000,
  },
  {
    id: 5,
    make: "Mercedes-AMG",
    model: "GT Black Series",
    year: 2022,
    price: 380000,
    mileage: 1800,
    location: "Affalterbach, Germany",
    category: "Hypercar",
    image: "⭐",
    specs: ["4.0L V8 Twin-Turbo", "720 HP", "7-Speed DCT", "RWD"],
    seller: "Mercedes-AMG Official",
    verified: true,
    currentBid: 380000,
  },
  {
    id: 6,
    make: "McLaren",
    model: "765LT",
    year: 2023,
    price: 365000,
    mileage: 900,
    location: "Woking, UK",
    category: "Hypercar",
    image: "🏎️",
    specs: ["4.0L V8 Twin-Turbo", "755 HP", "7-Speed SSG", "RWD"],
    seller: "McLaren Automotive",
    verified: true,
    currentBid: 365000,
  },
] as const;

export const categories = [
  { name: "Supercars", icon: "🏁", count: 24 },
  { name: "Hypercars", icon: "⚡", count: 8 },
  { name: "Performance", icon: "🚀", count: 42 },
  { name: "Classics", icon: "🏛️", count: 16 },
  { name: "JDM Legends", icon: "🗾", count: 19 },
  { name: "Electric", icon: "🔋", count: 11 },
] as const;

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
};

export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};

// Easing functions for cinematic animations
export const Easing = {
  // Standard easings
  easeOut: (t: number) => 1 - Math.pow(1 - t, 3),
  easeIn: (t: number) => t * t * t,
  easeInOut: (t: number) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,

  // Cinematic easings
  cinematic: (t: number) => t < 0.5
    ? 0.5 * Math.pow(2 * t, 3)
    : 1 - 0.5 * Math.pow(2 - 2 * t, 3),

  // Elastic
  elasticOut: (t: number) => {
    const c4 = (2 * Math.PI) / 3;
    return t === 0 ? 0 : t === 1 ? 1 : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
  },

  // Bounce
  bounceOut: (t: number) => {
    const n1 = 7.5625;
    const d1 = 2.75;
    if (t < 1 / d1) return n1 * t * t;
    if (t < 2 / d1) return n1 * (t -= 1.5 / d1) * t + 0.75;
    if (t < 2.5 / d1) return n1 * (t -= 2.25 / d1) * t + 0.9375;
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  },

  // Expo
  expoOut: (t: number) => t === 1 ? 1 : 1 - Math.pow(2, -10 * t),
  expoIn: (t: number) => t === 0 ? 0 : Math.pow(2, 10 * (t - 1)),

  // Circ
  circOut: (t: number) => Math.sqrt(1 - Math.pow(t - 1, 2)),

  // Back
  backOut: (t: number) => {
    const c1 = 1.70158;
    const c3 = c1 + 1;
    return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
  },
} as const;

// Animation utilities (renamed to avoid conflict with Remotion's interpolate)
export const lerp = (
  value: number,
  inputRange: [number, number],
  outputRange: [number, number],
  easing: (t: number) => number = Easing.easeOut
): number => {
  const [inputMin, inputMax] = inputRange;
  const [outputMin, outputMax] = outputRange;
  const t = Math.max(0, Math.min(1, (value - inputMin) / (inputMax - inputMin)));
  const easedT = easing(t);
  return outputMin + (outputMax - outputMin) * easedT;
};

export const lerpColor = (
  value: number,
  inputRange: [number, number],
  colorA: string,
  colorB: string,
  easing: (t: number) => number = Easing.easeOut
): string => {
  const t = Math.max(0, Math.min(1, (value - inputRange[0]) / (inputRange[1] - inputRange[0])));
  const easedT = easing(t);

  // Simple hex color interpolation
  const hexToRgb = (hex: string) => {
    const clean = hex.replace("#", "");
    const bigint = parseInt(clean, 16);
    return {
      r: (bigint >> 16) & 255,
      g: (bigint >> 8) & 255,
      b: bigint & 255,
    };
  };

  const rgbToHex = (r: number, g: number, b: number) => {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
  };

  const a = hexToRgb(colorA);
  const b = hexToRgb(colorB);

  return rgbToHex(
    Math.round(a.r + (b.r - a.r) * easedT),
    Math.round(a.g + (b.g - a.g) * easedT),
    Math.round(a.b + (b.b - a.b) * easedT)
  );
};