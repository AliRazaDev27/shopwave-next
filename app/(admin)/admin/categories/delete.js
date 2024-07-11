"use client"
import { deleteCategory } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import { useTransition } from "react"
import { useToast } from "@/components/ui/use-toast"
export default function DeleteCategory({ id }) {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  async function handleDelete() {
    startTransition(async () => {
      const data = await deleteCategory(id)
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
          description: "Category deleted successfully",
          variant: "success",
          className: "bg-green-600 text-white"
        })
      }
    })
    // TODO: Add form reset feature

  }
  return <Button
    onClick={() => handleDelete()}
    className="hover:bg-neutral-700 "
    disabled={isPending}
  >Delete</Button>
}
