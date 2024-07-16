import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Reviews from "./reviews"
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
    <>
      <div
        className="container grid border-2 border-black grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 py-4  mx-auto mt-8" >
        <div className="block justify-self-center self-center w-3/4 sm:w-1/2 md:w-2/3 aspect-square  relative mx-2 overflow-hidden border-2 border-green-600    rounded-full  shadow-lg shadow-current ">
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
          </div>
          {/* FIX: look if we need the whole product for this */}
          <Suspense fallback={<div>Loading...</div>}>
            <CartControlls product={JSON.stringify(product)} />
          </Suspense>
        </div>

      </div>
      <div className="container  mx-auto mt-8 border-2 border-black">
        <Tabs defaultValue="details" className="">
          <TabsList className="overflow-x-auto overflow-y-hidden justify-start w-full border border-red-600">
            <TabsTrigger value="details" className="text-xl">Details</TabsTrigger>
            <TabsTrigger value="reviews" className="text-xl">Reviews</TabsTrigger>
            <TabsTrigger value="recommendations" className="text-xl">Recommendations</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              <p className="text-lg">{product?.description}</p>
              <div className="space-y-2">
                <p><span className="text-lg font-semibold">Warranty</span>: {product?.warrantyInformation}</p>
                <p><span className="text-lg font-semibold">Shipping</span>: {product?.shippingInformation}</p>
              </div>
            </div>

          </TabsContent>
          <TabsContent value="reviews">
            <Reviews productID={product._id} />
          </TabsContent>
          <TabsContent value="recommendations"></TabsContent>
        </Tabs>
      </div>
    </>
  )
}
