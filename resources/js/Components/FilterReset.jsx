import { Button } from "@/shadcn/components/ui/button";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { router } from "@inertiajs/react";
import React, { useState } from "react";

const FilterReset = ({ queryParams, className, path }) => {
  queryParams = queryParams || {};
  const [queryParamsState, setQueryParamsState] = useState(() => {
    const filteredParams = Object.fromEntries(
      Object.entries(queryParams || {}).filter(([key]) => key !== "page")
    );

    return Object.keys(filteredParams).length > 0 ? queryParams : null;
  });

  const handleReset = () => {
    setQueryParamsState(null);
    router.get(route(path), {}, { preserveState: true });
  };
  return (
    <>
      {queryParamsState && (
        <Button
          variant="ghost"
          size="sm"
          onClick={() => handleReset()}
          className={`w-auto px-3 rounded-lg ` + className}
        >
          Reset <XMarkIcon className="ml-1 w-4 h-4 text-gray-500" />
        </Button>
      )}
    </>
  );
};

export default FilterReset;
