"use client";

import { auth, initFirebase } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";
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

  const toggleEventHandle = (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (target?.id !== "toogle-click") {
      setToggleMenu(!toggleMenu);
    }
  };

  useEffect(() => {
    if (toggleMenu) {
      document.addEventListener("click", toggleEventHandle, { once: true });
    }
  }, [toggleMenu]);

  let route;

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
                id="toogle-click"
                className="md:hidden h-8 w-8 cursor-pointer"
              />
            ) : (
              <Bars3Icon
                id="toogle-click"
                className="md:hidden h-8 w-8 cursor-pointer"
                onClick={() => setToggleMenu(true)}
              />
            )}{" "}
            {toggleMenu && (
              <ul className="absolute flex justify-center align-middle p-4 top-10 right-0 bg-gray-900 rounded-xl shadow-xl flex-col gap-2 ">
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
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
