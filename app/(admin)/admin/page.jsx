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
  const [productsInfo, reviewsInfo, ordersInfo, usersInfo] = await Promise.all([
    productsOverview(),
    reviewsOverview(),
    ordersOverview(),
    usersOverview(),
  ])
  return (
    <div className="grid min-h-screen w-full">
      <main className="grid flex-1 gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
        <Suspense fallback={<div>Loading...</div>}>
          <div className="grid  border border-white grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <ProductCard data={productsInfo} />
            <ReviewCard data={reviewsInfo.card} />
            <OrderCard data={ordersInfo.card} />
            <UserCard data={usersInfo.card} />
          </div>
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            {/* <ProductChart /> */}
            <ReviewChart data={reviewsInfo.chart} />
          </div>
        </Suspense>

        <Suspense fallback={<div>Loading...</div>}>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <OrderChart data={ordersInfo.chart} />
            <UserChart data={usersInfo.chart} />
          </div>
        </Suspense>
      </main>

    </div>
  );
}
