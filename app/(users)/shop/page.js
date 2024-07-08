import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import CardProduct from "@/components/cardProduct"
import { getProductsByQuery } from "@/lib/actions"
import { getCategories } from "@/lib/actions"
import { ShopControlls } from "@/components/shop-controlls"
export default async function Page({ searchParams }) {
  const { page = 1 } = searchParams
  const { search = "" } = searchParams;
  const { categorySlug = "" } = searchParams
  const { sort = "" } = searchParams
  const { products, count } = await getProductsByQuery(page, search, categorySlug, sort)
  const categories = await getCategories()
  console.log(categories)
  function getPreviousPage() {
    if (page > 1) {
      return `/shop?page=${parseInt(page) - 1}&search=${search}&categorySlug=${categorySlug}&sort=${sort}`
    }
  }
  function getNextPage() {
    if (page < count / 12) {
      return `/shop?page=${parseInt(page) + 1}&search=${search}&categorySlug=${categorySlug}&sort=${sort}`
    }
  }
  return (
    <div className="">
      <ShopControlls _categories={JSON.stringify(categories)} />
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {
          products.map((product) => {
            return (
              <CardProduct key={product?._id} product={product} />
            )
          })
        }
      </div>
      <div className="my-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href={getPreviousPage()} />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                2
              </PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href={getNextPage()} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}
