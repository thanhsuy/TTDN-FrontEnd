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
    <div id="why-us" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-left mb-5">Why Us?</h2>
        <div className="row justify-content-center">
          {sections.map((section, index) => (
            <div
              key={index}
              className="col-md-4 d-flex flex-column align-items-center mb-4"
            >
              {/* Icon Section */}
              <div
                className="d-flex justify-content-center align-items-center bg-white border border-dark rounded-circle"
                style={{
                  width: "100px",
                  height: "100px",
                }}
              >
                <img
                  src={`${section.icon}.png`}
                  style={{ width: "80px", height: "80px" }}
                ></img>
              </div>

              {/* Content Section */}
              <div
                className="mt-3 p-3 text-center bg-white border border-dark rounded shadow-sm"
                style={{
                  width: "100%",
                  maxWidth: "300px",
                }}
              >
                <h3 className="mb-3">{section.title}</h3>
                <p>{section.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WhyUs;
