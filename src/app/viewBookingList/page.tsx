'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBookingsForCurrentUser } from '../services/api';
import { ViewBookingListResponse } from '../interfaces';
import './viewBookingList.css'; // Assuming you have a styles.css file for custom styling
import Head from 'next/head';
import Footer from '@/components/Footerowner';
import { getUser } from "@/components/UserInfo";
import Navbar from "../../components/Navbarowner";
import "../styles.css";

const ViewBookingList: React.FC = () => {
  const [bookings, setBookings] = useState<ViewBookingListResponse[]>([]);
  const [user, setUser] = useState<{ result: { name: string; role: string } } | null>(null);
  const router = useRouter();

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

    const fetchBookings = async () => {
      try {
        const data = await getBookingsForCurrentUser();
        setBookings(data);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchBookings();
  }, []);

  const handleViewDetails = (id: number) => {
    router.push(`/customer/booking/book/${id}`);
  };

  return (
    <>
    <Head>
      <title>Wallet Details</title>
      <link rel="stylesheet" href="styles.css" />
    </Head>
    {user && <Navbar name={user.result.name} role={user.result.role} />}
    <div className="booking-list-container">
      <h1>My Bookings</h1>
      <p>You have {bookings.length} ongoing bookings</p>
      <ul className="booking-list">
        {bookings.map((booking) => (
          <li key={booking.idbooking} className="booking-item">
            <div className="booking-image-container">
              {/* Placeholder for car image */}
              <img src={booking.carImage} alt="Car Image" className="car-image" />
            </div>
            <div className="booking-details">
              <h2 className="car-name">Nissan Navara EL 2017</h2> {/* Replace with dynamic car name */}
              <p className="booking-date">
                From: {booking.startdatetime} - To: {booking.enddatetime}
              </p>
              <p className="booking-status">Booking Status: <span className={getStatusClass(booking.status)}>{booking.status}</span></p>
              <p className="booking-number">Booking No.: {booking.bookingno}</p>
            </div>
            <div className="booking-actions">
              <button className="view-details-btn" onClick={() => handleViewDetails(booking.idbooking)}>View Details</button>
              {booking.status === "Pending deposit" && (
                <button className="cancel-booking-btn">Cancel Booking</button>
              )}
              {booking.status === "Confirmed" && (
                <button className="update-info-btn">Update Pickup Info</button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
    <Footer />
    </>
  );
};

export default ViewBookingList;

// Helper function to return status class
const getStatusClass = (status: string) => {
  switch (status.toLowerCase()) {
    case 'confirmed':
      return 'status-confirmed';
    case 'pending deposit':
      return 'status-pending-deposit';
    case 'completed':
      return 'status-completed';
    case 'cancelled':
      return 'status-cancelled';
    case 'pending payment':
      return 'status-pending-payment';
    default:
      return '';
  }
};

