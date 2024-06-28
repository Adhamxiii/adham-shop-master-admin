"use client";

import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { SyntheticEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [error, setError] = useState("");

  const router = useRouter();

  const session = useSession()

  useEffect(() => {
    if (session.status === 'unauthenticated') {
      router.replace("/")
    }
  }, [session, router])

  const isValidEmail = (email: string) => {
    const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailRegex.test(email);
  };

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault();
    const target = e.target as typeof e.target & {
      email: { value: string };
      password: { value: string };
    };
    const email = target.email.value;
    const password = target.password.value;

    if (!isValidEmail(email)) {
      toast.error("Email is invalid");
      return;
    }

    if (!password || password.length < 8) {
      toast.error("Password is invalid");
      return;
    }

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password
    })

    if (res?.error) {
      setError('Invalid email of password')
      toast.error('Invalid email of password')
      if (res?.url) { router.replace('/') }
    } else {
      setError('')
    }

  };

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
      <div className="relative flex flex-1 flex-col items-center justify-between py-16">
        <div className="flex w-full flex-col justify-center gap-12 px-20">
          <div className="flex flex-col gap-2">
            <h1 className="text-heading1-bold font-bold">Login</h1>
            <p className="text-base-medium">
              Log in with the account you registered with
            </p>
          </div>
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
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
        <div className="flex flex-col absolute bottom-2">
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
