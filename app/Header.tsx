"use client";

import { auth, initFirebase } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";

import { Bars3Icon } from "@heroicons/react/24/solid";
import Link from "next/link";
import NavLink from "./NavLink";

type Props = {};

const Header = (props: Props) => {
  initFirebase();

  const [user] = useAuthState(auth);
  var route;

  if (user) {
    route = [
      {
        name: "HOME",
        link: "/",
      },
      // {
      //   name: "LOGIN",
      //   link: "/login",
      // },
      // {
      //   name: "SIGNUP",
      //   link: "/signup",
      // },
      {
        name: "PROFILE",
        link: "/profile",
      },
    ];
  } else {
    route = [
      {
        name: "HOME",
        link: "/",
      },
      {
        name: "LOGIN",
        link: "/login",
      },
      {
        name: "SIGNUP",
        link: "/signup",
      },
      // {
      //   name: "PROFILE",
      //   link: "/profile",
      // },
    ];
  }

  // const route = [
  //   {
  //     name: "HOME",
  //     link: "/",
  //   },
  //   {
  //     name: "LOGIN",
  //     link: "/login",
  //   },
  //   {
  //     name: "SIGNUP",
  //     link: "/signup",
  //   },
  //   {
  //     name: "PROFILE",
  //     link: "/profile",
  //   },
  // ];
  return (
    <header>
      <div className="flex flex-row p-5 items-center justify-between z-20 shadow-md bg-black/40 backdrop-blur-sm">
        <Link href={"/"} prefetch={false}>
          <h1 className="font-bold text-lg ">Next-Fire-Auth</h1>
        </Link>

        <div className="">
          <div className="flex gap-2">
            {route.map((item) => (
              <NavLink key={item.name} name={item.name} link={item.link} />
            ))}
          </div>
          {/* DarkMode Button */}
          <Bars3Icon className="md:hidden h-8 w-8 cursor-pointer" />
        </div>
      </div>
    </header>
  );
};

export default Header;
