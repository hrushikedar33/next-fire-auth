"use client";

import { EnvelopeIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import React from "react";
import { useState } from "react";
import { validEmailHelper } from "../../helpers/helper";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth, initFirebase } from "../../config/firebase";
import { useRouter } from "next/navigation";
import { useAuthState } from "react-firebase-hooks/auth";
import Loading from "../../components/Loading";

type Props = {};

const ForgotPassword = (props: Props) => {
  initFirebase();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsValidEmail(validEmailHelper(value));
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isValidEmail) {
      try {
        <Loading />;
        await sendPasswordResetEmail(auth, email);
        router.push("/login");
      } catch (error) {
        console.log(error);
      }
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
          Reset Password
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
          <button className="form-btn mt-4">Submit</button>
        </div>
        <Link
          href="/login"
          className="block mt-2 text-center text-red-500 font-semibold"
        >
          Return to Login
        </Link>
      </form>
    </div>
  );
};

export default ForgotPassword;
