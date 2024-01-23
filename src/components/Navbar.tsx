import { NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav>
      <NavLink to="/">
        <h1>React Blog</h1>
      </NavLink>
      <ul className="links">
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="create">New Blog</NavLink>
        </li>
      </ul>
    </nav>
  );
}
