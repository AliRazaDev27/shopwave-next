import { ShopControlls } from "@/components/shop-controlls"
import { getCategories } from "@/lib/actions"
export default async function Layout({ children }) {
  // TODO: cache categories , add onError or fallback to images
  const categories = await getCategories()
  return (
    <>
      <ShopControlls _categories={JSON.stringify(categories)} />
      {children}
    </>
  )
}
