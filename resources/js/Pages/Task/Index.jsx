import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";

import Pagination from "@/Components/Pagination";
import TaskTable from "./Partials/TaskTable";
import CreateTaskForm from "./Partials/CreateTaskForm";
import TaskFilter from "./Partials/TaskFilter";
import { Button } from "@/shadcn/components/ui/button";

const Index = ({ tasks, queryParams = null }) => {
  queryParams = queryParams || {};

  return (
    <AuthenticatedLayout
      header={
        <div className="grid grid-cols-2">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            My Tasks
          </h2>
          <div className="flex gap-3 justify-end">
            <div>
              <CreateTaskForm>ADD TASK</CreateTaskForm>
            </div>
            {/* <Link>
              <Button className="bg-blue-500 hover:bg-blue-400 focus:bg-blue-400">
                View Archived
              </Button>
            </Link> */}
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
