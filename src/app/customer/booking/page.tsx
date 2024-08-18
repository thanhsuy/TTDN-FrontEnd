"use client";

import { Fragment, useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import React from "react";
import BookingItem from "@/components/BookingItem";
import { getUser } from "@/components/UserInfo";
import Navbar from "@/components/Navbarowner";


const Booking = () => {
  const searchParams = useSearchParams();
  const idcar = searchParams.get("idCar");
  const [car, setCar] = useState();
  const [user, setUser] = useState(null);

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
    {user && <Navbar name={user.result.name} role={user.result.role} />}
    <div className="container d-flex align-items-center justify-content-center flex-column border-0" style={{height: '100vh'}}>
      <h2>Tiến hành đặt xe</h2>
      <BookingItem car={car}/>
    </div>
    </>
  );
};

export default Booking;
