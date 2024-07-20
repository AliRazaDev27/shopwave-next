"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"
import { CircleUser, Menu, Package2, Search } from "lucide-react"
export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden  flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
      <Link
        href="/"
        className="flex items-center gap-2 text-lg font-semibold md:text-base"
      >
        <Package2 className="h-6 w-6" />
        <span className="sr-only">Shopwave</span>
        <p className="text-2xl">Shop
          <span className="text-orange-500">wave</span>
        </p>

      </Link>
      <Link
        href="/"
        className={clsx("text-muted-foreground transition-colors hover:text-foreground", {
          "text-orange-500": pathname === "/",
        })}
      >
        Home
      </Link>
      <Link
        href="/shop"
        className={clsx("text-muted-foreground transition-colors hover:text-foreground", {
          "text-orange-500": pathname === "/shop",
        })}
      >
        Shop
      </Link>
      <Link
        href="/about"
        className={clsx("text-muted-foreground transition-colors hover:text-foreground", {
          "text-orange-500": pathname === "/about",
        })}
      >
        About
      </Link>
      <Link
        href="/contact"
        className={clsx("text-muted-foreground transition-colors hover:text-foreground", {
          "text-orange-500": pathname === "/contact",
        })}
      >
        Contact
      </Link>
    </nav>
  )
}
