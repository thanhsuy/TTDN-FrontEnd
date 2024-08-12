// components/WhyUs/WhyUs.tsx
import React from "react";

type Section = {
  icon: string;
  title: string;
  content: string;
};

type WhyUsProps = {
  sections: Section[];
};

const WhyUs: React.FC<WhyUsProps> = ({ sections }) => {
  return (
    <div
      style={{ padding: "20px 50px 50px 20px", width: "100%", height: "514px" }}
      id="why-us"
    >
      <h2 style={{ width: "100%", height: "25px" }}>Why us?</h2>
      {sections.map((section, index) => (
        <div
          key={index}
          style={{
            margin: "20px 90px 0px 90px",
            width: "220px",
            height: "390px",
            float: "left",
          }}
          id={`section-item-${index}`}
        >
          <div
            style={{
              background: "white",
              left: "70px",
              top: "35px",
              position: "relative",
              borderStyle: "solid",
              borderColor: "black",
              borderRadius: "50px",
              width: "70px",
              height: "70px",
            }}
            id={`section-item-image-${index}`}
          >
            <i
              style={{ margin: "2px 0px 0px 14px", fontSize: "60px" }}
              className={`fas ${section.icon}`}
            ></i>
          </div>
          <div
            style={{
              padding: "35px 0px 0px 20px",
              borderStyle: "solid",
              borderColor: "black",
              width: "220px",
              height: "320px",
            }}
            id={`section-item-content-${index}`}
          >
            <h3>{section.title}</h3>
            <br />
            <p>{section.content}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default WhyUs;
