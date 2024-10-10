import React from "react";
import {
  Table,
  TableRow,
  TableHead,
  TableHeader,
  TableBody,
  TableCell,
} from "@/shadcn/components/ui/table";
import { TASK_STATUS_CLASS_MAP, TASK_STATUS_TEXT_MAP } from "@/constants";
import TableHeading from "@/Components/TableHeading";
import { router } from "@inertiajs/react";

const TaskTable = ({ tasks, queryParams }) => {
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

    router.get(route("task.index"), queryParams);
  };
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHeading
            sort_field={queryParams.sort_field}
            sort_direction={queryParams.sort_direction}
            name={"id"}
            sortChanged={sortChanged}
          >
            ID
          </TableHeading>
          <TableHeading
            sort_field={queryParams.sort_field}
            sort_direction={queryParams.sort_direction}
            name={"title"}
            sortChanged={sortChanged}
          >
            Title
          </TableHeading>
          <TableHead>Description</TableHead>
          <TableHeading
            sort_field={queryParams.sort_field}
            sort_direction={queryParams.sort_direction}
            name={"status"}
            sortChanged={sortChanged}
          >
            Status
          </TableHeading>
          <TableHeading
            sort_field={queryParams.sort_field}
            sort_direction={queryParams.sort_direction}
            name={"due_date"}
            sortChanged={sortChanged}
          >
            Date Posted
          </TableHeading>
          <TableHeading
            sort_field={queryParams.sort_field}
            sort_direction={queryParams.sort_direction}
            name={"due_date"}
            sortChanged={sortChanged}
          >
            Due Date
          </TableHeading>
          <TableHead className="text-center">Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.data.length > 0 ? (
          tasks.data.map((task) => (
            <TableRow key={task.id}>
              <TableCell className="font-medium">{task.id}</TableCell>
              <TableCell>{task.title}</TableCell>
              <TableCell>{task.description}</TableCell>
              <TableHead className="text-nowrap">
                <span
                  className={
                    "px-2 py-2 rounded text-white " +
                    TASK_STATUS_CLASS_MAP[task.status]
                  }
                >
                  {TASK_STATUS_TEXT_MAP[task.status]}
                </span>
              </TableHead>
              <TableCell className="text-nowrap">{task.posted_at}</TableCell>
              <TableCell className="text-center">{task.due_date}</TableCell>
              <TableCell className="text-center">
                <span className="text-red-600 hover:cursor-pointer">
                  Archive
                </span>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={6} className="text-center">
              No tasks found
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default TaskTable;
