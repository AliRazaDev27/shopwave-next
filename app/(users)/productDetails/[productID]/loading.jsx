import { Skeleton } from "@/components/ui/skeleton"
export default function Loading() {
  return (
    <div className="container h-[90vh] mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 px-8 lg:gap-16 py-12 lg:px-28 bg-neutral-300">
      <Skeleton className="h-[60vh] rounded-lg" />
      <Skeleton className="h-[60vh] rounded-lg" />
    </div>
  )
}
