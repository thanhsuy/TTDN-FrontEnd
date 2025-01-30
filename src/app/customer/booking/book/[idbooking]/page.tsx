"use client";

import { Fragment, useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import React from "react";
import Footer from "@/components/Footerowner";
import BookingCard from "@/components/BookingCard";
import Navbar from "@/components/Navbarowner";
import { getUser } from "@/components/UserInfo";

const Booking = () => {
  const { idbooking } = useParams();
  const [car, setCar] = useState(null);
  const [booking, setBooking] = useState(null);
  const [user, setUser] = useState(null);

  const fetchBooking = async (idbooking) => {
    try {
      const response = await fetch(
        `http://localhost:8080/getbooking/${idbooking}`,
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching booking:", error);
      return null; // Return null in case of error to avoid breaking further processing
    }
  };

  const fetchCar = async (idcar) => {
    try {
      const response = await fetch(`http://localhost:8080/getcar/${idcar}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching car:", error);
      return null;
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const bookingData = await fetchBooking(idbooking);
      const carData = await fetchCar(bookingData.result.result.carIdcar);
      if (bookingData) {
        setBooking(bookingData.result.result);
        setCar(carData.result);
      }
    };

    fetchData();
  }, [idbooking]);

  // useEffect(() => {
  //   if (booking?.carIdcar) {
  //     fetchCar(booking.carIdcar);
  //   }
  // }, [booking]);

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
  }, []);

  return (
    <>
      {/* Navbar */}
      {user && <Navbar name={user.result.name} role={user.result.role} />}

      {/* Main Content */}
      <div
        className="container-fluid d-flex flex-column"
        style={{ minHeight: "100vh" }}
      >
        <div className="mt-5 mb-5 pt-4 flex-grow-1 d-flex align-items-center justify-content-center flex-column">
          <h2>Booking information</h2>
          {booking && <BookingCard booking={booking} car={car} />}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Booking;
