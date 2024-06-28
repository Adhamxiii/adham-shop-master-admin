"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

const RegisterPage = () => {
  const [error, setError] = useState("");

  const router = useRouter();

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const submitHandler = async (e: any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;



    if (!isValidEmail(email)) {
      toast.error("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      toast.error("Password is invalid");
      return;
    }

    try {
      const res = await axios.post("/api/register", { email, password });
      const { data } = res;

      if (res.status === 400) {
        setError("This email is already registered");
        toast.error("This email is already registered");
      }

      if (res.status === 200) {
        router.push("/auth/login");
      }
    } catch (error) {
      console.log("[register_Submit]", error);
    }
  };
  
  return (
    <div className="flex h-screen w-screen gap-6">
      <div className="relative w-1/2 flex-1 rounded-r-3xl max-lg:hidden">
        <Image
          src="https://images.pexels.com/photos/4049870/pexels-photo-4049870.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          fill
          className="h-full w-full rounded-r-3xl object-cover"
        />
      </div>
      <div className="relative flex flex-1 flex-col items-center justify-between py-16">
        <div className="flex min-w-full flex-col justify-center gap-8 px-20">
          <div className="flex flex-col gap-2">
            <h1 className="text-heading1-bold font-bold">Register</h1>
            <p className="text-base-medium">Create a new account</p>
          </div>
          <form
            onSubmit={(e) => submitHandler(e)}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="text-base-medium">
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="border-grey-100 rounded-md border-2 p-2"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="password" className="text-base-medium">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="border-grey-100 rounded-md border-2 p-2"
              />
            </div>
            <button
              type="submit"
              className="rounded-md bg-blue-1 p-2 text-white"
            >
              Register
            </button>

            {error && <p className="text-base-medium text-red-1">{error}</p>}
          </form>
          <div className="flex flex-col gap-2">
            <p className="text-center text-base-medium">
              Already have an account?{" "}
              <Link href="/auth/login" className="text-blue-1">
                Login here
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <p>or register with</p>
            <button
              type="button"
              className="rounded-full bg-grey-2 p-2 hover:bg-grey-1 hover:text-white"
            >
              Google
            </button>
          </div>
        </div>
        <div className="absolute bottom-2">
          <Image
            src="/logo.png"
            alt=""
            width={200}
            height={200}
            className="mx-auto"
          />
          <p className="text-base-medium">
            &copy; {new Date().getFullYear()} Adham Shop Master. All Rights
            Reserved
          </p>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
