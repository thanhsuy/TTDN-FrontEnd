import React, { useState } from "react";
import "./RatingModal.css";
import { useRouter } from "next/navigation";

export const RatingModal = ({ onClose, bookingid }) => {
  console.log(bookingid);
  const router = useRouter();
  const [rate, setRate] = useState(0);
  const [content, setContent] = useState("");

  const handleStarClick = (index) => {
    setRate(index + 1);
  };

  const handleSendReview = () => {
    const feedbackData = {
      rate,
      content,
    };

    fetch(`http://localhost:8080/add_feedback/${bookingid}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(feedbackData),
    })
      .then((response) => response.json())
      .then((data) => {
        // alert("Review submitted successfully!");
        router.push(`/customer`);
      })
      .catch((error) => {
        alert("Failed to submit the review. Please try again.");
      });
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Rate your trip</h2>
        <p>Did you enjoy your trip? Please let us know what you think.</p>
        <div className="stars">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={index < rate ? "star selected" : "star"}
              onClick={() => handleStarClick(index)}
            >
              ★
            </span>
          ))}
        </div>
        <textarea
          className="review-textarea"
          placeholder="Write your review here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
        <div className="modal-buttons">
          <button onClick={onClose} className="btn btn-secondary">
            Skip
          </button>
          <button className="btn btn-primary" onClick={handleSendReview}>
            Send Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default RatingModal;