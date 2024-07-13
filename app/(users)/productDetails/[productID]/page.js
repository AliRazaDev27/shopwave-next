import { Suspense } from "react"
import Image from "next/image"
import { Badge } from "@/components/ui/badge"
import { CartControlls } from "./cartControlls"
import { getProduct } from "@/lib/actions"
export default async function Page({ params }) {
  const { productID } = params
  const product = await getProduct(productID)
  console.log(product)
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 max-w-6xl  mx-auto mt-8" >
      <div className="block relative h-96 overflow-hidden  border rounded-full shadow-lg shadow-black ">
        <Image
          // src="/placeholder.svg"
          src={product?.thumbnail?.picture_url}
          alt="Product Image"
          fill
          priority
          placeholder="blur"
          blurDataURL="/placeholder.svg"
          className="object-contain w-full rounded-lg overflow-hidden" />
      </div>
      <div className="grid gap-4 md:gap-6 py-4 w-[80%] mx-auto">
        <div className="grid gap-1">
          <h1 className="text-3xl font-bold">{product?.title}</h1>
          <div className="text-2xl">{product?.category?.name}</div>
          <p className="text-muted-foreground">{product?.description}</p>
        </div>
        <div className="text-4xl font-bold"><Badge className="text-xl bg-orange-600">$ {product?.price}</Badge></div>
        <Suspense fallback={<div>Loading...</div>}>
          <CartControlls product={JSON.stringify(product)} />
        </Suspense>
      </div>

    </div>
  )
}
