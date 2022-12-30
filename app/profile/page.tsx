"use client";

import { auth, initFirebase } from "../../config/firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";
import Loading from "../../components/Loading";
import { useState } from "react";

type Props = {};

const Profile = (props: Props) => {
  initFirebase();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [errorMessages, setErrorMessages] = useState("");

  if (loading) {
    <Loading />;
  } else {
    if (!user) {
      <Loading />;
      router.push("/login");
    }
  }

  const logout = async () => {
    <Loading />;
    await signOut(auth)
      .catch((error) => {
        setErrorMessages("Something went wrong");
      })
      .then(() => {
        router.push("/login");
      });
  };
  return (
    <div className="my-[7vh] md:my-[10vh] w-full md:max-w-2xl mx-auto">
      <div className="flex flex-col mx-2 p-6 bg-gray-900 rounded-md shadow-xl">
        <h1 className="text-2xl font-bold text-center text-white">
          Welcome {user?.displayName}, this is profile page
        </h1>

        <button className="form-btn mt-4" onClick={logout}>
          Logout
        </button>
      </div>
      <div>
        {errorMessages.length > 0 ? (
          <p className="mt-4 text-error text-center text-xl font-bold italic text-red-500">
            {errorMessages}
          </p>
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default Profile;
