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
import { DialogClose } from "@radix-ui/react-dialog";
import { useForm } from "@inertiajs/react";
import { useToast } from "@/shadcn/hooks/use-toast";
import PrimaryButton from "@/Components/PrimaryButton";
import SecondaryButton from "@/Components/SecondaryButton";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import InputError from "@/Components/InputError";
import { Textarea } from "@/shadcn/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/shadcn/components/ui/select";
import { TASK_STATUS_TEXT_MAP } from "@/constants";

const UpdateTaskForm = ({ children, task }) => {
  const { data, setData, post, processing, errors } = useForm({
    title: task.title || "",
    description: task.description || "",
    status: task.status || "",
    due_date: task.due_date || "",
    _method: "PUT",
  });

  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);

  const submit = (e) => {
    e.preventDefault();

    post(route("task.update", task.id), {
      onSuccess: () => {
        toast({
          variant: "success",
          description: "Task was added successfully!",
        }); // Show toast on success
        setIsOpen(false);
      },
    });
  };
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <span
          onClick={() => setIsOpen(true)}
          className="text-blue-600 hover:cursor-pointer"
        >
          {children}
        </span>
      </DialogTrigger>
      <DialogContent>
        <form onSubmit={submit} className="space-y-4">
          <DialogHeader>
            <DialogTitle>Update Task</DialogTitle>
            <DialogDescription>Provide the updated details.</DialogDescription>
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

          <div className="mt-4">
            <InputLabel htmlFor="status" value="Status" />
            <Select onValueChange={(value) => setData("status", value)}>
              <SelectTrigger className="mt-1 w-full">
                <SelectValue placeholder={TASK_STATUS_TEXT_MAP[data.status]} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <InputError message={errors.status} className="mt-2" />
          </div>

          <DialogFooter className="mt-2">
            <DialogClose asChild>
              <SecondaryButton onClick={() => setIsOpen(true)}>
                Close
              </SecondaryButton>
            </DialogClose>
            <PrimaryButton
              className="bg-green-700 hover:bg-green-500 focus:bg-green-700"
              disabled={processing}
            >
              Update
            </PrimaryButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTaskForm;
