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
        <div className="d-flex justify-content-between align-items-center w-100">
          <div className="d-flex align-items-center">
            <img
              src="/icon/vehicle.png"
              className="fas fa-car"
              style={{ height: "100px", width: "100px" }}
            />
            <p className="h4 text-white text-decoration-none m-0 ms-3">
              Rent a car today!
            </p>
          </div>
          <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item d-flex flex-column border-right border-white">
              <Link href="#" className="nav-link text-white fw-bold">
                About us
              </Link>
            </li>
            <li className="nav-item d-flex align-items-center border-left border-white ms-3">
              <img
                src="/icon/user-icon.png"
                className="me-2"
                style={{ height: "100px" }}
              />
              <Link href="/login" className="nav-link text-white fw-bold">
                Sign up | log in
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
