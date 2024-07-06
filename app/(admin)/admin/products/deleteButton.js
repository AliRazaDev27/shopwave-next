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
      console.log(result)
      if (result.ok) {
        toast({
          title: "Success",
          description: "Product Deleted",
          variant: "success",
          duration: 2000,
        })
      }
      else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
          duration: 2000,
        })
      }
    })
  }
  return <div>
    <Button onClick={handleDelete} disabled={isPending}>Delete</Button>
  </div>
}
