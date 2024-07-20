"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { HiPlus, HiMinus } from "react-icons/hi"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { useState, useEffect, useContext } from "react"
import { CartContext } from "@/app/cartContext"
export default function ItemList() {
  const { cart, removeFromCart, increaseQuantity, decreaseQuantity } = useContext(CartContext)
  const [total, setTotal] = useState(0)
  useEffect(() => {
    const newTotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0)
    setTotal(newTotal)
  }, [cart])
  function handleRemove(id) {
    removeFromCart(id)
  }
  function increase(id) {
    increaseQuantity(id)
  }
  function decrease(id) {
    decreaseQuantity(id)
  }
  return (
    <div className="">
      <div className="grid gap-8 ">
        {cart.map((item) => (
          <div key={item._id} className="grid grid-cols-[120px_1fr] items-center gap-6">
            <Image
              src={item?.thumbnail?.picture_url}
              alt={item.title}
              width={120}
              height={120}
              className="rounded-lg object-cover " />
            <div className="flex flex-wrap justify-between gap-2 ">
              <div className="flex flex-col items-center justify-between">
                <h3 className="font-semibold">{item.title}</h3>

                <div className="flex items-center gap-2">
                  <Button variant="outline" onClick={() => decrease(item._id)}><HiMinus /></Button>
                  <Label htmlFor={`quantity-${item._id}`}>{` ${item.quantity}`}</Label>
                  <Button variant="outline" onClick={() => increase(item._id)}><HiPlus /></Button>
                </div>
              </div>
              <div className="flex items-center gap-4">

                <div className="flex  items-center gap-2">
                  <span className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                  <Button size="icon" variant="ghost" onClick={() => handleRemove(item._id)}>
                    <TrashIcon className="h-5 w-5" />
                    <span className="sr-only">Remove {item.title}</span>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <Separator className="my-8" />
      <div className="flex justify-center items-center ">
        <div className="text-lg font-semibold">
          Total: <span className="text-4xl">${total.toFixed(2)}</span>
        </div>
      </div>
    </div>
  )
}

function TrashIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
    </svg>)
  );
}
