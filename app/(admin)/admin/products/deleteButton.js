"use client"
import { deleteProduct } from "@/lib/actions"
import { useTransition } from "react"
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
export default function DeleteButton({ id }) {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  async function handleDelete() {
    startTransition(async () => {
      const result = await deleteProduct(id)
      if (result.error) {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
          duration: 2000,

        })
      }
      else {
        toast({
          title: "Success",
          description: "Product Deleted Successfully",
          className: "bg-green-600 text-white",
          duration: 2000,
        })
      }
    })
  }
  return (
    <Button variant="outline" className="w-full bg-red-600 text-white" onClick={handleDelete} disabled={isPending}>Delete</Button>
  )
}
