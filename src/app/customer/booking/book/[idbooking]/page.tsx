"use client";

import { Fragment, useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import React from "react";
import BookingItem from "@/components/BookingItem";
import BookingCard from "@/components/BookingCard";

const Booking = () => {
  const { idbooking } = useParams();
  const [car, setCar] = useState(null);
  const [booking, setBooking] = useState(null);

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
      setCar(data?.result);
    } catch (error) {
      console.error("Error fetching car:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const bookingData = await fetchBooking(idbooking);
      console.log(bookingData);
      if (bookingData) {
        setBooking(bookingData.result.result);
      }
    };

    fetchData();
  }, [idbooking]);

  useEffect(() => {
    if (booking?.carIdcar) {
      fetchCar(booking.carIdcar);
    }
  }, [booking]);

  return (
    <div className="">
      {booking && <BookingCard booking={booking} car={car} />}
    </div>
  );
};

export default Booking;
