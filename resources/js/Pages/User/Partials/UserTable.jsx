import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";
import TableHeading from "@/Components/TableHeading";
import { router } from "@inertiajs/react";
import {
  EllipsisHorizontalIcon,
  EyeIcon,
  ArchiveBoxArrowDownIcon,
} from "@heroicons/react/16/solid";
import { Button } from "@/shadcn/components/ui/button";

const UserTable = ({ users, queryParams }) => {
  queryParams = queryParams || {};

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Role</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Username</TableHead>
          <TableHead></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.data.length > 0 ? (
          users.data.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="">{user.role}</TableCell>
              <TableCell className="">
                {user.officer?.id &&
                  `${user.officer.firstName} ${user.officer?.middleName} ${user.officer.lastName}`}
              </TableCell>
              <TableCell className="">{user.username}</TableCell>
              <TableCell className="text-center">
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="p-2 text-center rounded-md hover:bg-gray-200">
                      <EllipsisHorizontalIcon className="w-4" />
                    </div>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuGroup>
                        {user.officer?.id ? (
                          <DropdownMenuItem
                            className="text-blue-700 focus:text-blue-500"
                            onClick={() =>
                              router.get(route("officer.show", user.officer.id))
                            }
                          >
                            <EyeIcon />
                            View
                          </DropdownMenuItem>
                        ) : null}
                        <DropdownMenuItem className="text-green-700 focus:text-green-500">
                          <ArchiveBoxArrowDownIcon />
                          Archive
                        </DropdownMenuItem>
                      </DropdownMenuGroup>
                    </DropdownMenuContent>
                  </DropdownMenuTrigger>
                </DropdownMenu>
              </TableCell>
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
