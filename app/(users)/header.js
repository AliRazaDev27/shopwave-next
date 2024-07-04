"use client";
import { usePathname } from "next/navigation"
import clsx from "clsx"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link"
import { CircleUser, Menu, Package2, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export function Header() {
  const pathname = usePathname();
  // FIX: change to user data
  const user = null
  return (
    <header className="sticky top-0 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <nav className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="#"
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
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            <Link
              href="#"
              className="flex items-center gap-2 text-lg font-semibold"
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
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <form className="ml-auto flex-1 sm:flex-initial">
          <div className="relative rounded-full outline outline-1 outline-offset-2 w-8 h-8 flex justify-center items-center">
            <Popover>
              <PopoverTrigger>
                <MdOutlineShoppingCart />
              </PopoverTrigger>
              <PopoverContent>Place content for the popover here.
                <Link href="/cart" className="block mt-2 border bg-orange-500 p-2 text-white">Cart</Link>
              </PopoverContent>
            </Popover>
          </div>
        </form>
        <div>
          {user == null ?

            <div className="flex gap-2">
              <Button><Link href="/login">Login</Link></Button>
              <Button><Link href="/register">Register</Link></Button>
            </div> :
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full">
                    <CircleUser className="h-5 w-5" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>{user.role === 1 ? <Link href="/admin">Dashboard</Link> : <Link to="/profile">Profile</Link>}</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem><Button onClick={() => handleLogout()}>Logout</Button></DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          }</div>
      </div >
    </header >
  )
}
