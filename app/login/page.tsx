"use client";

import { useState } from "react";
import { validEmailHelper } from "../../helpers/helper";
import Link from "next/link";
import { EnvelopeIcon, LockClosedIcon } from "@heroicons/react/24/solid";
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth, initFirebase } from "../../config/firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";

type Props = {};

const LogIn = (props: Props) => {
  initFirebase();

  const router = useRouter();
  const [user, loading, error] = useAuthState(auth);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsValidEmail(validEmailHelper(value));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  if (loading) {
    return <div>Loading...</div>;
  } else {
    if (user) {
      router.push("/");
      return <div>Loading...</div>;
    }
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    console.log("SUBMITTED");
    e.preventDefault();

    if (isValidEmail) {
      try {
        await signInWithEmailAndPassword(auth, email, password);
        router.push("/");
      } catch (error) {
        console.log(error);
      }
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="my-[7vh] md:my-[10vh] w-full md:max-w-xl mx-auto">
      <form
        action="submit"
        onSubmit={submit}
        className="flex flex-col mx-2 p-6 bg-gray-900 rounded-md shadow-xl"
      >
        <h1 className="font-semibold mb-2 text-3xl uppercase tracking-widest">
          Log In
        </h1>

        <hr className="mb-4 border-2 bg-blue-700 border-blue-700 rounded-xl" />

        {/* Email */}
        <div className="mb-3">
          <div className="flex gap-3 items-center">
            <EnvelopeIcon className="h-5 w-5" />
            <label className="text-label" htmlFor="email">
              Email
            </label>
          </div>
          <input
            className="text-input w-full mt-2"
            onChange={(e) => handleEmailChange(e.target.value)}
            type="text"
            name="email"
            placeholder="Enter your email"
            required
          />
          {!isValidEmail && email.length > 0 ? (
            <p className="mt-1 text-error text-xs italic text-red-500">
              Enter Valid Email
            </p>
          ) : (
            ""
          )}
        </div>

        {/* Password */}
        <div className="mb-3">
          <div className="flex gap-3 items-center">
            <LockClosedIcon className="h-5 w-5" />
            <label className="text-label" htmlFor="email">
              Password
            </label>
          </div>
          <input
            onChange={(e) => handlePasswordChange(e.target.value)}
            className="text-input w-full mt-2"
            type="password"
            name="password"
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="flex grid-cols-3 gap-4 items-center mt-4">
          {/* TODO:Google Icon */}
          <button className="form-btn" onClick={signInWithGoogle}>
            Sign In with Google
          </button>
          <div className="font-semibold">OR</div>
          {/* Submit Button */}
          <button className="form-btn">Submit</button>
        </div>

        <p className="block mt-3 text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-red-500 font-semibold">
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LogIn;
