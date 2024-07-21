"use client"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { MdOutlineShoppingCart } from "react-icons/md";
import Link from "next/link"
import { CartContext } from "../cartContext";
import { useContext } from "react"

export default function CartPopover() {
  const { cart } = useContext(CartContext)
  const length = cart?.length
  return (
    <Popover>
      <PopoverTrigger className="bg-orange-500 hover:bg-orange-600 p-2 rounded-full">
        <MdOutlineShoppingCart className="size-6 text-white" />
      </PopoverTrigger>
      <PopoverContent>
        <div>
          You have <span className="text-orange-500 font-bold">{length}</span> items in your cart
        </div>
        <Link href="/cart" className="block mt-2 border bg-orange-500 p-2 text-white font-bold text-center">Visit Cart</Link>
      </PopoverContent>
    </Popover>
  )
}
