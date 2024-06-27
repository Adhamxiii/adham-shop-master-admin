"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { navLinks } from "@/lib/constants";
import { signOut } from "next-auth/react";

const LeftSideBar = () => {
  const pathname = usePathname();

  return (
    <div className="sticky left-0 top-0 flex h-screen flex-col gap-16 bg-blue-2 p-10 shadow-xl max-lg:hidden">
      <Image src="/logo.png" alt="logo" width={150} height={70} />

      <div className="flex flex-col gap-12">
        {navLinks.map((link) => (
          <Link
            href={link.url}
            key={link.label}
            className={`flex gap-4 text-body-medium ${
              pathname === link.url ? "text-blue-1" : "text-grey-1"
            }`}
          >
            {link.icon} <p>{link.label}</p>
          </Link>
        ))}
      </div>

      {/* LOGOUT */}
      <button
        type="button"
        onClick={() => signOut({ redirect: true, callbackUrl: "/auth/login" })}
        className="inline-flex h-[60px] items-center justify-center rounded-lg bg-blue-500 px-8 py-4 font-sans font-semibold tracking-wide text-white"
      >
        Sign Out
      </button>
    </div>
  );
};

export default LeftSideBar;
