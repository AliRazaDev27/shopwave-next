import { Skeleton } from "@/components/ui/skeleton"
export default function Loading() {
  return (
    <div className="flex gap-4 py-8 px-8 bg-neutral-400">
      <Skeleton className="w-1/3 h-[80vh] rounded-lg" />
      <Skeleton className="w-1/3 h-[80vh] rounded-lg" />
      <Skeleton className="w-1/3 h-[80vh] rounded-lg" />
    </div>
  )
}
