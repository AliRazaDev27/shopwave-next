import EditForm from "./EditForm"
import { getProduct, getCategories } from "@/lib/actions"
export default async function Page({ params }) {
  const currentProduct = await getProduct(params?.productID)
  console.log(`product`, currentProduct)
  const categories = await getCategories()
  const _currentProduct = JSON.stringify(currentProduct)
  const _categories = JSON.stringify(categories)
  return (
    <div>
      <EditForm _currentProduct={_currentProduct} _categories={_categories} />
    </div>
  )
}
