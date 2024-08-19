import React from "react";

const Footer: React.FC = () => {
  return (
    <footer
      className="bg-light text-dark py-4 mt-auto"
      style={{ width: "100%" }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4 text-center mb-4">
            <h3>Section 1</h3>
            <ul className="list-unstyled">
              <li>
                <h4>Item 1</h4>
              </li>
              <li>
                <h4>Item 2</h4>
              </li>
              <li>
                <h4>Item 3</h4>
              </li>
              <li>
                <h4>Item 4</h4>
              </li>
            </ul>
          </div>
          <div className="col-md-4 text-center mb-4">
            <h3>Section 2</h3>
            <ul className="list-unstyled">
              <li>
                <h4>Item 1</h4>
              </li>
              <li>
                <h4>Item 2</h4>
              </li>
              <li>
                <h4>Item 3</h4>
              </li>
              <li>
                <h4>Item 4</h4>
              </li>
            </ul>
          </div>
          <div className="col-md-4 text-center mb-4">
            <h3>Section 3</h3>
            <ul className="list-unstyled">
              <li>
                <h4>Item 1</h4>
              </li>
              <li>
                <h4>Item 2</h4>
              </li>
              <li>
                <h4>Item 3</h4>
              </li>
              <li>
                <h4>Item 4</h4>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
