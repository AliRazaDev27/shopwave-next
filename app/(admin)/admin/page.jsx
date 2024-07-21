import { Suspense } from "react"
import { productsOverview } from "@/lib/actions/productActions";
import { reviewsOverview } from "@/lib/actions/reviewActions";
import { ordersOverview } from "@/lib/actions/orderActions";
import { usersOverview } from "@/lib/actions/userActions";
import {
  ProductCard,
  ReviewCard,
  OrderCard,
  UserCard,
  ProductChart,
  ReviewChart,
  OrderChart,
  UserChart,
}
  from "@/components/dashboard";

export default async function Admin() {
  const productsInfo = await productsOverview();
  const reviewsInfo = await reviewsOverview();
  const ordersInfo = await ordersOverview();
  const usersInfo = await usersOverview();
  return (
    <div className="grid min-h-screen w-full">
      <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="grid  border border-white grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ProductCard data={productsInfo} />
            <ReviewCard data={reviewsInfo} />
            <OrderCard data={ordersInfo} />
            <UserCard data={usersInfo} />
          </div>
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <ProductChart />
            <ReviewChart />
          </div>
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <OrderChart />
            <UserChart />
          </div>
        </Suspense>
      </main>

    </div>
  );
}
