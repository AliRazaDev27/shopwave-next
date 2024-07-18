import { Skeleton } from "@/components/ui/skeleton"
export default function Loading() {
  return (
    <div className="container mx-auto  py-4 h-[90vh] bg-neutral-400 grid grid-cols-1 lg:grid-cols-2 gap-4">
      <Skeleton className="h-full" />
      <Skeleton className="h-full" />
    </div>
  )
}
