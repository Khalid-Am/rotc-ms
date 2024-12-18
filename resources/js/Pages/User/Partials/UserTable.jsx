import React, { useEffect, useState } from "react";
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
  ExclamationTriangleIcon,
  UserIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/16/solid";
import { Button } from "@/shadcn/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/shadcn/components/ui/alert-dialog";
import { useToast } from "@/shadcn/hooks/use-toast";

const UserTable = ({ users, queryParams, status }) => {
  // queryParams = queryParams || {};

  const { toast } = useToast();
  const [flashMessage, setFlashMessage] = useState(null);

  const handleArchive = (user) => {
    router.delete(route("user.destroy", user.id), {
      onSuccess: (page) => {
        const message = page.props.flash.success;
        setFlashMessage(message);
      },
      preserveState: true,
      preserveScroll: true,
    });
  };
  const onRestore = (user) => {
    router.post(
      route("user.restore", user.id),
      {},
      {
        onSuccess: (page) => {
          const message = page.props.flash.success;
          setFlashMessage(message);
        },
      }
    );
  };

  const onForceDelete = (user) => {
    router.post(
      route("user.force_delete", user.id),
      {},
      {
        onSuccess: (page) => {
          setFlashMessage(page.props.flash.success);
        },
      }
    );
  };

  useEffect(() => {
    if (flashMessage) {
      toast({ variant: "success", description: flashMessage, duration: 4000 });
      setFlashMessage(null);
    }
  }, [flashMessage, toast]);

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
                  `${user.officer.firstName} ${
                    user.officer?.middleName || ""
                  } ${user.officer.lastName}`}
              </TableCell>
              <TableCell className="">{user.username}</TableCell>
              <TableCell className="text-center">
                <AlertDialog>
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <div className="p-2 text-center rounded-md hover:bg-gray-200">
                        <EllipsisHorizontalIcon className="w-4" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      {queryParams.archived ? (
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            className="text-green-700 focus:text-green-500 cursor-pointer"
                            onClick={() => onRestore(user)}
                          >
                            <EyeIcon />
                            Restore
                          </DropdownMenuItem>
                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="text-red-700 focus:text-red-500 cursor-pointer">
                              <ArchiveBoxArrowDownIcon />
                              Delete
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                        </DropdownMenuGroup>
                      ) : (
                        <DropdownMenuGroup>
                          {user.officer?.id ? (
                            <DropdownMenuItem
                              className="text-blue-700 focus:text-blue-500 cursor-pointer"
                              onClick={() =>
                                router.get(
                                  route("officer.show", user.officer.id)
                                )
                              }
                            >
                              <EyeIcon />
                              View
                            </DropdownMenuItem>
                          ) : null}

                          <AlertDialogTrigger asChild>
                            <DropdownMenuItem className="text-green-700 focus:text-green-500 cursor-pointer">
                              <ArchiveBoxArrowDownIcon />
                              Archive
                            </DropdownMenuItem>
                          </AlertDialogTrigger>
                        </DropdownMenuGroup>
                      )}
                    </DropdownMenuContent>
                  </DropdownMenu>

                  {!queryParams.archived ? (
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          <ExclamationTriangleIcon className="text-yellow-500 w-5 h-5 mr-2 inline-block" />
                          Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Archiving this user will also archive all tasks
                          associated with them. Are you sure you want to
                          proceed?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleArchive(user)}
                          className="bg-amber-500 hover:bg-amber-600"
                        >
                          Proceed
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  ) : (
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          <ExclamationCircleIcon className="text-red-500 w-5 h-5 mr-2 inline-block" />
                          Are you sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          Once this account is deleted, all of its resources and
                          data will be permanently deleted. Are you sure you
                          want to proceed?
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => onForceDelete(user)}
                          className="bg-red-500 hover:bg-red-600"
                        >
                          Proceed
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  )}
                </AlertDialog>
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
