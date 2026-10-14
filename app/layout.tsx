import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import { CartProvider } from "@/components/CartProvider";
import IntroSplash from "@/components/IntroSplash";
import "./globals.css";

export const metadata: Metadata = {
  title: "Amazon Rebuild",
  description: "A modern storefront inspired by Amazon",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head><script dangerouslySetInnerHTML={{ __html: "try{if(sessionStorage.getItem('hasSeenSplash')==='true')document.documentElement.dataset.hasSeenSplash='true'}catch{}" }} /></head>
      <body>
        <CartProvider>
          <IntroSplash />
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
