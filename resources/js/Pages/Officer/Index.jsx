import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import React, { useEffect, useState } from "react";

import Pagination from "@/Components/Pagination";
import OfficersTable from "./Partials/OfficersTable";
import {
  ArchiveBoxIcon,
  ChevronDownIcon,
  PlusCircleIcon,
  RectangleStackIcon,
} from "@heroicons/react/16/solid";
import { Button } from "@/shadcn/components/ui/button";
import OfficerFilter from "./Partials/OfficerFilter";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/shadcn/components/ui/dropdown-menu";

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
        <div className="grid grid-cols-2 items-center">
          <div>
            <h2 className="text-xl font-semibold leading-tight text-gray-800">
              Officers
            </h2>
          </div>

          <div className="flex gap-3 justify-end">
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
            <Link href={route("officer.create")} className="flex justify-end">
              <Button size="sm" className="bg-green-500 hover:bg-green-600">
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
              <div className="grid md:grid-cols-2">
                <div className="">
                  <OfficerFilter queryParams={queryParams} />
                </div>
                <div className="flex justify-start items-start md:justify-end">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex items-center bg-green-500 rounded-md py-1 px-2 mt-1 text-white text-sm hover:bg-green-600">
                      Print
                      <ChevronDownIcon className="ml-2 w-4 h-4" />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <a
                        href={route("officers_list.pdf")}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <DropdownMenuItem className="cursor-pointer">
                          <span className="text-sm">Officers List</span>
                        </DropdownMenuItem>
                      </a>
                      <a
                        href={route("1cl_list.pdf")}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <DropdownMenuItem className="cursor-pointer">
                          <span className="text-sm">1CL List</span>
                        </DropdownMenuItem>
                      </a>
                      <a
                        href={route("2cl_list.pdf")}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <DropdownMenuItem className="cursor-pointer">
                          <span className="text-sm">2CL List</span>
                        </DropdownMenuItem>
                      </a>
                      <a
                        href={route("3cl_list.pdf")}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <DropdownMenuItem className="cursor-pointer">
                          <span className="text-sm">3CL List</span>
                        </DropdownMenuItem>
                      </a>
                      <a
                        href={route("cocc_list.pdf")}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <DropdownMenuItem className="cursor-pointer">
                          <span className="text-sm">COCC List</span>
                        </DropdownMenuItem>
                      </a>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
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
