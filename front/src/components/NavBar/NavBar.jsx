import { NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav>
      <div className="logo"></div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/users">Users</NavLink>
        </li>
        <li>
          <NavLink to="/books">Books</NavLink>
        </li>
        <li>
          <NavLink to="/authors">Authors</NavLink>
        </li>
      </ul>
    </nav>
  );
}
