import { Link, usePage } from "@inertiajs/react";
import React from "react";

const Pagination = ({ links }) => {
  return (
    <nav className="text-center mt-3">
      {links.map((link) => (
        <Link
          preserveState
          preserveScroll
          href={link.url || ""}
          key={link.label}
          className={
            "inline-block py-2 px-3 rounded-lg text-black text-sm " +
            (link.active ? "bg-green-800 text-white " : " ") +
            (!link.url ? "!text-gray-500 cursor-not-allowed " : " ")
          }
          dangerouslySetInnerHTML={{ __html: link.label }}
        ></Link>
      ))}
    </nav>
  );
};

export default Pagination;
