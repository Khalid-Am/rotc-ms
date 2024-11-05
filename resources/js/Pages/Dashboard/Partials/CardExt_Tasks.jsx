import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shadcn/components/ui/card";
import { ArrowRightCircleIcon } from "@heroicons/react/16/solid";
import { Link } from "@inertiajs/react";

const CardExt_Tasks = ({ children, count, icon, cardColor }) => {
  return (
    <Card className={`h-38 w-auto md:w-full bg-white shadow-md`}>
      <CardContent className="flex items-center pb-0">
        <div className="text-center">{icon}</div>
        <CardHeader className="pt-10">
          <CardTitle className="text-4xl font-extrabold tracking-wide text-slate-900">
            {count}
          </CardTitle>
          <CardDescription className="text-slate-900">
            {children}
          </CardDescription>
        </CardHeader>
      </CardContent>
      {/* <div className="relative p-2">
        <Link href="#">
          <ArrowRightCircleIcon className="text-white w-6 absolute right-4 bottom-2 hover:text-slate-100" />
        </Link>
      </div> */}
    </Card>
  );
};

export default CardExt_Tasks;
