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
import { Button } from "@/shadcn/components/ui/button";
import { useForm, usePage } from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import PrimaryButton from "@/Components/PrimaryButton";
import { useToast } from "@/shadcn/hooks/use-toast";

const AttendanceForm = ({ className }) => {
  const { data, setData, post, processing, errors, clearErrors, reset } =
    useForm({
      student_id: "",
    });

  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const [flashMessage, setFlashMessage] = useState(null); // Local state for flash message

  const submit = (e) => {
    e.preventDefault();

    post(route("attendance.store"), {
      onSuccess: (page) => {
        reset();

        const message = page.props.flash.success || page.props.flash.error;
        setFlashMessage(message);
      },
    });
  };

  const handleClose = () => {
    reset();
    clearErrors();
    setIsOpen(false);
  };

  useEffect(() => {
    if (flashMessage) {
      toast({
        variant: flashMessage.includes("success") ? "success" : "destructive",
        description: flashMessage,
        duration: 3000,
      });

      // Clear flash message after showing the toast to prevent duplicate toasts
      setFlashMessage(null);
    }
  }, [flashMessage, toast]);

  return (
    <>
      <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
        <DialogTrigger asChild>
          <Button onClick={() => setIsOpen(true)} className={className}>
            Attendance
          </Button>
        </DialogTrigger>

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Attendance Form</DialogTitle>
            <DialogDescription>
              Please input your student id number.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={submit}>
            <div>
              {/* <InputLabel htmlFor="student_id" value="Student Id" /> */}
              <TextInput
                id="student_id"
                className="mt-1 block w-full"
                value={data.student_id}
                onChange={(e) => setData("student_id", e.target.value)}
              />
              <InputError className="mt-2" message={errors.student_id} />
            </div>
            <div className="mt-4 flex justify-end">
              <PrimaryButton
                className="bg-green-700 hover:bg-green-500 focus:bg-green-700"
                disabled={processing}
              >
                Submit
              </PrimaryButton>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AttendanceForm;
