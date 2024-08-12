"use client";

import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; 
import { viewCarDetails } from "../../services/api"; 
import { ViewCarDetailsResponse } from "../../interfaces";
import './viewCarDetails.css'

const ViewCarDetailsPage: React.FC = () => {
  const { idcar } = useParams();
  const router = useRouter();
  const [carDetails, setCarDetails] = useState<ViewCarDetailsResponse | null>(null);
  const [loading, setLoading] = useState(true);

  // State để quản lý tab hiện tại
  const [activeTab, setActiveTab] = useState('basic');

  useEffect(() => {
    const fetchCarDetails = async () => {
      if (idcar) {
        try {
          const response = await viewCarDetails(Number(idcar));
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

  // Tách các giá trị của Additional Functions và Terms of Use
  const additionalFunctions = carDetails.additionalFunctions.namefunctions.split(', ');
  const termsOfUse = carDetails.termsOfUse.nameterms.split(', ');

  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <p>Images: {carDetails.car.images}</p>
        </div>
        <div className="col-4">
          <h1 className="text-danger">
            {carDetails.car.name} ({carDetails.car.brand})
          </h1>
          <p>Rating: ⭐⭐⭐⭐⭐ (No ratings yet)</p>
          <p>No. of rides: 0</p>
          <p>Price: {carDetails.car.baseprice}/day</p>
          <p>Locations: {carDetails.car.address}</p>
          <p>Status: {carDetails.car.status}</p>
        </div>
      </div>

      <div className="tabs">
        {/* Tabs navigation */}
        <button onClick={() => setActiveTab('basic')} className={activeTab === 'basic' ? 'active' : ''}>Basic Information</button>
        <button onClick={() => setActiveTab('details')} className={activeTab === 'details' ? 'active' : ''}>Additional Functions</button>
        <button onClick={() => setActiveTab('terms')} className={activeTab === 'terms' ? 'active' : ''}>Terms of Use</button>
      </div>

      <div className="tab-content">
        {/* Basic Information */}
        {activeTab === 'basic' && (
          <div className="tab">
            <h2>Basic Information</h2>
            {/* Nội dung của Basic Information */}
            {/* Các thông tin cơ bản đã hiển thị ở trên */}
            <p>Model: {carDetails.car.model}</p>
      <p>Color: {carDetails.car.color}</p>
      <p>Number of seats: {carDetails.car.numberofseats}</p>
      <p>Production years: {carDetails.car.productionyears}</p>
      <p>Transmission type: {carDetails.car.tranmissiontype}</p>
      <p>Fuel type: {carDetails.car.fueltype}</p>
      <p>Status: {carDetails.car.status}</p>
      <p>Car owner ID: {carDetails.car.idcarowner}</p>
          </div>
        )}

        {/* Additional Functions */}
        {activeTab === 'details' && (
          <div className="tab">
            <h2>Additional Functions</h2>
            <p>Mileage: {carDetails.car.mileage}</p>
            <p>Fuel consumption: {carDetails.car.fuelconsumption}</p>
            <p>Address: {carDetails.car.address}</p>
            <p>Description: {carDetails.car.descripton}</p>
            <ul>
              {['Bluetooth', 'GPS', 'Camera', 'Sun roof', 'Child lock', 'Child seat', 'DVD', 'USB'].map((functionName) => (
                <li key={functionName}>
                  <input type="checkbox" checked={additionalFunctions.includes(functionName)} readOnly />
                  <label>{functionName}</label>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Terms of Use */}
        {activeTab === 'terms' && (
          <div className="tab">
            <h2>Terms of Use</h2>
            <p>Base price: {carDetails.car.baseprice}</p>
            <p>Deposite: {carDetails.car.deposite}</p>
            <ul>
              {['No smoking', 'No pet', 'No food in car', 'No music in car'].map((term) => (
                <li key={term}>
                  <input type="checkbox" checked={termsOfUse.includes(term)} readOnly />
                  <label>{term}</label>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button onClick={handleBook}>Rent Now</button>
    </div>
  );
};

export default ViewCarDetailsPage;
