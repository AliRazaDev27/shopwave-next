import { Skeleton } from "@/components/ui/skeleton";
export default function Loading() {
  return (
    <div className="container  mx-auto h-[90vh] bg-neutral-500 grid grid-cols-1 lg:grid-cols-2 py-4 gap-8">
      <Skeleton className="h-full" />
      <Skeleton className="h-full" />
    </div>
  )
}
