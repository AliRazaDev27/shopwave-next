import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster"
import { CartProvider } from "@/app/cartContext";
import { Providers } from "./providers";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Toaster />
        <CartProvider>
          <Providers>
            <main>{children}</main>
          </Providers>
        </CartProvider>
      </body>
    </html>
  );
}
