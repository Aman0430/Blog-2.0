"use client";

interface InputProps {
  type: any;
  value: any;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  name: string;
  id: string;
  placeholder?: string;
  big?: boolean;
}

export default function Input({
  type,
  value,
  onChange,
  name,
  id,
  placeholder,
  big,
}: InputProps) {
  return (
    <input
      type={type}
      value={value}
      onChange={onChange}
      name={name}
      id={id}
      placeholder={placeholder}
      className={` rounded-lg w-full p-3 pb-4 font-mono bg-white outline-none text-black ${
        big ? "w-[400px] pb-[6rem]" : ""
      }`}
    />
  );
}
