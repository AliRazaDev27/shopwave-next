"use client"
import Link from "next/link"
import { useState, useTransition } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { authenticateUser } from "@/lib/actions"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function LoginPage() {
  const { toast } = useToast()
  const router = useRouter()
  const [pending, setPending] = useState(false)
  const [error, setError] = useState(null)
  const [isPending, startTransition] = useTransition()
  async function handleSumbit(formData) {
    startTransition(async () => {
      const result = await authenticateUser(formData)
      console.log(result)
      if (result?.error) {
        toast({
          variant: "destructive",
          title: "Error",
          description: result.error,
        })
      }
      else {
        toast({
          title: "Login Successful",
          description: "Redirecting to home page",
        })
        setTimeout(() => {
          router.push("/")
        }, 1000)

      }

    })
  }
  return (
    <div className="flex items-center justify-center h-screen bg-neutral-800">
      <form action={handleSumbit}>

        <Card className="w-full max-w-sm">
          <CardHeader>
            <CardTitle className="text-2xl">Login</CardTitle>
            <CardDescription>
              Enter your email below to login to your account.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                name="email"
                required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                name="password"
                required />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="w-full" disabled={isPending}>
              Sign in
            </Button>
          </CardFooter>

          <div className="mb-4 text-center text-sm">
            Don&apos;t have an account?
            <Link href="/register" className="underline">
              Sign up
            </Link>
          </div>
        </Card>
      </form>


    </div>
  )
}

