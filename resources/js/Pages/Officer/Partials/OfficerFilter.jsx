import FilterBar from "@/Components/FilterBar";
import FilterChip from "@/Components/FilterChip";
import FilterReset from "@/Components/FilterReset";
import React from "react";

const OfficerFilter = ({ queryParams }) => {
  queryParams = queryParams || {};

  return (
    <div className="space-y-2">
      <FilterBar queryParams={queryParams} path={"officer.index"} />
      <FilterReset
        key={JSON.stringify(queryParams)}
        queryParams={queryParams}
        path="officer.index"
      />
    </div>
  );
};

export default OfficerFilter;
