import { Skeleton } from "@/components/ui/skeleton"

export default function Page() {
  return (
    <div className="flex flex-col bg-gradient-to-r from-black to-neutral-500 text-white h-[90vh] w-full  items-center justify-center">
      <h1 className="text-xl lg:text-4xl font-bold">
        Under Development...
      </h1>
      <h2 className="text-sm lg:text-xl">Please check back later</h2>
    </div>
  )
}
