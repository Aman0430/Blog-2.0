"use client";

import axios from "axios";
import React, { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import ImageUpload from "@/app/Components/Inputs/ImageUpload";
import Input from "@/app/Components/Inputs/Input";
import { useRouter } from "next/navigation";

interface BlogProps {
  name?: string;
  description?: string;
  imageSrc?: any;
  blogId?: string;
}

interface initStateProps {
  name: string;
  description: string;
  imageSrc: string;
}

const initState: initStateProps = {
  name: "",
  description: "",
  imageSrc: "",
};

export default function BlogId({
  name,
  description,
  imageSrc,
  blogId,
}: BlogProps) {
  const router = useRouter();
  const [state, setState] = useState(initState);
  const [onActive, setOnActive] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const setCustomValue = (id: any, value: any) => {
    setState((prevValues) => ({
      ...prevValues,
      [id]: value,
    }));
  };

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  }

  const onDelete = (event: FormEvent) => {
    event.preventDefault();
    axios
      .delete(`/api/blogs/${blogId}`)
      .then(() => {
        router.refresh();
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        router.push("/home");
      });
  };

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    axios
      .put(`/api/blogs/${blogId}`, state)
      .then(() => {
        router.refresh();
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        router.push("/home");
      });
  };

  return (
    <div className="w-[700px] text-slate-400 font-mono mx-auto py-16 bg-slate-800 px-12 flex flex-col gap-8 z-10 rounded-b-[120px] mb-16">
      <div className="flex flex-col border-b-2">
        <span>{name}</span>
      </div>

      <div>
        <span>{description}</span>
      </div>

      <div>
        <Image src={imageSrc} width={400} height={400} alt="image" />
      </div>

      <div className="flex gap-6 text-slate-500 items-center justify-start">
        <button
          onClick={() => setOnActive(!onActive)}
          className=" px-4 py-1 bg-yellow-600 text-white rounded-full hover:bg-yellow-900 font-medium shadow-sm hover:scale-95 shadow-black"
        >
          Edit
        </button>
        <button
          className="bg-red-800 font-medium shadow-sm hover:scale-95 rounded-full px-4 py-1 hover:bg-red-900 shadow-black text-white"
          onClick={onDelete}
        >
          Delete
        </button>
      </div>
      <div className="border-2 my-10 border-spacing-2 border-dashed"></div>

      {onActive && (
        <form onSubmit={onSubmit}>
          <div>
            <ImageUpload
              value={state.imageSrc}
              onChange={(value) => setCustomValue("imageSrc", value)}
            />
          </div>
          <div className="flex flex-col justify-center h-[450px] w-[350px]  mx-auto gap-4">
            <Input
              placeholder="Name"
              id="name"
              type="text"
              value={state.name}
              name="name"
              onChange={handleChange}
            />
            <Input
              placeholder="Description"
              id="description"
              type="text"
              value={state.description}
              name="description"
              onChange={handleChange}
            />
            <div></div>
            <button
              disabled={isLoading}
              className="uppercase text-white p-2 hover:bg-green-900 bg-green-800 rounded-full w-24 shadow-sm shadow-black hover:scale-95"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
