"use client"
import { SheetClose } from "@/components/ui/sheet"
import { usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"
import { Package2, House, ShoppingBag, UserRoundSearch, Contact } from "lucide-react"

export default function NavLinksMobile() {
  const pathname = usePathname();
  return (
    <nav className="grid gap-6 text-lg font-medium">
      <SheetClose asChild>
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Shopwave</span>
          <p className="text-2xl">Shop
            <span className="text-orange-500">wave</span>
          </p>
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link
          href="/"
          className={clsx("flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground", {
            "text-orange-500": pathname === "/",
          })}
        >
          <House className="h-6 w-6" />
          Home
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link
          href="/shop"
          className={clsx("flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground", {
            "text-orange-500": pathname === "/shop",
          })}
        >
          <ShoppingBag className="h-6 w-6" />
          Shop
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link
          href="/about"
          className={clsx("flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground", {
            "text-orange-500": pathname === "/about",
          })}
        >
          <UserRoundSearch className="h-6 w-6" />
          About
        </Link>
      </SheetClose>
      <SheetClose asChild>
        <Link
          href="/contact"
          className={clsx("flex items-center gap-2 text-muted-foreground transition-colors hover:text-foreground", {
            "text-orange-500": pathname === "/contact",
          })}
        >
          <Contact className="h-6 w-6" />
          Contact
        </Link>
      </SheetClose>
    </nav>
  )
}
