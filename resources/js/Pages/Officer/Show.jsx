import BreadCrumbExt from "@/Components/BreadCrumbExt";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import React from "react";

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
import { Head, Link } from "@inertiajs/react";
import SecondaryButton from "@/Components/SecondaryButton";
import PrimaryButton from "@/Components/PrimaryButton";
import { BLOOD_TYPE_TEXT_MAP } from "@/constants";

const Show = ({ officer }) => {
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
              <Tabs defaultValue="details" className="w-full">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="attendance">Attendance</TabsTrigger>
                </TabsList>
                <TabsContent value="details">
                  <Card>
                    <CardHeader>
                      <CardTitle>
                        {`${officer.rank ?? ""} ${officer.firstName} 
                        ${officer.middleName ?? ""} ${officer.lastName} ${
                          officer.class ?? ""
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
                  <CardFooter className="flex justify-end gap-3 my-4">
                    <Link href={route("officer.index")}>
                      <SecondaryButton>Back</SecondaryButton>
                    </Link>
                    <Link href={route("officer.edit", officer.id)}>
                      <SecondaryButton>Edit</SecondaryButton>
                    </Link>
                  </CardFooter>
                </TabsContent>

                <TabsContent value="attendance"></TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Show;
