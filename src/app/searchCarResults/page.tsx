"use client";

import React, { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchCarNew } from "../services/api";
import { SearchCarResponse, SearchCarNewRequest } from "../interfaces";
import Head from 'next/head';
import Footer from '@/components/Footerowner';
import { getUser } from "@/components/UserInfo";
import Navbar from "../../components/Navbarowner";
import "../styles.css";
import "./searchCarResults.css"

const SearchResultsPage = () => {
  const [results, setResults] = useState<SearchCarResponse[]>([]);
  const searchParams = useSearchParams();
  const address = searchParams.get("address");
  const startDateTime = searchParams.get("startDateTime");
  const endDateTime = searchParams.get("endDateTime");
  const [user, setUser] = useState<{ result: { name: string; role: string } } | null>(null);
  const result: SearchCarNewRequest = {
    address: address || "",
    startDateTime: startDateTime ? new Date(startDateTime).toISOString() : "",
    endDateTime: endDateTime ? new Date(endDateTime).toISOString() : "",
  };
  const router = useRouter();

  React.useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();

    if (address) {
      searchCarNew(result)
        .then((response) => {
          setResults(response.result);
        })
        .catch((error) => {
          console.error("Error fetching search results:", error);
        });
    }
  }, [address]);

  const handleCarClick = (idcar: number) => {
    router.push(`/viewCarDetails/${idcar}`);
  };

  return (
    <>
      <Head>
        <title>Search Results</title>
        <link rel="stylesheet" href="styles.css" />
      </Head>
      {user && <Navbar name={user.result.name} role={user.result.role} />}
      
      <div className="search-results-container">
        <h1>Search Results for: {address}</h1>
        {results.map((carResult) => (
          <div
            key={carResult.car.idcar}
            className="car-result-card"
            onClick={() => handleCarClick(carResult.car.idcar)}
          >
            <div className="car-image-placeholder">
              {/* Place image here */}
              <img src={carResult.car.images || "placeholder.jpg"} alt={carResult.car.name} />
            </div>
            <div className="car-info">
              <h2>{carResult.car.name}</h2>
              <p>Year: {carResult.car.productionyears}</p>
              <p>Location: {carResult.car.address}</p>
              <p>Price per day: {carResult.car.baseprice} VND</p>
              <p>Status: {carResult.car.status}</p>
              <p>Number of Rides: {carResult.bookingNumber}</p>
              <p>Rate: {carResult.rate} stars</p>
            </div>
            <div className="car-actions">
              <button onClick={() => handleCarClick(carResult.car.idcar)}>View Details</button>
              <button>Rent now</button>
            </div>
          </div>
        ))}
      </div>
      
      <Footer />
    </>
  );
};

export default SearchResultsPage;
