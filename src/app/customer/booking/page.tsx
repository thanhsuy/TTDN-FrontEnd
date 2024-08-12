"use client";

import { Fragment, useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import React from "react";
import BookingItem from "@/components/BookingItem";

const Booking = () => {
  const searchParams = useSearchParams();
  const idcar = searchParams.get("idCar");
  const [car, setCar] = useState();
  const fetchCar = async (idcar: any) => {
    console.log(idcar);
    try {
      const response = await fetch(`http://localhost:8080/getcar/${idcar}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        // console.log(response.json());
        console.log("1");
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setCar(data?.result);
    } catch (error) {
      console.log("1");
      console.error("Error fetching booking:", error);
    }
  };

  useEffect(() => {
    fetchCar(idcar);
  }, []);

  return (
    <div className="">
      <BookingItem car={car} />
    </div>
  );
};

export default Booking;
