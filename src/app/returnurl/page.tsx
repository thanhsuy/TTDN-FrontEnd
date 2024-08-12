"use client";

import { Fragment, useEffect, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import React from "react";
import { useRouter } from "next/router";

const ReturnUrl = () => {
  const searchParams = useSearchParams();
  const vnpAmount = searchParams.get("vnp_Amount");
  const idbooking = searchParams.get("vnp_OrderInfo");
  const status = searchParams.get("vnp_ResponseCode");
  const [booking, setBooking] = useState(null);

  const fetchBooking = async (idbooking: any) => {
    try {
      const url = `http://localhost:8080/getbooking/${idbooking}`;
      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleBack = () => {
    window.location.href = "/customer";
  };

  const handleComplete = (idbooking: any) => {
    window.location.href = `/customer/booking/book/${idbooking}`;
  };
  useEffect(() => {
    const data = fetchBooking(idbooking).then((booking) => setBooking(booking));
  }, []);

  return (
    <div
      className="container d-flex align-items-center"
      style={{ height: "100vh" }}
    >
      <div className="d-flex justify-content-center w-100">
        <div
          className="payment-complete shadow-lg p-4"
          style={{ width: "60vh", borderRadius: "24px", boxShadow: "" }}
        >
          <h4 style={{ textAlign: "center" }}>
            Thanh toán {status == "00" ? "thành công" : "thất bại"}
          </h4>
          <>
            <div className="row">
              <p>Amount {vnpAmount}</p>
              <p>idBooking: {idbooking}</p>
            </div>
          </>

          {booking && (
            <>
              <div className="row">
                <p>Start date time: {booking.result.result.startdatetime}</p>
                <p>End date time: {booking.result.result.enddatetime}</p>
              </div>
              <div className="row justify-content-between d-flex">
                <button
                  className="col-4 btn btn-secondary"
                  onClick={handleBack}
                >
                  Back
                </button>
                <button
                  className="col-4 btn btn-primary"
                  onClick={() =>
                    handleComplete(booking.result.result.idbooking)
                  }
                >
                  Complete
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ReturnUrl;
