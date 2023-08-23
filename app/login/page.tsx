"use client";

import Input from "@/app/Components/Inputs/Input";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";
import { signIn } from "next-auth/react";

interface initStateProps {
  name: string;
  email: string;
  password: string;
}

const initState: initStateProps = {
  name: "",
  email: "",
  password: "",
};

export default function Page() {
  const router = useRouter();
  const [state, setState] = useState(initState);

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();

    signIn("credentials", {
      ...state,
      redirect: false,
    }).then((callback) => {
      if (callback?.ok) {
        router.refresh();
      }

      if (callback?.error) {
        throw new Error("Wrong Credentials");
      }
    });
    router.push("/home");
  };

  function handleChange(event: any) {
    setState({ ...state, [event.target.name]: event.target.value });
    console.log(event.target.value);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="text-center font-mono bg-slate-950 min-h-screen"
    >
      <div className="flex flex-col justify-center w-[350px] mx-auto gap-4 items-start h-screen">
        <label className="text-white ">Email</label>
        <Input
          type="text"
          name="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
          value={state.email}
        />
        <label className="text-white ">Password</label>
        <Input
          type="password"
          name="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
          value={state.password}
        />
        <button
          className="bg-blue-700 text-white px-4 py-2 rounded-md"
          type="submit"
        >
          Log In
        </button>

        <div>
          <div className="text-white">
            Want to register?{" "}
            <Link className="text-blue-400" href="/register">
              Register
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
