import { auth, signOut } from "@/auth"
import { buttonVariants } from "@/components/ui/button";
import CartPopover from "./cartPopover";
import NavLinks from "./navlinks";
import NavLinksMobile from "./navlinks.mobile.js"
import Link from "next/link"
import { CircleUser, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger, SheetClose, SheetHeader, SheetTitle, SheetDescription } from "@/components/ui/sheet"
import ThemeSwitch from "@/components/ThemeSwitch";
import { Suspense } from "react"

export async function Header() {
  // FIX: change to user data
  const session = await auth()
  const user = session?.user
  return (
    <header className=" sticky w-full   top-0 flex h-16 items-center gap-4 bg-background px-2 md:px-6 divide-x">
      <Suspense fallback={null}>
        <NavLinks />
      </Suspense>
      <Sheet className="bg-orange-500">
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
        <SheetContent side="left" className="w-[250px]" >
          <SheetHeader className="hidden">
            <SheetTitle>Shopwave</SheetTitle>
            <SheetDescription>
              Browse our collection of products and find the perfect fit.
            </SheetDescription>
          </SheetHeader>
          <Suspense fallback={null}>
            <NavLinksMobile />
          </Suspense>
        </SheetContent>
      </Sheet>
      <div className="flex w-full justify-end items-center gap-4 md:ml-auto md:gap-2 lg:gap-4">
        <div className="size-10  flex justify-center items-center  rounded-full bg-orange-500 text-2xl ">
          <ThemeSwitch />
        </div>
        {user &&
          <div className="w-8 h-8 flex justify-center items-center">
            <CartPopover />
          </div>
        }
        <div>
          {!user ?

            <div className="flex gap-2">
              <Link className={buttonVariants()} href="/login">Login</Link>
              <Link className={buttonVariants()} href="/register">Register</Link>
            </div> :
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="secondary" size="icon" className="rounded-full bg-blue-600 hover:bg-blue-700">
                    <CircleUser className="h-5 w-5 text-white" />
                    <span className="sr-only">Toggle user menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>{user.role === 1 ? <Link href="/admin">Dashboard</Link> : <Link href="/profile">Profile</Link>}</DropdownMenuItem>
                  <DropdownMenuItem>Support</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <form action={async () => {
                      "use server"
                      await signOut()
                    }}>
                      <Button type="submit">Logout</Button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          }</div>
      </div >
    </header >
  )
}
