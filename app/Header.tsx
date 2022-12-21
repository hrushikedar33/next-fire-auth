"use client";

import { auth, initFirebase } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useState } from "react";
import Link from "next/link";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import Loading from "../components/Loading";
import { usePathname } from "next/navigation";

type Props = {};

const Header = (props: Props) => {
  initFirebase();
  const pathname = usePathname();
  const [toggleMenu, setToggleMenu] = useState(false);
  const [user, loading] = useAuthState(auth);
  var route;

  if (loading) return <Loading />;

  if (user) {
    route = [
      {
        name: "HOME",
        link: "/",
      },
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
          <div className="hidden md:flex gap-2">
            {route.map((item) => (
              <Link key={item.name} href={item.link}>
                <span
                  className={pathname == item.link ? "my-activebtn" : "my-btn"}
                >
                  {item.name}
                </span>
              </Link>
            ))}
          </div>
          <div className="ml-5 relative cursor-pointer">
            {toggleMenu ? (
              <XMarkIcon
                className="md:hidden h-8 w-8 cursor-pointer"
                onClick={() => setToggleMenu(false)}
              />
            ) : (
              <Bars3Icon
                className="md:hidden h-8 w-8 cursor-pointer"
                onClick={() => setToggleMenu(true)}
              />
            )}{" "}
            {toggleMenu && (
              <div className="absolute flex justify-center align-middle p-2 top-10 right-0 bg-gray-900 rounded-xl shadow-xl ">
                <ul className="flex flex-col gap-2 p-4">
                  {route.map((item) => (
                    <Link key={item.name} href={item.link}>
                      <li
                        className={
                          pathname == item.link ? "my-btn" : "my-activebtn"
                        }
                      >
                        {item.name}
                      </li>
                    </Link>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
