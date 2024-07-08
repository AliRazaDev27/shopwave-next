"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
export function CartControlls({ productID }) {
  const [quantity, setQuantity] = useState(1)
  const handleIncrement = () => {
    setQuantity(quantity + 1)
  }
  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1)
    }
  }
  const handleSubmit = (product, quantity) => {
    product.quantity = quantity
    navigate("/cart")
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
      <Button size="lg" className="w-full" type="button">
        Add to Cart
      </Button>
    </div>
  )
}
