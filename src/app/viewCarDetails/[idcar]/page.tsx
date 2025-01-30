"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { viewCarDetails, getCarAverageRating } from "../../services/api";
import { ViewCarDetailsResponse } from "../../interfaces";
import "../../styles.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Head from "next/head";
import Footer from "@/components/Footerowner";
import { getUser } from "@/components/UserInfo";
import Navbar from "@/components/Navbarowner";

const ViewCarDetailsPage: React.FC = () => {
  const { idcar } = useParams();
  const router = useRouter();
  const [carDetails, setCarDetails] = useState<ViewCarDetailsResponse | null>(
    null
  );
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{
    result: { name: string; role: string };
  } | null>(null);

  const [activeTab, setActiveTab] = useState("basic");

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

    const fetchCarDetails = async () => {
      if (idcar) {
        try {
          const [carDetailsResponse, ratingResponse] = await Promise.all([
            viewCarDetails(Number(idcar)),
            getCarAverageRating(Number(idcar)),
          ]);

          if (carDetailsResponse?.error || ratingResponse?.error) {
            throw new Error("API trả về lỗi");
          }

          setCarDetails(carDetailsResponse);
          setAverageRating(ratingResponse);
        } catch (error) {
          console.error("Lỗi khi fetch chi tiết xe hoặc đánh giá:", error);
          setCarDetails(null);
          setAverageRating(null);
        } finally {
          setLoading(false);
        }
      } else {
        console.error("idcar is null");
        setLoading(false);
      }
    };
    fetchCarDetails();
  }, [idcar]);

  if (loading) {
    return <div className="text-center my-5">Loading...</div>;
  }

  if (!carDetails) {
    return <div className="text-center my-5">No car details found</div>;
  }

  const handleBook = () => {
    router.push(`/customer/booking?idCar=${idcar}`);
  };

  const additionalFunctions =
    carDetails.additionalFunctions.namefunctions.split(", ");
  const termsOfUse = carDetails.termsOfUse.nameterms.split(", ");

  return (
    <>
      <Head>
        <title>View Car Detail</title>
      </Head>
      {user && <Navbar name={user.result.name} role={user.result.role} />}

      <div className="container my-5">
        <div className="row">
          <div className="col-md-4">
            <img
              src={carDetails.car.images}
              alt=""
              className="img-fluid rounded"
            />
          </div>
          <div className="col-md-8">
            <h1 className="text-danger">
              {carDetails.car.name} ({carDetails.car.brand})
            </h1>
            <p>
              Rating: ⭐⭐⭐⭐⭐ (
              {typeof averageRating === "number"
                ? averageRating + " star"
                : "No Rating"}
              )
            </p>
            <p>
              Price: <strong>${carDetails.car.baseprice}/day</strong>
            </p>
            <p>
              Location: <strong>{carDetails.car.address}</strong>
            </p>
            <p>
              Status:{" "}
              <strong className="text-success">{carDetails.car.status}</strong>
            </p>
          </div>
        </div>

        {/* Tabs */}
        <ul className="nav nav-tabs mt-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "basic" ? "active" : ""}`}
              onClick={() => setActiveTab("basic")}
            >
              Basic Information
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "details" ? "active" : ""}`}
              onClick={() => setActiveTab("details")}
            >
              Additional Functions
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "terms" ? "active" : ""}`}
              onClick={() => setActiveTab("terms")}
            >
              Terms of Use
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div className="tab-content border p-3">
          {activeTab === "basic" && (
            <div>
              <h2>Basic Information</h2>
              <ul className="list-group">
                <li className="list-group-item">
                  Model: {carDetails.car.model}
                </li>
                <li className="list-group-item">
                  Color: {carDetails.car.color}
                </li>
                <li className="list-group-item">
                  Number of seats: {carDetails.car.numberofseats}
                </li>
                <li className="list-group-item">
                  Production years: {carDetails.car.productionyears}
                </li>
                <li className="list-group-item">
                  Transmission type: {carDetails.car.tranmissiontype}
                </li>
                <li className="list-group-item">
                  Fuel type: {carDetails.car.fueltype}
                </li>
                <li className="list-group-item">
                  Car owner ID: {carDetails.car.idcarowner}
                </li>
              </ul>
            </div>
          )}

          {activeTab === "details" && (
            <div>
              <h2>Additional Functions</h2>
              <ul className="list-group">
                {additionalFunctions.map((func, index) => (
                  <li key={index} className="list-group-item">
                    <input type="checkbox" checked readOnly className="me-2" />
                    {func}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {activeTab === "terms" && (
            <div>
              <h2>Terms of Use</h2>
              <ul className="list-group">
                {termsOfUse.map((term, index) => (
                  <li key={index} className="list-group-item">
                    <input type="checkbox" checked readOnly className="me-2" />
                    {term}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="text-center mt-4">
          <button onClick={handleBook} className="btn btn-success btn-lg">
            Rent Now
          </button>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default ViewCarDetailsPage;
