import { NavLink, Link } from "react-router-dom";

export default function Header() {
  return (
    <header>
      <h3>
        <Link to="/">
          Teach-Eshop
        </Link>
      </h3>
      <nav>
        <NavLink
          to="/admin"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          admin
        </NavLink>
        <NavLink
          to="/favorites"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          favorites
        </NavLink>
        <NavLink
          to="/cart"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          cart
        </NavLink>
        <NavLink
          to="/orders"
          className={({ isActive }) => (isActive ? "active" : undefined)}
        >
          orders
        </NavLink>
      </nav>
    </header>
  );
}
