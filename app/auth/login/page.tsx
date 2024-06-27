"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

const LoginPage = () => {
  const session = useSession();
  if (session?.data?.user) console.log("ana auth");
  return (
    <div className="flex h-screen w-screen gap-6">
      <div className="relative w-1/2 flex-1 rounded-r-3xl">
        <Image
          src="https://images.pexels.com/photos/1860160/pexels-photo-1860160.jpeg?auto=compress&cs=tinysrgb&w=600"
          alt=""
          fill
          className="h-full w-full rounded-r-3xl object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col items-center justify-between py-16">
        <div className="flex w-full flex-col justify-center gap-12 px-20">
          <div className="flex flex-col gap-2">
            <h1 className="text-heading1-bold font-bold">Login</h1>
            <p className="text-base-medium">
              Log in with the account you registered with
            </p>
          </div>
          <form action="" className="flex flex-col gap-4">
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
              Login
            </button>
          </form>
          <div className="flex flex-col gap-2">
            <p className="text-center text-base-medium">
              {"Don't"} have an account?{" "}
              <Link href="/auth/register" className="text-blue-1">
                Register here
              </Link>
            </p>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <p>or login with</p>
            <button
              type="button"
              className="rounded-full bg-grey-2 p-2 hover:bg-grey-1 hover:text-white"
              onClick={() =>
                signIn("google", { redirect: true, callbackUrl: "/" })
              }
            >
              Google
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
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

export default LoginPage;
