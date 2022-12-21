"use client";

import React from "react";
import { auth, initFirebase } from "../../config/firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import { SignalIcon } from "@heroicons/react/24/solid";
import { notFound } from "next/navigation";

type Props = {};

const HomePage = (props: Props) => {
  initFirebase();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

  if (loading) {
    <SignalIcon className="h-20 w-20 text-red-700 mx-auto mt-4 animate-spin" />;
  } else {
    if (!user) {
      <SignalIcon className="h-20 w-20 text-red-700 mx-auto mt-4 animate-spin" />;
      router.push("/login");
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return notFound();
};

export default HomePage;
