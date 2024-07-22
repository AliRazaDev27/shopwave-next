"use client"
import { usePathname, useSearchParams } from "next/navigation"
import clsx from "clsx"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
}
  from "@/components/ui/pagination"
export default function PaginationControll({ count }) {
  const path = usePathname()
  const searchParams = useSearchParams()
  console.log(path)
  console.log(searchParams)
  const page = searchParams.get("page") || 1;
  function getPreviousPage() {
    if (page > 1) {
      console.log(parseInt(page) - 1)
      return `${path}?page=${parseInt(page) - 1}`

    }
  }
  function getNextPage() {
    if (page < count / 12) {
      console.log(parseInt(page) + 1)
      return `${path}?page=${parseInt(page) + 1}`
    }
  }
  function getPageAt(pageNumber) {
    return `${path}?page=${parseInt(pageNumber)}`
  }
  return (
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
  )
}
