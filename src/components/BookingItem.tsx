import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from "react";
import { getUser } from "./UserInfo";

const BookingItem = ({ car }) => {
  const [formData, setFormData] = useState({
    name: "",
    startdatetime: "",
    enddatetime: "",
    email: "",
    phoneno: "",
    drivinglicense: "",
  });
  const [disableRanges, setDisableRanges] = useState([]);
  const [user, setUser] = useState([]);

  useEffect(() => {
    const fetchDisabledRanges = async () => {
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

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const data = new FormData(form);
    const value = Object.fromEntries(data.entries());

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

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-6">
          <h1 className="text-center">Rent a car today!</h1>
          {car && (
            <div className="card mb-4">
              <img
                src={car.images}
                alt={car.name}
                className="card-img-top img-fluid"
              />
              <div className="card-body text-center">
                <h2 className="card-title">{car.name}</h2>
                <p className="card-text">
                  Ratings: <span className="text-warning">★★★★★</span>
                </p>
                <p className="card-text">
                  Price: <strong>{car.baseprice} VND/day</strong>
                </p>
                <p className="card-text">
                  Location: <strong>{car.address}</strong>
                </p>
                <p className="card-text">
                  Status: <strong className="text-success">Available</strong>
                </p>
              </div>
            </div>
          )}
        </div>
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h3 className="card-title">Booking Information</h3>
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

                <h4 className="mb-3">Payment Method</h4>
                <div className="form-check mb-2">
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
                <div className="form-check mb-2">
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

                <h4 className="mb-3">Driver's Information</h4>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">
                    Full Name
                  </label>
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
                <div className="mb-3">
                  <label htmlFor="phoneno" className="form-label">
                    Phone Number
                  </label>
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
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-4">
                  <label htmlFor="drivinglicense" className="form-label">
                    Driver's License
                  </label>
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
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingItem;
