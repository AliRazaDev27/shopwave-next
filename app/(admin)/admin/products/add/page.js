"use client"
import { useRouter } from "next/navigation"
import { useState, useTransition, useEffect } from "react"
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
import { addProduct } from "@/lib/actions"
import { getCategories } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"
const initalState = {
  message: "",
}
export default function Page() {
  const { toast } = useToast()
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const [categories, setCategories] = useState([])
  console.log(categories)
  async function handleSumbit(formData) {
    startTransition(async () => {
      const result = await addProduct(formData)
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
          description: "Product Created",
          variant: "success",
          className: "bg-green-600 text-white",
          duration: 2000,
        })
        setTimeout(() => {
          router.push("/admin/products")
        }, 500)
      }
    })
  }

  useEffect(() => {
    async function fetchCategories() {
      const data = await getCategories()
      setCategories(data)
    }
    fetchCategories()
  }, [])
  return (
    <div>
      <form action={handleSumbit} encType="multipart/form-data">
        <Card className="mx-auto w-full">
          <CardHeader>
            <CardTitle className="text-xl">Create New Product</CardTitle>
            <CardDescription>
              Enter product information to create a product.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Product Title</Label>
                <Input
                  id="title"
                  name="title"
                  placeholder="Product Title"
                  required />
              </div>

              <div className="grid grid-cols-2 gap-2 items-center">
                <div>
                  <Label htmlFor="category">Category</Label>
                  <Select id="category" required name="category">
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
                    placeholder="Product Price"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Description</Label>
                <Textarea
                  name="description"
                  placeholder="Type your message here." />
              </div>
              <div>
                <Input
                  id="price"
                  type="file"
                  placeholder="Product Price"
                  name="image"
                  required
                />
              </div>
              <div className="flex justify-center">
                <Button type="sumbit" className="w-max" disabled={isPending}>
                  {isPending ? "Saving..." : "Create Product"}
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
