export const BRAND = {
  name: "The Garage Flip",
  legalName: "The Garage Flip LLC",
  phone: "(407) 735-6450",
  phoneTel: "+14077356450",
  phoneSms: "+14077356450",
  email: "hello@thegarageflip.com",
  address: "Orlando, FL",
  url: "https://thegarageflip.com",
  founder: "Lucas Vandenberg",
};

export const C = {
  // Showroom palette
  bg: "#FBFAF7",
  canvas: "#FFFFFF",
  band: "#F4F1EB",
  text: "#0E0E10",
  textMuted: "#5A5A60",
  textLight: "#8A8A92",
  border: "#E5E1D8",
  borderSoft: "#EFECE4",
  accent: "#F26B1F",
  accentDark: "#D4530A",
  dark: "#0E0E10",
  darkSoft: "#17171B",
  white: "#FFFFFF",
};

export const FONT_DISPLAY = `'Space Grotesk', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif`;
export const FONT_BODY = `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif`;

export const GRADIENT_ORANGE = `linear-gradient(135deg, ${C.accent} 0%, ${C.accentDark} 100%)`;
export const SHADOW_ORANGE = `0 8px 28px rgba(242,107,31,0.32)`;

export const FLAGS = {
  licenseBound: process.env.NEXT_PUBLIC_LICENSE_BOUND === "true",
  insuranceBound: process.env.NEXT_PUBLIC_INSURANCE_BOUND === "true",
};
