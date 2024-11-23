import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";

const LogsTable = ({ activityLogs }) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Time</TableHead>
          <TableHead>Role</TableHead>
          <TableHead>Activity</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {activityLogs.length > 0 ? (
          activityLogs.map((log) => (
            <TableRow key={log.id}>
              <TableCell>
                {new Date(log.created_at).toLocaleDateString("en-CA")}
              </TableCell>
              <TableCell>
                {new Date(log.created_at).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </TableCell>
              <TableCell>{log.properties.role}</TableCell>
              <TableCell>{`${log.description} ${
                log.log_name === "task" && log.properties?.title
                  ? "[ " + log.properties?.title + " ]"
                  : ""
              }`}</TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={5} className="text-center">
              No activity log.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default LogsTable;
