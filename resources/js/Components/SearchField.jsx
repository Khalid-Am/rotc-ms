import { router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import React from "react";

const SearchField = ({ queryParams = null, path = "", className }) => {
  queryParams = queryParams || {};
  const searchFieldChanged = (name, value) => {
    if (value) {
      queryParams[name] = value;
    } else {
      delete queryParams[name];
    }
    router.get(route(path), queryParams);
  };

  const onKeyPress = (name, e) => {
    if (e.key !== "Enter") return;

    searchFieldChanged(name, e.target.value);
  };
  return (
    <TextInput
      className={className}
      placeholder="Search"
      defaultValue={queryParams.name}
      onBlur={(e) => searchFieldChanged("search", e.target.value)}
      onKeyPress={(e) => onKeyPress("search", e)}
    />
  );
};

export default SearchField;
