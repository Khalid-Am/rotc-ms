import React, { useState, useEffect } from "react";
import { router } from "@inertiajs/react";
import TextInput from "@/Components/TextInput";
import {
  Table,
  TableBody,
  TableCell,
  TableRow,
} from "@/shadcn/components/ui/table";

const SearchBar = ({ queryParams = null, path = "", className, onSelect }) => {
  const [results, setResults] = useState([]);
  const [inputValue, setInputValue] = useState(queryParams?.search || "");

  const searchFieldChanged = (value) => {
    setInputValue(value);

    if (value.trim()) {
      const updatedQueryParams = { ...queryParams, search: value };
      router.get(route(path), updatedQueryParams, {
        onSuccess: (page) => {
          //   console.log(page.props);
          const fetchedResults = page.props.officers || [];
          if (Array.isArray(fetchedResults)) {
            setResults(fetchedResults);
          } else {
            console.warn("Fetched results is not an array:", fetchedResults);
            setResults([]);
          }
        },
        preserveState: true,
        only: ["officers"],
      });
    } else {
      setResults([]);
    }
  };

  const handleRowClick = (selectedValue) => {
    setInputValue(
      (selectedValue.firstName ? selectedValue.firstName : "" + " ") +
        " " +
        (selectedValue.middleName ? selectedValue.middleName : "" + " ") +
        " " +
        (selectedValue.lastName ? selectedValue.lastName : "")
    );
    setResults([]);
    onSelect(selectedValue); // Notify parent about selection
  };

  return (
    <div className="relative">
      <TextInput
        className={className}
        placeholder="Search"
        value={inputValue}
        onChange={(e) => searchFieldChanged(e.target.value)}
      />
      {results.length > 0 && (
        <div className="mt-4 max-h-40 overflow-auto">
          <Table className="h-full">
            <TableBody>
              {results.map((result) => (
                <TableRow
                  key={result.id}
                  className="cursor-pointer hover:bg-gray-100"
                  onClick={() => handleRowClick(result)}
                >
                  <TableCell>{result.firstName}</TableCell>
                  <TableCell>{result.middleName}</TableCell>
                  <TableCell>{result.lastName}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
