"use client";

import React, { ChangeEvent, FormEvent, useMemo, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import ImageUpload from "@/app/Components/Inputs/ImageUpload";
import Input from "@/app/Components/Inputs/Input";

interface InitalStateProps {
  name?: string;
  imageSrc: string;
  description: string;
}

const initialState: InitalStateProps = {
  name: "",
  imageSrc: "",
  description: "",
};

export default function Page() {
  const [state, setState] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  //router instance
  const router = useRouter();

  const onSubmit = (event: FormEvent) => {
    setIsLoading(true);

    event.preventDefault();

    axios
      .post("/api/blogs", state)
      .then(() => {
        // toast.success('Created successfully')
        router.refresh();
        router.push("/home");
      })

      .catch((err) => {
        // toast.error('Went wring')
        throw new Error(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setState({ ...state, [event.target.name]: event.target.value });
  }
  const setCustomValue = (id: any, value: any) => {
    setState((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  return (
    <form
      onSubmit={onSubmit}
      className="w-[500px] text-white h-[550px] mx-auto py-12"
    >
      <div>
        <ImageUpload
          value={state.imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      </div>

      <div className="flex flex-col justify-center h-[450px] w-[350px] mx-auto gap-2">
        <Input
          placeholder="Blog header"
          id="name"
          type="text"
          value={state.name}
          name="name"
          onChange={handleChange}
        />
        <Input
          big
          placeholder="Blog content or description"
          id="description"
          type="text"
          value={state.description}
          name="description"
          onChange={handleChange}
        />
        <div></div>
        <button
          type="submit"
          className="bg-blue-800 rounded-md w-20 px-3 hover:bg-blue-900"
          disabled={isLoading}
        >
          Submit
        </button>
      </div>
    </form>
  );
}
