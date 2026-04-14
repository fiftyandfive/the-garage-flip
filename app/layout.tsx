import type { Metadata, Viewport } from "next";
import Script from "next/script";
import { BRAND } from "@/lib/brand";
import { localBusinessSchema } from "@/lib/schema";
import { JsonLd } from "@/components/JsonLd";
import "./globals.css";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID || "G-RY0HBH06LR";
const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN || "";
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || "";
const GBP_VERIFICATION = process.env.NEXT_PUBLIC_GBP_VERIFICATION || "";

export const viewport: Viewport = {
  themeColor: "#0E0E10",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(BRAND.url),
  title: {
    default: "Garage Cleanout Orlando | The Garage Flip",
    template: "%s | The Garage Flip",
  },
  description:
    "Same-week garage cleanouts in Orlando. Fixed quote in writing, free haul-away, donation receipts. Text (407) 735-6450 for fastest response.",
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
  robots: { index: true, follow: true, "max-image-preview": "large", "max-snippet": -1 },
  openGraph: {
    type: "website",
    url: BRAND.url,
    siteName: BRAND.name,
    title: "Garage Cleanout Orlando | The Garage Flip",
    description:
      "From cluttered chaos to clean, functional space. Fixed quote, same-week scheduling.",
    images: [{ url: "/logo.png", width: 1200, height: 630 }],
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Garage Cleanout Orlando | The Garage Flip",
    description: "Same-week garage cleanouts in Orlando. Fixed quote. Free haul-away.",
    images: ["/logo.png"],
  },
  other: {
    "geo.region": "US-FL",
    "geo.placename": "Orlando",
    "geo.position": "28.5383;-81.3792",
    ICBM: "28.5383, -81.3792",
    ...(GBP_VERIFICATION ? { "google-site-verification": GBP_VERIFICATION } : {}),
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600;700;800&display=swap"
        />
        <link rel="canonical" href={BRAND.url} />
        <JsonLd data={localBusinessSchema()} />
      </head>
      <body>
        {children}

        {/* Google Analytics */}
        {GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              window.gtag = gtag;
              gtag('js', new Date());
              gtag('config', '${GA_ID}');
            `}</Script>
          </>
        ) : null}

        {/* Plausible */}
        {PLAUSIBLE_DOMAIN ? (
          <>
            <Script
              src="https://plausible.io/js/script.tagged-events.js"
              data-domain={PLAUSIBLE_DOMAIN}
              strategy="afterInteractive"
            />
            <Script id="plausible-init" strategy="afterInteractive">{`
              window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) };
            `}</Script>
          </>
        ) : null}

        {/* Meta Pixel */}
        {META_PIXEL_ID ? (
          <Script id="meta-pixel" strategy="afterInteractive">{`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init','${META_PIXEL_ID}');fbq('track','PageView');
          `}</Script>
        ) : null}
      </body>
    </html>
  );
}
