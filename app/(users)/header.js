import { auth, signOut } from "@/auth"
import NavLinks from "./navlinks";
import NavLinksMobile from "./navlinks.mobile.js"
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
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

export async function Header() {
  // FIX: change to user data
  const session = await auth()
  const user = session?.user
  return (
    <header className=" sticky top-0 flex h-16 items-center gap-4 border border-red-600 bg-background px-4 md:px-6">
      <NavLinks />
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
        <SheetContent side="left">
          <NavLinksMobile />
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
