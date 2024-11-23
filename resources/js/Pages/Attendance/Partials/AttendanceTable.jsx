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

const AttendanceTable = ({ attendanceList }) => {
  return (
    <Table className="table-auto min-w-full">
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead colSpan={2} className="text-center">
            Signature
          </TableHead>
        </TableRow>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="text-center">Morning</TableHead>
          <TableHead className="text-center">Afternoon</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody className="overflow-y-auto">
        {attendanceList.length > 0 ? (
          attendanceList.map((attendance) => (
            <TableRow key={attendance.id}>
              <TableCell className="text-nowrap">
                {attendance.fullname}
              </TableCell>
              <TableCell className="text-center">
                <span className="block">{attendance.morning}</span>
              </TableCell>
              <TableCell className="text-center">
                <span className="block">{attendance.afternoon}</span>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            <TableCell colSpan={3} className="text-center">
              No attendance record.
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default AttendanceTable;
