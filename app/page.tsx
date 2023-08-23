import Image from "next/image";
import Link from "next/link";
import getCurrUser from "./actions/getCurrentUser";

export default async function Home() {
  const currentUser = await getCurrUser();

  return (
    <main className="text-white bg-slate-950 font-mono flex gap-12 items-center justify-center min-h-screen">
      <div className="flex flex-col justify-center w-[350px] mx-auto gap-4 items-center h-[450px] bg-blue-700 rounded-md">
        <Image src="/blogger.png" height={70} width={70} alt="logo" />

        {!currentUser ? (
          <div className="flex">
            <div className="bg-slate-800 p-2 rounded-full shadow-md shadow-black hover:bg-slate-900 hover:scale-95">
              <Link href="/register">Register</Link>
            </div>

            <div className="bg-slate-800 p-2 px-5 rounded-full shadow-md shadow-black hover:bg-slate-900 hover:scale-95 ml-2">
              <Link href="/login">Login</Link>
            </div>
          </div>
        ) : (
          <Link
            className="bg-slate-800 p-2 px-5 rounded-full shadow-md shadow-black hover:bg-slate-900 hover:scale-95"
            href="/home"
          >
            Home
          </Link>
        )}
      </div>
      {/* components deleted */}
    </main>
  );
}
