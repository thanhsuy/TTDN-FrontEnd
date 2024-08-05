/* eslint-disable react/no-unescaped-entities */
'use client';

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { getBookingById, updateBooking } from '../../services/api';
import { EditBookingDetailsRequest, ViewBookingListResponse } from '../../interfaces';

const EditBookingDetails = () => {
  const router = useRouter();
  const { id } = useParams(); // Thay thế query bằng useParams
  const [bookingDetails, setBookingDetails] = useState<EditBookingDetailsRequest>({
    bookingno: '',
    startdatetime: '',
    enddatetime: '',
    driversinformation: '',
    paymentmethod: '',
    status: '',
    carIdcar: 0,
    carIdcarowner: 0,
    userIduser: 0,
  });

  useEffect(() => {
    const fetchBookingDetails = async () => {
      if (id) {
        try {
          const booking = await getBookingById(Number(id));
          setBookingDetails(booking);
        } catch (error) {
          console.error('Error fetching booking details:', error);
        }
      }
    };

    fetchBookingDetails();
  }, [id]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await updateBooking(Number(id), bookingDetails);
      router.push('/viewBookingList');
    } catch (error) {
      console.error('Error updating booking:', error);
    }
  };

  return (
    <div>
      <h1>Edit Booking Details</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Booking Number:
          <input
            type="text"
            name="bookingno"
            value={bookingDetails.bookingno}
            onChange={handleChange}
          />
        </label>
        <label>
          Start Date and Time:
          <input
            type="text"
            name="startdatetime"
            value={bookingDetails.startdatetime}
            onChange={handleChange}
          />
        </label>
        <label>
          End Date and Time:
          <input
            type="text"
            name="enddatetime"
            value={bookingDetails.enddatetime}
            onChange={handleChange}
          />
        </label>
        <label>
          Drivers Information:
          <input
            type="text"
            name="driversinformation"
            value={bookingDetails.driversinformation}
            onChange={handleChange}
          />
        </label>
        <label>
          Payment Method:
          <input
            type="text"
            name="paymentmethod"
            value={bookingDetails.paymentmethod}
            onChange={handleChange}
          />
        </label>
        <label>
          Status:
          <input
            type="text"
            name="status"
            value={bookingDetails.status}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update Booking</button>
      </form>
    </div>
  );
};

export default EditBookingDetails;