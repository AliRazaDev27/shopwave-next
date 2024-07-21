"use client"
import { Suspense } from "react"
import {
  ProductCard,
  ReviewCard,
  OrderCard,
  UserCard,
  ProductChart,
  ReviewChart,
  PartThree
}
  from "@/components/dashboard";

export default function Admin() {
  return (
    <div className="grid min-h-screen w-full">
      <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="grid  border border-white grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ProductCard />
            <ReviewCard />
            <OrderCard />
            <UserCard />
          </div>
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ProductChart />
            <ReviewChart />
          </div>
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <PartThree />
        </Suspense>
      </main>

    </div>
  );
}
