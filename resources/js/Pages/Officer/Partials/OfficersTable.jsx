import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { useToast } from "@/shadcn/hooks/use-toast";
import { Link, router, usePage } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import {
  EyeIcon,
  ArchiveBoxArrowDownIcon,
  ArrowPathRoundedSquareIcon,
  TrashIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/16/solid";
import { RANK_TEXT_MAP } from "@/constants";
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

const OfficersTable = ({ officers, queryParams }) => {
  queryParams = queryParams || {};
  const { toast } = useToast();
  const [flashMessage, setFlashMessage] = useState(null);

  const onArchive = (officer) => {
    router.delete(route("officer.destroy", officer.id), {
      onSuccess: (page) => {
        const message = page.props.flash.success;
        setFlashMessage(message);
      },
    });
  };

  const onRestore = (officer) => {
    router.post(
      route("officer.restore", officer.id),
      {},
      {
        onSuccess: (page) => {
          const message = page.props.flash.success;
          setFlashMessage(message);
        },
      }
    );
  };

  const onForceDelete = (officer) => {
    router.post(
      route("officer.force_delete", officer.id),
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
      toast({
        variant: "success",
        description: flashMessage,
        duration: 4000,
      });
      setFlashMessage(null);
    }
  }, [flashMessage]);

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeading
            name="id"
            queryParams={queryParams}
            path="officer.index"
          >
            ID
          </TableHeading>
          <TableHeading
            name="student_id"
            queryParams={queryParams}
            path="officer.index"
          >
            Student ID
          </TableHeading>
          <TableHeading
            name="firstName"
            queryParams={queryParams}
            path="officer.index"
          >
            First Name
          </TableHeading>
          <TableHeading
            name="middleName"
            queryParams={queryParams}
            path="officer.index"
          >
            Middle Name
          </TableHeading>
          <TableHeading
            name="lastName"
            queryParams={queryParams}
            path="officer.index"
          >
            Last Name
          </TableHeading>

          <TableHeading
            name="rank"
            queryParams={queryParams}
            path="officer.index"
          >
            Rank
          </TableHeading>
          <TableHeading
            name="class"
            queryParams={queryParams}
            path="officer.index"
          >
            Class
          </TableHeading>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {officers.data.length > 0 ? (
          officers.data.map((officer) => (
            <TableRow key={officer.id}>
              <TableCell className="text-nowrap">{officer?.id}</TableCell>
              <TableCell className="text-nowrap">
                {officer?.student_id}
              </TableCell>
              <TableCell className="text-nowrap">{officer.firstName}</TableCell>
              <TableCell className="text-nowrap">
                {officer?.middleName}
              </TableCell>
              <TableCell className="text-nowrap">{officer.lastName}</TableCell>
              <TableCell className="text-nowrap">
                {RANK_TEXT_MAP[officer.rank]}
              </TableCell>
              <TableCell>{officer?.class}</TableCell>
              <TableCell className="space-y-1">
                {queryParams.archived ? (
                  <>
                    <span
                      className="text-green-500 flex cursor-pointer"
                      onClick={() => onRestore(officer)}
                    >
                      <ArrowPathRoundedSquareIcon className="h-4 w-4 mr-2" />
                      Restore
                    </span>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <span className="text-red-500 flex cursor-pointer">
                          <TrashIcon className="h-4 w-4 mr-2" /> Delete
                        </span>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex">
                            <ExclamationCircleIcon className="w-5 h-5 mr-2 self-center text-red-500" />
                            Are you sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Deleting this officer will permanently remove their
                            record. Are you sure you want to proceed?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onForceDelete(officer)}
                            className="bg-red-500 text-white hover:bg-red-600"
                          >
                            Proceed
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                ) : (
                  <>
                    <Link
                      href={route("officer.show", officer.id)}
                      className="text-blue-700 flex"
                    >
                      <EyeIcon className="w-4 h-4 mr-2" />
                      <span>View</span>
                    </Link>
                    <AlertDialog>
                      <AlertDialogTrigger>
                        <span className="text-gray-500 hover:cursor-pointer flex">
                          <ArchiveBoxArrowDownIcon className="w-4 h-4 mr-2" />
                          <span>Archive</span>
                        </span>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle className="flex">
                            <ExclamationTriangleIcon className="w-5 h-5 mr-2 self-center text-amber-500" />
                            Are you sure?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Archiving this officer will also archive all records
                            associated with them including account. Are you sure
                            you want to proceed?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Cancel</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => onArchive(officer)}
                            className="bg-amber-500 hover:bg-amber-600"
                          >
                            Proceed
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </>
                )}
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              {queryParams.archived
                ? "No archived officers."
                : "No officers found."}
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default OfficersTable;
