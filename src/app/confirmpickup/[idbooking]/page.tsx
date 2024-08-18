"use client";

import { Fragment, useEffect, useState, useRef } from "react";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import React from "react";

const ConfirmPickUp = () => {
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
    console.log(idbooking);
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

  // Xử lý khi form được gửi
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/confirmpickup/${idbooking.idbooking}`,
        {
          method: "POST",
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
      setError(data.result.message);
      console.log(data.result.message);
      router.push(`/returncar/${idbooking.idbooking}`);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during booking confirmation");
    }
  };

  const handleCancel = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/cancelbooking/${idbooking.idbooking}`,
        {
          method: "POST",
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
      setError(data.result.message);
      console.log(data.result.message);
      router.push(`/complete/${idbooking.idbooking}`);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during booking cancellation");
    }
  };

  return (
    <div className="container mb-4" style={{ maxWidth: "60rem" }}>
      <h2 className="my-4">Xác nhận lấy xe</h2>
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
      <form>
        {booking.result.status == "Confirmed" && (
          <div className="container d-flex">
            <button
              type="submit"
              onClick={handleSubmit}
              className="btn btn-primary w-40"
            >
              CONFIRM PICK UP
            </button>
            <button
              type="submit"
              onClick={handleCancel}
              className="btn btn-danger w-40"
            >
              CANCEL
            </button>
          </div>
        )}
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default ConfirmPickUp;
