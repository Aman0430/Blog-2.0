"use client";

import { SafeUser } from "@/types";
import { User } from "@prisma/client";
import Link from "next/link";
import { signOut } from "next-auth/react";

interface UserMenuProps {
  currentUser: SafeUser | null;
}

export default function Navbar({ currentUser }: UserMenuProps) {
  return (
    <header className="bg-slate-950">
      <nav className="bg-slate-800 rounded-b-3xl font-mono text-white flex justify-between px-4 py-6 shadow-md">
        <div>
          |
          <span className="text-red-600 cursor-pointer hover:text-red-500">
            {currentUser?.name}
          </span>
          |
        </div>

        <div className="flex gap-6 text-yellow-200 font-semibold font-mono">
          <Link href="/">Home</Link>
          <Link href="/create">Create</Link>
          {currentUser ? (
            <button
              className="rounded-md bg-blue-700 hover:bg-blue-800 px-2"
              onClick={() => signOut()}
            >
              Sign Out
            </button>
          ) : (
            <Link href="/register">Register</Link>
          )}
        </div>
      </nav>
    </header>
  );
}
