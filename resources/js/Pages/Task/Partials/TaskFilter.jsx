import React from "react";
import FilterChip from "@/Components/FilterChip";
import FilterBar from "@/Components/FilterBar";
import {
  ClockIcon,
  EllipsisHorizontalCircleIcon,
  CheckCircleIcon,
  CalendarIcon,
  CalendarDaysIcon,
} from "@heroicons/react/16/solid";
import FilterReset from "@/Components/FilterReset";

const TaskFilter = ({ queryParams }) => {
  const statuses = [
    {
      label: "Pending",
      value: "pending",
      icon: ClockIcon,
      iconColor: "text-amber-500",
    },
    {
      label: "In Progress",
      value: "in_progress",
      icon: EllipsisHorizontalCircleIcon,
      iconColor: "text-blue-500",
    },
    {
      label: "Completed",
      value: "completed",
      icon: CheckCircleIcon,
      iconColor: "text-green-500",
    },
  ];

  const posted_at_dates = [
    {
      label: "Week ago",
      value: "week",
      icon: CalendarIcon,
      iconColor: "text-red-500",
    },

    {
      label: "Latest",
      value: "latest",
      icon: CalendarIcon,
      iconColor: "text-blue-500",
    },
  ];

  const due_dates = [
    {
      label: "Past Due",
      value: "past_due",
      icon: CalendarDaysIcon,
      iconColor: "text-red-500",
    },

    {
      label: "Today",
      value: "today",
      icon: CalendarDaysIcon,
      iconColor: "text-amber-500",
    },

    {
      label: "This Week",
      value: "this_week",
      icon: CalendarDaysIcon,
      iconColor: "text-blue-500",
    },

    {
      label: "Next week",
      value: "next_week",
      icon: CalendarDaysIcon,
      iconColor: "text-green-500",
    },
  ];

  return (
    <div className="space-y-2">
      <FilterBar queryParams={queryParams} path={"task.index"} />
      <div className="inline-block space-x-2">
        <FilterChip
          queryParams={queryParams}
          items={statuses}
          path="task.index"
          name="status"
          placeholder="Status"
        />

        <FilterChip
          queryParams={queryParams}
          items={posted_at_dates}
          path="task.index"
          name="posted_at"
          placeholder="Posted At"
        />

        <FilterChip
          queryParams={queryParams}
          items={due_dates}
          path="task.index"
          name="due_date"
          placeholder="Due Date"
        />
        <FilterReset
          key={JSON.stringify(queryParams)}
          queryParams={queryParams}
          path="task.index"
          className="sm:mt-2"
        />
      </div>
    </div>
  );
};

export default TaskFilter;
