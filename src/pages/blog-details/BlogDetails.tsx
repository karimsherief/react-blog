import { useState } from "react";
import { useNavigate, Params, useLoaderData } from "react-router-dom";
import { BlogProps } from "../../types";

export default function BlogDetails() {
  const navigate = useNavigate();
  const { id, title, author, body } = useLoaderData() as BlogProps;
  const [disabled, setDisabled] = useState(false);

  async function handleDelete() {
    setDisabled(true);
    await fetch(`http://localhost:8000/blogs/${id}`, {
      method: "DELETE",
    });
    setDisabled(false);
    navigate("/", { replace: true });
  }

  return (
    <article>
      <h2>{title}</h2>
      <p>{author}</p>
      <div>{body}</div>
      <button onClick={handleDelete} disabled={disabled}>
        {disabled ? "Deleting" : "Delete"}
      </button>
    </article>
  );
}

export async function BlogDetailsLoader({ params }: { params: Params }) {
  const { id } = params;

  const res = await fetch(`http://localhost:8000/blogs/${id}`);
  const data = await res.json();

  if (res.ok) {
    return data;
  }

  throw Error("Wrong Id");
}
