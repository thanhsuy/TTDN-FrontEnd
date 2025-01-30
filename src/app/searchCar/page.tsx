"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./searchCar.css"; 

const SearchCarPage: React.FC = () => {
  const [address, setAddress] = useState("");
  const [startDateTime, setStartDateTime] = useState("");
  const [endDateTime, setEndDateTime] = useState("");
  const router = useRouter();

  const handleSearch = () => {
    router.push(
      `/searchCarResults?address=${address}&startDateTime=${startDateTime}&endDateTime=${endDateTime}`
    );
  };

  return (
    <div className="search-car-container">
      <div className="search-car-content">
        <div className="search-car-info">
          <h2>Looking for a vehicle? You're at the right place.</h2>
          <p>
            We have a large selection of locally owned cars available for you to choose from.
            Rental plans are customised to suit your needs.
          </p>
          <p>
            With over 300 cars located nationwide we will have something for you.
          </p>
        </div>

        <div className="search-car-form">
          <h2>Find the ideal car rental for your trip</h2>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Enter your location"
            className="search-car-input"
          />
          <div className="search-car-datetime">
            <label htmlFor="startDateTime">Pick-up Date and Time:</label>
            <input
              type="datetime-local"
              id="startDateTime"
              value={startDateTime}
              onChange={(e) => setStartDateTime(e.target.value)}
              className="search-car-input"
            />
          </div>
          <div className="search-car-datetime">
            <label htmlFor="endDateTime">Drop-off Date and Time:</label>
            <input
              type="datetime-local"
              id="endDateTime"
              value={endDateTime}
              onChange={(e) => setEndDateTime(e.target.value)}
              className="search-car-input"
            />
          </div>
          <button onClick={handleSearch} className="search-car-button">
            SEARCH
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchCarPage;
