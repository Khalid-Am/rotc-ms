import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shadcn/components/ui/table";
import Pagination from "@/Components/Pagination";

const OfficersAttendanceTable = ({ attendances }) => {
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Time</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {attendances.data.length > 0 ? (
            attendances.data.map((attendance) => (
              <TableRow key={attendance.id}>
                <TableCell>{attendance.date}</TableCell>
                <TableCell>{attendance.time}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={2} className="text-center">
                No Record.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <div className="my-4">
        <Pagination links={attendances?.links} />
      </div>
    </>
  );
};

export default OfficersAttendanceTable;
