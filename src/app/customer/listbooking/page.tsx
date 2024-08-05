"use client";

import { Fragment, useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import React from "react";
import BookingItem from "@/components/BookingItem";
import BookingItemCustomer from "@/components/BookingItemCustomer";



const ListBooking = () => {
    const idcar = useParams();  
    const [car, setCar] = useState();
    const [listBooking, setListBooking] = useState([]);

    const fetchListBooking = async () => {
        try {
            const response = await fetch(
              `http://localhost:8080/getbooking/user`,
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
            setListBooking(data?.result);
        } catch (error) {
            console.error("Error fetching car:", error);
        }
    };

    useEffect(() => {
        fetchListBooking();
    },[]);

    return (
    <div className="container">
        {
            listBooking.map(booking => (
                <BookingItemCustomer booking = {booking} />
            ))
        }
    </div>
  );
};

export default ListBooking;
