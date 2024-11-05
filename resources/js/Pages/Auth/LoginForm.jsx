import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/shadcn/components/ui/alert";
import { Button } from "@/shadcn/components/ui/button";
import PrimaryButton from "@/Components/PrimaryButton";
import InputError from "@/Components/InputError";
import Checkbox from "@/Components/Checkbox";
import TextInput from "@/Components/TextInput";
import InputLabel from "@/Components/InputLabel";
import { useForm } from "@inertiajs/react";
import { AlertCircle } from "lucide-react";
import ApplicationLogo from "@/Components/ApplicationLogo";

const LoginForm = ({ status }) => {
  const { data, setData, post, processing, errors, reset, clearErrors } =
    useForm({
      username: "",
      password: "",
      remember: false,
    });
  const [isOpen, setIsOpen] = useState(!!status);

  useEffect(() => {
    if (status) setIsOpen(true);
  }, [status]);

  const handleClose = () => {
    reset();
    clearErrors();
    setIsOpen(false);
  };

  const submit = (e) => {
    e.preventDefault();

    post(route("login.store"), {
      onFinish: () => reset("password"),
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Login</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="grid place-items-center">
          <DialogTitle>LOGIN</DialogTitle>
          <ApplicationLogo className="block h-auto max-w-24" />
          <DialogDescription>Welcome to ROTC-MS</DialogDescription>
        </DialogHeader>

        {status && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{status}</AlertDescription>
          </Alert>
        )}
        <form onSubmit={submit}>
          <div>
            <InputLabel htmlFor="username" value="Username" />

            <TextInput
              id="username"
              type="text"
              name="username"
              value={data.username}
              className="mt-1 block w-full"
              autoComplete="username"
              isFocused={true}
              onChange={(e) => setData("username", e.target.value)}
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
              autoComplete="current-password"
              onChange={(e) => setData("password", e.target.value)}
            />

            <InputError message={errors.password} className="mt-2" />
          </div>

          <div className="mt-4 block">
            <label className="flex items-center">
              <Checkbox
                name="remember"
                checked={data.remember}
                onChange={(e) => setData("remember", e.target.checked)}
              />
              <span className="ms-2 text-sm text-gray-600">Remember me</span>
            </label>
          </div>

          <div className="mt-4 flex items-center justify-end">
            <PrimaryButton className="ms-4" disabled={processing}>
              Log in
            </PrimaryButton>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default LoginForm;
