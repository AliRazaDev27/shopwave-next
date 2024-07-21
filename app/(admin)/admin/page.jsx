"use client"
import { Suspense } from "react"
import { PartOne, PartTwo, PartThree } from "@/components/dashboard";

export default function Admin() {
  return (
    <div className="grid min-h-screen w-full">
      <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Suspense fallback={<div>Loading...</div>}>
          <PartOne />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <PartTwo />
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <PartThree />
        </Suspense>
      </main>

    </div>
  );
}
