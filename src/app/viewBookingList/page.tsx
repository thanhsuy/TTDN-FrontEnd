// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

// const ViewBookings = () => {
//   const [bookings, setBookings] = useState([]);
//   const [selectedBooking, setSelectedBooking] = useState(null);
//   const userEmail = "user@example.com"; // Sử dụng email của user đang đăng nhập
//   const [role, setRole] = useState("");

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       try {
//         const response = await axios.get(`/user-role?email=${userEmail}`);
//         setRole(response.data.role);
//       } catch (error) {
//         console.error('Error fetching user role:', error);
//       }
//     };

//     fetchUserRole();
//   }, [userEmail]);

//   useEffect(() => {
//     if (role === "CUSTOMER") {
//       const fetchBookings = async () => {
//         try {
//           const response = await axios.get(`/view-bookings?email=${userEmail}`);
//           setBookings(response.data);
//         } catch (error) {
//           console.error('Error fetching bookings:', error);
//         }
//       };

//       fetchBookings();
//     }
//   }, [userEmail, role]);

//   const handleViewDetails = (booking) => {
//     setSelectedBooking(booking);
//   };

//   return (
//     <div>
//       <h1>My Bookings</h1>
//       {role === "CUSTOMER" ? (
//         <>
//           <ul>
//             {bookings.map((booking) => (
//               <li key={booking.idbooking}>
//                 <h2>{booking.carname}</h2>
//                 <p>Booking No: {booking.bookingno}</p>
//                 <p>Status: {booking.status}</p>
//                 <button onClick={() => handleViewDetails(booking)}>View Details</button>
//               </li>
//             ))}
//           </ul>
//           {selectedBooking && (
//             <BookingDetails booking={selectedBooking} onClose={() => setSelectedBooking(null)} userEmail={userEmail} />
//           )}
//         </>
//       ) : (
//         <p>You do not have permission to view bookings.</p>
//       )}
//     </div>
//   );
// };

// const BookingDetails = ({ booking, onClose, userEmail }) => {
//   const [details, setDetails] = useState(booking);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setDetails((prevDetails) => ({
//       ...prevDetails,
//       [name]: value,
//     }));
//   };

//   const handleSave = async () => {
//     try {
//       await axios.put(`/edit-booking/${details.idbooking}?email=${userEmail}`, details);
//       alert('Booking updated successfully');
//       onClose();
//     } catch (error) {
//       console.error('Error updating booking:', error);
//     }
//   };

//   return (
//     <div>
//       <h2>Booking Details</h2>
//       <form>
//         <div>
//           <label>Booking No</label>
//           <input name="bookingno" value={details.bookingno} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Start Date</label>
//           <input name="startdatetime" value={details.startdatetime} onChange={handleChange} />
//         </div>
//         <div>
//           <label>End Date</label>
//           <input name="enddatetime" value={details.enddatetime} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Driver's Information</label>
//           <input name="driversinformation" value={details.driversinformation} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Payment Method</label>
//           <input name="paymentmethod" value={details.paymentmethod} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Status</label>
//           <input name="status" value={details.status} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Car ID</label>
//           <input name="carIdcar" value={details.carIdcar} onChange={handleChange} />
//         </div>
//         <div>
//           <label>Car Owner ID</label>
//           <input name="carIdcarowner" value={details.carIdcarowner} onChange={handleChange} />
//         </div>
//         <div>
//           <label>User ID</label>
//           <input name="userIduser" value={details.userIduser} onChange={handleChange} />
//         </div>
//         <button type="button" onClick={handleSave}>Save</button>
//         <button type="button" onClick={onClose}>Close</button>
//       </form>
//     </div>
//   );
// };

// export default ViewBookings;

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getBookingsForCurrentUser } from '../services/api';
import { ViewBookingListResponse } from '../interfaces';

const ViewBookingList: React.FC = () => {
  const [bookings, setBookings] = useState<ViewBookingListResponse[]>([]);
  const router = useRouter();

  useEffect(() => {
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
    router.push(`/editBookingDetails/${id}`);
  };

  return (
    <div>
      <h1>My Bookings</h1>
      <ul>
        {bookings.map((booking) => (
          <li key={booking.idbooking}>
             {/* <h2>{booking.carname}</h2> */}
            <h2>{booking.bookingno}</h2>
            <p>Status: {booking.status}</p>
            <button onClick={() => handleViewDetails(booking.idbooking)}>View Details</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewBookingList;