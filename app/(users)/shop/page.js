import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination"
import CardProduct from "@/components/cardProduct"
import { getProducts } from "@/lib/actions"
export default async function Page() {
  const products = await getProducts()
  console.log(products[0])
  return (
    <div className="">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 my-4">
        {
          products.map((product) => {
            return (
              <CardProduct key={product?._id} product={product} />
            )
          })
        }
      </div>
      {/* TODO: Pagination */}
      {/* <div className="my-4"> */}
      {/*   <Pagination> */}
      {/*     <PaginationContent className="flex gap-2"> */}
      {/*       <PaginationItem> */}
      {/*         <button type="button" hidden={currentPage === 1} onClick={() => { setCurrentPage(currentPage - 1) }}>Previous</button> */}
      {/*       </PaginationItem> */}
      {/*       <PaginationItem> */}
      {/*         <PaginationLink href="#"> */}
      {/*           <button type="button" hidden={currentPage === 1} onClick={(e) => { setCurrentPage(parseInt(e.target.innerText)); }}>{currentPage - 1}</button> */}
      {/*         </PaginationLink> */}
      {/*       </PaginationItem> */}
      {/*       <PaginationItem> */}
      {/*         <button type="button" className="px-2 py-1 rounded-md hover:bg-red-300 border-2 border-orange-700" disabled>{currentPage}</button> */}
      {/*       </PaginationItem> */}
      {/*       <PaginationItem> */}
      {/*         <PaginationLink href="#"> */}
      {/*           <button type="button" hidden={currentPage === numberOfPages} onClick={(e) => { setCurrentPage(parseInt(e.target.innerText)); }}>{currentPage + 1}</button> */}
      {/*         </PaginationLink> */}
      {/*       </PaginationItem> */}
      {/*       <PaginationItem> */}
      {/*         <PaginationEllipsis /> */}
      {/*       </PaginationItem> */}
      {/*       <PaginationItem> */}
      {/*         <button type="button" hidden={currentPage === numberOfPages} onClick={() => { setCurrentPage(currentPage + 1) }}>Next</button> */}
      {/*       </PaginationItem> */}
      {/*     </PaginationContent> */}
      {/*   </Pagination> */}
      {/* </div> */}
    </div>
  );
}
