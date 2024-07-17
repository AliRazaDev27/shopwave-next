"use client"
import { FaCirclePlus, FaCircleMinus } from "react-icons/fa6";
import { useRouter } from "next/navigation"
import { useState, useContext } from "react"
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
          variant="ghost"
          size="sm"
          onClick={handleDecrement}>
          <FaCircleMinus className="text-3xl  dark:text-white" />
        </Button>
        <div className="text-2xl font-bold">{quantity}</div>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleIncrement}>
          <FaCirclePlus className="text-3xl  dark:text-white" />
        </Button>
      </div>
      <Button size="lg" className="w-full bg-gradient-to-b from-orange-700 to-orange-500 hover:bg-gradient-to-t transition duration-1000 text-white" type="button" onClick={() => handleSubmit()}>
        Add to Cart
      </Button>
    </div>
  )
}
