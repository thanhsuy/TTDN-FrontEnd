'use client';

import React, { useEffect, useState } from 'react';
import { getFeedbackReport } from '../services/api';
import { FeedbackResponse } from '../interfaces';

const FeedbackReportPage: React.FC = () => {
  const [feedbacks, setFeedbacks] = useState<FeedbackResponse[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getFeedbackReport();
        setFeedbacks(data);
      } catch (error) {
        setError('Error fetching feedback report');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h2>Feedback Report</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {feedbacks.length > 0 ? (
        <ul>
          {feedbacks.map((feedback) => (
            <li key={feedback.feedbackId}>
              {feedback.datetime}: {feedback.rate} - {feedback.content} (Booking ID: {feedback.bookingId}, Car ID: {feedback.carId})
            </li>
          ))}
        </ul>
      ) : (
        <p>No feedbacks available</p>
      )}
    </div>
  );
};

export default FeedbackReportPage;
