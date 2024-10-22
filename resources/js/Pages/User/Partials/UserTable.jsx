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
  const sortChanged = (name) => {
    if (name === queryParams.sort_field) {
      if (queryParams.sort_direction === "asc") {
        queryParams.sort_direction = "desc";
      } else {
        queryParams.sort_direction = "asc";
      }
    } else {
      queryParams.sort_field = name;
      queryParams.sort_direction = "asc";
    }

    router.get(route("user.index"), queryParams);
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeading
            name="id"
            sort_field={queryParams.sort_field}
            sort_direction={queryParams.sort_direction}
            sortChanged={sortChanged}
          >
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
              <TableCell className="">{user?.id}</TableCell>
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
