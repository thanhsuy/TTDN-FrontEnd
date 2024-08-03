// components/Footer/Footer.tsx
import React from "react";

const Footer: React.FC = () => {
  return (
    <div
      id="footer"
      style={{
        background: "#8080805c",
        padding: "20px 50px 80px 20px",
        width: "100%",
        height: "300px",
      }}
    >
      <div style={{ float: "left", height: "100%", width: "27%" }}>
        <h3>Section 1</h3>
        <br />
        <h4>Item 1</h4>
        <h4>Item 2</h4>
        <h4>Item 3</h4>
        <h4>Item 4</h4>
      </div>
      <div style={{ float: "left", height: "100%", width: "27%" }}>
        <h3>Section 2</h3>
        <br />
        <h4>Item 1</h4>
        <h4>Item 2</h4>
        <h4>Item 3</h4>
        <h4>Item 4</h4>
      </div>
      <div style={{ float: "left", height: "100%", width: "27%" }}>
        <h3>Section 3</h3>
        <br />
        <h4>Item 1</h4>
        <h4>Item 2</h4>
        <h4>Item 3</h4>
        <h4>Item 4</h4>
      </div>
    </div>
  );
};

export default Footer;
