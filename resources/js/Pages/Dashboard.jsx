import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import {
  ClockIcon,
  EllipsisHorizontalCircleIcon,
  CheckCircleIcon,
  RectangleStackIcon,
  ArrowLongRightIcon,
} from "@heroicons/react/16/solid";

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
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-2 flex gap-4">
              <Card className="w-[300px]">
                <CardHeader className="flex flex-row justify-between relative pb-4">
                  <CardTitle className="text-lg font-medium">
                    Pending Tasks
                  </CardTitle>
                  <ClockIcon className="w-[22px] absolute top-5 right-4 text-amber-500" />
                </CardHeader>
                <CardContent>
                  <span className="text-5xl font-extrabold">
                    {pendingCount}
                  </span>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Link href="#">
                    <ArrowLongRightIcon className="w-[22px] text-green-700 hover:text-green-400" />
                  </Link>
                </CardFooter>
              </Card>

              <Card className="w-[300px]">
                <CardHeader className="flex flex-row justify-between relative pb-4">
                  <CardTitle className="text-lg font-medium">
                    In Progress Tasks
                  </CardTitle>
                  <EllipsisHorizontalCircleIcon className="w-[22px] absolute top-5 right-4 text-blue-500" />
                </CardHeader>
                <CardContent>
                  <span className="text-5xl font-extrabold">
                    {in_progressCount}
                  </span>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Link href="#">
                    <ArrowLongRightIcon className="w-[22px] text-green-700 hover:text-green-400" />
                  </Link>
                </CardFooter>
              </Card>

              <Card className="w-[300px]">
                <CardHeader className="flex flex-row justify-between relative pb-4">
                  <CardTitle className="text-lg font-medium">
                    Completed Tasks
                  </CardTitle>
                  <CheckCircleIcon className="w-[22px] absolute top-5 right-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <span className="text-5xl font-extrabold">
                    {completedCount}
                  </span>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Link href="#">
                    <ArrowLongRightIcon className="w-[22px] text-green-700 hover:text-green-400" />
                  </Link>
                </CardFooter>
              </Card>

              <Card className="w-[300px]">
                <CardHeader className="flex flex-row justify-between relative pb-4">
                  <CardTitle className="text-lg font-medium">
                    Total Tasks
                  </CardTitle>
                  <RectangleStackIcon className="w-[22px] absolute top-5 right-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <span className="text-5xl font-extrabold">{tasksCount}</span>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Link href="#">
                    <ArrowLongRightIcon className="w-[22px] text-green-700 hover:text-green-400" />
                  </Link>
                </CardFooter>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
