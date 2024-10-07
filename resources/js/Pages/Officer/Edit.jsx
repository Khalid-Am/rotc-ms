import BreadCrumbExt from "@/Components/BreadCrumbExt";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useToast } from "@/shadcn/hooks/use-toast";
import { Head, Link, useForm } from "@inertiajs/react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import React from "react";

import { Card, CardContent, CardHeader } from "@/shadcn/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcn/components/ui/tabs";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SelectGroup,
  SelectLabel,
} from "@/shadcn/components/ui/select";
import { BLOOD_TYPE_TEXT_MAP } from "@/constants";

const Edit = ({ officer }) => {
  const { toast } = useToast();

  const { data, setData, post, errors, processing } = useForm({
    student_id: officer.student_id || "",
    firstName: officer.firstName || "",
    middleName: officer.middleName || "",
    lastName: officer.lastName || "",
    rank: officer.rank || "",
    class: officer.class || "",
    program: officer.program || "",
    major: officer.major || "",
    birthdate: officer.birthdate || "",
    religion: officer.religion || "",
    blood_type: officer.blood_type || "unknown",
    province: officer.province || "",
    region: officer.region || "",
    height_cm: officer.height_cm || "",
    _method: "PUT",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("officer.update", officer.id), {
      onSuccess: () => {
        toast({
          variant: "success",
          description: "Officer was updated successfully!",
        });
      },
    });
  };

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
              <form onSubmit={submit} className="space-y-6">
                <Tabs defaultValue="personal" className="w-full">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="personal">Personal</TabsTrigger>
                    <TabsTrigger value="other">Other...</TabsTrigger>
                  </TabsList>
                  <TabsContent value="personal">
                    <Card>
                      <CardHeader>
                        <h2 className="text-lg mb-4 font-medium text-gray-900">
                          Officer Information
                        </h2>
                        <CardContent>
                          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                            {/* First Name */}
                            <div>
                              <InputLabel
                                htmlFor="firstName"
                                value="First Name"
                              />

                              <TextInput
                                id="firstName"
                                className="mt-1 block w-full"
                                value={data.firstName}
                                onChange={(e) =>
                                  setData("firstName", e.target.value)
                                }
                                isFocused
                              />

                              <InputError
                                className="mt-2"
                                message={errors.firstName}
                              />
                            </div>

                            {/* Middle Name */}
                            <div>
                              <InputLabel
                                htmlFor="middleName"
                                value="Middle Name"
                              />

                              <TextInput
                                id="middleName"
                                className="mt-1 block w-full"
                                value={data.middleName}
                                onChange={(e) =>
                                  setData("middleName", e.target.value)
                                }
                              />

                              <InputError
                                className="mt-2"
                                message={errors.middleName}
                              />
                            </div>

                            {/* Last Name */}
                            <div>
                              <InputLabel
                                htmlFor="middleName"
                                value="Last Name"
                              />

                              <TextInput
                                id="middleName"
                                className="mt-1 block w-full"
                                value={data.lastName}
                                onChange={(e) =>
                                  setData("lastName", e.target.value)
                                }
                              />

                              <InputError
                                className="mt-2"
                                message={errors.lastName}
                              />
                            </div>

                            {/*  Birthdate */}
                            <div>
                              <InputLabel
                                htmlFor="birthdate"
                                value="Birthdate"
                              />

                              <TextInput
                                id="birthdate"
                                type="date"
                                className="mt-1 block w-full"
                                value={data.birthdate}
                                onChange={(e) =>
                                  setData("birthdate", e.target.value)
                                }
                              />

                              <InputError
                                className="mt-2"
                                message={errors.birthdate}
                              />
                            </div>

                            {/* Religion */}
                            <div>
                              <InputLabel htmlFor="religion" value="Religion" />

                              <TextInput
                                id="religion"
                                className="mt-1 block w-full"
                                value={data.religion}
                                onChange={(e) =>
                                  setData("religion", e.target.value)
                                }
                              />

                              <InputError
                                className="mt-2"
                                message={errors.religion}
                              />
                            </div>

                            {/* Blood Type */}
                            <div>
                              <InputLabel value="Blood Type" />
                              <Select
                                onValueChange={(value) =>
                                  setData("blood_type", value)
                                }
                              >
                                <SelectTrigger className="w-full mt-1">
                                  <SelectValue
                                    placeholder={
                                      BLOOD_TYPE_TEXT_MAP[data.blood_type]
                                    }
                                  />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectLabel>Blood Type</SelectLabel>
                                    <SelectItem value="a+">A+</SelectItem>
                                    <SelectItem value="a-">A-</SelectItem>
                                    <SelectItem value="b+">B+</SelectItem>
                                    <SelectItem value="b-">B-</SelectItem>
                                    <SelectItem value="ab+">AB+</SelectItem>
                                    <SelectItem value="ab-">AB-</SelectItem>
                                    <SelectItem value="o+">O+</SelectItem>
                                    <SelectItem value="o-">O-</SelectItem>
                                    <SelectItem value="unknown">
                                      Unknown
                                    </SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>

                            {/* Province */}
                            <div>
                              <InputLabel htmlFor="province" value="Province" />

                              <TextInput
                                id="province"
                                className="mt-1 block w-full"
                                value={data.province}
                                onChange={(e) =>
                                  setData("province", e.target.value)
                                }
                              />

                              <InputError
                                className="mt-2"
                                message={errors.province}
                              />
                            </div>

                            {/* Region */}
                            <div>
                              <InputLabel htmlFor="region" value="Region" />

                              <TextInput
                                id="region"
                                className="mt-1 block w-full"
                                value={data.region}
                                onChange={(e) =>
                                  setData("region", e.target.value)
                                }
                              />

                              <InputError
                                className="mt-2"
                                message={errors.region}
                              />
                            </div>

                            {/* Height */}
                            <div>
                              <InputLabel
                                htmlFor="height_cm"
                                value="Height in cm"
                              />

                              <TextInput
                                id="height_cm"
                                type="number"
                                className="mt-1 block w-full"
                                value={data.height_cm}
                                onChange={(e) =>
                                  setData("height_cm", e.target.value)
                                }
                              />

                              <InputError
                                className="mt-2"
                                message={errors.height_cm}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </CardHeader>
                    </Card>
                  </TabsContent>

                  <TabsContent value="other">
                    <Card>
                      <CardHeader>
                        <h2 className="text-lg mb-4 font-medium text-gray-900">
                          Educational Background
                        </h2>
                        <CardContent>
                          <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                            {/* School Id */}
                            <div>
                              <InputLabel
                                htmlFor="student_id"
                                value="Schoold Id"
                              />

                              <TextInput
                                id="student_id"
                                className="mt-1 block w-full"
                                value={data.student_id}
                                onChange={(e) =>
                                  setData("student_id", e.target.value)
                                }
                                isFocused
                              />

                              <InputError
                                className="mt-2"
                                message={errors.student_id}
                              />
                            </div>

                            {/* Program */}
                            <div>
                              <InputLabel htmlFor="program" value="Program" />

                              <TextInput
                                id="program"
                                className="mt-1 block w-full"
                                value={data.program}
                                onChange={(e) =>
                                  setData("program", e.target.value)
                                }
                              />

                              <InputError
                                className="mt-2"
                                message={errors.program}
                              />
                            </div>

                            {/* Major */}
                            <div>
                              <InputLabel htmlFor="major" value="Major" />

                              <TextInput
                                id="major"
                                className="mt-1 block w-full"
                                value={data.major}
                                onChange={(e) =>
                                  setData("major", e.target.value)
                                }
                              />

                              <InputError
                                className="mt-2"
                                message={errors.major}
                              />
                            </div>
                          </div>
                        </CardContent>
                      </CardHeader>
                    </Card>
                    <Card className="mt-5">
                      <CardHeader>
                        <h2 className="text-lg mb-4 font-medium text-gray-900">
                          USeP ROTC Position
                        </h2>
                        <CardContent>
                          <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
                            {/* Rank */}
                            <div>
                              <InputLabel htmlFor="rank" value="Rank" />

                              <TextInput
                                id="rank"
                                className="mt-1 block w-full"
                                value={data.rank}
                                onChange={(e) =>
                                  setData("rank", e.target.value)
                                }
                                isFocused
                              />

                              <InputError
                                className="mt-2"
                                message={errors.rank}
                              />
                            </div>
                            {/* Blood Type */}
                            <div>
                              <InputLabel value="Class" />
                              <Select
                                onValueChange={(value) =>
                                  setData("class", value)
                                }
                              >
                                <SelectTrigger className="w-full mt-1">
                                  <SelectValue placeholder={data.class} />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectGroup>
                                    <SelectItem value="1cl">1cl</SelectItem>
                                    <SelectItem value="2cl">2cl</SelectItem>
                                    <SelectItem value="3cl">3cl</SelectItem>
                                    <SelectItem value="4cl">4cl</SelectItem>
                                  </SelectGroup>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </CardContent>
                      </CardHeader>
                    </Card>
                  </TabsContent>
                </Tabs>
                <div className="mt-5 flex gap-2 justify-end">
                  <Link href={route("officer.show", officer.id)}>
                    <SecondaryButton>Back</SecondaryButton>
                  </Link>
                  <PrimaryButton disabled={processing}>Save</PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Edit;
