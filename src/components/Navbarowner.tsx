// components/Navbar.tsx
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
  AwaitedReactNode,
  useEffect,
} from "react";

type UserName = {
  name: string;
  role: string;
};

type role = {
  role: string;
};

const UseInfor = (role: role) => {
  const Logout = () => {
    localStorage.removeItem("authToken");
    return <div>Logging out...</div>;
  };

  if (role.role === "CAROWNER") {
    return (
      <div className="dropdown-content">
        <Link href="profile">My Profile</Link>
        <Link href="#">My Cars</Link>
        <Link href="#">My Wallet</Link>
        <Link href="#">My Reports</Link>
        <Link href="/login" onClick={Logout}>
          Logout
        </Link>
      </div>
    );
  }
  if (role.role === "CUSTOMER") {
    return (
      <div className="dropdown-content">
        <Link href="/profile">My Profile</Link>
        <Link href="#">My Booking</Link>
        <Link href="#">My Wallet</Link>
        <Link href="/login" onClick={Logout}>
          Logout
        </Link>
      </div>
    );
  } else {
    return (
      <div className="dropdown-content">
        <Link href="/profile">My Profile</Link>
        <Link href="/login" onClick={Logout}>
          Logout
        </Link>
      </div>
    );
  }
};

const Navbar = (name: UserName) => {
  return (
    <header>
      <div className="header-container">
        <div className="icon">
          <img src="/icon/vehicle.png" alt="Car Icon" className="car-icon" />
          <h1>Rent a car today!</h1>
        </div>
        <div className="about">
          <p>
            <Link href="#">ABOUT US</Link>
          </p>
        </div>
        <div className="menu">
          <nav>
            <ul>
              <li className="dropdown">
                <div className="dr-ic">
                  <img
                    src="/icon/user-icon.png"
                    alt="User Icon"
                    className="us-icon"
                  />
                  <Link
                    href="#"
                    style={{ paddingTop: "10px" }}
                    className="dropbtn"
                  >
                    Welcome, {name.name}
                  </Link>
                  <img
                    src="/icon/down-arrow.png"
                    alt="Drop-Icon"
                    className="drop-icon"
                  />
                </div>
                <UseInfor role={name.role} />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
