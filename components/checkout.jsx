"use client"
import Link from "next/link"
import { Suspense, useContext, useEffect, useState } from "react"
import { CartContext } from "@/app/cartContext"
import { Separator } from "@/components/ui/separator"
import { ShippingForm } from "@/components/shipping-form"
import ItemList from "./item-list"

export function Checkout() {
  const { cart } = useContext(CartContext)
  console.log(cart)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    if (cart) {
      setMounted(true)
    }
  }, [cart])
  return (
    <div className="container mx-auto px-4 md:px-6 py-6 ">
      <h1 className="text-3xl font-bold text-center mb-4">Your Cart</h1>
      <Separator />
      {mounted === false ? <div></div> :
        <div>
          {cart.length === 0 ? (
            <div className="flex flex-col gap-4 justify-center items-center h-[50vh]">
              <p className="text-xl text-semibold md:text-3xl text-center">
                Your cart is empty!
              </p>
              <Link href="/shop" className="bg-orange-600 text-white rounded-lg hover:bg-orange-700 px-4 py-2 mt-4 block">Start shopping</Link>
            </div>
          ) :
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="">
                <Suspense fallback={<div>Loading...</div>}>
                  <ItemList />
                </Suspense>
              </div>
              <div>
                <Suspense fallback={<div>Loading...</div>}>
                  <ShippingForm />
                </Suspense>
              </div>
            </div>
          }
        </div>
      }
    </div >
  );
}
