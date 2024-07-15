import { ShopControlls } from "@/components/shop-controlls"
import { getCategories } from "@/lib/actions"
export default async function Layout({ children }) {
  const categories = await getCategories()
  return (
    <>
      <ShopControlls _categories={JSON.stringify(categories)} />
      {children}
    </>
  )
}
