import { Badge } from "@/components/ui/badge"
import clsx from "clsx"
const orderColors = {
  pending: "bg-gray-500",
  processing: "bg-blue-500",
  shipped: "bg-orange-500",
  delivered: "bg-green-500",
  cancelled: "bg-red-500",
  returned: "bg-purple-500",
  failed: "bg-red-900",
  refunded: "bg-green-300",
  completed: "bg-green-800",
}
export default function OrderStatus({ status }) {
  const color = orderColors[status.toLowerCase()]
  return (
    <Badge className={clsx("font-medium", color)} variant="destructive">
      {status}
    </Badge>
  )
}
