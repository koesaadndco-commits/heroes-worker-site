import type { Metadata, Viewport } from "next";
import { Noto_Sans_JP, Oswald } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

const noto = Noto_Sans_JP({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-noto",
  display: "swap",
});
const oswald = Oswald({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-oswald",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name}｜溶接・金属加工`,
    template: `%s｜${site.name}`,
  },
  description: site.description,
  icons: { icon: "/logo.png" },
  openGraph: {
    title: `${site.name}｜溶接・金属加工`,
    description: site.description,
    images: ["/logo.png"],
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" className={`${noto.variable} ${oswald.variable}`}>
      <body>{children}</body>
    </html>
  );
}
