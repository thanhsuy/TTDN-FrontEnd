// components/Navbar.js
import Link from "next/link";
import "../app/styles.css";

const Navbar = () => {
  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "rgb(102 102 102)", color: "white" }}
    >
      <div className="collapse navbar-collapse" id="navbarText">
        <span className="navbar-text mr-auto">
          <i className="fas fa-car"></i> Rent a car today !
        </span>
        <ul className="navbar-nav">
          <li className="nav-item active">
            <Link href="#" className="nav-link">
              About us
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/login" className="nav-link">
              <i className="fas fa-sign-in-alt"></i> Sign up | log in
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
