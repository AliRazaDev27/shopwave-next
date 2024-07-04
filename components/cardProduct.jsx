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
  async function handleAddToCart(id) {
  }
  return (
    <Card className="flex flex-col justify-between shadow-2xl shadow-neutral-400">
      <CardHeader>
        <div className="h-72">
          <Image className="mx-auto h-72" width={300} height={300} src={product?.picture?.picture_url} alt="product picture" />
        </div>
      </CardHeader>
      <CardContent>
        <CardTitle>{product?.title}</CardTitle>
        <div className="flex gap-4 py-2">
          <Badge className="font-bold text-md bg-orange-600">Rs. {product?.price}</Badge>
          <Badge className="text-md">{product?.category?.name}</Badge>
        </div>
        <CardDescription>{product?.description}</CardDescription>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link href={`/addToCart/${product._id}`}>Add to Cart</Link>
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



