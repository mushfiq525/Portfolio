import type { Metadata, Viewport } from "next";
import { Space_Grotesk, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { profile } from "@/content/profile";
import Cursor from "@/components/Cursor";
import "./globals.css";

/* Display: technical but with real character in the terminals of a/g/k. */
const displayFace = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display-face",
  display: "swap",
});

/* Body: Plex was designed for technical products and holds up at small sizes. */
const bodyFace = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-body-face",
  display: "swap",
});

/* Utility: labels, tags, stats — the detection-overlay register. */
const monoFace = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono-face",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Mushfiqur Rahman",
  description: profile.summary,
  authors: [{ name: profile.name }],
  openGraph: {
    title: "Mushfiqur Rahman",
    description: profile.summary,
    type: "profile",
  },
};

export const viewport: Viewport = {
  // Dark is the default theme, so the browser chrome starts there. useTheme
  // rewrites this tag when the visitor toggles.
  themeColor: "#0a121c",
};

/**
 * Dark ships in the server-rendered markup, so it's the theme even if this
 * script never runs. All this does is take it away again for a returning
 * visitor who chose light — before first paint, since a React effect is too
 * late and would flash.
 */
const themeBootstrap = `
(function () {
  try {
    if (localStorage.getItem("theme") === "light") {
      document.documentElement.classList.remove("dark");
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`dark ${displayFace.variable} ${bodyFace.variable} ${monoFace.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeBootstrap }} />
      </head>
      <body>
        {children}
        {/* Last in the body: it sits above everything and renders nothing on
            touch devices. */}
        <Cursor />
      </body>
    </html>
  );
}
