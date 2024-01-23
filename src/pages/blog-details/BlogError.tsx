import { Link, useRouteError } from "react-router-dom";

export default function BlogError() {
  const error = useRouteError() as ErrorEvent;
  return (
    <div>
      <h3>{error.message} Could not find your blog</h3>
      <p>
        Back to <Link to="/">home</Link>
      </p>
    </div>
  );
}
