/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination"

import { Trash2 } from "lucide-react";
import { useAllUsersQuery, useBlockUserMutation, useDeleteUserMutation, useUnblockUserMutation } from "@/redux/features/users/user.api";
import { useState } from "react";
import { AddUsersForm } from "./AddUsersForm";
import { toast } from "sonner";
import { DeleteConfirmation } from "@/components/DeleteConfirmation";
import { BlockConfirmation } from "@/components/BlockConfirmation";


export function UserList() {


    const [currentPage, setCurrentPage] = useState(1);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [limit, setLimit] = useState(5);
    const { data, isLoading, isError } = useAllUsersQuery({ page: currentPage, limit });
    const totalPage = data?.meta?.totalPage || 1;
    const users = data?.data || [];


    const [deleteUser] = useDeleteUserMutation()
    const [blockUser] = useBlockUserMutation()
    const [unblockUser] = useUnblockUserMutation()

 const handleDeleteUser = async (userId: string) => {

      const toastId = toast.loading("Removing...");
      try {
        const res = await deleteUser(userId).unwrap();

        if (res.success) {
          toast.success("Removed", { id: toastId });
        }
      } catch (err) {
        console.error(err);
      }
  };
 const handleBlockUser = async (userId: string) => {

      const toastId = toast.loading("Blocking...");
      try {
        const res = await blockUser(userId).unwrap();

        if (res.success) {
          toast.success("Blocked", { id: toastId });
        }
      } catch (err) {
        console.error(err);
      }
  };
 const handleUnBlockUser = async (userId: string) => {

      const toastId = toast.loading("unblocking...");
      try {
        const res = await unblockUser(userId).unwrap();

        if (res.success) {
          toast.success("Unblocked", { id: toastId });
        }
      } catch (err) {
        console.error(err);
      }
  };
   if (isLoading) return <div>Loading...</div>;
   if (isError) return <div>Error loading users</div>;
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>User List</CardTitle>
        <CardAction>
            <AddUsersForm/>
        </CardAction>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>A list of users.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Registered At</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user: any) => (
              <TableRow key={user._id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{new Date(user.createdAt).toLocaleDateString()}</TableCell>
                <TableCell className="flex gap-x-5">     
                   <DeleteConfirmation onConfirm={()=>handleDeleteUser(user._id)}>
                      <Button size="sm" variant="destructive">
                        <Trash2/>
                      </Button>
                   </DeleteConfirmation>
                  {user.isActive === "BLOCKED" ? (
                      <BlockConfirmation onConfirm={() => handleUnBlockUser(user._id)}>
                        <Button size="sm" variant="secondary">Unblock</Button>
                      </BlockConfirmation>
                    ) : (
                      <BlockConfirmation onConfirm={() => handleBlockUser(user._id)}>
                        <Button size="sm" variant="destructive">Block</Button>
                      </BlockConfirmation>
                    )}

                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
            {totalPage  && (
        <div className="flex justify-end mt-4">
          <div>
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => setCurrentPage((prev) => prev - 1)}
                    className={
                      currentPage === 1
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
                {Array.from({ length: totalPage }, (_, index) => index + 1).map(
                  (page) => (
                    <PaginationItem
                      key={page}
                      onClick={() => setCurrentPage(page)}
                    >
                      <PaginationLink isActive={currentPage === page}>
                        {page}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => setCurrentPage((prev) => prev + 1)}
                    className={
                      currentPage === totalPage
                        ? "pointer-events-none opacity-50"
                        : "cursor-pointer"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </div>
      )}
    </Card>
  );
}
