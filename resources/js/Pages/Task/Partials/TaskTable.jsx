import React, { useEffect, useState } from "react";
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
import { Link, router } from "@inertiajs/react";
import UpdateTaskForm from "./UpdateTaskForm";
import { useToast } from "@/shadcn/hooks/use-toast";
import {
  ArchiveBoxIcon,
  ArrowPathRoundedSquareIcon,
  EyeIcon,
  TrashIcon,
  ArchiveBoxArrowDownIcon,
  ExclamationCircleIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/16/solid";
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

const TaskTable = ({
  tasks,
  queryParams,
  showIdColumn = true,
  showActionColumn = true,
  path,
}) => {
  queryParams = queryParams || {};
  const { toast } = useToast();
  const [flashMessage, setFlashMessage] = useState(null);

  const onArchive = (task) => {
    router.delete(route("task.destroy", task.id), {
      onSuccess: (page) => {
        setFlashMessage(page.props.flash.success);
      },
    });
  };

  const onRestore = (task) => {
    router.post(
      route("task.restore", task.id),
      {},
      {
        onSuccess: (page) => {
          setFlashMessage(page.props.flash.success);
        },
      }
    );
  };

  const onForceDelete = (task) => {
    router.post(
      route("task.force_delete", task.id),
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
    }
    setFlashMessage(null);
  }, [flashMessage]);

  return (
    <div className="w-full overflow-x-auto">
      <Table className="table-auto min-w-full">
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
            <TableHeading
              name={"due_date"}
              queryParams={queryParams}
              path={path}
            >
              Due Date
            </TableHeading>
            <TableHeading
              name={"posted_at"}
              queryParams={queryParams}
              path={path}
            >
              Date Posted
            </TableHeading>
            {showActionColumn && <TableHead>Action</TableHead>}
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
                <TableCell className="overflow-auto">
                  {task.description}
                </TableCell>
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
                  <TableCell className="space-y-1">
                    {queryParams.archived ? (
                      <>
                        <span
                          className="text-green-500 cursor-pointer flex"
                          onClick={() => onRestore(task)}
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
                                This task will be permanently deleted in the
                                system. Are you sure you want to proceed?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onForceDelete(task)}
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
                        <UpdateTaskForm task={task} className="flex">
                          <EyeIcon className="w-4 h-4 mr-2" />
                          Edit
                        </UpdateTaskForm>
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
                                This task will be archived. Are you sure you
                                want to proceed?
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Cancel</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => onArchive(task)}
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
                )}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="text-center">
                {queryParams.archived ? "No archived tasks" : "No tasks found"}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TaskTable;
