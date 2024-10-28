import React from "react";
import { Link } from "@inertiajs/react";
import { ArrowLongRightIcon } from "@heroicons/react/16/solid";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";

const CardExt_Tasks = ({ children, count, path, icon }) => {
  return (
    <Card className="w-[300px] h-40">
      <CardHeader className="flex flex-row justify-between relative pb-4">
        <CardTitle className="text-lg font-medium tracking-wide">
          {children}
        </CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <span className="text-5xl font-extrabold">{count}</span>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Link href={path} className="relative">
          <ArrowLongRightIcon className="w-[22px] absolute bottom-0 right-0 text-green-700 hover:text-green-400" />
        </Link>
      </CardFooter>
    </Card>
  );
};

export default CardExt_Tasks;
