import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { getUsers } from "@/lib/actions"
import UserActions from "./userActions"
export default async function Page() {
  const users = await getUsers()
  return <div>
    <h1 className="text-2xl font-semibold ps-4 pt-4">Users</h1>
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="">Sr.</TableHead>
          <TableHead className="">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, index) => (
          <TableRow key={user?._id}>
            <TableCell>{index + 1}</TableCell>
            <TableCell className="font-medium">{user?.name}</TableCell>
            <TableCell>{user?.email}</TableCell>
            <TableCell>{user?.role ? "Admin" : "User"}</TableCell>
            <TableCell>
              <UserActions id={user?._id?.toString()} _user={{ name: user?.name, email: user?.email, role: user?.role }} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </div>;
}
