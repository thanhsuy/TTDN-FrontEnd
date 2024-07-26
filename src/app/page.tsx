import Link from "next/link";
import "bootstrap/dist/css/bootstrap.min.css";
// import "./globals.css";

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <Link href="/" className="navbar-brand">
        MyApp
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <Link href="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link href="/" className="nav-link">
              About
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default function Home() {
  return (
    <div>
      <Navbar />
      <div className="container">
        <h1 className="mt-5">Welcome to MyApp</h1>
        <p className="lead">
          This is a simple example of using Bootstrap with Next.js
        </p>
      </div>
    </div>
  );
}
