// components/PeopleSay/PeopleSay.tsx
import React from "react";

type FeedbackData = {
  UserName: string;
  FeedbackContent: string;
  Rating: number;
  Date: string;
};

type PeopleSayProps = {
  feedbackData: FeedbackData[];
};

const PeopleSay: React.FC<PeopleSayProps> = ({ feedbackData }) => {
  return (
    <div
      id="people-say"
      style={{
        background: "#8080805c",
        padding: "20px 50px 80px 20px",
        width: "100%",
        height: "450px",
      }}
    >
      <h2 style={{ width: "100%", height: "25px" }}>What people say?</h2>
      {feedbackData?.map((item, index) => (
        <div
          key={index}
          style={{
            float: "left",
            margin: "40px 50px 40px 70px",
            height: "35%",
            width: "40%",
          }}
          id="item-people-say"
        >
          <div
            id="img-people-say"
            style={{
              marginRight: "10px",
              borderRadius: "90px",
              height: "100%",
              width: "20%",
              float: "left",
            }}
          >
            <img
              style={{ width: "100%", height: "100%", borderRadius: "100px" }}
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpd4mJRIUwqgE8D_Z2znANEbtiz4GhI4M8NQ&s"
              alt="Girl in a jacket"
            />
          </div>
          <div
            id="content-people-say"
            style={{ float: "left", height: "100%", width: "75%" }}
          >
            <p style={{ margin: "0px" }}>{item.UserName}</p>
            <p style={{ margin: "0px" }}>{item.FeedbackContent}</p>
            <p style={{ margin: "0px" }}>{item.Rating}</p>
            <p style={{ margin: "0px" }}>{item.Date}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default PeopleSay;
