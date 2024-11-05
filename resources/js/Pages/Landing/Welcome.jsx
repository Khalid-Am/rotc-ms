import { Head, Link } from "@inertiajs/react";
import AttendanceForm from "./Partials/AttendanceForm";
import { Toaster } from "@/shadcn/components/ui/toaster";
import TasksView from "./Partials/TasksView";
import LoginForm from "../Auth/LoginForm";
import ApplicationLogo from "@/Components/ApplicationLogo";

export default function Welcome({ auth, status, tasks, queryParams = null }) {
  queryParams = queryParams || {};
  const motto = ["HONOR", "PATRIOTISM", "DUTY"];

  return (
    <>
      <Toaster />

      <Head title="Welcome" />
      <div className="bg-gray-50 text-black/50 dark:bg-black dark:text-white/50">
        <div className="relative flex min-h-screen flex-col items-center justify-center selection:bg-green-600 selection:text-white">
          <div className="relative w-full max-w-2xl px-6 lg:max-w-7xl">
            <header className="grid grid-cols-2 items-center gap-2 py-10">
              <div className="flex lg:justify-start">
                <ApplicationLogo className="block h-auto max-w-28" />
                <span className="text-3xl self-center font-extrabold text-green-600">
                  ROTC <br /> MONITORING SYSTEM
                </span>
              </div>
              <nav className="-mx-3 flex flex-1 justify-end">
                {auth.user ? (
                  <Link
                    href={route("dashboard")}
                    className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                  >
                    Dashboard
                  </Link>
                ) : (
                  <>
                    {/* <Link
                      href={route("login")}
                      className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                    >
                      Log in
                    </Link> */}
                    <LoginForm status={status} />
                  </>
                )}
              </nav>
            </header>

            <main className="mt-6">
              <div className="grid grid-cols-2">
                <div>
                  <div>Reserved Officer Training Corps.</div>
                  <div>Typing here of HONOR, PATRIOTISM, DUTY </div>
                  <div className="flex gap-2">
                    <TasksView tasks={tasks} queryParams={queryParams} />
                    <AttendanceForm />
                  </div>
                </div>
                <div>ROTC Image here</div>
              </div>
            </main>

            <footer className="py-16 text-center text-sm text-black dark:text-white/70">
              &#169;2024 All Rights Reserved.
            </footer>
          </div>
        </div>
      </div>
    </>
  );
}
