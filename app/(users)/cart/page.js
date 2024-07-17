import { Checkout } from "@/components/checkout"
import { Suspense } from "react"
export default async function Page() {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Checkout />
      </Suspense>
    </div>
  )
}
