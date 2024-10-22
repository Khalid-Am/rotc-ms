import React from "react";
import { TableHead } from "@/shadcn/components/ui/table";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";

const TableHeading = ({
  sort_field = null,
  sort_direction = null,
  name,
  sortable = true,
  sortChanged = () => {},
  children,
}) => {
  return (
    <TableHead onClick={(e) => sortChanged(name)}>
      <div className="flex items-center justify-around cursor-pointer text-nowrap">
        {children}
        {sortable && (
          <div className="ml-1">
            <ChevronUpIcon
              className={
                "w-4 " +
                (sort_field === name && sort_direction === "asc"
                  ? "text-green-700"
                  : "text-gray-400")
              }
            />
            <ChevronDownIcon
              className={
                "w-4 -mt-2 " +
                (sort_field === name && sort_direction === "desc"
                  ? "text-green-700"
                  : "text-gray-400")
              }
            />
          </div>
        )}
      </div>
    </TableHead>
  );
};

export default TableHeading;
