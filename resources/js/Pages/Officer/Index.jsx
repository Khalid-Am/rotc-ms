import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import React from "react";

import Pagination from "@/Components/Pagination";
import OfficersTable from "./Partials/OfficersTable";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import { Button } from "@/shadcn/components/ui/button";
import FilterBar from "@/Components/FilterBar";
import OfficerFilter from "./Partials/OfficerFilter";

const Index = ({ officers, queryParams = {} }) => {
  return (
    <AuthenticatedLayout
      header={
        <div className="grid grid-cols-2">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Officers
          </h2>

          <Link href={route("officer.create")} className="flex justify-end">
            <Button
              size="sm"
              className="bg-green-700 hover:bg-green-500 focus:bg-green-700"
            >
              <PlusCircleIcon className="w-[15px] mr-2" />
              ADD OFFICER
            </Button>
          </Link>
        </div>
      }
    >
      <Head title="Officers" />

      <div className="py-6">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <div className="grid lg:grid-cols-2 pb-4">
                <OfficerFilter queryParams={queryParams} />
              </div>
              <OfficersTable officers={officers} queryParams={queryParams} />
              <div className="my-4">
                <Pagination links={officers.meta.links} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
