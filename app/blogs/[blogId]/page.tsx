import getCurrUser from "@/app/actions/getCurrentUser";
import getBlogById from "@/app/actions/getBlogById";
import BlogId from "@/app/components/blog/BlogId";

interface IParams {
  blogId: string;
}

export default async function Edit({ params }: { params: IParams }) {
  const blog = await getBlogById(params);
  const currentUser = await getCurrUser();

  return (
    <div>
      <BlogId
        name={blog?.name}
        description={blog?.description}
        blogId={blog?.id}
        imageSrc={blog?.imageSrc}
      />
    </div>
  );
}
