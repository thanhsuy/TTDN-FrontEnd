"use client";

import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { useParams, useRouter } from "next/navigation"; 
import { viewCarDetails, getCarAverageRating } from "../../services/api"; 
import { ViewCarDetailsResponse } from "../../interfaces";
import './viewCarDetails.css'
import '../../styles.css'
import Head from "next/head";
import Footer from "@/components/Footerowner";
import { getUser } from "@/components/UserInfo";
import Navbar from "@/components/Navbarowner";

const ViewCarDetailsPage: React.FC = () => {
  const { idcar } = useParams();
  const router = useRouter();
  const [carDetails, setCarDetails] = useState<ViewCarDetailsResponse | null>(null);
  const [averageRating, setAverageRating] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<{ result: { name: string; role: string } } | null>(null);

  const [activeTab, setActiveTab] = useState('basic');

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
            getCarAverageRating(Number(idcar))
          ]);
  
          if (carDetailsResponse?.error || ratingResponse?.error) {
            throw new Error('API trả về lỗi');
          }
  
          setCarDetails(carDetailsResponse);
          setAverageRating(ratingResponse);
  
        } catch (error) {
          console.error("Lỗi khi fetch chi tiết xe hoặc đánh giá:", error);
          setCarDetails(null);
          setAverageRating(null); // xử lý trạng thái lỗi đúng cách
=======
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
>>>>>>> 3e42a36f006cb7135cf513594c020c017b5a4482
        } finally {
          setLoading(false);
        }
      } else {
<<<<<<< HEAD
        console.error("idcar là null");
        setLoading(false);
      }
    };
  
=======
        console.error("idcar is null");
        setLoading(false);
      }
    };

>>>>>>> 3e42a36f006cb7135cf513594c020c017b5a4482
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

<<<<<<< HEAD
  const additionalFunctions = carDetails.additionalFunctions.namefunctions.split(', ');
  const termsOfUse = carDetails.termsOfUse.nameterms.split(', ');

  return (
    <>
    <Head>
      <title>View Car Detail</title>
      <link rel="stylesheet" href="styles.css" />
    </Head>
    {user && <Navbar name={user.result.name} role={user.result.role} />}
    <div className="container">
      <div className="row">
        <div className="col-4">
          <img src={carDetails.car.images} alt="" style={{ width: "100%" }} />
        </div>
        <div className="col-4">
          <h1 className="text-danger">
            {carDetails.car.name} ({carDetails.car.brand})
          </h1>
          {/* <p>Rating: ⭐⭐⭐⭐⭐ ({averageRating !== null ? averageRating : "No ratings yet"})</p> */}
          <p>Rating: ⭐⭐⭐⭐⭐ ({typeof averageRating === 'number' ? averageRating : "Chưa có đánh giá"})</p>

          <p>Price: {carDetails.car.baseprice}/day</p>
          <p>Locations: {carDetails.car.address}</p>
          <p>Status: {carDetails.car.status}</p>
        </div>
      </div>

      <div className="tabs">
        <button onClick={() => setActiveTab('basic')} className={activeTab === 'basic' ? 'active' : ''}>Basic Information</button>
        <button onClick={() => setActiveTab('details')} className={activeTab === 'details' ? 'active' : ''}>Additional Functions</button>
        <button onClick={() => setActiveTab('terms')} className={activeTab === 'terms' ? 'active' : ''}>Terms of Use</button>
      </div>

      <div className="tab-content">
        {activeTab === 'basic' && (
          <div className="tab">
            <h2>Basic Information</h2>
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
    <Footer/>
    </>
=======
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
>>>>>>> 3e42a36f006cb7135cf513594c020c017b5a4482
  );
};

export default ViewCarDetailsPage;
