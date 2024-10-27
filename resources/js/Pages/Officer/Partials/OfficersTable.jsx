import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import { useToast } from "@/shadcn/hooks/use-toast";
import { Link, router } from "@inertiajs/react";
import TableHeading from "@/Components/TableHeading";
import { EyeIcon, ArchiveBoxArrowDownIcon } from "@heroicons/react/16/solid";

const OfficersTable = ({ officers, queryParams }) => {
  queryParams = queryParams || {};
  const { toast } = useToast();

  const onArchive = (officer) => {
    router.delete(route("officer.destroy", officer.id), {
      onSuccess: () => {
        toast({
          variant: "archived",
          description: "Officer was archived!",
        });
      },
    });
  };

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
              <TableCell className="text-nowrap">{officer?.rank}</TableCell>
              <TableCell>{officer?.class}</TableCell>
              <TableCell className="flex">
                <Link
                  href={route("officer.show", officer.id)}
                  className="px-3 text-blue-700 flex gap-1"
                >
                  <EyeIcon className="w-[15px]" />
                  <span className="mt-1">View</span>
                </Link>
                <span
                  onClick={(e) => onArchive(officer)}
                  className="text-green-600 hover:cursor-pointer flex gap-1"
                >
                  <ArchiveBoxArrowDownIcon className="w-[15px]" />
                  <span className="mt-1">Archive</span>
                </span>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={8} className="text-center">
              No officer found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default OfficersTable;
