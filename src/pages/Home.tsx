import { useLoaderData } from "react-router-dom";
import SingleBlog from "../components/SingleBlog";
import { BlogProps } from "../types";

export default function Home() {
  const blogs = useLoaderData() as BlogProps[];

  return (
    <>
      <h2>All Blogs</h2>
      <div>
        {blogs.map((blog) => (
          <SingleBlog key={blog.id} {...blog} />
        ))}
      </div>
    </>
  );
}

export async function BlogsLoader() {
  const res = await fetch("http://localhost:8000/blogs");
  const data = await res.json();
  if (res.ok) {
    return data;
  }
  throw Error("Error while fetching data");
}
