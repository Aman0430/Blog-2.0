"use client";

import { SafeBlogs, SafeUser } from "@/types";
import Image from "next/image";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BsFillPencilFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import axios from "axios";

interface BlogProps {
  key: string;
  data: SafeBlogs;
  currentUser?: SafeUser | null;
}

export default function SingleBlog({ data, key, currentUser }: BlogProps) {
  const router = useRouter();

  const onDelete = () => {
    axios
      .delete(`/api/blogs/${data.id}`)
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
    <div className="w-[900px] border-1 rounded-lg bg-slate-800 p-4">
      <div>
        <div className="flex gap-2 justify-between items-center">
          <Image
            src={data.imageSrc}
            width={350}
            height={250}
            alt="Blog image"
            className="hover:scale-105 transition hover:border-none p-2"
          />
          <div className="w-[450px] flex flex-col gap-4 leading-[1.5]">
            <h1 className="font-mono text-slate-200">{data.name}</h1>
            <p className="text-slate-400">{data.description}</p>
          </div>
        </div>

        {data.userId === currentUser?.id && (
          <div className="flex flex-row-reverse gap-5">
            <RiDeleteBin5Line
              onClick={onDelete}
              className=" cursor-pointer text-red-500 text-[1.5rem]"
            />
            <BsFillPencilFill
              onClick={() => router.push(`/blogs/${data.id}`)}
              className=" cursor-pointer text-yellow-400 text-[1.5rem]"
            />
          </div>
        )}
      </div>
    </div>
  );
}
