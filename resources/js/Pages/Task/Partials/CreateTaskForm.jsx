import PrimaryButton from "@/Components/PrimaryButton";
import { PlusCircleIcon } from "@heroicons/react/16/solid";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shadcn/components/ui/dialog";
import { useToast } from "@/shadcn/hooks/use-toast";
import { useForm } from "@inertiajs/react";
import { Button } from "@/shadcn/components/ui/button";
import { DialogClose } from "@radix-ui/react-dialog";

const CreateTaskForm = ({ children }) => {
  const { data, setData, post, processing, errors } = useForm({
    title: "",
    instruction: "",
    due_date: "",
  });

  const { toast } = useToast();

  const submit = (e) => {
    e.preventDefault();

    post(route("task.store"), {
      onSuccess: () => {
        toast({
          variant: "success",
          description: "Task was updated successfully!",
        }); // Show toast on success
      },
    });
  };

  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="bg-green-700 hover:bg-green-500 focus:bg-green-700">
            <PlusCircleIcon className="w-[15px] mr-2" />
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create Task</DialogTitle>
          </DialogHeader>
          <DialogFooter>
            <DialogClose>
              <Button
                Button
                className="bg-green-700 hover:bg-green-500 focus:bg-green-700"
              >
                Close
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTaskForm;
