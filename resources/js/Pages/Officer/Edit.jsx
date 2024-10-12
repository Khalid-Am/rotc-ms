import React from "react";
import { Head } from "@inertiajs/react";
import BreadCrumbExt from "@/Components/BreadCrumbExt";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UpdateOfficerForm from "./Partials/UpdateOfficerForm";

const Edit = ({ officer }) => {
  return (
    <AuthenticatedLayout
      header={
        <div className="grid grid-cols-2 md:grid-cols-8 lg:grid-cols-6">
          <h2 className="text-xl text-nowrap font-semibold leading-tight text-gray-800 w-0">
            Update Officer
          </h2>
          <BreadCrumbExt
            links={[
              { url: route("officer.index"), label: "Officer" },
              {
                url: route("officer.show", { id: officer.id }),
                label: "Officer Details",
              },
            ]}
            currentPage={"Update Officer"}
            className={
              "pt-1 md:col-start-3 md:col-span-5 lg:col-start-2 lg:col-span-4"
            }
          />
        </div>
      }
    >
      <Head title="Update Officer" />

      <div className="py-5">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6 text-gray-900">
              <UpdateOfficerForm
                officer={officer}
                message={"Officer was updated successfully!"}
              />
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
