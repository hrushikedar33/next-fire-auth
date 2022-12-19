"use client";

import React from "react";
import { auth, initFirebase } from "../../config/firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

type Props = {};

const HomePage = (props: Props) => {
  initFirebase();
  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  if (loading) {
    return <div>Loading...</div>;
  } else {
    if (!user) {
      router.push("/login");
      return <div>Loading...</div>;
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
  return (
    <div className="my-[7vh] md:my-[10vh] w-full md:max-w-xl mx-auto">
      <div className="flex flex-col">
        <button className="form-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default HomePage;
