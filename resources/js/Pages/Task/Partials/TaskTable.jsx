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
import UpdateTaskForm from "./UpdateTaskForm";
import { useToast } from "@/shadcn/hooks/use-toast";

const TaskTable = ({
  tasks,
  queryParams,
  showIdColumn = true,
  showActionColumn = true,
  path,
}) => {
  queryParams = queryParams || {};
  const { toast } = useToast();

  const onArchive = (task) => {
    router.delete(route("task.destroy", task.id), {
      onSuccess: () => {
        toast({
          variant: "archived",
          description: "Task was archived!",
        });
      },
    });
  };

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {showIdColumn && (
            <TableHeading name={"id"} queryParams={queryParams} path={path}>
              ID
            </TableHeading>
          )}
          <TableHeading name={"title"} queryParams={queryParams} path={path}>
            Title
          </TableHeading>
          <TableHead>Description</TableHead>
          <TableHeading name={"status"} queryParams={queryParams} path={path}>
            Status
          </TableHeading>
          <TableHeading name={"due_date"} queryParams={queryParams} path={path}>
            Due Date
          </TableHeading>
          <TableHeading
            name={"posted_at"}
            queryParams={queryParams}
            path={path}
          >
            Date Posted
          </TableHeading>
          {showActionColumn && (
            <TableHead className="text-center">Action</TableHead>
          )}
        </TableRow>
      </TableHeader>
      <TableBody>
        {tasks.data.length > 0 ? (
          tasks.data.map((task) => (
            <TableRow key={task.id}>
              {showIdColumn && (
                <TableCell className="font-medium">{task.id}</TableCell>
              )}
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
              <TableCell className="text-center">{task.due_date}</TableCell>
              <TableCell className="text-nowrap">{task.posted_at}</TableCell>
              {showActionColumn && (
                <TableCell className="text-center">
                  <UpdateTaskForm task={task}>Edit</UpdateTaskForm>
                  <span
                    className="text-green-600 hover:cursor-pointer ml-2"
                    onClick={(e) => onArchive(task)}
                  >
                    Archive
                  </span>
                </TableCell>
              )}
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
