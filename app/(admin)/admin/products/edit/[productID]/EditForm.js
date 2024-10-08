"use client"
// import { ProductType } from "@/lib/types/types_product"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import Image from "next/image"
import { useState, useTransition } from "react"
import { updateProduct } from "@/lib/actions"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export default function EditForm({ _currentProduct, _categories }) {
  const { toast } = useToast()
  const router = useRouter()
  const currentProduct = JSON.parse(_currentProduct)
  const categories = JSON.parse(_categories)
  const updateProductWithID = updateProduct.bind(null, currentProduct._id)
  const [isPending, startTransition] = useTransition()
  async function handleSubmit(formData) {
    startTransition(async () => {
      const result = await updateProductWithID(formData)
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
          duration: 2000,
        })
      }
      if (result.ok) {
        toast({
          title: "Success",
          description: "Product Updated",
          variant: "success",
          className: "bg-green-600 text-white",
          duration: 2000,
        })
        router.push("/admin/products")

      }
    })

  }
  return (
    <div>
      <form action={handleSubmit}>
        <Card className="mx-auto w-full">
          <CardHeader>
            <CardTitle className="text-xl">Edit Product</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Product Title</Label>
                <Input id="title" name="title" defaultValue={currentProduct?.title} required />
              </div>

              <div className="grid grid-cols-2 gap-2 items-center">
                <div>
                  <Label htmlFor="categories">Category</Label>
                  <Select id="categories" required name="category" defaultValue={currentProduct?.category?._id}>
                    <SelectTrigger className="">
                      <SelectValue placeholder="Select a Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        {categories && categories.map((category) => (
                          <SelectItem key={category._id} value={category._id}> {category.name}</SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid gap-2 ">
                  <Label htmlFor="price">Price</Label>
                  <Input
                    id="price"
                    type="number"
                    name="price"
                    defaultValue={currentProduct?.price}
                    required
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 items-center">
<div className="grid gap-2 ">
                  <Label htmlFor="stock">Stock</Label>
                  <Input
                    id="stock"
                    type="number"
                    name="stock"
                    defaultValue={currentProduct?.stock}
                    required
                  />
                </div>
                <div className="grid gap-2 ">
                  <Label htmlFor="discount">Discount</Label>
                  <Input
                    id="discount"
                    type="number"
                    name="discount"
                    defaultValue={currentProduct?.discountPercentage}
                    required
                  />
                </div>

            </div>

            <div className="grid grid-cols-2 gap-2 items-center">
<div className="grid gap-2 ">
                  <Label htmlFor="warranty">Warranty</Label>
                  <Input
                    id="warranty"
                    type="text"
                    name="warranty"
                    defaultValue={currentProduct?.warrantyInformation}
                    required
                  />
                </div>
                <div className="grid gap-2 ">
                  <Label htmlFor="shipping">Shipping</Label>
                  <Input
                    id="shipping"
                    type="text"
                    name="shipping"
                    defaultValue={currentProduct?.shippingInformation}
                    required
                  />
                </div>

            </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Description</Label>
                <Textarea name="description"
                  defaultValue={currentProduct?.description} />
              </div>
              <div className="flex gap-2">
                <div className="w-32">
                  <Image width={200} height={200} src={currentProduct?.picture?.picture_url} alt="picture" />
                </div>
                <div className='self-end'>
                  <Input
                    id="image"
                    type="file"
                    placeholder="Product Image"
                    name="image"
                  />
                </div>
              </div>
              <div className="flex justify-center">
                <Button type="sumbit" disabled={isPending} className="w-max">
                  Edit  Product
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>

    </div>
  )
}
