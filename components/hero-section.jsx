import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    (<section
      className="w-full h-[90vh] flex items-center justify-center bg-gradient-to-r from-neutral-700 to-neutral-400">
      <div className="container px-4 md:px-6 text-center">
        <div className="space-y-4 text-primary-foreground">
          <h1
            className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tighter typewriter">
            Shop Smart, Shop Easy, <span className="text-black">Shop<span className="text-orange-500">wave</span></span>
          </h1>
          <p className="mx-auto max-w-[700px] text-lg md:text-xl typewriter delay-200">
            Discover High-Quality Branded Products.
            Wave Goodbye to High Prices.          </p>
          <span className="block text-lg md:text-xl font-semibold">Welcome to

            <span className="text-black ps-2">
              Shop
              <span className="text-orange-500">wave</span>
            </span>
          </span>
          <div className="flex justify-center gap-4 typewriter delay-400">
            <Link href="/register" className={buttonVariants()}>Get Started</Link>
            <Link href="/shop" className={buttonVariants({ variant: "secondary" })}>Explore</Link>
          </div>
        </div>
      </div>
    </section>)
  );
}
