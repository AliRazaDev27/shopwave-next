import { cache } from "react"
import { ShopControlls } from "@/components/shop-controlls"
import { getCategories } from "@/lib/actions"
export default async function Layout({ children }) {
  const _getCategories = cache(async () => await getCategories())
  const categories = await _getCategories()
  return (
    <>
      <ShopControlls _categories={JSON.stringify(categories)} />
      {children}
    </>
  )
}
