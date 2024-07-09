"use client"
import { useTransition, useContext } from "react"
import { useRouter } from "next/navigation"
import { CartContext } from "@/app/cartContext"
import { addOrder } from "@/lib/actions"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"

export function ShippingForm() {
  const { toast } = useToast()
  const router = useRouter()
  const { cart } = useContext(CartContext)
  const [isPending, startTransition] = useTransition()

  async function handleSubmit(formData) {
    const data = Object.fromEntries(formData)
    console.log(data)
    startTransition(async () => {
      const products = cart.map((item) => { return { _id: item._id, quantity: item.quantity } })
      const addOrderWithProducts = addOrder.bind(null, products)
      const result = await addOrderWithProducts(formData)
      if (result.error) {
        toast(
          {
            title: "Error",
            description: result.error,
            variant: "destructive"
          })
      }
      else {
        toast(
          {
            title: "Success",
            description: "Order placed successfully",
            variant: "success",
            className: "bg-green-600 text-white"
          })
        // TODO: mayber redirect to orders page
        router.push("/shop")
      }

    })
  }
  return (
    <form action={handleSubmit}>
      <Card className="max-w-xl mx-auto ">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Checkout</CardTitle>
          <CardDescription>Please enter your information to complete your order.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" name="email" placeholder="john@example.com" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Address</Label>
                <Textarea id="address" name="address" rows={3} placeholder="123 Main St, Anytown USA" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" placeholder="(123) 456-7890" required />
              </div>
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-end">
          <Button type="submit" disabled={isPending || cart.length === 0}>Place Order</Button>
        </CardFooter>
      </Card>
    </form>
  )
    ;
}
