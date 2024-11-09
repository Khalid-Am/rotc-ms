import { Button } from "@/shadcn/components/ui/button";
import { XMarkIcon } from "@heroicons/react/16/solid";
import { router } from "@inertiajs/react";
import React, { useState } from "react";

const FilterReset = ({ queryParams, className, path }) => {
  queryParams = queryParams || {};

  const [queryParamsState, setQueryParamsState] = useState(() => {
    const filteredParams = Object.fromEntries(
      Object.entries(queryParams || {}).filter(
        ([key]) => key !== "page" && key !== "archived"
      )
    );

    return Object.keys(filteredParams).length > 0 ? queryParams : null;
  });

  const handleReset = () => {
    setQueryParamsState((prevState) => {
      // Filter out 'archived' from prevState
      const filteredQueryParams = Object.fromEntries(
        Object.entries(prevState).filter(([key]) => key === "archived")
      );

      // If there are still other query params, return them; otherwise, return null
      return Object.keys(filteredQueryParams).length > 0
        ? filteredQueryParams
        : null;
    });

    const finalQuery = {
      archived: queryParams.archived, // Keep 'archived' if it exists
    };

    router.get(route(path), finalQuery);
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
