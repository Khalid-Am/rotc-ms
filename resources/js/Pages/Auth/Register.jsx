import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";

export default function Register() {
  const { data, setData, post, processing, errors, reset } = useForm({
    officer_id: "",
    role: "",
    username: "",
    password: "",
    password_confirmation: "",
  });

  const submit = (e) => {
    e.preventDefault();

    post(route("register"), {
      onFinish: () => reset("password", "password_confirmation"),
    });
  };

  return (
    <AuthenticatedLayout>
      <Head title="Register" />
      <div className="py-10">
        <div className="mx-auto max-w-7xl grid lg:grid-cols-12 sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg lg:col-start-3 lg:col-span-8">
            <div className="p-6 text-gray-900">
              <form onSubmit={submit}>
                <div className="mt-4">
                  <InputLabel htmlFor="role" value="Role" />
                  <Select onValueChange={(value) => setData("role", value)}>
                    <SelectTrigger className="mt-1 w-full">
                      <SelectValue placeholder="Role" value={data.role} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corps">Corps</SelectItem>
                      <SelectItem value="s1">S1</SelectItem>
                      <SelectItem value="s2">S2</SelectItem>
                      <SelectItem value="s3">S3</SelectItem>
                      <SelectItem value="s4">S4</SelectItem>
                      <SelectItem value="s7">S7</SelectItem>
                    </SelectContent>
                  </Select>
                  <InputError message={errors.role} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="username" value="Username" />

                  <TextInput
                    id="username"
                    type="text"
                    name="username"
                    value={data.username}
                    className="mt-1 block w-full"
                    autoComplete="username"
                    onChange={(e) => setData("username", e.target.value)}
                    required
                  />

                  <InputError message={errors.username} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel htmlFor="password" value="Password" />

                  <TextInput
                    id="password"
                    type="password"
                    name="password"
                    value={data.password}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) => setData("password", e.target.value)}
                    required
                  />

                  <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4">
                  <InputLabel
                    htmlFor="password_confirmation"
                    value="Confirm Password"
                  />

                  <TextInput
                    id="password_confirmation"
                    type="password"
                    name="password_confirmation"
                    value={data.password_confirmation}
                    className="mt-1 block w-full"
                    autoComplete="new-password"
                    onChange={(e) =>
                      setData("password_confirmation", e.target.value)
                    }
                    required
                  />

                  <InputError
                    message={errors.password_confirmation}
                    className="mt-2"
                  />
                </div>

                <div className="mt-4 flex items-center justify-end">
                  {/* <Link
                    href={route("login")}
                    className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    Already registered?
                  </Link> */}

                  <PrimaryButton className="ms-4" disabled={processing}>
                    Register
                  </PrimaryButton>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
}
