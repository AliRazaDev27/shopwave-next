import clsx from "clsx"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"
import CardProduct from "@/components/cardProduct"
import { getProductsByQuery } from "@/lib/actions"
export default async function Page({ searchParams }) {
  const { page = 1 } = searchParams
  const { search = "" } = searchParams;
  const { categorySlug = "" } = searchParams
  const { sort = "" } = searchParams
  const { products, count } = await getProductsByQuery(page, search, categorySlug, sort)
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
  function getPageAt(pageNumber) {
    return `/shop?page=${pageNumber}&search=${search}&categorySlug=${categorySlug}&sort=${sort}`
  }
  return (
    < div className="bg-neutral-300 dark:bg-neutral-800" >
      {
        // TODO: Improve search pagination result visual indicators.
        (search || categorySlug || sort) &&

        <div className="text-end pe-6 my-4"><span className="font-bold text-xl text-orange-800">{count}</span> Results Found</div>

      }
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-4 ">
        {
          products.map((product) => {
            return (
              <CardProduct key={product?._id} product={product} />
            )
          })
        }
      </div>
      { // TODO: Improve pagination visual indicators and link generation logic
      }
      <div className="my-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href={getPreviousPage()} />
            </PaginationItem>
            <PaginationItem className={clsx({ hidden: parseInt(page) === 1 })}>
              <PaginationLink href={getPageAt(parseInt(page) - 1)}>{parseInt(page) - 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>
                {page}
              </PaginationLink>
            </PaginationItem>
            <PaginationItem className={clsx({ hidden: page === count / 12 })}>
              <PaginationLink href={getPageAt(parseInt(page) + 1)}>{parseInt(page) + 1}</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href={getNextPage()} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div >
  );
}
