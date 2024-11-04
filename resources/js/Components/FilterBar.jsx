import React, { useEffect, useRef, useState } from "react";
import { router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/16/solid";

const FilterBar = ({ queryParams = null, path = "", className }) => {
  queryParams = queryParams || {};
  const [searchValue, setSearchValue] = useState(queryParams?.name || "");

  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route(path), queryParams, { preserveState: true });
  };

  useEffect(() => {
    setSearchValue(queryParams.search || "");
  }, [queryParams.search]);

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };

  const handleClear = () => {
    setSearchValue("");
    searchFieldChanged("search", "");
  };

  return (
    <div className="relative shadow-sm round-md">
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500" />
      <TextInput
        className={`pl-10 p-2 border w-full ${className}`}
        placeholder="Search..."
        value={searchValue}
        onChange={(e) => setSearchValue(e.target.value)}
        onKeyPress={(e) => onKeyPress("search", e)}
      />
      {searchValue && (
        <XMarkIcon
          className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-500 cursor-pointer"
          onMouseDown={handleClear}
        />
      )}
    </div>
  );
};

export default FilterBar;
