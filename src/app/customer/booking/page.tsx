"use client";

import { Fragment, useEffect, useState, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const MakeABooking = () => {
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

  const searchParams = useSearchParams();
  const carIdcar = searchParams.get("idCar");

  const [wallet, setWallet] = useState<number | null>(null);
  const [booking, setBooking] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState<string | null>(null);
  const [car, setCar] = useState<any>(null);
  const router = useRouter();
  const isInitialRender = useRef(true);

  const getCar = async () => {
    console.log("getUser");
    try {
      const response = await fetch(`http://localhost:8080/getcar/${carIdcar}`, {
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
      console.error("Error fetching user:", error);
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
    getUser();
    getCar();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.target as HTMLFormElement;
    const data = new FormData(form);

    const value = Object.fromEntries(data.entries());
    console.log(value);

    try {
      const response = await fetch(
        `http://localhost:8080/makeABooking/${carIdcar}`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${localStorage.getItem("authToken")}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        }
      );
      const data = await response.json();
      if (data.message === "Success") {
        console.log(data);
        router.push(`booking/paiddeposite/${data.result.result.idbooking}`);
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
      setError("An error occurred during booking");
    }
  };

  return (
    <div className="container mb-4" style={{ maxWidth: "60rem" }}>
      <h2 className="my-4">Thanh toán</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-1">
          <label className="form-label">Start date time</label>
          <input
            type="date"
            className="form-control"
            name="startdatetime"
            value={formData.startdatetime}
            onChange={handleChange}
            required
          />
        </div>
        <div className="mb-1">
          <label className="form-label">End date time</label>
          <input
            type="date"
            className="form-control"
            name="enddatetime"
            value={formData.enddatetime}
            onChange={handleChange}
            required
          />
        </div>

        <div className="dropdown">
          <div>
            <input
              type="radio"
              name="paymentmethod"
              value="My wallet"
              id="wallet"
            />
            <label className="form-label m-2" htmlFor="wallet">
              My wallet
            </label>
            {wallet && wallet > car?.deposite ? (
              <span className="text-success">{wallet}$</span>
            ) : (
              <span className="text-danger">{wallet}$</span>
            )}
          </div>
          <div>
            <input type="radio" name="paymentmethod" value="Cash" id="cash" />
            <label className="form-label m-2" htmlFor="cash">
              Cash
            </label>
          </div>
          <div>
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
        <button type="submit" className="btn btn-primary w-100">
          NEXT
        </button>
      </form>
      {error && <div className="alert alert-danger">{error}</div>}
    </div>
  );
};

export default MakeABooking;
