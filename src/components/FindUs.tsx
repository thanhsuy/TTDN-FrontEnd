import React from "react";

type CarData = {
  address: string;
  car_count: number;
  car_count_rounded: string;
  image: string;
};

type FindUsProps = {
  carData: CarData[];
};

const FindUs: React.FC<FindUsProps> = ({ carData }) => {
  return (
    <div id="find-us" className="py-5 bg-light">
      <div className="container">
        <h2 className="text-left mb-4">Where to find us?</h2>
        <div className="row">
          {carData.map((item, index) => (
            <div
              key={index}
              className="col-md-3 mb-4"
              style={{ marginRight: "70px" }}
            >
              <div
                style={{
                  backgroundImage: `url("https://vov.vn/sites/default/files/styles/large/public/2020-10/HN.jpg")`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  color: "white",
                  width: "300px",
                  height: "250px",
                }}
              >
                <div
                  className="d-flex flex-column justify-content-end h-100 text-white p-3 rounded"
                  style={{
                    background: "rgba(0, 0, 0, 0.6)",
                  }}
                >
                  <h3>{item.address}</h3>
                  <h4>{item.car_count} cars</h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FindUs;
