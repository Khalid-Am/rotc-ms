import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Transition } from "@headlessui/react";
import { Link, useForm, usePage } from "@inertiajs/react";

export default function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = "",
}) {
  const user = usePage().props.auth.user;

  const { data, setData, patch, errors, processing, recentlySuccessful } =
    useForm({
      student_id: user.data.officer.student_id || " ",
      rank: user.data.officer.rank || " ",
      class: user.data.officer.class || " ",
      firstName: user.data.officer.firstName || " ",
      middleName: user.data.officer.middleName || " ",
      lastName: user.data.officer.lastName || " ",
      province: user.data.officer.province || " ",
      region: user.data.officer.region || " ",
      program: user.data.officer.program || " ",
      major: user.data.officer.major || " ",
    });

  const submit = (e) => {
    e.preventDefault();

    patch(route("profile.update"));
  };

  return (
    <section className={className}>
      <header>
        <h2 className="text-lg font-medium text-gray-900">
          Profile Information
        </h2>

        <p className="mt-1 text-sm text-gray-600">
          Update your account's profile information and email address.
        </p>
      </header>

      <form onSubmit={submit} className="mt-6 space-y-6">
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
          <div className="space-y-6">
            {/* Student Id */}
            <div>
              <InputLabel htmlFor="student_id" value="Student ID" />

              <TextInput
                id="student_id"
                className="mt-1 block w-full"
                value={data.student_id}
                onChange={(e) => setData("student_id", e.target.value)}
                required
                isFocused
              />

              <InputError className="mt-2" message={errors.student_id} />
            </div>

            {/* First Name */}
            <div>
              <InputLabel htmlFor="firstName" value="FirstName" />

              <TextInput
                id="firstName"
                className="mt-1 block w-full"
                value={data.firstName}
                onChange={(e) => setData("firstName", e.target.value)}
                required
                isFocused
              />

              <InputError className="mt-2" message={errors.firstName} />
            </div>

            {/* Middle Name */}
            <div>
              <InputLabel htmlFor="middleName" value="MiddleName" />

              <TextInput
                id="MiddleName"
                className="mt-1 block w-full"
                value={data.middleName}
                onChange={(e) => setData("middleName", e.target.value)}
                required
                isFocused
              />

              <InputError className="mt-2" message={errors.middleName} />
            </div>

            {/* Last Name */}
            <div>
              <InputLabel htmlFor="lastName" value="LastName" />

              <TextInput
                id="lastName"
                className="mt-1 block w-full"
                value={data.lastName}
                onChange={(e) => setData("lastName", e.target.value)}
                required
                isFocused
              />

              <InputError className="mt-2" message={errors.lastName} />
            </div>

            {/* Rank */}
            <div>
              <InputLabel htmlFor="rank" value="Rank" />

              <TextInput
                id="rank"
                className="mt-1 block w-full"
                value={data.rank}
                onChange={(e) => setData("rank", e.target.value)}
                required
                isFocused
              />

              <InputError className="mt-2" message={errors.rank} />
            </div>

            {/* Class */}
            <div>
              <InputLabel htmlFor="class" value="Class" />

              <TextInput
                id="class"
                className="mt-1 block w-full"
                value={data.class}
                onChange={(e) => setData("class", e.target.value)}
                required
                isFocused
              />

              <InputError className="mt-2" message={errors.class} />
            </div>
          </div>

          <div className="space-y-6">
            {/* Program */}
            <div>
              <InputLabel htmlFor="program" value="Program" />

              <TextInput
                id="program"
                className="mt-1 block w-full"
                value={data.program}
                onChange={(e) => setData("program", e.target.value)}
                required
                isFocused
              />

              <InputError className="mt-2" message={errors.program} />
            </div>

            {/* Program */}
            <div>
              <InputLabel htmlFor="major" value="Major" />

              <TextInput
                id="major"
                className="mt-1 block w-full"
                value={data.major}
                onChange={(e) => setData("major", e.target.value)}
                required
                isFocused
              />

              <InputError className="mt-2" message={errors.major} />
            </div>

            {/* Provice */}
            <div>
              <InputLabel htmlFor="province" value="Province" />

              <TextInput
                id="province"
                className="mt-1 block w-full"
                value={data.student_id}
                onChange={(e) => setData("province", e.target.value)}
                required
                isFocused
              />

              <InputError className="mt-2" message={errors.province} />
            </div>

            {/* region */}
            <div>
              <InputLabel htmlFor="region" value="Region" />

              <TextInput
                id="region"
                className="mt-1 block w-full"
                value={data.student_id}
                onChange={(e) => setData("region", e.target.value)}
                required
                isFocused
              />

              <InputError className="mt-2" message={errors.region} />
            </div>
          </div>
        </div>

        {mustVerifyEmail && user.data.email_verified_at === null && (
          <div>
            <p className="mt-2 text-sm text-gray-800">
              Your email address is unverified.
              <Link
                href={route("verification.send")}
                method="post"
                as="button"
                className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                Click here to re-send the verification email.
              </Link>
            </p>

            {status === "verification-link-sent" && (
              <div className="mt-2 text-sm font-medium text-green-600">
                A new verification link has been sent to your email address.
              </div>
            )}
          </div>
        )}

        <div className="flex items-center gap-4">
          <PrimaryButton disabled={processing}>Save</PrimaryButton>

          <Transition
            show={recentlySuccessful}
            enter="transition ease-in-out"
            enterFrom="opacity-0"
            leave="transition ease-in-out"
            leaveTo="opacity-0"
          >
            <p className="text-sm text-gray-600">Saved.</p>
          </Transition>
        </div>
      </form>
    </section>
  );
}
