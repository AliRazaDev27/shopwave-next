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
import { connectDB } from "@/lib/db"
import users from "@/lib/models/userModel"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export default function Page() {
  async function handleSubmit(formData) {
    "use server"
    const db = await connectDB()
    console.log(formData)

  }
  return (
    <div>
      <form action={handleSubmit} encType="multipart/form-data">
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
                  <Label htmlFor="categories">Category</Label>
                  {/* <Select id="categories" required> */}
                  {/*   <SelectTrigger className=""> */}
                  {/*     <SelectValue placeholder="Select a Category" /> */}
                  {/*   </SelectTrigger> */}
                  {/*   <SelectContent> */}
                  {/*     <SelectGroup> */}
                  {/*       <SelectLabel>Categories</SelectLabel> */}
                  {/*       {categories && categories.map((category) => ( */}
                  {/*         <SelectItem key={category._id} value={category._id}> {category.name}</SelectItem> */}
                  {/*       ))} */}
                  {/*     </SelectGroup> */}
                  {/*   </SelectContent> */}
                  {/* </Select> */}
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
                <Button type="sumbit" className="w-max">
                  Create  Product
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}
