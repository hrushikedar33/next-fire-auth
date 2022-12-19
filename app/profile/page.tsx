"use client";

import { auth, initFirebase } from "../../config/firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import { signOut } from "firebase/auth";

type Props = {};

const Profile = (props: Props) => {
  initFirebase();
  const router = useRouter();
  const [user, loading] = useAuthState(auth);

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
      <div className="flex flex-col mx-2 p-6 bg-gray-900 rounded-md shadow-xl">
        <button className="form-btn" onClick={logout}>
          this is Profile page Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
