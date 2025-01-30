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

const formatDate = (dateString: string | number | Date) => {
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const year = date.getFullYear();
  return `${day}-${month}-${year}`;
};

const PeopleSay: React.FC<PeopleSayProps> = ({ feedbackData }) => {
  return (
    <div
      id="people-say"
      className="py-5"
      style={{
        backgroundColor: "rgb(102 102 102)",
        color: "white",
      }}
    >
      <div className="container">
        <h2 className="text-left mb-4">What people say?</h2>
        <div className="row">
          {feedbackData.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="d-flex align-items-start bg-light text-dark p-3 rounded shadow-sm">
                {/* Image Section */}
                <div
                  className="flex-shrink-0 me-3"
                  style={{
                    width: "80px",
                    height: "80px",
                  }}
                >
                  <img
                    src="icon/user-icon.png"
                    alt={`${item.UserName}'s feedback`}
                    className="img-fluid rounded-circle w-100 h-100"
                  />
                </div>

                {/* Content Section */}
                <div>
                  <h5 className="mb-0">{item.UserName}</h5>
                  <p className="mb-0">{item.FeedbackContent}</p>
                  <p className="mb-0">
                    <strong>Rating:</strong> {item.Rating}/5
                  </p>
                  <p className="text-muted mb-0">
                    <strong>Date:</strong>
                    {formatDate(item.Date)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PeopleSay;
