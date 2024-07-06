"use client"
import { useToast } from "@/components/ui/use-toast"
import { createUser } from "@/lib/actions"
import { useTransition } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
export default function Page() {
  const { toast } = useToast()
  const [isPending, startTransition] = useTransition()
  async function handleSubmit(formData) {
    startTransition(async () => {
      const result = await createUser(formData)
      console.log(result)
      if (result.ok) {
        toast({
          title: "Account created",
          description: "We've created your account for you.",
        })
        window.location.href = "/login"
      }
      else {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        })
      }
    })
  }
  return (
    <div className="flex justify-center items-center h-screen bg-neutral-800">
      <Card className="mx-auto max-w-md ">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={handleSubmit}>
            <div className="grid gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="name">Full name</Label>
                  <Input
                    id="name"
                    placeholder="Name"
                    name="name"
                    required
                  />
                </div>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="email@example.com"
                  required
                  name="email"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  minLength={8}
                  required
                />
              </div>
              <Button type="submit" className="w-full" disabled={isPending}>
                Create an account
              </Button>
              <Button variant="outline" disabled className="w-full">
                Sign up with GitHub
              </Button>
            </div>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline">
                Sign in
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
