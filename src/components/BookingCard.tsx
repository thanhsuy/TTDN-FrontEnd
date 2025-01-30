import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import RatingModal from "./RatingModel";
import "bootstrap/dist/css/bootstrap.min.css";

const BookingCard = ({ booking, car }: any) => {
  const [showModal, setShowModal] = useState(false);
  const router = useRouter();

  const status = {
    "Pending Deposit": "Waiting for payment confirmation",
    "Confirmed": "Payment confirmed",
    "Pending Payment": "Waiting for final payment",
    "In - Progress": "Car is in use",
    "Cancelled": "Booking cancelled",
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
      console.error("Error processing request:", error);
    }
  };

  const handleClick = () => {
    bookingMethodPost(listMethod[booking.status], booking.idbooking);
    router.push("/viewBookingList");
  };

  const handleBack = () => {
    router.push("/viewBookingList");
  };

  const handleCancel = () => {
    bookingMethodPost("cancelbooking", booking.idbooking);
    router.push("/viewBookingList");
  };

  const handleReport = () => {
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  useEffect(() => {}, [booking]);

  const formattedStartDateTime = new Date(booking.startdatetime).toLocaleString(
    "en-EN",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );

  const formattedEndDateTime = new Date(booking.enddatetime).toLocaleString(
    "en-EN",
    {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    }
  );

  return (
    <div className="container mt-4">
      <div className="card shadow-lg p-3">
        <div className="row g-0">
          {/* Hình ảnh xe */}
          <div className="col-md-4 d-flex align-items-center justify-content-center">
            {car && (
              <img
                src={car.images}
                alt={car.name}
                className="img-fluid rounded"
                style={{ maxWidth: "100%", height: "250px", objectFit: "cover" }}
              />
            )}
          </div>

          {/* Thông tin booking */}
          <div className="col-md-8">
            <div className="card-body">
              <h5 className="card-title text-primary">{car.name}</h5>
              <p className="card-text">
                <strong>Brand:</strong> {car.brand}
              </p>
              <p className="card-text">
                <strong>Color:</strong> {car.color}
              </p>
              <p className="card-text">
                <strong>Deposite:</strong> {car.deposite}
              </p>
              <p className="card-text">
                <strong>Status:</strong>{" "}
                <span className="text-success">{status[booking.status]}</span>
              </p>

              <h5 className="mt-3">Booking Details</h5>
              <p className="card-text">
                <strong>Payment Method:</strong> {booking.paymentmethod}
              </p>
              <p className="card-text">
                <strong>Start:</strong> {formattedStartDateTime}
              </p>
              <p className="card-text">
                <strong>End:</strong> {formattedEndDateTime}
              </p>

              {/* Nút hành động */}
              <div className="d-flex flex-wrap gap-2 mt-3">
                <button className="btn btn-secondary flex-grow-1" onClick={handleBack}>
                  Back
                </button>

                {listMethod[booking.status] === "paidDeposid" && (
                  <button className="btn btn-primary flex-grow-1" onClick={handleClick}>
                    Confirm Deposit Payment
                  </button>
                )}
                {listMethod[booking.status] === "returncar" && (
                  <button className="btn btn-primary flex-grow-1" onClick={handleClick}>
                    Confirm Return Car
                  </button>
                )}

                {booking.status === "Confirmed" && (
                  <>
                    <button className="btn btn-success flex-grow-1" onClick={handleClick}>
                      Pick up Car
                    </button>
                    <button className="btn btn-danger flex-grow-1" onClick={handleCancel}>
                      Cancel
                    </button>
                  </>
                )}

                {status[booking.status] === "Completed" && (
                  <button className="btn btn-warning flex-grow-1" onClick={handleReport}>
                    Report
                  </button>
                )}
              </div>

              {/* Hiển thị modal đánh giá nếu showModal = true */}
              {showModal && (
                <RatingModal
                  onClose={handleClose}
                  bookingid={booking.idbooking}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingCard;
