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
  console.log(product)
  async function handleAddToCart(id) {
  }
  return (
    <Card className="flex flex-col justify-between shadow-2xl shadow-neutral-400">
      <CardHeader>
        <div className="h-72 relative">
          <Image
            className="mx-auto h-72 object-contain"
            fill
            src={product?.picture?.picture_url}
            placeholder="blur"
            blurDataURL="/placeholder.svg"
            alt="product picture" />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle>{product?.title}</CardTitle>
        <div className="flex gap-4 py-2">
          <Badge className="text-md bg-green-700">{product?.category?.name}</Badge>
          <Badge className="text-md bg-blue-700">{product?.brand?.name}</Badge>
        </div>
        <div className="flex gap-4 py-2">
          <Badge className="font-bold text-md bg-orange-600">Rs. {product?.price}</Badge>
        </div>
        <CardDescription>{product?.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href={`/productDetails/${product._id}`} className="bg-orange-600 text-white px-8 py-2 rounded-md hover:bg-orange-700">Add to Cart</Link>
      </CardFooter>
    </Card>
  )
}
{/* <div className="border border-black"> */ }
{/*   <div className="border border-red-700"> */ }
{/*     <img className="mx-auto" src={product?.picture?.picture_url} alt="product picture" /> */ }
{/*   </div> */ }
{/*   <div className="p-2"> */ }
{/*     <p>{product?.title}</p> */ }
{/*     <p>{product?.price}</p> */ }
{/*     <p>{product?.category?.name}</p> */ }
{/*     <p>{product?.description}</p> */ }
{/*     <button>Add to cart</button> */ }
{/*   </div> */ }
{/* </div> */ }



