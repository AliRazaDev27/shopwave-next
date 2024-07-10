import { OrderDetails } from "@/components/order-details";
import { getOrder } from "@/lib/actions";
import { Suspense } from "react"
export default async function Page({ params }) {
  const id = params.orderID
  const data = await getOrder(id)
  return <div className="">
    <Suspense fallback="loading">
      <OrderDetails details={data} />
    </Suspense>
  </div>;
}
