import React from "react";
import getCurrUser from "../actions/getCurrentUser";
import getBlogs from "../actions/getBlogs";
import SingleBlog from "../components/Blog/SingleBlog";

export default async function Home() {
  const currentUser = await getCurrUser();
  const blogs = await getBlogs();

  return (
    <div className="text-white flex min-h-screen flex-col items-center justify-between p-24">
      {blogs.map((item) => (
        <SingleBlog data={item} key={item.id} currentUser={currentUser} />
      ))}
    </div>
  );
}
