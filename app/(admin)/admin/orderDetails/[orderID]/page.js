import { OrderDetails } from "@/components/order-details";
import { getOrder } from "@/lib/actions";
export default async function Page({ params }) {
  const id = params.orderID
  const data = await getOrder(id)
  return <div className="">
    <OrderDetails details={data} />
  </div>;
}
