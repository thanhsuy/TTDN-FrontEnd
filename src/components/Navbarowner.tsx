import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useState } from "react";

type UserProps = {
  name: string;
  role: string;
};

const UseInfor = ({ role, isOpen }: { role: string; isOpen: boolean }) => {
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    router.push("/login");
  };

  return (
    <div
      className={`dropdown-menu ${isOpen ? "show" : ""}`}
      style={{
        display: isOpen ? "block" : "none",
        position: "absolute",
        marginLeft: "100px",
      }}
    >
      <Link href="/profile" className="dropdown-item">
        My Profile
      </Link>
      {role === "CAROWNER" && (
        <>
          <Link href="/car_owner/mycar" className="dropdown-item">
            My Cars
          </Link>
          <Link href="/car_owner/mybooking" className="dropdown-item">
            My Booking
          </Link>
          <Link href="/viewWallet" className="dropdown-item">
            My Wallet
          </Link>
          <Link href="/viewFeedbackReport" className="dropdown-item">
            My Reports
          </Link>
        </>
      )}
      {role === "CUSTOMER" && (
        <>
          <Link href="/viewBookingList" className="dropdown-item">
            My Booking
          </Link>
          <Link href="/viewWallet" className="dropdown-item">
            My Wallet
          </Link>
        </>
      )}
      <button onClick={handleLogout} className="dropdown-item">
        Logout
      </button>
    </div>
  );
};

const Navbar = ({ name, role }: UserProps) => {
  const router = useRouter();
  const [isDropdownOpen, setDropdownOpen] = useState(false);

  const handleNavigation = () => {
    if (role === "CAROWNER") {
      router.push("/car_owner");
    } else if (role === "CUSTOMER") {
      router.push("/customer");
    } else {
      router.push("/");
    }
  };

  return (
    <nav
      className="navbar navbar-expand-lg navbar-light"
      style={{ backgroundColor: "rgb(102 102 102)", color: "white" }}
    >
      <div className="d-flex justify-content-between align-items-center w-100">
        <div className="d-flex align-items-center">
          <img
            src="/icon/vehicle.png"
            alt="Car Icon"
            style={{ height: "100px", width: "100px" }}
          />
          <p className="h4 text-white text-decoration-none m-0 ms-3">
            Rent a car today!
          </p>
        </div>
        <ul className="navbar-nav d-flex align-items-center">
          <li className="nav-item">
            <Link href="#" className="nav-link text-white">
              About us
            </Link>
          </li>
          <li
            className="nav-item dropdown ms-3"
            onMouseEnter={() => setDropdownOpen(true)}
            onMouseLeave={() => setDropdownOpen(false)}
          >
            <div className="d-flex align-items-center">
              <img
                src="/icon/user-icon.png"
                alt="User Icon"
                className="us-icon me-2"
                style={{ height: "100px" }}
              />
              <a
                href="#"
                className="nav-link text-white"
                id="navbarDropdown"
                onClick={(e) => {
                  e.preventDefault();
                  setDropdownOpen(!isDropdownOpen);
                }}
              >
                Welcome, {name}
              </a>
            </div>
            <UseInfor role={role} isOpen={isDropdownOpen} />
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
