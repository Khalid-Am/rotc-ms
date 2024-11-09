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
} from "@heroicons/react/16/solid";
import { RANK_TEXT_MAP } from "@/constants";

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
          <TableHead className="text-center">Action</TableHead>
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
                    <span
                      className="text-red-500 flex cursor-pointer"
                      onClick={() => onForceDelete(officer)}
                    >
                      <TrashIcon className="h-4 w-4 mr-2" /> Delete
                    </span>
                  </>
                ) : (
                  <>
                    <Link
                      href={route("officer.show", officer.id)}
                      className="text-blue-700 flex gap-1"
                    >
                      <EyeIcon className="w-[15px]" />
                      <span className="mt-1">View</span>
                    </Link>
                    <span
                      onClick={() => onArchive(officer)}
                      className="text-gray-500 hover:cursor-pointer flex gap-1"
                    >
                      <ArchiveBoxArrowDownIcon className="w-[15px]" />
                      <span className="mt-1">Archive</span>
                    </span>
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
