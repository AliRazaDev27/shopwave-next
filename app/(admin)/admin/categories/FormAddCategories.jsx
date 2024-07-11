"use client"
import { useTransition } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
}
  from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { createCategory } from "@/lib/actions"
import { useToast } from "@/components/ui/use-toast"

export default function FormAddCategories() {
  const [isPending, startTransition] = useTransition()
  const { toast } = useToast()
  async function handleSubmit(formData) {
    startTransition(async () => {
      const data = await createCategory(formData)
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
          description: "Category created successfully",
          variant: "success",
        })
      }
    })
    // TODO: Add form reset feature
  }
  return (
    <form action={handleSubmit}>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Create New Category</CardTitle>
        </CardHeader>
        <CardContent className="flex gap-4">
          <Input
            placeholder="Category Name"
            type="text"
            id="name"
            name="name"
            required
            defaultValue=""
          />
          <Button type="submit" disabled={isPending}>Add</Button>
        </CardContent>
      </Card>
    </form>
  )
}
