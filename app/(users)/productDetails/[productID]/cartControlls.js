"use client"
import { useRouter } from "next/navigation"
import { useState, useEffect, useContext } from "react"
import { CartContext } from "@/app/cartContext"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
export function CartControlls({ product }) {
  const { toast } = useToast()
  const router = useRouter()
  const { addToCart } = useContext(CartContext)
  const [quantity, setQuantity] = useState(1)
  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  const handleSubmit = () => {
    let _product = JSON.parse(product)
    _product.quantity = quantity
    addToCart(_product)
    toast({
      title: "Added to cart",
      description: "Product added to cart successfully",
      variant: "success",
      className: "bg-green-600 text-white"
    })
    router.push("/cart")
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-evenly   rounded-2xl py-1">
        <Button
          variant="outline"
          size="sm"
          className="px-2 py-1 text-3xl bg-neutral-300 hover:bg-neutral-400"
          onClick={handleDecrement}>
          -
        </Button>
        <div className="text-2xl font-bold">{quantity}</div>
        <Button
          variant="outline"
          size="sm"
          className="px-2 py-1 text-3xl bg-neutral-300 hover:bg-neutral-400"
          onClick={handleIncrement}>
          +
        </Button>
      </div>
      <Button size="lg" className="w-full bg-gradient-to-b from-orange-700 to-orange-500 hover:bg-gradient-to-t transition duration-1000 text-white" type="button" onClick={() => handleSubmit()}>
        Add to Cart
      </Button>
    </div>
  )
}
