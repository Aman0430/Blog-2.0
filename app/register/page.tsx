"use client";

import Input from "../components/inputs/input";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

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

export default function page() {
  const router = useRouter();
  const [state, setState] = useState(initState);

  function handleChange(e: any) {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    axios
      .post("/api/register", state)
      .then(() => {
        router.refresh();
      })
      .then(() => {
        setTimeout(() => {
          router.push("/login");
        }, 2500);
      })
      .catch((err: any) => {});
  };

  return (
    <form
      onSubmit={onSubmit}
      className="text-center font-mono bg-slate-950 min-h-screen"
    >
      <div className="flex flex-col justify-center w-[350px] mx-auto gap-4 items-start h-screen">
        <label className="text-white ">Name</label>
        <Input
          type="text"
          name="name"
          placeholder="Name"
          id="name"
          onChange={handleChange}
          value={state.name}
        />
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
          Submit
        </button>

        <div className="items-center">
          <div className="text-white">
            Do you have an account?{" "}
            <Link className="text-blue-400" href="/login">
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </form>
  );
}
