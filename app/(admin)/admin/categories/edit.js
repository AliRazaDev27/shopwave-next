"use client"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { DialogFooter, DialogClose } from "@/components/ui/dialog"
import { updateCategory } from "@/lib/actions"
import { useTransition, useState } from "react"
import { useToast } from "@/components/ui/use-toast"
export default function EditCategory({ id }) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  async function handleUpdate(formData) {
    startTransition(async () => {
      const data = await updateCategory(id, formData)
      if (data.error) {
        toast({
          title: "Error",
          description: data.error,
          variant: "destructive",
        })
      }
      else {
        toast({
          title: "Success",
          description: "Category updated successfully",
          variant: "success",
          className: "bg-green-600 text-white"
        })
      }
    })
    // TODO: Add form reset feature
  }
  return (
    <form action={handleUpdate}>
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>
          <Input
            id="name"
            name="name"
            defaultValue=""
            placeholder="Name"
            className="col-span-3"
          />
        </div>
      </div>
      <DialogFooter>
        <DialogClose asChild>
          <Button type="submit" disabled={isPending}>Submit</Button>
        </DialogClose>
      </DialogFooter>
    </form>
  )
}
