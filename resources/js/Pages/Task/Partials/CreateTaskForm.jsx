import { PlusCircleIcon } from "@heroicons/react/16/solid";
import React, { useState } from "react";
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
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import SecondaryButton from "@/Components/SecondaryButton";
import { Textarea } from "@/shadcn/components/ui/textarea";

const CreateTaskForm = ({ children }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    title: "",
    description: "",
    due_date: "",
  });

  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    post(route("task.store"), {
      onSuccess: () => {
        toast({
          variant: "success",
          description: "Task was added successfully!",
          duration: 4000,
        }); // Show toast on success
        setIsOpen(false);
        reset();
      },
    });
  };

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <Button
            size="sm"
            className="bg-green-500 hover:bg-green-600 focus:bg-green-600"
            onClick={() => {
              setIsOpen(true);
              reset();
            }}
          >
            <PlusCircleIcon className="w-[15px] mr-2" />
            {children}
          </Button>
        </DialogTrigger>
        <DialogContent>
          <form onSubmit={submit} method="POST" className="space-y-4">
            <DialogHeader>
              <DialogTitle>Add Task</DialogTitle>
              <DialogDescription>
                Provide details of your task here.
              </DialogDescription>
            </DialogHeader>

            <div>
              <div>
                <InputLabel htmlFor="title" value="Title" />
                <TextInput
                  id="title"
                  type="text"
                  name="title"
                  value={data.title}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("title", e.target.value)}
                  isFocused={true}
                />
                <InputError message={errors.title} className="mt-2" />
              </div>
            </div>

            <div>
              <div>
                <InputLabel htmlFor="description" value="Description" />
                <Textarea
                  id="description"
                  name="description"
                  value={data.description}
                  className="mt-1 block w-full h-[125px]"
                  onChange={(e) => setData("description", e.target.value)}
                />
                <InputError message={errors.description} className="mt-2" />
              </div>
            </div>

            <div>
              <div>
                <InputLabel htmlFor="due_date" value="Due Date" />
                <TextInput
                  id="due_date"
                  type="date"
                  name="due_date"
                  min={new Date().toISOString().split("T")[0]}
                  value={data.due_date}
                  className="mt-1 block w-full"
                  onChange={(e) => setData("due_date", e.target.value)}
                />
                <InputError message={errors.due_date} className="mt-2" />
              </div>
            </div>

            <DialogFooter className="mt-2">
              <DialogClose asChild>
                <Button
                  onClick={() => setIsOpen(true)}
                  variant="outline"
                  className=" hover:bg-gray-200"
                  size="sm"
                >
                  Close
                </Button>
              </DialogClose>
              <Button
                className="bg-green-500 hover:bg-green-600 focus:bg-green-600"
                size="sm"
                disabled={processing}
              >
                Add
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CreateTaskForm;
