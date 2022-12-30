"use client";

import React, { useMemo, useState } from "react";
import { validEmailHelper } from "../../helpers/helper";
import Link from "next/link";
import { auth, initFirebase } from "../../config/firebase";
import {
  UserPlusIcon,
  UserIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
} from "@heroicons/react/24/solid";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";
import Loading from "../../components/Loading";

type Props = {};

const SignUp = (props: Props) => {
  initFirebase();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [cnfpassword, setCnfSetPassword] = useState("");

  const comparePassword = (password: string, cnfpassword: string) => {
    return password === cnfpassword;
  };
  const checkPassword = useMemo(
    () => comparePassword(password, cnfpassword),
    [password, cnfpassword]
  );

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setIsValidEmail(validEmailHelper(value));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
  };

  const handleCnfSetPassword = (value: string) => {
    setCnfSetPassword(value);
  };

  const handlePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (isValidEmail && checkPassword) {
      <Loading />;
      await createUserWithEmailAndPassword(auth, email, password)
        .catch(function (error) {
          if (error.code === "auth/email-already-in-use") {
            setErrorMessages("Email already in use");
          } else if (error.code === "auth/invalid-email") {
            setErrorMessages("Invalid email");
          } else if (error.code === "auth/weak-password") {
            setErrorMessages("Weak password");
          }
        })
        .then(() => {
          if (auth.currentUser) {
            router.push("/");
          }
        });
    }
  };

  return (
    <div className="my-[7vh] md:my-[8vh] w-full md:max-w-xl mx-auto">
      <form
        action="submit"
        onSubmit={submit}
        className="flex flex-col mx-2 p-6 bg-gray-900 rounded-md shadow-xl"
      >
        <h1 className="font-semibold text-3xl uppercase mb-2 tracking-widest">
          Sign Up
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

        {/* Name */}
        <div className="mb-3">
          <div className="flex gap-3 items-center">
            <UserIcon className="h-5 w-5" />
            <label className="text-label" htmlFor="name">
              Display Name
            </label>
          </div>
          <input
            className="text-input w-full mt-2"
            type="text"
            name="name"
            placeholder="Emter your name"
            required
          />
        </div>

        {/* Password */}
        <div className="mb-3">
          <div className="flex gap-3 items-center">
            <LockClosedIcon className="h-5 w-5" />
            <label className="text-label select-none" htmlFor="email">
              Password
            </label>
          </div>
          <div className="relative flex items-center">
            <input
              className="text-input w-full mt-2"
              type={isPasswordVisible ? "text" : "password"}
              onChange={(e) => handlePasswordChange(e.target.value)}
              name="password"
              placeholder="Emter your password"
              required
            />
            {!isPasswordVisible ? (
              <EyeIcon
                className="w-5 h-5 absolute top-4 right-4"
                onClick={() => handlePasswordVisibility()}
              />
            ) : (
              <EyeSlashIcon
                className="w-5 h-5 absolute top-4 right-4"
                onClick={() => handlePasswordVisibility()}
              />
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="mb-3">
          <div className="flex gap-3 items-center">
            <LockClosedIcon className="h-5 w-5" />
            <label className="text-label" htmlFor="email">
              Confirm Password
            </label>
          </div>
          <input
            className="text-input w-full mt-2"
            type="password"
            name="confirmPassword"
            onChange={(e) => handleCnfSetPassword(e.target.value)}
            placeholder="Enter your confirmpassword"
            required
          />
          <p>
            {!checkPassword && cnfpassword.length > 0 ? (
              <span className="mt-1 text-error text-xs italic text-red-500">
                Passwords do not match
              </span>
            ) : (
              ""
            )}
          </p>
        </div>

        {/* Submit Button */}
        <button className="form-btn mt-4 flex items-center gap-3 justify-center">
          <UserPlusIcon className="h-6 w-6" />
          Submit
        </button>
        <h5 className="block mt-4 text-center">
          Already Signed Up?{" "}
          <Link href="/login" className="text-red-500 font-semibold">
            Log In
          </Link>
        </h5>
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

export default SignUp;
