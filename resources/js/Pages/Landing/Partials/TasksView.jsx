import React, { useState } from "react";
import { router } from "@inertiajs/react";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/shadcn/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { Button } from "@/shadcn/components/ui/button";
import TaskTable from "@/Pages/Task/Partials/TaskTable";
import Pagination from "@/Components/Pagination";

const TasksView = ({ tasks, queryParams }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("s1");

  const handleClose = () => {
    setIsOpen(false);

    queryParams = {};
    router.get(route("welcome"), queryParams);
  };

  const searchFieldChanged = (name, value) => {
    const newQueryParams = { ...queryParams, page: 1 };
    if (value) {
      newQueryParams[name] = value;
    } else {
      delete newQueryParams[name];
    }

    router.get(route("welcome"), newQueryParams, { preserveState: true });
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Tasks</Button>
      </DialogTrigger>

      <DialogContent className="lg:max-w-5xl">
        <DialogHeader>
          <DialogTitle>ROTC TASKS</DialogTitle>
          <DialogDescription></DialogDescription>
        </DialogHeader>
        <div>
          <Tabs
            defaultValue={activeTab}
            onValueChange={(value) => {
              setActiveTab(value);
              searchFieldChanged("user-role", value);
            }}
            className="w-full"
          >
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="s1">S1</TabsTrigger>
              <TabsTrigger value="s2">S2</TabsTrigger>
              <TabsTrigger value="s3">S3</TabsTrigger>
              <TabsTrigger value="s4">S4</TabsTrigger>
              <TabsTrigger value="s7">S7</TabsTrigger>
            </TabsList>
            <TabsContent value="s1">
              <Card>
                <CardContent>
                  <TaskTable
                    tasks={tasks}
                    queryParams={queryParams}
                    showActionColumn={false}
                    showIdColumn={false}
                    path="welcome"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="s2">
              <Card>
                <CardContent>
                  <TaskTable
                    tasks={tasks}
                    queryParams={queryParams}
                    showActionColumn={false}
                    showIdColumn={false}
                    path="welcome"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="s3">
              <Card>
                <CardContent>
                  <TaskTable
                    tasks={tasks}
                    queryParams={queryParams}
                    showActionColumn={false}
                    showIdColumn={false}
                    path="welcome"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="s4">
              <Card>
                <CardContent>
                  <TaskTable
                    tasks={tasks}
                    queryParams={queryParams}
                    showActionColumn={false}
                    showIdColumn={false}
                    path="welcome"
                  />
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="s7">
              <Card>
                <CardContent>
                  <TaskTable
                    tasks={tasks}
                    queryParams={queryParams}
                    showActionColumn={false}
                    showIdColumn={false}
                    path="welcome"
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
        <div>
          <Pagination
            links={tasks.meta.links}
            handleClick={(e) => e.stopPropagation()}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default TasksView;

{
  /* <TaskTable
  tasks={tasks}
  queryParams={queryParams}
  showActionColumn={false}
  showIdColumn={false}
/>; */
}
