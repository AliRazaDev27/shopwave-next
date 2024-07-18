import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator } from "@/components/ui/dropdown-menu"
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import { dateFormat } from "@/lib/format"

export function OrderDetails({ details }) {
  console.log(details)
  const data = JSON.parse(details)
  const { user, products, total, status, createdAt, updatedAt, shippingInfo } = data
  return (
    (<div className=" ">
      <div
        className="bg-white dark:bg-gray-900 rounded-lg shadow-md overflow-hidden">
        <div
          className="px-6 py-5 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">Order Details</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">Order #12345 - Placed on {dateFormat(createdAt)}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <TruckIcon className="h-4 w-4 mr-1" />
              Track Order
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <MoveVerticalIcon className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Edit</DropdownMenuItem>
                <DropdownMenuItem>Export</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>Trash</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <div className="p-2 md:p-6 grid grid-cols-1 lg:grid-cols-3 gap-2 md:gap-6 ">
          <div className="col-span-2">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Ordered Products</h3>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Price/Unit</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Subtotal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product._id}>
                    <TableCell>
                      <div className="flex items-center gap-4">
                        <Image
                          src={product?.product?.picture?.picture_url}
                          alt="Acme Lamp"
                          width={64}
                          height={64}
                          className="rounded-md" />
                        <div>
                          <div className="font-medium hidden sm:block">{product?.product?.title}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{product?.pricePerUnit}</TableCell>
                    <TableCell>{product?.quantity}</TableCell>
                    <TableCell>
                      <Badge variant="destructive">{status}</Badge>
                    </TableCell>
                    <TableCell className="text-right">{product?.pricePerUnit * product?.quantity}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          <div className="flex flex-col justify-center items-center  py-2 lg:py-0 min-h-[300px] min-w-[300px] border border-orange-500 bg-orange-50  rounded-3xl shadow-xl shadow-orange-500 ">
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-4">Customer Details</h3>
            <div className="grid gap-4">
              <div>
                <div className="font-medium text-gray-900 dark:text-gray-100">{shippingInfo?.name}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{shippingInfo?.email}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">{shippingInfo?.phone}</div>
              </div>
              <Separator />
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">Shipping Address</h3>
              <address className="not-italic text-sm text-gray-500 dark:text-gray-400">
                <div>{shippingInfo.name}</div>
                <div>{shippingInfo.address}</div>
              </address>
            </div>
          </div>
        </div>
        <div
          className="bg-gray-50 dark:bg-gray-800 px-6 py-5 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="text-sm text-gray-500 dark:text-gray-400">Order updated on {dateFormat(updatedAt)}</div>
          <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">Total: <span className="text-neutral-100 bg-green-600 inline-block px-2 py-1 rounded-lg">${total}</span></div>
        </div>
      </div>
    </div>)
  );
}

function MoveVerticalIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <polyline points="8 18 12 22 16 18" />
      <polyline points="8 6 12 2 16 6" />
      <line x1="12" x2="12" y1="2" y2="22" />
    </svg>)
  );
}


function TruckIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2" />
      <path d="M15 18H9" />
      <path
        d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14" />
      <circle cx="17" cy="18" r="2" />
      <circle cx="7" cy="18" r="2" />
    </svg>)
  );
}
