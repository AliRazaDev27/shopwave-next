import { Skeleton } from "@/components/ui/skeleton"
export default function Loading() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8 px-8 bg-neutral-400">
      <Skeleton className="h-[80vh] rounded-lg" />
      <Skeleton className="h-[80vh] rounded-lg" />
      <Skeleton className="h-[80vh] rounded-lg" />
    </div>
  )
}
