import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";

import { PlusCircleIcon } from "@heroicons/react/16/solid";
import SearchField from "@/Components/SearchField";
import Pagination from "@/Components/Pagination";
import TaskTable from "./Partials/TaskTable";
import CreateTaskForm from "./Partials/CreateTaskForm";

const Index = ({ tasks, queryParams = null }) => {
  queryParams = queryParams || {};
  return (
    <AuthenticatedLayout
      header={
        <div className="grid grid-cols-2">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            My Tasks
          </h2>
          <div className="flex justify-end">
            <CreateTaskForm>ADD TASK</CreateTaskForm>
          </div>
        </div>
      }
    >
      <Head title="Tasks" />

      <div className="py-10">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="grid grid-cols-12 gap-3">
                <SearchField
                  queryParams={queryParams}
                  path={"task.index"}
                  className="mb-2 col-span-10 md:col-span-5 lg:col-span-4"
                />
              </div>
              <TaskTable tasks={tasks} queryParams={queryParams} />
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
