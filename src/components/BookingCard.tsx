// components/ListCar.js
import Link from "next/link";
import { list } from "postcss";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button } from "bootstrap";
import RatingModal from "./RatingModel";

const BookingCard = ({ booking, car }: any) => {
  const [showModal, setShowModal] = useState(false);
  const status = {
    "Pending Deposit": "DANG CHO CHU SO HUU XAC NHAN THANH TOAN",
    "Confirmed": "DA DUOC CHU XE XAC NHAN THANH TOAN",
    "Pending Payment": "DANG CHO THANH TOAN NOT HOA DON",
    "In - Progress": "PHUONG TIEN DANG DUOC SU DUNG",
    "Cancelled": "HOA DON DA BI HUY",
    "Completed": "Completed",
  };

  const listMethod = {
    "Pending Deposit": "paidDeposid",
    "Confirmed": "confirmpickup",
    "In - Progress": "returncar",
    "Pending Payment": "returncar",
  };
  const bookingMethodPost = async (method: any, idbooking: any) => {
    try {
      if (method == "paidDeposid") {
        alert("Xac nhan thanh toan hoa don");
      } else if (method == "confirmpickup") {
        alert("Xac nhan lay xe");
      } else if (method == "returncar") {
        alert("Xac nhan tra xe");
      }
      const response = await fetch(
        `http://localhost:8080/${method}/${idbooking}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (!response.ok) {
        response.json().then((data) => alert(data.message));
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching car:", error);
    }
  };

  const BankTransfer = async (idbooking: any) => {
    try {
      const response = await fetch(
        `http://localhost:8080/createbanktransfer/${idbooking}`,
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
      const res = await response
        .json()
        .then((data) => (location.href = data.result));
    } catch (error) {
      console.error("Error fetching car:", error);
    }
  };

  const handleClick = () => {
    if (
      booking.paymentmethod == "Bank transfer" &&
      booking.status == "Pending Deposit"
    ) {
      BankTransfer(booking.idbooking);
      location.href = "/customer";
    } else {
      bookingMethodPost(listMethod[booking.status], booking.idbooking);
      location.reload();
    }
  };
  const handleBack = () => {
    location.href = "/customer";
  };

  const handleCancle = () => {
    bookingMethodPost("cancelbooking", booking.idbooking);
    location.reload();
  };

  const handleReport = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {}, [booking]);
  console.log(booking.status);
  return (
    <div className="container d-flex pt-4 border-0 m-0">
      <div className="row d-flex align-items-center">
        <div className="col-5">
          {car && <img src={car.images} alt="" style={{ width: "100%" }} />}
        </div>
        {car && booking && (
          <div className="col-6">
            <div className="row">
              <div className="col-6">
                <p>Name: {car.name}</p>
                <p>Brand: {car.brand}</p>
                <p>Color: {car.color}</p>
                <p>Deposite: {car.deposite}</p>
                <p>
                  Status:
                  <span className="text-success">{status[booking.status]}</span>
                </p>
              </div>
              <div className="col-6">
                <p>Payment Method: {booking.paymentmethod}</p>
                <p>Start: {booking.startdatetime}</p>
                <p>End: {booking.enddatetime}</p>
              </div>
            </div>

            <div className="row d-flex justify-content-around">
              {listMethod[booking.status] == "paidDeposid" && (
                <>
                  <button
                    className="col-5 btn btn-secondary"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                  <button
                    className="col-5 btn btn-primary"
                    onClick={handleClick}
                  >
                    Xac nhan tra tien
                  </button>
                </>
              )}
              {listMethod[booking.status] == "returncar" && (
                <>
                  <button
                    className="col-5 btn btn-secondary"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                  <button
                    className="col-5 btn btn-primary"
                    onClick={handleClick}
                  >
                    Xac nhan tra xe
                  </button>
                </>
              )}
              {booking.status == "Confirmed" && (
                <div className="row d-flex justify-content-between">
                  <button
                    className="col-3 btn btn-secondary"
                    onClick={handleBack}
                  >
                    Back
                  </button>
                  <button
                    className="col-3 btn btn-primary"
                    onClick={handleClick}
                  >
                    Lay xe
                  </button>
                  <button
                    className="col-3 btn btn-danger"
                    onClick={handleCancle}
                  >
                    Huy
                  </button>
                </div>
              )}
              {status[booking.status] == "Completed" && (
                <div className="row d-flex justify-content-between">
                  <button
                    className="col-5 btn btn-danger"
                    onClick={handleReport}
                  >
                    Report
                  </button>
                  {showModal && <RatingModal onClose={handleClose} bookingid={booking.idbooking} />}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingCard;