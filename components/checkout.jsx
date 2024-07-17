"use client"
import { HiPlus, HiMinus } from "react-icons/hi"
import Image from "next/image"
import { useContext } from "react"
import { CartContext } from "@/app/cartContext"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ShippingForm } from "@/components/shipping-form"
import Link from "next/link"

export function Checkout() {
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
    (<div className="container mx-auto px-4 md:px-6 py-6 ">
      <h1 className="text-3xl font-bold text-center mb-4">Your Cart</h1>
      <Separator />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="">
          {cart.length > 0 ? (
            <div className="">
              <div className="grid gap-8 ">
                {cart.map((item) => (
                  <div key={item._id} className="grid grid-cols-[120px_1fr] items-center gap-6">
                    <Image
                      src={item?.thumbnail?.picture_url}
                      alt={item.title}
                      width={120}
                      height={120}
                      className="rounded-lg object-cover" />
                    <div className="grid gap-2">
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold">{item.title}</h3>
                        <div className="flex items-center gap-2">
                          <span className="text-lg font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                          <Button size="icon" variant="ghost" onClick={() => handleRemove(item._id)}>
                            <TrashIcon className="h-5 w-5" />
                            <span className="sr-only">Remove {item.title}</span>
                          </Button>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button variant="outline" onClick={() => decrease(item._id)}><HiMinus /></Button>

                          <Label htmlFor={`quantity-${item._id}`}>Qty:{` ${item.quantity}`}</Label>
                          <Button variant="outline" onClick={() => increase(item._id)}><HiPlus /></Button>
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
            </div>)
            :
            (<div className="flex justify-center items-center h-full">
              <div className="text-2xl text-center font-semibold ">
                <p>
                  Your cart is empty
                </p>
                <Link href="/shop" className="bg-orange-600 text-white rounded-lg hover:bg-orange-700 px-4 py-2 mt-4 block">Start shopping</Link>
              </div>
            </div>)
          }
        </div>
        <div>
          <ShippingForm />
        </div>
      </div>
    </div >)

  );
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
