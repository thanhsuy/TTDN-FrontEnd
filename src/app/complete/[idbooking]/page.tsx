"use client";

import { Fragment, useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const Complete = () => {
  const [formData, setFormData] = useState({
    name: "",
    startdatetime: "",
    enddatetime: "",
    email: "",
    phoneno: "",
    address: "",
    drivinglicense: "",
    roles: "",
    password: "",
    wallet: "",
    status: "",
  });
  const searchParams = useSearchParams();
  const idbooking = useParams();
  const router = useRouter();

  const [wallet, setWallet] = useState();
  const [booking, setBooking] = useState({ result: formData });
  const [user, setUser] = useState([]);
  const [error, setError] = useState([]);
  const [car, setCar] = useState([]);

  const getBooking = async () => {
    try {
      const response = await fetch(
        `http://localhost:8080/getbooking/${idbooking.idbooking}`,
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
      console.log("data", data);
      setBooking(data?.result);
    } catch (error) {
      console.error("Error fetching booking:", error);
    }
  };

  const getUser = async () => {
    console.log("getUser");
    try {
      const response = await fetch(`http://localhost:8080/user/myInfo`, {
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
      setUser(data.result);
      setWallet(data.result.wallet);
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  useEffect(() => {
    const resBooking = async () => {
      await getBooking();
      await getUser();
    };
    resBooking();
  }, [idbooking]);

  const getCar = async (carId) => {
    try {
      const response = await fetch(`http://localhost:8080/getcar/${carId}`, {
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
      setCar(data.result);
    } catch (error) {
      console.error("Error fetching car:", error);
    }
  };

  useEffect(() => {
    if (booking?.carIdcar) {
      getCar(booking.carIdcar);
    }
  }, [booking]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

    // Chuyển đổi FormData thành đối tượng JavaScript
    const value = Object.fromEntries(data.entries());
    console.log(value);

    // Gửi dữ liệu dưới dạng JSON
    fetch(`http://localhost:8080/returncar/${idbooking.idbooking}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <div className="">
      {booking.result.status == "Completed" ||
      booking.result.status == "Cancelled" ? (
        <div className="container mb-4" style={{ maxWidth: "60rem" }}>
          <h2 className="my-4">Tinh trang phieu</h2>
          <div className="container">
            <div className="row">
              <div className="col-6">
                <p>Tên tài khoản: {user.name}</p>
                <p className="text-success">Wallet: {user.wallet}$</p>
                <p>STATUS: {booking.result.status}</p>
              </div>
              <div className="col-6">
                <p>Thông tin phiếu thuê</p>
                <p>Start: {booking.result.startdatetime}</p>
                <p>End: {booking.result.enddatetime}</p>
                {/* <img src={car.images} alt="" style={{ width: '200px', height: '200px' }} /> */}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <h2>404 NOT FOUND</h2>
      )}
    </div>
  );
};

export default Complete;
