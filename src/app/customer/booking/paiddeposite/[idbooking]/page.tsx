"use client";

import { Fragment, useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams, useParams } from "next/navigation";
import React from "react";
interface booking {
  name: string;
  startdatetime: string;
  enddatetime: string;
  email: string;
  phoneno: string;
  address: string;
  drivinglicense: string;
  roles: string;
  password: string;
  wallet: string;
}

interface resultbooking {
  result: booking;
}
const PaidDeposite = () => {
  // Khai báo trạng thái cho các trường đầu vào
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
  });

  const [wallet, setWallet] = useState<number | null>(null);
  const [booking, setBooking] = useState<resultbooking | { result: booking }>({
    result: formData,
  });
  const [user, setUser] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [car, setCar] = useState<any>(null);
  const router = useRouter();
  const isInitialRender = useRef(true);
  const searchParams = useSearchParams();
  const idbooking = useParams();

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

  const getCar = async (carId: number) => {
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
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    const value = Object.fromEntries(data.entries());
    console.log(value);

    try {
      const response = await fetch(
        `http://localhost:8080/paidDeposid/${idbooking.idbooking}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      await response.json();
      router.push(`confirmpickup/${idbooking.idbooking}`);
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during booking");
    }
  };

  return (
    <div className="container mb-4" style={{ maxWidth: "60rem" }}>
      <h2 className="my-4">Xác nhận thanh toán</h2>
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
            {/* <img
              src={car.images}
              alt=""
              style={{ width: "200px", height: "200px" }}
            /> */}
          </div>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="container d-flex">
          <button
            type="button"
            className="btn btn-secondary w-40"
            onClick={() => router.back()}
          >
            BACK
          </button>
          <button type="submit" className="btn btn-primary w-40">
            NEXT
          </button>
        </div>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default PaidDeposite;
