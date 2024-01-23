import { Link } from "react-router-dom";
import { BlogProps} from "../types";

export default function SingleBlog({ id, title, author }: BlogProps) {
  return (
    <div className="blog-preview">
      <Link to={`blogs/${id}`}>
        <h3>{title}</h3>
        <p>Written By {author}</p>
      </Link>
    </div>
  );
}
