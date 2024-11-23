import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
  ClockIcon,
  EllipsisHorizontalCircleIcon,
  CheckCircleIcon,
  RectangleStackIcon,
  PlusCircleIcon,
  ArchiveBoxIcon,
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
import { LucideUsers } from "lucide-react";
import UserTable from "../User/Partials/UserTable";
import { Calendar } from "@/shadcn/components/ui/calendar";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import AttendanceTable from "../Attendance/Partials/AttendanceTable";

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
  attendanceList,
}) {
  queryParams = queryParams || {};

  const [date, setDate] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isToggled, setIsToggled] = useState(queryParams.archived);

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route("dashboard"), queryParams, {
      preserveState: true,
      preserveScroll: true,
    });
  };

  const handleArchivedState = () => {
    setIsToggled((prevState) => {
      const newState = !prevState;

      searchFieldChanged("archived", newState ? true : null);

      return newState;
    });
  };

  const handleDateSelect = (selectedDate) => {
    setDate(selectedDate);
    if (selectedDate) {
      searchFieldChanged(
        "attendance_date",
        selectedDate.toLocaleDateString("en-CA")
      );
      setIsDialogOpen(true); // Open dialog when a date is selected
    }
  };
  const handleClose = () => {
    searchFieldChanged("attendance_date", {});
    setDate(null);
  };

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
                    <CardDescription></CardDescription>
                  </CardHeader>
                  <CardContent className="px-1 md:px-4">
                    <div
                      className={`grid gap-2 grid-cols-2 ${
                        !isStaff1 && "lg:grid-cols-4"
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
                      <div className="flex justify-center gap-2">
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
                        <Link
                          href={route("register")}
                          className="flex justify-end"
                        >
                          <Button
                            size="sm"
                            className="bg-gradient-to-b from-green-500 to-green-600 hover:to-green-700"
                          >
                            <PlusCircleIcon className="w-4 pb-[2px] mr-1" />
                            New User
                          </Button>
                        </Link>
                      </div>
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
                          <CardDescription>Registered Officers</CardDescription>
                        </div>
                      </div>
                    </CardContent>
                  </CardHeader>
                </Card>
              )}

              {/* Attendace Record */}
              {isStaff1 && (
                <Card>
                  <CardHeader>
                    <CardTitle>Attendance Report</CardTitle>
                    <CardDescription>
                      Click on date to show attendace list
                    </CardDescription>
                    <CardContent className="m-0 p-0">
                      <div className="pt-5 flex justify-center">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={handleDateSelect}
                          className="rounded-md border"
                        />
                      </div>

                      {date && (
                        <Dialog
                          open={isDialogOpen}
                          onOpenChange={(open) => !open && handleClose()}
                        >
                          <DialogContent className="max-w-xl max-h-[80vh]">
                            <DialogHeader>
                              <DialogTitle>Attendance Report as of</DialogTitle>
                              <DialogDescription>
                                {` ${date.getDate()} ${date.toLocaleString(
                                  "default",
                                  { month: "long" }
                                )} ${date.getFullYear()}`}
                              </DialogDescription>
                            </DialogHeader>
                            <div className="overflow-x-auto max-h-[50vh]">
                              <AttendanceTable
                                attendanceList={attendanceList}
                              />
                            </div>
                            <DialogFooter>
                              <a
                                href={route("attendance_list.pdf", {
                                  attendance_date:
                                    date.toLocaleDateString("en-CA"),
                                })}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                <Button
                                  size="sm"
                                  className="bg-green-500 hover:bg-green-600"
                                >
                                  Print
                                </Button>
                              </a>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      )}
                    </CardContent>
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
