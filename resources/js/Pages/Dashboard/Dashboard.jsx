import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  ClockIcon,
  EllipsisHorizontalCircleIcon,
  CheckCircleIcon,
  RectangleStackIcon,
  EllipsisVerticalIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";
import CardExt_Tasks from "./Partials/CardExt_Tasks";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { Button } from "@/shadcn/components/ui/button";
import { LucideUsers, PlusCircleIcon } from "lucide-react";
import UserTable from "../User/Partials/UserTable";

export default function Dashboard({
  pendingCount,
  in_progressCount,
  completedCount,
  tasksCount,
  users,
  userCount,
  officerCount,
  queryParams = {},
  isNotCorps,
  isStaff1,
}) {
  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          My Dashboard
        </h2>
      }
    >
      <Head title="Dashboard" />

      <div className="py-5">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          {/* <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg"> */}
          <div
            className={`grid grid-cols-1 gap-4 lg:${
              isNotCorps && !isStaff1 ? "grid-cols-1" : "grid-cols-2"
            }`}
          >
            {/* Left Wing */}
            <div className="space-y-3">
              {/* Tasks Stats Card */}
              {isNotCorps && (
                <Card>
                  <CardHeader>
                    <CardTitle>Tasks</CardTitle>
                    <CardDescription>Data Count</CardDescription>
                  </CardHeader>
                  <CardContent className="px-1 md:px-4">
                    <div
                      className={`grid gap-2 grid-cols-${
                        !isNotCorps || !isStaff1 ? "4" : "2"
                      }`}
                    >
                      <CardExt_Tasks
                        count={pendingCount}
                        icon={<ClockIcon className="w-12 text-amber-500" />}
                        cardColor="bg-amber-500"
                      >
                        Pending
                      </CardExt_Tasks>

                      <CardExt_Tasks
                        count={in_progressCount}
                        icon={
                          <EllipsisHorizontalCircleIcon className="w-12 text-blue-500" />
                        }
                        cardColor="bg-blue-500"
                      >
                        In Progress
                      </CardExt_Tasks>

                      <CardExt_Tasks
                        count={completedCount}
                        icon={
                          <CheckCircleIcon className="w-12 text-green-500" />
                        }
                        cardColor="bg-green-500"
                      >
                        Completed
                      </CardExt_Tasks>

                      <CardExt_Tasks
                        count={tasksCount}
                        icon={
                          <RectangleStackIcon className="w-12 text-slate-700" />
                        }
                        cardColor="bg-slate-700"
                      >
                        Overall Tasks
                      </CardExt_Tasks>
                    </div>
                  </CardContent>
                </Card>
              )}
              {/* Officer Count Card*/}
              {(!isNotCorps || isStaff1) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Officers</CardTitle>
                    <CardContent>
                      <div className="pt-4 grid grid-cols-4 items-center">
                        <LucideUsers className="w-20 h-20 text-green-800" />
                        <div className="col-start-2 col-span-3 self-end">
                          <h1 className="text-4xl font-semibold">
                            {officerCount}
                          </h1>
                          <CardDescription>
                            Numbers of Registered Officers
                          </CardDescription>
                        </div>
                      </div>
                    </CardContent>
                  </CardHeader>
                </Card>
              )}
            </div>

            {/* Right Wing */}
            {(!isNotCorps || isStaff1) && (
              <Card>
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <span>Registered Users</span>
                    <Link href={route("register")} className="flex justify-end">
                      <Button
                        size="sm"
                        className="bg-green-700 hover:bg-green-500 focus:bg-green-700"
                      >
                        <PlusIcon className="w-4 pb-[2px] mr-1" />
                        ADD USER
                      </Button>
                    </Link>
                  </CardTitle>
                  <CardContent className="px-0 pt-4">
                    <UserTable users={users} queryParams={queryParams} />
                  </CardContent>
                </CardHeader>
              </Card>
            )}
          </div>
          {/* </div> */}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
