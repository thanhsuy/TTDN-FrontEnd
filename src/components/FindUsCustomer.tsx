// components/FindUs/FindUs.tsx
import React from "react";

type CarData = [string, number];

type FindUsProps = {
  carData: CarData[];
};

const FindUs: React.FC<FindUsProps> = ({ carData }) => {
  return (
    <div
      style={{ padding: "20px 50px 80px 20px", width: "100%", height: "670px" }}
      id="find-us"
    >
      <h2 style={{ width: "100%", height: "25px" }}>Where to find us?</h2>
      {carData.map((item, index) => (
        <div
          key={index}
          style={{
            // backgroundImage: `url(${item.image})`,
            backgroundImage: `url("https://vov.vn/sites/default/files/styles/large/public/2020-10/HN.jpg")`,
            color: "white",
            padding: "145px 0px 0px 5px",
            float: "left",
            margin: "50px",
            width: "27%",
            height: "40%",
          }}
        >
          <h3>{item[0]}</h3>
          <h3>{item[1]} cars</h3>
        </div>
      ))}
    </div>
  );
};

export default FindUs;
