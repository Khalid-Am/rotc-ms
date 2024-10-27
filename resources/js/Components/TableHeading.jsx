import React from "react";
import { TableHead } from "@/shadcn/components/ui/table";
import { ChevronUpIcon, ChevronDownIcon } from "@heroicons/react/16/solid";
import { router } from "@inertiajs/react";

const TableHeading = ({
  name,
  sortable = true,
  path,
  queryParams,
  children,
}) => {
  queryParams = queryParams || {};
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

    router.get(route(path), queryParams);
  };

  return (
    <TableHead onClick={(e) => sortChanged(name)}>
      <div className="flex items-center justify-around cursor-pointer text-nowrap">
        {children}
        {sortable && (
          <div className="ml-1">
            <ChevronUpIcon
              className={
                "w-4 " +
                (queryParams.sort_field === name &&
                queryParams.sort_direction === "asc"
                  ? "text-green-700"
                  : "text-gray-400")
              }
            />
            <ChevronDownIcon
              className={
                "w-4 -mt-2 " +
                (queryParams.sort_field === name &&
                queryParams.sort_direction === "desc"
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
