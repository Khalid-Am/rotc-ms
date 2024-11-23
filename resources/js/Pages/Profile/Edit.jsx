import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import DeleteUserForm from "./Partials/DeleteUserForm";
import UpdatePasswordForm from "./Partials/UpdatePasswordForm";
import UpdateProfileInformationForm from "./Partials/UpdateProfileInformationForm";
import UpdateOfficerForm from "../Officer/Partials/UpdateOfficerForm";

export default function Edit({ mustVerifyEmail, status, user }) {
  const officer = user.officer;

  return (
    <AuthenticatedLayout
      header={
        <h2 className="text-xl font-semibold leading-tight text-gray-800">
          Account
        </h2>
      }
    >
      <Head title="Account" />

      <div className="py-5">
        <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
          {/* <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <UpdateOfficerForm
              officer={officer}
              message={"Profile was updated successfully!"}
            />
          </div> */}
          {/* <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <UpdateProfileInformationForm
              mustVerifyEmail={mustVerifyEmail}
              status={status}
              className="max-w-full"
            />
          </div> */}

          <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
            <UpdatePasswordForm className="max-w-xl" />
          </div>

          {/* <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <DeleteUserForm className="max-w-xl" />
                    </div> */}
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
