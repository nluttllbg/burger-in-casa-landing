import type { Metadata, Viewport } from "next";
import { Anton, Pacifico, Poppins } from "next/font/google";
import SmoothScroll from "@/components/animations/SmoothScroll";
import { site } from "@/content/site";
import "./globals.css";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-poppins", display: "swap" });
const pacifico = Pacifico({ subsets: ["latin"], weight: "400", variable: "--font-pacifico", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://nluttllbg.github.io"),
  title: site.fullName,
  description: site.tagline,
  icons: { icon: "/burger-in-casa-landing/images/logo-burger-in-casa.jpg" },
  openGraph: { title: site.fullName, description: site.tagline, images: ["/burger-in-casa-landing/images/hero-defumado-burger.webp"] },
};
export const viewport: Viewport = { themeColor: "#581010", width: "device-width", initialScale: 1 };

// Marca <html> antes da pintura quando o usuário permite movimento → evita flash do intro.
const motionScript = `try{if(window.matchMedia('(prefers-reduced-motion: no-preference)').matches)document.documentElement.classList.add('motion-ok')}catch(e){}`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${anton.variable} ${poppins.variable} ${pacifico.variable}`} suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: motionScript }} /></head>
      <body>
        <SmoothScroll>{children}</SmoothScroll>
      </body>
    </html>
  );
}
