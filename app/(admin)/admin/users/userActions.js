"use client"
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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
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
import { useState, useTransition } from "react"
import { useToast } from "@/components/ui/use-toast"
import { updateUser, deleteUser } from "@/lib/actions"
export default function UserActions({ id, _user }) {
  console.log(_user)
  const [name, setName] = useState(_user?.name)
  const [email, setEmail] = useState(_user?.email)
  const [role, setRole] = useState(_user?.role === 1 ? "admin" : "user")
  const [open, setOpen] = useState(false)
  const [alertOpen, setAlertOpen] = useState(false)
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  async function handleDelete(id) {
    startTransition(async () => {
      console.log(id)
      const res = await deleteUser(id)
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
          description: "User deleted successfully",
          variant: "success",
          className: "bg-green-600 text-white"
        })
      }
    })
  }
  async function handleUpdate() {
    console.log(`name ${name} email ${email} role ${role}`)
    startTransition(async () => {
      const res = await updateUser(id, { name, email, role })
      if (res.error) {
        toast({
          title: "Error",
          description: res.error,
          variant: "destructive",
          duration: 2000,
        })
      }
      else {
        toast({
          title: "Success",
          description: "User updated successfully",
          variant: "success",
          className: "bg-green-600 text-white",
          duration: 2000,
        })
      }
      setOpen(false)
    })
  }
  return (
    <div>
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
          <DropdownMenuContent className="border border-red-600">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <DialogTrigger asChild>
                <Button variant="outline" className="bg-blue-600 text-white">Edit User</Button>
              </DialogTrigger>
            </DropdownMenuItem>
            <DropdownMenuItem><Button variant="outline" className="bg-red-600 text-white" onClick={() => handleDelete(id)}>Delete User </Button></DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit User Details</DialogTitle>
            <DialogDescription>
              Make sure before updating the User Details.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="flex items-center gap-4">
              <Label htmlFor="name" className="">
                Name
              </Label>
              <Input id="name" name="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="email" className="">
                Email
              </Label>
              <Input id="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="flex items-center gap-4">
              <Label htmlFor="role" className="">
                Role
              </Label>
              <RadioGroup defaultValue={role} onValueChange={setRole} className="flex gap-4 ms-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="user" id="user" />
                  <Label htmlFor="user">User</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <Label htmlFor="admin">Admin</Label>
                </div>
              </RadioGroup>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" disabled={isPending} onClick={() => { setOpen(false); setAlertOpen(true) }}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog >
      <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
        {/* <AlertDialogTrigger>Open</AlertDialogTrigger> */}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your account
              and remove your data from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction><Button type="button" onClick={() => handleUpdate()}>Continue</Button></AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
