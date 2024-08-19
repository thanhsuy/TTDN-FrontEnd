// components/ListCar.js
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";
import { list } from "postcss";
import { use, useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { getUser } from "./UserInfo";

const BookingItem = ({ car }: any) => {
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
  const [wallet, setWallet] = useState();
  const [user, setUser] = useState([]);
  const [error, setError] = useState([]);
  const [booking, setBooking] = useState();
  const [disableRanges, setDisableRanges] = useState([]);

  useEffect(() => {
    // Fetching the disabled date ranges from the API
    const fetchDisabledRanges = async () => {
      console.log(car);
      try {
        const response = await fetch(
          `http://localhost:8080/getCarBooking/${car.idcar}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("authToken")}`,
              "Content-Type": "application/json",
            },
          }
        );
        const data = await response.json();

        // Assuming data.result is an array of objects with startdatetime and enddatetime
        const ranges = data.result.map((item) => ({
          start: new Date(item.startdatetime).toISOString().slice(0, 16),
          end: new Date(item.enddatetime).toISOString().slice(0, 16),
        }));

        setDisableRanges(ranges);
      } catch (error) {
        console.error("Failed to fetch disabled ranges:", error);
      }
    };
    fetchDisabledRanges();
  }, [car]);

  const handleSubmit = (event: any) => {
    console.log(car);
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);

    // Chuyển đổi FormData thành đối tượng JavaScript
    const value = Object.fromEntries(data.entries());

    // Gửi dữ liệu dưới dạng JSON
    fetch(`http://localhost:8080/makeABooking/${car.idcar}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("authToken")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then((response) => {
        if (!response.ok) {
          response.json().then((data) => alert(data.message));
        }
        return response.json();
      })
      .then((data) => {
        window.location.href = `http://localhost:3000/customer/booking/book/${data.result.idbooking}`;
      });
  };

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

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const isDisabled = (date) => {
    const selectedDate = new Date(date);
    return disableRanges.some((range) => {
      const startDate = new Date(range.start);
      const endDate = new Date(range.end);
      return selectedDate >= startDate && selectedDate <= endDate;
    });
  };

  const handleDateChange = (e) => {
    const { name, value } = e.target;
    if (isDisabled(value)) {
      alert("Ngày này không khả dụng!");
      setFormData({
        ...formData,
        [e.target.name]: "",
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  return (
    <div
      className="container mt-4 d-flex flex-column"
      style={{ minHeight: "100vh" }}
    >
      {car && (
        <div className="container mt-4 flex-grow-1">
          {/* Car Information */}
          <h1 className="text-center mb-4" style={{ padding: "15px" }}>
            Rent a car today!
          </h1>
          <div className="border rounded p-3 bg-light">
            <div className="row">
              <div className="col-md-6">
                <img
                  src={car.images}
                  alt={car.name}
                  className="img-fluid rounded"
                />
                <h2 className="mt-3">{car.name}</h2>
                <p>
                  Ratings: <span className="text-warning">★★★★★</span>
                </p>
                <p>
                  Price: <strong>{car.baseprice} VND/day</strong>
                </p>
                <p>
                  Location: <strong>{car.address}</strong>
                </p>
                <p>
                  Status: <strong className="text-success">Available</strong>
                </p>
              </div>

              <div className="col-md-6">
                {/* Booking Information */}
                <h3>Booking Information</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label htmlFor="startdatetime" className="form-label">
                      Start date time
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="startdatetime"
                      id="startdatetime"
                      value={formData.startdatetime}
                      onChange={handleDateChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label htmlFor="enddatetime" className="form-label">
                      End date time
                    </label>
                    <input
                      type="datetime-local"
                      className="form-control"
                      name="enddatetime"
                      id="enddatetime"
                      value={formData.enddatetime}
                      onChange={handleDateChange}
                      required
                    />
                  </div>

                  <h4>Payment Method</h4>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentmethod"
                      id="wallet"
                      value="My wallet"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="wallet">
                      My wallet
                    </label>
                  </div>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentmethod"
                      id="cash"
                      value="Cash"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="cash">
                      Cash
                    </label>
                  </div>
                  <div className="form-check mb-4">
                    <input
                      className="form-check-input"
                      type="radio"
                      name="paymentmethod"
                      id="banktransfer"
                      value="Bank transfer"
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="banktransfer">
                      Bank transfer
                    </label>
                  </div>

                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-secondary"
                      type="button"
                      onClick={() => (window.location.href = "/customer")}
                    >
                      BACK
                    </button>
                    <button className="btn btn-primary" type="submit">
                      NEXT
                    </button>
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Driver's Full Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      id="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Driver's Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      name="phoneno"
                      id="phoneno"
                      value={formData.phoneno}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Driver's Email Address</label>
                    <input
                      type="text"
                      className="form-control"
                      name="email"
                      id="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-1">
                    <label className="form-label">Driver's License</label>
                    <input
                      type="text"
                      className="form-control"
                      name="drivinglicense"
                      id="drivinglicense"
                      value={formData.drivinglicense}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Driver's Information Section at the Bottom */}
      {user && (
        <div
          className="driver-info-container mt-4"
          style={{ maxHeight: "300px", overflowY: "auto" }}
        >
          <h3>Driver's Information</h3>
          <form onSubmit={handleSubmit}></form>
        </div>
      )}
    </div>
  );
};

export default BookingItem;
