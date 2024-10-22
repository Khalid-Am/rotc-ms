import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Button } from "@/shadcn/components/ui/button";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { Head, Link } from "@inertiajs/react";
import React from "react";
import UserTable from "./Partials/UserTable";
import Pagination from "@/Components/Pagination";

const Index = ({ users, queryParams }) => {
  queryParams = queryParams || {};
  return (
    <AuthenticatedLayout
      header={
        <div className="grid grid-cols-2">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Users
          </h2>
          <div className="flex justify-end">
            <Link href={route("register")} className="flex justify-end">
              <Button className="bg-green-700 hover:bg-green-500 focus:bg-green-700">
                <PlusCircleIcon className="w-[15px] mr-2" />
                ADD USER
              </Button>
            </Link>
          </div>
        </div>
      }
    >
      <Head title="Users" />

      <div className="py-10">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <UserTable queryParams={queryParams} users={users} />
              <div className="my-4">
                <Pagination links={users.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
