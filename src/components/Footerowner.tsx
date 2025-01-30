import React from "react";

const Footer = () => {
  return (
    <footer
      style={{
        backgroundColor: "rgb(102 102 102)",
        color: "white",
        padding: "20px",
      }}
    >
      <div className="container">
        <div className="row">
          {/* RENT CARS Section */}
          <div className="col-md-4 mb-3">
            <h4 className="text-uppercase">Rent Cars</h4>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Search Cars and Rates
                </a>
              </li>
            </ul>
          </div>

          {/* CUSTOMER ACCESS Section */}
          <div className="col-md-4 mb-3">
            <h4 className="text-uppercase">Customer Access</h4>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Manage My Booking
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  My Wallet
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  My Car
                </a>
              </li>
              <li>
                <a href="#" className="text-white text-decoration-none">
                  Log in
                </a>
              </li>
            </ul>
          </div>

          {/* JOIN US Section */}
          <div className="col-md-4 mb-3">
            <h4 className="text-uppercase">Join Us</h4>
            <ul className="list-unstyled">
              <li>
                <a href="#" className="text-white text-decoration-none">
                  New User Sign Up
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="text-center mt-3">
          <p className="mb-0">
            &copy; {new Date().getFullYear()} Rent Cars. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
