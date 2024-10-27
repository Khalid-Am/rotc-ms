import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import TableHeading from "@/Components/TableHeading";
import { router } from "@inertiajs/react";

const UserTable = ({ users, queryParams }) => {
  queryParams = queryParams || {};

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeading name="id" queryParams={queryParams} path="user.index">
            ID
          </TableHeading>
          <TableHead>Name</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.data.length > 0 ? (
          users.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="">{user.id}</TableCell>
              <TableCell className="">
                {user.officer.firstName +
                  " " +
                  user.officer.middleName +
                  " " +
                  user.officer.lastName}
              </TableCell>
              <TableCell className="">{user?.role}</TableCell>
              <TableCell className=""></TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No User found.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default UserTable;
