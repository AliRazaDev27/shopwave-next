import DeleteCategory from "./delete"
import EditCategory from "./edit"
import { MoreHorizontal } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
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
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import FormAddCategories from "./FormAddCategories"
import { dateFormat } from "@/lib/format"
import { getCategories } from "@/lib/actions"
export default async function Page() {
  const categories = await getCategories()
  return <div>
    <FormAddCategories />
    <div className="border-2">
      <Card>
        <CardHeader>
          <CardTitle>All Categories</CardTitle>
          <CardDescription>
            Manage your products categories.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Sr#</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Slug</TableHead>
                <TableHead>Date Created</TableHead>
                <TableHead>
                  <span>Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {console.log(categories)}
              {categories && categories.map((category, index) => (
                <TableRow key={category._id}>
                  <TableCell>
                    {index + 1}
                  </TableCell>
                  <TableCell>
                    {category.name}
                  </TableCell>
                  <TableCell>{category.slug}</TableCell>
                  <TableCell>
                    {category.createdAt ? dateFormat(category.createdAt) : "27-10-1999"}
                  </TableCell>
                  <TableCell>
                    <Dialog>
                      <AlertDialog>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Toggle menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>

                            <DialogTrigger asChild>
                              <DropdownMenuItem>
                                <Button variant="outline" type="button">Edit</Button>
                              </DropdownMenuItem>
                            </DialogTrigger>
                            <DropdownMenuItem>
                              <AlertDialogTrigger asChild>
                                <Button variant="outline">Delete</Button>
                              </AlertDialogTrigger>
                            </DropdownMenuItem>

                          </DropdownMenuContent>
                        </DropdownMenu>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                            <AlertDialogDescription>
                              This action cannot be undone. This will permanently delete your
                              account and remove your data from our servers.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Cancel</AlertDialogCancel>
                            <AlertDialogAction className=" px-0"><DeleteCategory id={category._id} /></AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                        <DialogContent className="sm:max-w-[425px]">
                          <DialogHeader>
                            <DialogTitle>Edit Category</DialogTitle>
                          </DialogHeader>
                          <EditCategory id={category._id} />
                        </DialogContent>
                      </AlertDialog>
                    </Dialog>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>{categories.length}</strong> of <strong>{categories.length}</strong> categories
          </div>
        </CardFooter>
      </Card>
    </div>

  </div>;
}
