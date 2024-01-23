import { useState } from "react";
import { useActionData, Form, redirect } from "react-router-dom";
import { BlogProps } from "../../types";

export default function NewBlog() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [author, setAuthor] = useState("mario");

  const data = useActionData() as ErrorEvent;

  return (
    <div className="create">
      <h2>Add a new blog</h2>
      {data && data.error && <p className="error">{data.error}</p>}
      <Form method="POST" action="/create">
        <label>Blog title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <label>Blog body:</label>
        <textarea
          name="body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={5}
          required
        />
        <label>Blog author:</label>
        <select
          name="author"
          onChange={(e) => setAuthor(e.target.value)}
          value={author}
        >
          <option value="mario">mario</option>
          <option value="yoshi">yoshi</option>
        </select>
        <button disabled={!body || !title}>Add blog</button>
      </Form>
    </div>
  );
}

export async function handleSubmit({ request }: { request: Request }) {
  const data = await request.formData();

  const submission = {
    title: data.get("title"),
    body: data.get("body"),
    author: data.get("author"),
  } as BlogProps;

  if (submission.title.length < 3) {
    return { error: "Title is too short" };
  }

  if (submission.body.length < 10) {
    return { error: "Body is too short" };
  }

  await fetch("http://localhost:8000/blogs", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(submission),
  });
  
  return redirect("/");
}
