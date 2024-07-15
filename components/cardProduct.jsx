import RatingStar from "./ratingStar"
import Link from "next/link"
import Image from "next/image"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
export default function CardProduct({ product }) {
  const discount = Math.floor(product?.discountPercentage)
  return (
    <Card className="flex flex-col justify-between shadow-2xl hover:shadow-neutral-900 shadow-neutral-500 rounded-2xl">
      <CardHeader>
        <div className="h-72 relative">
          {discount > 0 && (
            <div className="absolute top-0 right-0 z-10 w-min h-min text-xl font-semibold bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-4 rounded-tl-3xl rounded-br-3xl">{discount}%</div>
          )}
          <Image
            className="mx-auto h-72 object-contain"
            fill
            src={product?.thumbnail?.picture_url}
            placeholder="blur"
            blurDataURL="/placeholder.svg"
            alt="product picture" />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle>{product?.title}</CardTitle>
        <div className="flex gap-4 py-2">
          <RatingStar rating={product?.rating} />
          {product?.rating &&
            <Badge className="text-sm bg-orange-500">{product?.rating}</Badge>
          }
        </div>
        <div className="flex flex-wrap gap-4 py-2">
          <Badge className="text-md bg-green-700">{product?.category?.name}</Badge>
          {product.brand &&
            <Badge className="text-md bg-blue-700">{product?.brand?.name}</Badge>
          }
        </div>
        <div className="flex gap-4 py-2">
          <Badge className="font-bold text-md bg-orange-600">Rs. {product?.price}</Badge>
        </div>
        <CardDescription className="pt-2 line-clamp-3">{product?.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href={`/productDetails/${product._id}`} className="bg-orange-600 text-white px-8 py-2 rounded-md hover:bg-orange-700">Add to Cart</Link>
      </CardFooter>
    </Card>
  )
}
