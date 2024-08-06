'use client';

import React, { useEffect, useState } from 'react';
import { getFeedbackReport, getAverageRating } from '../services/api';
import { FeedbackResponse } from '../interfaces';
import './FeedbackReportPage.css';
import Head from 'next/head';
import Footer from '@/components/Footerowner';
import { getUser } from "@/components/UserInfo";
import Navbar from "../../components/Navbarowner";
import "../styles.css";

const FeedbackReportPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackResponse[]>([]);
  const [error, setError] = useState<string>('');
  const [user, setUser] = useState<{ result: { name: string; role: string } } | null>(null);
  const [averageRating, setAverageRating] = useState<number>(0);
  const [selectedRate, setSelectedRate] = useState<number | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();

    const fetchData = async () => {
      try {
        const data = await getFeedbackReport(selectedRate ?? undefined); // Convert null to undefined
        setFeedbacks(data);
        const avgRating = await getAverageRating();
        setAverageRating(avgRating);
      } catch (error) {
        setError('Error fetching feedback report');
      }
    };

    fetchData();
  }, [selectedRate]);

  const renderStars = (rate: number) => {
    return (
      <div className="stars">
        {[...Array(5)].map((_, index) => (
          <span key={index} className="star" style={{ color: index < rate ? 'gold' : '#ccc' }}>
            &#9733;
          </span>
        ))}
      </div>
    );
  };

  return (
    <>
      <Head>
        <title>Wallet Details</title>
        <link rel="stylesheet" href="styles.css" />
      </Head>
      {user && <Navbar name={user.result.name} role={user.result.role} />}
      <div className="report-container">
        <h2>Feedback Report</h2>
        {error && <p className="error">{error}</p>}
        <div className="average-rating">
          <h3>Average Ratings</h3>
          <p className="rating-value">{averageRating.toFixed(2)}</p>
          {renderStars(Math.round(averageRating))}
        </div>
        <div className="tabs">
          <button className={`tab ${selectedRate === null ? 'active' : ''}`} onClick={() => setSelectedRate(null)}>All</button>
          <button className={`tab ${selectedRate === 5 ? 'active' : ''}`} onClick={() => setSelectedRate(5)}>5 stars</button>
          <button className={`tab ${selectedRate === 4 ? 'active' : ''}`} onClick={() => setSelectedRate(4)}>4 stars</button>
          <button className={`tab ${selectedRate === 3 ? 'active' : ''}`} onClick={() => setSelectedRate(3)}>3 stars</button>
          <button className={`tab ${selectedRate === 2 ? 'active' : ''}`} onClick={() => setSelectedRate(2)}>2 stars</button>
          <button className={`tab ${selectedRate === 1 ? 'active' : ''}`} onClick={() => setSelectedRate(1)}>1 star</button>
        </div>
        {feedbacks.length > 0 ? (
          <ul className="feedback-list">
            {feedbacks.map((feedback) => (
              <li key={feedback.feedbackId} className="feedback-item">
                <div className="user-info">
                  <img src="/path/to/avatar.jpg" alt="User Avatar" className="avatar" />
                  <div className="user-id">User {feedback.userId}</div>
                </div>
                <div className="feedback-content">
                  <p>{feedback.content}</p>
                  <div className="feedback-details">
                    <div className="feedback-stars">
                      {renderStars(feedback.rate)}
                    </div>
                    <div className="feedback-date">{new Date(feedback.datetime).toLocaleString()}</div>
                  </div>
                  <div className="car-info">
                    <div className="car-details">
                      <div className="car-image"></div>
                      <div className="car-description">
                        <div className="car-name">{feedback.carName}</div>
                        <div className="car-dates">
                          From: {feedback.bookingStartDate} <br />
                          To: {feedback.bookingEndDate}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        ) : (
          <p>No feedbacks available</p>
        )}
      </div>
    <Footer />
    </>
  );
};

export default FeedbackReportPage;


// 'use client';

// import React, { useEffect, useState } from 'react';
// import { getFeedbackReport, getAverageRating } from '../services/api';
// import { FeedbackResponse } from '../interfaces';
// import './FeedbackReportPage.css';
// import Head from 'next/head';
// import Footer from '@/components/Footerowner';
// import { getUser } from "@/components/UserInfo";
// import Navbar from "../../components/Navbarowner";
// import "../styles.css";

// const FeedbackReportPage: React.FC = () => {
//   const [feedbacks, setFeedbacks] = useState<FeedbackResponse[]>([]);
//   const [error, setError] = useState<string>('');
//   const [user, setUser] = useState<{ result: { name: string; role: string } } | null>(null);
//   const [averageRating, setAverageRating] = useState<number>(0);
//   const [selectedRate, setSelectedRate] = useState<number | null>(null);

//   useEffect(() => {
//     const fetchUser = async () => {
//       try {
//         const userData = await getUser();
//         setUser(userData);
//       } catch (error) {
//         console.error("Failed to fetch user:", error);
//       }
//     };

//     fetchUser();

//     const fetchData = async () => {
//       try {
//         const data = await getFeedbackReport(selectedRate ?? undefined); // Convert null to undefined
//         setFeedbacks(data);
//         const avgRating = await getAverageRating();
//         setAverageRating(avgRating);
//       } catch (error) {
//         setError('Error fetching feedback report');
//       }
//     };

//     fetchData();
//   }, [selectedRate]);

//   return (
//     <>
//       <Head>
//         <title>Feedback Report</title>
//         <link rel="stylesheet" href="styles.css" />
//       </Head>
//       {user && <Navbar name={user.result.name} role={user.result.role} />}
//       <div className="report-container">
//         <h2>Feedback Report</h2>
//         {error && <p className="error">{error}</p>}
//         <div className="average-rating">
//           <h3>Average Ratings</h3>
//           <p className="rating-value">{averageRating.toFixed(2)}</p>
//         </div>
//         <div className="tabs">
//           <button className={`tab ${selectedRate === null ? 'active' : ''}`} onClick={() => setSelectedRate(null)}>All</button>
//           <button className={`tab ${selectedRate === 5 ? 'active' : ''}`} onClick={() => setSelectedRate(5)}>5 stars</button>
//           <button className={`tab ${selectedRate === 4 ? 'active' : ''}`} onClick={() => setSelectedRate(4)}>4 stars</button>
//           <button className={`tab ${selectedRate === 3 ? 'active' : ''}`} onClick={() => setSelectedRate(3)}>3 stars</button>
//           <button className={`tab ${selectedRate === 2 ? 'active' : ''}`} onClick={() => setSelectedRate(2)}>2 stars</button>
//           <button className={`tab ${selectedRate === 1 ? 'active' : ''}`} onClick={() => setSelectedRate(1)}>1 star</button>
//         </div>
//         <table className="feedback-table">
//           <thead>
//             <tr>
//               <th>ID</th>
//               <th>Rate</th>
//               <th>Content</th>
//               <th>Date Time</th>
//               <th>Booking ID</th>
//               <th>Car ID</th>
//               <th>Car Name</th>
//               <th>Car Model</th>
//               <th>Booking Start Date</th>
//               <th>Booking End Date</th>
//               <th>User ID</th>
//             </tr>
//           </thead>
//           <tbody>
//             {feedbacks.map((feedback) => (
//               <tr key={feedback.feedbackId}>
//                 <td>{feedback.feedbackId}</td>
//                 <td>{feedback.rate}</td>
//                 <td>{feedback.content}</td>
//                 <td>{feedback.datetime}</td>
//                 <td>{feedback.bookingId}</td>
//                 <td>{feedback.carId}</td>
//                 <td>{feedback.carName}</td>
//                 <td>{feedback.carModel}</td>
//                 <td>{feedback.bookingStartDate}</td>
//                 <td>{feedback.bookingEndDate}</td>
//                 <td>{feedback.userId}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <Footer />
//     </>
//   );
// };

// export default FeedbackReportPage;
