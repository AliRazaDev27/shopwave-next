import Image from "next/image"
import Link from "next/link"
import RatingStar from "@/components/ratingStar"
import { getRecommendedProducts } from "@/lib/actions"
export default async function Recommendations({ productID }) {
  const products = await getRecommendedProducts(productID)
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4 justify-items-center items-center">
      {products.length > 0 && products.map(product => (
        <Card key={product._id} product={product} />
      ))}
    </div>
  )
}
function Card({ product }) {
  return (
    <div className="flex flex-col bg-neutral-200 dark:bg-neutral-700 gap-4 py-3 w-[300px] items-center border shadow-lg shadow-neutral-500 border-neutral-300 rounded-xl">
      <div>
        <Image
          src={product.thumbnail.picture_url}
          alt="Product Image"
          width={200}
          height={200}
          className="object-contain w-full rounded-lg overflow-hidden"
        />
      </div>
      <p>{product.title}</p>
      <RatingStar rating={product.rating} />
      <p className="text-lg font-semibold">${product.price}</p>
      <Link className="bg-orange-500 text-white rounded-lg px-4 py-2 hover:bg-orange-700 text-semibold" href={`/productDetails/${product._id}`}>See Details</Link>
    </div>
  )
}
