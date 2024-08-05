"use client";

import React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { searchCar } from "../services/api";
import { SearchCarResponse } from "../interfaces";

const SearchResultsPage = () => {
  const [results, setResults] = React.useState<SearchCarResponse[]>([]);
  const searchParams = useSearchParams();
  const address = searchParams.get("address");
  const startDateTime = searchParams.get("startDateTime");
  const endDateTime = searchParams.get("endDateTime")
  const router = useRouter();

  React.useEffect(() => {
    if (address) {
      searchCar({ address })
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
    <div>
      <h1>Search Results for: {address}</h1>
      {results.map((carResult) => (
        <div
          key={carResult.car.idcar}
          onClick={() => handleCarClick(carResult.car.idcar)}
          style={{ cursor: "pointer" }}
        >
          <h2>
            {carResult.car.make} {carResult.car.model}
          </h2>
          <p>Year: {carResult.car.year}</p>
          <p>Color: {carResult.car.color}</p>
          <p>Price per day: {carResult.car.pricePerDay}</p>
          <p>Status: {carResult.car.status}</p>
          <p>Address: {carResult.car.address}</p>
          <p>Rate: {carResult.rate}</p>
          <p>Booking Number: {carResult.bookingNumber}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResultsPage;
