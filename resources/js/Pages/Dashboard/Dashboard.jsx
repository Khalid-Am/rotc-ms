import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import {
  ClockIcon,
  EllipsisHorizontalCircleIcon,
  CheckCircleIcon,
  RectangleStackIcon,
} from "@heroicons/react/16/solid";
import CardExt_Tasks from "./Partials/CardExt_Tasks";

export default function Dashboard({
  pendingCount,
  in_progressCount,
  completedCount,
  tasksCount,
}) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-5">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg"> */}
          <div className="flex gap-4">
            <CardExt_Tasks
              count={pendingCount}
              icon={
                <ClockIcon className="w-[22px] absolute top-5 right-4 text-amber-500" />
              }
              path="#"
            >
              Pending
            </CardExt_Tasks>

            <CardExt_Tasks
              count={in_progressCount}
              icon={
                <EllipsisHorizontalCircleIcon className="w-[22px] absolute top-5 right-4 text-blue-500" />
              }
              path="#"
            >
              In Progress
            </CardExt_Tasks>

            <CardExt_Tasks
              count={completedCount}
              icon={
                <CheckCircleIcon className="w-[22px] absolute top-5 right-4 text-green-500" />
              }
              path="#"
            >
              Completed
            </CardExt_Tasks>

            <CardExt_Tasks
              count={tasksCount}
              icon={
                <RectangleStackIcon className="w-[22px] absolute top-5 right-4 text-amber-500" />
              }
              path="#"
            >
              Total
            </CardExt_Tasks>
          </div>
          {/* </div> */}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
