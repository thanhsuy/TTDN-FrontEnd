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
    <div className="container d-flex border-0 m-0">
      {car && (
        <div className="row">
          <div className="col-5">
            <img src={car.images} alt="" style={{ width: "100%" }} />
          </div>
          <div className="col-5">
            <form onSubmit={handleSubmit}>
              <div className="mb-1">
                <label className="form-label">Start date time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="startdatetime"
                  value={formData.startdatetime}
                  onChange={handleDateChange}
                  required
                />
              </div>
              <div className="mb-1">
                <label className="form-label">End date time</label>
                <input
                  type="datetime-local"
                  className="form-control"
                  name="enddatetime"
                  value={formData.enddatetime}
                  onChange={handleDateChange}
                  required
                />
              </div>

              <div className="dropdown w-100">
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    name="paymentmethod"
                    value="My wallet"
                    id="wallet"
                  />
                  <label className="form-label m-2" htmlFor="wallet">
                    My wallet
                  </label>
                  {user.result.wallet > car.deposite ? (
                    <span className="text-success">{user.result.wallet}$</span>
                  ) : (
                    <span className="text-danger">{user.result.wallet}$</span>
                  )}
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    name="paymentmethod"
                    value="Cash"
                    id="cash"
                  />
                  <label className="form-label m-2" htmlFor="cash">
                    Cash
                  </label>
                </div>
                <div className="d-flex align-items-center">
                  <input
                    type="radio"
                    name="paymentmethod"
                    value="Bank transfer"
                    id="banktransfer"
                  />
                  <label className="form-label m-2" htmlFor="banktransfer">
                    Bank transfer
                  </label>
                </div>
              </div>
              <div className="row d-flex justify-content-around">
                <button
                  className="col-4 btn btn-secondary"
                  onClick={() => (window.location.href = "/customer")}
                >
                  BACK
                </button>
                <button className="col-4 btn btn-primary" type="submit">
                  NEXT
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingItem;
