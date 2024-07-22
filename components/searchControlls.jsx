"use client"
import { useSearchParams, usePathname } from "next/navigation"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { Input } from "@/components/ui/input"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

export function SearchControlls({ _categories }) {
  const searchParams = useSearchParams()
  const path = usePathname()
  const searchTerm = searchParams.get("search")
  const categoryTerm = searchParams.get("categorySlug")
  const sortTerm = searchParams.get("sort")
  const router = useRouter()
  const [selectedCategory, setSelectedCategory] = useState(categoryTerm || "")
  const [sortOption, setSortOption] = useState(sortTerm || "newest")
  const [search, setSearch] = useState(searchTerm || "")
  const data = JSON.parse(_categories)
  const categories = data?.categories || data
  const sortOptions = [
    { value: "newest", label: "Newest" },
    { value: "rating", label: "Rating: High to Low" },
    { value: "low", label: "Price: Low to High" },
    { value: "high", label: "Price: High to Low" },
  ]
  function handleFilter() {
    const data = {
      page: 1,
      search: search,
      categorySlug: selectedCategory,
      sort: sortOption,
    }
    router.push(`${path.toString()}?${new URLSearchParams(data).toString()}`)
  }
  function handleReset() {
    setSearch("")
    setSortOption("")
    setSelectedCategory("")
    router.push(`${path}`)
    router.refresh()
  }
  return (
    (<div
      className="grid grid-cols-1 lg:grid-cols-3 items-center gap-4 bg-background p-4 w-[90%] mx-auto rounded-lg shadow-lg">
      <div className="relative flex-1">
        <div className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          name="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-8 rounded-md bg-muted" />
      </div>
      <div className="flex flex-wrap gap-4 justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <span>{selectedCategory || "Category"}</span>
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            <ScrollArea className="h-[50vh] w-full">
              <DropdownMenuItem onSelect={() => setSelectedCategory("All")}>All</DropdownMenuItem>
              {categories.map((category) => (
                <DropdownMenuItem key={category._id} onSelect={() => setSelectedCategory(category.slug)}>
                  {category.name.toUpperCase()}
                </DropdownMenuItem>
              ))}
            </ScrollArea>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center gap-2">
              <span>{sortOptions.find((option) => option.value === sortOption)?.label || "Sort"}</span>
              <ChevronDownIcon className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-[200px]">
            {sortOptions.map((option) => (
              <DropdownMenuItem key={option.value} onSelect={() => setSortOption(option.value)}>
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-wrap justify-center gap-4 items-center ">
        <Button className="bg-red-600 text-white" onClick={() => handleReset()}>Reset</Button>
        <Button className="bg-blue-600 text-white" onClick={() => handleFilter()}>Filter</Button>
      </div>
    </div>)
  );
}

function ChevronDownIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m6 9 6 6 6-6" />
    </svg>)
  );
}
