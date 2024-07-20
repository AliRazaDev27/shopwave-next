import "./globals.css";
import { Inter } from "next/font/google";
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/app/cartContext";
import { Providers } from "./providers";
import { WebVitals } from "@/components/web-vitals";
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"

const inter = Inter({ subsets: ["latin"] });

const googleTag = "google-site-verification"
export const metadata = {
  title: "Shopwave",
  description: "Explore the world of fashion with Shopwave",
  other: {
    [googleTag]: "fZt54edCU_eXLoHZax2lsB3yFYmxZYK0ndkdmQaNmw0",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Toaster />
        <CartProvider>
          <Providers>
            <WebVitals />
            <main>{children}</main>
            <Analytics />
            <SpeedInsights />
          </Providers>
        </CartProvider>
      </body>
    </html>
  );
}
