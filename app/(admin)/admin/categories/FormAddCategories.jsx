"use client"
import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
}
  from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { addCategory } from "@/lib/actions"

export default function FormAddCategories() {
  const [add, setAdd] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, startTransition] = useTransition()
  if (error) {
    alert(error)
    setError(null)
  }
  async function handleSubmit(formData) {
    startTransition(() => {
      setAdd(true)
    })
    const data = await addCategory(formData)
    if (!data.ok) {
      setError(data.error)
    }
    setAdd(false)
  }
  return (
    <form action={handleSubmit}>
      <Card x-chunk="dashboard-04-chunk-1">
        <CardHeader>
          <CardTitle>Category</CardTitle>
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
