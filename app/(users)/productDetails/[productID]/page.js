import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Reviews from "./reviews"
import Recommendations from "./recommendations"
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
    <div className="bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-orange-200 dark:to-orange-200">
      <div
        className="container   grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 py-4  mx-auto pt-8" >
        <div className="block bg-white dark:bg-neutral-900 justify-self-center self-center w-3/4 sm:w-1/2 md:w-2/3 aspect-square  relative mx-2 overflow-hidden rounded-full  shadow-lg shadow-orange-300 ">
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
        <div className="grid gap-4 border shadow-lg shadow-orange-300 bg-white dark:bg-neutral-800 px-2 rounded-xl md:gap-6 py-4 w-[80%] mx-auto">
          <div className="grid gap-2">
            <h1 className="text-xl md:text-3xl font-bold">{product?.title}</h1>
            <div className="flex gap-2">
              <RatingStar rating={product?.rating} />
              <Badge className="bg-orange-600 text-black dark:text-white">{product?.rating}</Badge>
            </div>
            <div className="flex gap-2 flex-wrap">
              <Badge className="text-xs md:text-sm bg-green-600 text-black dark:text-white">{product?.category?.name}</Badge>
              {product?.brand && <Badge className="text-xs md:text-sm bg-green-600 text-black dark:text-white">{product?.brand?.name}</Badge>}
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
      <div>
        <Tabs defaultValue="details" className="py-4">
          <TabsList className="overflow-x-auto bg-transparent text-black dark:text-white overflow-y-hidden justify-start w-full px-2">
            <TabsTrigger value="details" className="text-lg md:text-xl data-[state=active]:bg-orange-500"  >Details</TabsTrigger>
            <TabsTrigger value="reviews" className="text-lg md:text-xl data-[state=active]:bg-orange-500">Reviews</TabsTrigger>
            <TabsTrigger value="recommendations" className="text-lg md:text-xl data-[state=active]:bg-orange-500">Recommendations</TabsTrigger>
          </TabsList>
          <TabsContent value="details">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
              <p className="text-md md:text-lg text-wrap">{product?.description}</p>
              <div className="space-y-2">
                <p><span className="text-lg font-semibold">Warranty</span>: {product?.warrantyInformation}</p>
                <p><span className="text-lg font-semibold">Shipping</span>: {product?.shippingInformation}</p>
              </div>
            </div>

          </TabsContent>
          <TabsContent value="reviews">
            <Reviews productID={product._id} />
          </TabsContent>
          <TabsContent value="recommendations">
            <Recommendations productID={product._id} />
          </TabsContent>
        </Tabs>
      </div>
    </div >
  )
}
