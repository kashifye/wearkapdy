import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "@fontsource/rozha-one/devanagari-400.css";
import "@fontsource/rozha-one/latin-400.css";
import "./globals.css";
import { BagProvider } from "@/lib/bag";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.wearkapde.com"),
  title: { default: "WearKapde (कपड़े)", template: "%s · WearKapde" },
  description: "Indian streetwear, printed only after you order. Drop 01: Sardi.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={GeistSans.variable}>
      <body>
        <BagProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </BagProvider>
      </body>
    </html>
  );
}
