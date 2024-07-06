import Image from "next/image"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MoreHorizontal } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Link from "next/link"
import { getProducts } from "@/lib/actions"
import { dateFormat } from "@/lib/format"

export default async function Page() {
  const products = await getProducts()
  return <div className="border border-red-600">
    <div className="flex justify-between items-center">
      <h2 className="text-xl font-semibold md:text-2xl">Products</h2>
      <Link href="/admin/products/add"><Button>Add Product</Button></Link>
    </div>
    <div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Sr.</TableHead>
            <TableHead className="w-[100px] sm:table-cell">
              Image
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="hidden md:table-cell">Price</TableHead>
            <TableHead className="hidden md:table-cell">
              Created By
            </TableHead>
            <TableHead className="hidden md:table-cell">Created at</TableHead>
            <TableHead>
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products && products.map((product, index) => (
            <TableRow key={index}>
              <TableCell>{products.indexOf(product) + 1}</TableCell>
              <TableCell className="hidden sm:table-cell">
                <Image
                  alt="Product image"
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={product?.picture?.picture_url}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">
                {product?.title}
              </TableCell>
              <TableCell>
                {product?.category?.name}
              </TableCell>
              <TableCell className="hidden md:table-cell">${product?.price}</TableCell>
              <TableCell className="hidden md:table-cell">{product?.user?.name}</TableCell>
              <TableCell className="hidden md:table-cell">
                {dateFormat(product.createdAt)}
              </TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Link href={`/admin/products/edit/${product._id.toString()}`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem><button type="button">Delete</button></DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  </div >;
}
