import BreadCrumbExt from "@/Components/BreadCrumbExt";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React, { useState } from "react";

import { Button } from "@/shadcn/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcn/components/ui/tabs";
import { Head, Link, usePage } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { BLOOD_TYPE_TEXT_MAP } from "@/constants";
import OfficersAttendanceTable from "../Attendance/Partials/OfficersAttendanceTable";
import UpdatePasswordForm from "../Profile/Partials/UpdatePasswordForm";
import DeleteUserForm from "../Profile/Partials/DeleteUserForm";

const Show = ({ officer, attendances }) => {
  const user = usePage().props.auth.user;
  const [activeTab, setActiveTab] = useState("details");
  return (
    <AuthenticatedLayout
      header={
        <div className="grid grid-cols-2 md:grid-cols-8 lg:grid-cols-6">
          <h2 className="text-xl text-nowrap font-semibold leading-tight text-gray-800 w-0">
            Officer Details
          </h2>
          <BreadCrumbExt
            links={[{ url: route("officer.index"), label: "Officer" }]}
            currentPage={"Officer Details"}
            className={
              "pt-1 md:col-start-3 md:col-span-5 lg:col-start-2 lg:col-span-4"
            }
          />
        </div>
      }
    >
      <Head title="View Officer" />

      <div className="py-5">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-4 text-gray-900">
              <Tabs
                defaultValue={activeTab}
                onValueChange={setActiveTab}
                className="w-full"
              >
                <TabsList
                  className={`grid w-full ${
                    user.data.officer.id == officer.id
                      ? "grid-cols-3"
                      : "grid-cols-2"
                  }`}
                >
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="attendance">Attendance</TabsTrigger>
                  {user.data.officer.id == officer.id && (
                    <TabsTrigger value="account">Account</TabsTrigger>
                  )}
                </TabsList>
                <TabsContent value="details">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {`${officer.rank ? "CDT " + officer.rank : ""} ${
                          officer.firstName
                        } 
                        ${officer.middleName ?? ""} ${officer.lastName} ${
                          officer.class ? "(ROTC) " + officer.class : ""
                        }`}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-2">
                        <div className="my-2">
                          <h2 className="text-lg text-nowrap font-semibold leading-tight text-gray-800">
                            Personal Details
                          </h2>

                          <aside className="my-2 space-y-3 text-md">
                            {/* First Name */}
                            <div className="text-nowrap grid grid-cols-2 lg:grid-cols-12">
                              <span className="text-md text-gray-800 lg:col-span-4">
                                First Name
                              </span>
                              <span className="lg:col-start-5">
                                {`: ${officer.firstName ?? "N/A"}`}
                              </span>
                            </div>

                            {/* Middle Name */}
                            <div className="text-nowrap grid grid-cols-2 lg:grid-cols-12">
                              <span className="text-md text-gray-800 lg:col-span-4">
                                Middle Name
                              </span>
                              <span className="lg:col-start-5 text-nowrap">
                                {`: ${officer.middleName ?? "N/A"}`}
                              </span>
                            </div>

                            {/* Last Name */}
                            <div className="text-nowrap grid grid-cols-2 lg:grid-cols-12">
                              <span className="text-md text-gray-800 lg:col-span-4">
                                Last Name
                              </span>
                              <span className="lg:col-start-5">
                                {`: ${officer.lastName ?? "N/A"}`}
                              </span>
                            </div>

                            {/* Birthdate */}
                            <div className="text-nowrap grid grid-cols-2 lg:grid-cols-12">
                              <span className="text-md text-gray-800 lg:col-span-4">
                                Birthdate
                              </span>
                              <span className="lg:col-start-5">
                                {`: ${officer.birthdate ?? "N/A"}`}
                              </span>
                            </div>

                            {/* Religion */}
                            <div className="text-nowrap grid grid-cols-2 lg:grid-cols-12">
                              <span className="text-md text-gray-800 lg:col-span-4">
                                Religion
                              </span>
                              <span className="lg:col-start-5">
                                {`: ${officer.religion ?? "N/A"}`}
                              </span>
                            </div>

                            {/* Blood Type */}
                            <div className="text-nowrap grid grid-cols-2 lg:grid-cols-12">
                              <span className="text-md text-gray-800 lg:col-span-4">
                                Blood Type
                              </span>
                              <span className="lg:col-start-5">
                                {": "}
                                {BLOOD_TYPE_TEXT_MAP[officer.blood_type] ||
                                  "N/A"}
                              </span>
                            </div>

                            {/* Province */}
                            <div className="text-nowrap grid grid-cols-2 lg:grid-cols-12">
                              <span className="text-md text-gray-800 lg:col-span-4">
                                Province
                              </span>
                              <span className="lg:col-start-5">
                                {`: ${officer.province ?? "N/A"}`}
                              </span>
                            </div>

                            {/* Region */}
                            <div className="text-nowrap grid grid-cols-2 lg:grid-cols-12">
                              <span className="text-md text-gray-800 lg:col-span-4">
                                Region
                              </span>
                              <span className="lg:col-start-5">
                                {`: ${officer.region ?? "N/A"}`}
                              </span>
                            </div>

                            {/* Height */}
                            <div className="text-nowrap grid grid-cols-2 lg:grid-cols-12">
                              <span className="text-md text-gray-800 lg:col-span-4">
                                Height in cm
                              </span>
                              <span className="lg:col-start-5">
                                {`: ${officer.height_cm ?? "N/A"}`}
                              </span>
                            </div>
                          </aside>
                        </div>
                        <div className="my-2">
                          <h2 className="text-lg text-nowrap font-semibold leading-tight text-gray-800">
                            Educational Background
                          </h2>
                          <aside className="my-2 space-y-2">
                            {/* Student Id */}
                            <div className="text-nowrap grid grid-cols-2 lg:grid-cols-12">
                              <span className="text-md text-gray-800 lg:col-span-4">
                                Student ID
                              </span>
                              <span className="lg:col-start-5">
                                {`: ${officer.student_id ?? "N/A"}`}
                              </span>
                            </div>

                            {/* Program */}
                            <div className="text-nowrap grid grid-cols-2 lg:grid-cols-12">
                              <span className="text-md text-gray-800 lg:col-span-4">
                                Program
                              </span>
                              <span className="lg:col-start-5">
                                {`: ${officer.program ?? "N/A"}`}
                              </span>
                            </div>

                            {/* major */}
                            <div className="grid grid-cols-4 lg:grid-cols-12">
                              <span className="text-md text-gray-800 lg:col-span-4">
                                Major
                              </span>
                              <span className="lg:col-start-5 text-nowrap">
                                {`: ${officer.major ?? "N/A"}`}
                              </span>
                            </div>
                          </aside>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="attendance">
                  <Card>
                    <CardHeader className="flex">
                      <CardTitle className="inline">
                        {`${officer.rank ? "CDT " + officer.rank : ""} ${
                          officer.firstName
                        } 
                        ${officer.middleName ?? ""} ${officer.lastName} ${
                          officer.class ? "(ROTC) " + officer.class : ""
                        }`}
                      </CardTitle>
                      <CardDescription>Attendance Record</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <OfficersAttendanceTable attendances={attendances} />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent
                  value="account"
                  className="grid md:grid-cols-2 gap-4"
                >
                  <Card className="">
                    <CardContent>
                      <UpdatePasswordForm className="max-w-lg p-5" />
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-5 space-y-5">
                      <DeleteUserForm className="max-w-xl" />
                    </CardContent>
                  </Card>
                </TabsContent>

                <CardFooter className="flex justify-end gap-3 my-4">
                  <Link href={route("officer.index")}>
                    <SecondaryButton>Back</SecondaryButton>
                  </Link>
                  {activeTab === "details" && (
                    <Link href={route("officer.edit", officer.id)}>
                      <PrimaryButton>Edit</PrimaryButton>
                    </Link>
                  )}
                </CardFooter>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Show;
