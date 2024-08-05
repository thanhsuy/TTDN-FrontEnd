"use client";

import { Fragment, useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import React from "react";
import BookingItem from "@/components/BookingItem";



const Booking = () => {
    const idcar = useParams();  
    const [car, setCar] = useState();
    const fetchCar = async (idcar : any) => {
        try {
            const response = await fetch(
              `http://localhost:8080/getcar/${idcar.idcar}`,
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
            setCar(data?.result);
          } catch (error) {
            console.error("Error fetching booking:", error);
          }
    };

    useEffect(() => {
        fetchCar(idcar);
    },[]);

    return (
    <div className="">
        <BookingItem  car={car}/>
    </div>
  );
};

export default Booking;
