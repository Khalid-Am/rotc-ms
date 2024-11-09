import PrimaryButton from "@/Components/PrimaryButton";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

import Pagination from "@/Components/Pagination";
import OfficersTable from "./Partials/OfficersTable";
import {
  ArchiveBoxIcon,
  PlusCircleIcon,
  RectangleStackIcon,
} from "@heroicons/react/16/solid";
import { Button } from "@/shadcn/components/ui/button";
import OfficerFilter from "./Partials/OfficerFilter";

const Index = ({ officers, queryParams = null }) => {
  queryParams = queryParams || {};
  const [isToggled, setIsToggled] = useState(queryParams.archived);

  const searchFieldChanged = (name, value) => {
    const newQueryParams = { ...queryParams, page: 1 };

    if (value) {
      newQueryParams[name] = value;
    } else {
      delete newQueryParams[name];
    }
    router.get(route("officer.index"), newQueryParams, { preserveState: true });
  };

  const handleArchivedState = () => {
    setIsToggled((prevState) => {
      const newState = !prevState;

      searchFieldChanged("archived", newState ? true : null);

      return newState;
    });
  };

  return (
    <AuthenticatedLayout
      header={
        <div className="grid grid-cols-2">
          <h2 className="text-xl font-semibold leading-tight text-gray-800">
            Officers
          </h2>

          <div className="flex gap-3 justify-end">
            <Button
              size="sm"
              className="bg-gray-500 hover:bg-gray-400"
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
            <Link href={route("officer.create")} className="flex justify-end">
              <Button
                size="sm"
                className="bg-green-700 hover:bg-green-500 focus:bg-green-700"
              >
                <PlusCircleIcon className="w-[15px] mr-2" />
                New Officer
              </Button>
            </Link>
          </div>
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
