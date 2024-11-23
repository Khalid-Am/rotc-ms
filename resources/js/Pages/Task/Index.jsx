import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useState } from "react";

import Pagination from "@/Components/Pagination";
import TaskTable from "./Partials/TaskTable";
import CreateTaskForm from "./Partials/CreateTaskForm";
import TaskFilter from "./Partials/TaskFilter";
import { Button } from "@/shadcn/components/ui/button";
import { ArchiveBoxIcon, RectangleStackIcon } from "@heroicons/react/16/solid";

const Index = ({ tasks, queryParams = null }) => {
  queryParams = queryParams || {};

  const [isToggled, setIsToggled] = useState(queryParams.archived);

  const searchFieldChanged = (name, value) => {
    const newQueryParams = { ...queryParams, page: 1 };
    if (value) {
      newQueryParams[name] = value;
    } else {
      delete newQueryParams[name];
    }
    router.get(route("task.index"), newQueryParams, { preserveState: true });
  };

  const handleArchivedState = () => {
    setIsToggled((prevState) => {
      const newState = !prevState;

      searchFieldChanged("archived", newState ? true : null);

      return newState;
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="grid grid-cols-2">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            My Tasks
          </h2>
          <div className="flex gap-3 justify-end">
            <Button
              size="sm"
              className="bg-gray-500 hover:bg-gray-600"
              onClick={() => handleArchivedState()}
            >
              {!isToggled ? (
                <>
                  <ArchiveBoxIcon className="w-4 h-4 mr-2" />
                  Archived
                </>
              ) : (
                <>
                  <RectangleStackIcon className="w-4 h-4 mr-2" />
                  All
                </>
              )}
            </Button>
            <CreateTaskForm>New Task</CreateTaskForm>
          </div>
        </div>
      }
    >
      <Head title="Tasks" />

      <div className="py-6">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              <div className="grid lg:grid-cols-2 pb-4">
                <TaskFilter queryParams={queryParams} />
              </div>
              <TaskTable
                tasks={tasks}
                queryParams={queryParams}
                path="task.index"
              />
              <div className="my-4">
                <Pagination links={tasks.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
