"use client"
import { buttonVariants } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import Link from "next/link"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import { getOrder, updateOrder, deleteOrder } from "@/lib/actions"
import { useState, useTransition } from "react"
import { useToast } from "@/components/ui/use-toast"
export default function OrderActions({ id, _status }) {
  const [status, setStatus] = useState(_status)
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  async function handleDelete(id) {
    startTransition(async () => {
      console.log(id)
      const res = await deleteOrder(id)
      if (res.error) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        })
      }
      else {
        toast({
          title: "Success",
          description: "Order deleted successfully",
          variant: "success",
          className: "bg-green-600 text-white"
        })
      }
    })
  }
  async function handleUpdate() {
    startTransition(async () => {
      const res = await updateOrder(id, status)
      if (res.error) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
        })
      }
      else {
        toast({
          title: "Success",
          description: "Order updated successfully",
          variant: "success",
          className: "bg-green-600 text-white"
        })
      }
      setOpen(false)
    })
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-haspopup="true"
            size="icon"
            variant="ghost"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem><Link href={`/admin/orderDetails/${id}`} className={buttonVariants({ variant: "outline" })}>View Details</Link></DropdownMenuItem>
          <DialogTrigger asChild>
            <Button variant="outline">Update Status</Button>
          </DialogTrigger>
          <DropdownMenuItem><Button variant="outline" onClick={() => handleDelete(id)}>Delete Order</Button></DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Update Order Status</DialogTitle>
          <DialogDescription>
            Make sure before updating the order status.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="status" className="text-right">
              Status
            </Label>
            <Select name="status" value={status} onValueChange={setStatus} id="status">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Update Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Status</SelectLabel>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                  <SelectItem value="returned">Returned</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        </div>
        <DialogFooter>
          <Button type="button" disabled={isPending} onClick={() => handleUpdate()}>Save changes</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog >
  )
}
