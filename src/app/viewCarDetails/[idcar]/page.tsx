"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Đảm bảo bạn đã cài đặt đúng thư viện
import { viewCarDetails } from "../../services/api"; // Đảm bảo đường dẫn đúng
import { ViewCarDetailsResponse } from "../../interfaces";

const ViewCarDetailsPage: React.FC = () => {
  const { idcar } = useParams(); // Lấy idcar từ URL query parameter
  const router = useRouter();
  const [carDetails, setCarDetails] = useState<ViewCarDetailsResponse | null>(
    null
  );
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (idcar) {
        console.log("Fetching car details for idcar:", idcar); // Log giá trị idcar
        try {
          const response = await viewCarDetails(Number(idcar));
          console.log("API response:", response); // Log kết quả từ API
          setCarDetails(response);
        } catch (error) {
          console.error("Error fetching car details:", error);
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
    return <div>Loading...</div>;
  }

  if (!carDetails) {
    return <div>No car details found</div>;
  }

  const handleBook = () => {
    router.push(`/customer/booking?idCar=${idcar}`);
  };

  return (
    <div>
      <h1 className="text-danger">
        {carDetails.car.name} ({carDetails.car.brand})
      </h1>
      <p>Model: {carDetails.car.model}</p>
      <p>Color: {carDetails.car.color}</p>
      <p>Number of seats: {carDetails.car.numberofseats}</p>
      <p>Production years: {carDetails.car.productionyears}</p>
      <p>Transmission type: {carDetails.car.tranmissiontype}</p>
      <p>Fuel type: {carDetails.car.fueltype}</p>
      <p>Mileage: {carDetails.car.mileage}</p>
      <p>Fuel consumption: {carDetails.car.fuelconsumption}</p>
      <p>Base price: {carDetails.car.baseprice}</p>
      <p>Deposite: {carDetails.car.deposite}</p>
      <p>Address: {carDetails.car.address}</p>
      <p>Description: {carDetails.car.descripton}</p>
      <p>Images: {carDetails.car.images}</p>
      <p>Status: {carDetails.car.status}</p>
      <p>Car owner ID: {carDetails.car.idcarowner}</p>
      <p>Terms of Use: {carDetails.termsOfUse.nameterms}</p>
      <p>
        Additional Functions: {carDetails.additionalFunctions.namefunctions}
      </p>
      <button onClick={handleBook}>Rent Now</button>
    </div>
  );
};

export default ViewCarDetailsPage;
