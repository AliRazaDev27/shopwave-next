import { buttonVariants } from "@/components/ui/button"
import PaginationControll from "@/components/pagination"
import Image from "next/image"
import DeleteButton from "./deleteButton"
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
import { getProductsByQuery } from "@/lib/actions"
import { dateFormat } from "@/lib/format"
import { getCategories } from "@/lib/actions"
import { SearchControlls } from "@/components/searchControlls"

export default async function Page({ searchParams }) {
  const { page = 1 } = searchParams
  const { search = "" } = searchParams;
  const { categorySlug = "" } = searchParams
  const { sort = "" } = searchParams
  const categories = await getCategories()
  const { products, count } = await getProductsByQuery(page, search, categorySlug, sort)
  return <div className="">

    <div className="flex justify-between items-center my-2 px-2">
      <div className="flex flex-col gap-2">
        <h2 className="text-xl font-semibold md:text-2xl">Products</h2>
        <p>Showing <span className="font-bold">{products.length}</span> of {count} products</p>
      </div>
      <Link href="/admin/products/add"><Button className="me-8 ">Add Product</Button></Link>
    </div>
    <div>
      <SearchControlls _categories={JSON.stringify(categories)} />
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
                  src={product?.thumbnail?.picture_url}
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
                      <Link className={buttonVariants({ variant: "outline", className: "w-full bg-blue-600 text-white" })} href={`/admin/products/edit/${product._id.toString()}`}>Edit</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <DeleteButton id={product._id.toString()}>Delete</DeleteButton>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>

    <div className="my-4">
      <PaginationControll count={count} />
    </div>
  </div >

}
