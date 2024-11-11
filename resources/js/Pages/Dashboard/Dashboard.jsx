import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  ClockIcon,
  EllipsisHorizontalCircleIcon,
  CheckCircleIcon,
  RectangleStackIcon,
  PlusIcon,
} from "@heroicons/react/16/solid";
import CardExt_TaskReport from "./Partials/CardExt_TaskReport";
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
  const currentDate = new Date();

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
                      <CardExt_TaskReport
                        count={pendingCount}
                        icon={<ClockIcon className="w-12 text-amber-500" />}
                        cardColor="bg-amber-500"
                      >
                        Pending
                      </CardExt_TaskReport>

                      <CardExt_TaskReport
                        count={in_progressCount}
                        icon={
                          <EllipsisHorizontalCircleIcon className="w-12 text-blue-500" />
                        }
                        cardColor="bg-blue-500"
                      >
                        In Progress
                      </CardExt_TaskReport>

                      <CardExt_TaskReport
                        count={completedCount}
                        icon={
                          <CheckCircleIcon className="w-12 text-green-500" />
                        }
                        cardColor="bg-green-500"
                      >
                        Completed
                      </CardExt_TaskReport>

                      <CardExt_TaskReport
                        count={tasksCount}
                        icon={
                          <RectangleStackIcon className="w-12 text-slate-700" />
                        }
                        cardColor="bg-slate-700"
                      >
                        Overall Tasks
                      </CardExt_TaskReport>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Right Wing */}
              {(!isNotCorps || isStaff1) && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex justify-between items-center">
                      <span>Registered Users</span>
                      <Link
                        href={route("register")}
                        className="flex justify-end"
                      >
                        <Button
                          size="sm"
                          className="bg-gradient-to-b from-green-500 to-green-600 hover:to-green-500"
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
            <div className="space-y-3">
              {/* Officer Count Card*/}
              {(!isNotCorps || isStaff1) && (
                <Card>
                  <CardHeader>
                    <CardTitle>Officers</CardTitle>
                    <CardContent>
                      <div className="pt-4 grid grid-cols-4 items-center">
                        <LucideUsers className="w-20 h-20 text-green-800" />
                        <div className="pl-8 col-start-2 col-span-3 self-end md:pl-0">
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

              {/* Attendace Record */}
              {isStaff1 && (
                <Card>
                  <CardHeader className="float">
                    <CardTitle>Attendance Report</CardTitle>
                    <CardDescription>
                      Today is
                      {` ${currentDate.getDate()} ${currentDate.toLocaleString(
                        "default",
                        { month: "long" }
                      )} ${currentDate.getFullYear()}`}
                    </CardDescription>
                  </CardHeader>
                </Card>
              )}
            </div>
          </div>
          {/* </div> */}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
