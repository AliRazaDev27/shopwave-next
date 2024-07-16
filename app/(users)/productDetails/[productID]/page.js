import { CiDeliveryTruck } from "react-icons/ci";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import RatingStar from "@/components/ratingStar.jsx"
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
      <div className="block relative h-96 mx-2 overflow-hidden   rounded-full  shadow-lg shadow-current ">
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
        <div className="grid gap-2">
          <h1 className="text-3xl font-bold">{product?.title}</h1>
          <div className="flex gap-2">
            <RatingStar rating={product?.rating} />
            <Badge className="bg-orange-600">{product?.rating}</Badge>
          </div>
          <div className="flex gap-2 flex-wrap">
            <Badge className="text-xs md:text-sm bg-green-600">{product?.category?.name}</Badge>
            <Badge className="text-xs md:text-sm bg-blue-600">{product?.brand?.name}</Badge>
          </div>
          <p className="text-muted-foreground">{product?.description}</p>
        </div>
        <div className="flex gap-2 items-center">
          {product?.discountPercentage.toFixed() > 0 ? (
            <>
              <div className="text-3xl font-bold">${(product?.price - (product?.price * (product?.discountPercentage / 100))).toFixed()}</div>
              <div className="text-2xl font-semibold text-muted-foreground line-through">${product?.price?.toFixed()}</div>
            </>
          )
            :
            <div className="text-3xl font-bold">${product?.price?.toFixed()}</div>
          }
        </div>
        <div className="flex gap-8 items-center">
          <div>In Stock: <span className="text-orange-600 text-xl font-bold">{product?.stock}</span></div>
          <Popover>
            <PopoverTrigger className="bg-orange-600 p-2 rounded-full">
              <CiDeliveryTruck className="text-2xl text-white animate-[bounce_1s_ease-in_infinite]" />
            </PopoverTrigger>
            <PopoverContent side="top" className="p-0 m-0  rounded-full overflow-hidden">
              <div className="flex flex-col gap-2 bg-gradient-to-r from-orange-700 to-orange-400 text-md text-center font-semibold text-white p-2">
                <p>{product?.warrantyInformation}</p>
                <p>{product?.shippingInformation}</p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
        {/* FIX: look if we need the whole product for this */}
        <Suspense fallback={<div>Loading...</div>}>
          <CartControlls product={JSON.stringify(product)} />
        </Suspense>
      </div>

    </div>
  )
}
