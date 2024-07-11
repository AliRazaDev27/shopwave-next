import { Badge } from "@/components/ui/badge"
import OrderStatus from "@/components/orderStatus"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuLabel } from "@/components/ui/dropdown-menu"
import { MoreHorizontal } from "lucide-react"
import OrderActions from "./orderActions.js"
import { getOrders } from "@/lib/actions"
import { dateFormat } from "@/lib/format"
export default async function Page() {
  const orders = await getOrders()
  console.log(orders)
  return <div>
    <Card>
      <CardHeader className="px-7">
        <CardTitle>Orders</CardTitle>
        <CardDescription>Recent orders from your store.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Sr.</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead className="hidden sm:table-cell">Status</TableHead>
              <TableHead className="hidden md:table-cell">Date</TableHead>
              <TableHead className="text-right">Amount</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order, index) => (
              <TableRow key={order._id} className="bg-accent">
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div className="font-medium">{order?.user?.name}</div>
                  <div className="hidden text-sm text-muted-foreground md:inline">
                    {order?.user?.email}
                  </div>
                </TableCell>
                <TableCell className="hidden sm:table-cell">
                  <OrderStatus status={order?.status} />
                </TableCell>
                <TableCell className="hidden md:table-cell">{dateFormat(order?.createdAt)}</TableCell>
                <TableCell className="text-right">${order?.total}</TableCell>
                <TableCell className="text-right">
                  <OrderActions id={order?._id.toString()} _status={order?.status} />
                </TableCell>
              </TableRow>
            )
            )}

          </TableBody>
        </Table>
      </CardContent>
    </Card>
  </div>;
}
