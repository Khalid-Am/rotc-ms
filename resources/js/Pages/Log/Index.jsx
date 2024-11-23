import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, usePage } from "@inertiajs/react";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import LogsTable from "./Partials/LogsTable";

const Index = ({ activityLogs }) => {
  return (
    <AuthenticatedLayout>
      <Head title="Logs" />

      <div className="py-6">
        <div className="mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="overflow-hidden bg-white shadow-sm sm:rounded-lg">
            <div className="p-6">
              <Card>
                <CardHeader>
                  <CardTitle>
                    {usePage().props.auth.user.data.role === "corps"
                      ? "Activity Log"
                      : "My Activity Log"}
                  </CardTitle>
                  <CardDescription>
                    Only the top 10 latest logs were shown.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <LogsTable activityLogs={activityLogs} />
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default Index;
