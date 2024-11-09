import { Head, Link } from "@inertiajs/react";
import AttendanceForm from "./Partials/AttendanceForm";
import { Toaster } from "@/shadcn/components/ui/toaster";
import TasksView from "./Partials/TasksView";
import LoginForm from "../Auth/LoginForm";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { useTypewriter, Cursor } from "react-simple-typewriter";

export default function Welcome({ auth, status, tasks, queryParams = null }) {
  queryParams = queryParams || {};

  const [motto] = useTypewriter({
    words: ["Honor", "Duty", "Patriotism"],
    loop: {},
  });

  return (
    <>
      <Toaster />

      <Head title="Welcome" />
      <div className="bg-green-500/25 text-black/50 dark:bg-black dark:text-white/50">
        <div className="relative flex flex-col max-h-screen h-screen items-center justify-center selection:bg-green-600 selection:text-white">
          <header className="absolute top-0 w-full max-w-3xl grid grid-cols-2 items-center gap-2 lg:max-w-7xl">
            <div className="flex lg:justify-start">
              <ApplicationLogo className="block h-auto max-w-24" />
              <span className="hidden md:block text-2xl self-center font-extrabold text-green-600">
                ROTC <br /> MONITORING SYSTEM
              </span>
            </div>
            <nav className="flex flex-1 justify-end pr-5">
              {auth.user ? (
                <Link
                  href={route("dashboard")}
                  className="rounded-md px-3 py-2 text-black ring-1 ring-transparent transition hover:text-black/70 focus:outline-none focus-visible:ring-[#FF2D20] dark:text-white dark:hover:text-white/80 dark:focus-visible:ring-white"
                >
                  Dashboard
                </Link>
              ) : (
                <>
                  <LoginForm status={status} />
                </>
              )}
            </nav>
          </header>

          <div className="relative flex justify-center items-center w-full max-w-2xl h-1/2 px-6 lg:max-w-7xl">
            <main className="">
              <div className="flex flex-col space-y-5">
                <span className="uppercase text-[40px] tracking-tight font-extrabold text-center text-amber-500 lg:text-5xl">
                  reserved officer training corps
                </span>

                <div className="mt-2 text-center">
                  <span className="uppercase text-2xl">
                    {motto}
                    <Cursor />
                  </span>
                </div>
                <div className="flex gap-3 justify-center mt-10">
                  <AttendanceForm />
                  <TasksView tasks={tasks} queryParams={queryParams} />
                </div>
              </div>
            </main>
          </div>
          <footer className="py-2 absolute bottom-0 w-full flex justify-center  text-sm text-black dark:text-white/70">
            &#169;2024 All Rights Reserved.
          </footer>
        </div>
      </div>
    </>
  );
}
