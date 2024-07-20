import { Skeleton } from "@/components/ui/skeleton"
export default function Loading() {
  return (
    <div className="container  bg-neutral-500 grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-12 py-4  mx-auto pt-8">
      <Skeleton className="block bg-white dark:bg-neutral-900 justify-self-center self-center w-[95%] sm:w-8/12 md:w-10/12 aspect-square  mx-2 rounded-full" />
      <Skeleton className="bg-white dark:bg-neutral-800 px-4 rounded-xl  py-4 w-[95%] min-h-[320px]  mx-auto" />
    </div>
  )
}
