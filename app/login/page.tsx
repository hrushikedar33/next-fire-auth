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
import Loading from "../../components/Loading";

type Props = {};

const LogIn = (props: Props) => {
  initFirebase();

  const router = useRouter();

  const [user, loading] = useAuthState(auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsValidEmail(validEmailHelper(value));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  if (loading) {
    <Loading />;
  } else {
    if (user) {
      <Loading />;
      router.push("/");
    }
  }

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidEmail) {
      <Loading />;
      await signInWithEmailAndPassword(auth, email, password)
        .catch(function (error) {
          if (error.code === "auth/user-not-found") {
            setErrorMessages("User not found, please sign up");
          } else if (error.code === "auth/wrong-password") {
            setErrorMessages("Wrong password");
          } else {
            setErrorMessages("Something went wrong");
          }
        })
        .then(() => {
          if (auth.currentUser) {
            router.push("/");
          }
        });
    }
  };

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    <Loading />;
    await signInWithPopup(auth, provider)
      .catch(function (error) {
        setErrorMessages("Something went wrong");
      })
      .then(() => {
        if (auth.currentUser) {
          router.push("/");
        }
      });
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

        <p className="block mt-4 text-center">
          Don't have an account?{" "}
          <Link href="/signup" className="text-red-500 font-semibold">
            Sign Up
          </Link>
        </p>
        <Link
          href="/forgot-password"
          className="block mt-2 text-center text-red-500 font-semibold"
        >
          Forgot Password?
        </Link>
        <div>
          {errorMessages.length > 0 ? (
            <p className="mt-4 text-error text-center text-xl font-bold italic text-red-500">
              {errorMessages}
            </p>
          ) : (
            ""
          )}
        </div>
      </form>
    </div>
  );
};

export default LogIn;
