import React, { useEffect, useState } from "react";
import { cn } from "@/shadcn/lib/utils";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/shadcn/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shadcn/components/ui/popover";
import { router } from "@inertiajs/react";
import { Button } from "@/shadcn/components/ui/button";
import { PlusCircleIcon } from "@heroicons/react/16/solid";

const FilterChip = ({ queryParams, items, name, path, placeholder }) => {
  queryParams = queryParams || {};
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);

  const searchFieldChanged = (name, value) => {
    const newQueryParams = { ...queryParams, page: 1 };

    if (value) {
      newQueryParams[name] = value;
    } else {
      delete newQueryParams[name];
    }

    router.get(route(path), newQueryParams, { preserveState: true });
  };

  const handleSelect = (item) => {
    setSelectedItem(item);
    searchFieldChanged(name, item.value);
    setOpen(false);
  };

  useEffect(() => {
    const currentValue = queryParams[name];
    if (currentValue) {
      const matchedItem = items.find((item) => item.value === currentValue);
      setSelectedItem(matchedItem || null);
    } else {
      queryParams = {};
      setSelectedItem(null);
    }
  }, [queryParams, items, name]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="w-auto h-full px-3 py-2 shadow-md rounded-lg"
        >
          {selectedItem ? (
            <>
              {selectedItem.icon && (
                <selectedItem.icon
                  className={`mr-2 w-4 h-4 ${selectedItem.iconColor}`}
                />
              )}
              {selectedItem.label}
            </>
          ) : (
            <>
              <PlusCircleIcon className="mr-2 h-4 w-4" />
              {placeholder}
            </>
          )}
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-full p-1" align="start">
        <Command>
          <CommandList>
            <CommandGroup>
              {items.map((item) => (
                <CommandItem
                  key={item.value}
                  value={item.value}
                  onSelect={() => handleSelect(item)}
                  className="hover:cursor-pointer"
                >
                  {item.icon && (
                    <item.icon
                      className={cn(
                        "mr-2 h-4 w-4",
                        item.value === selectedItem?.value
                          ? "opacity-100"
                          : "opacity-40"
                      )}
                    />
                  )}
                  <span>{item.label}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default FilterChip;
