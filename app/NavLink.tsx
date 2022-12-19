import Link from "next/link";
import React from "react";

type rout = {
  name: string;
  link: string;
};

const NavLink = ({ name, link }: rout) => {
  return (
    <nav className="inline-block gap-x-2">
      <Link className="my-btn hidden md:inline" href={link}>
        {name}
      </Link>
    </nav>
  );
};

export default NavLink;
