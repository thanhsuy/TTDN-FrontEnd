// 'use client';

// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { searchCar } from '../services/api';
// import { SearchCarRequest, SearchCarResponse } from '../interfaces';

// const SearchCarPage: React.FC = () => {
//   const [address, setAddress] = useState('');
//   const [carResults, setCarResults] = useState<SearchCarResponse[]>([]);
//   const router = useRouter();

//   const handleSearch = async () => {
//     try {
//       const request: SearchCarRequest = { address };
//       const response = await searchCar(request);
//       setCarResults(response.result); // Đảm bảo response.result là danh sách xe
//     } catch (error) {
//       console.error('Error searching for cars:', error);
//     }
//   };

//   const handleCarClick = (idcar: number) => {
//     router.push(`/viewCarDetails/${idcar}`);
//   };

//   return (
//     <div>
//       <h1>Search Car</h1>
//       <input
//         type="text"
//         value={address}
//         onChange={(e) => setAddress(e.target.value)}
//         placeholder="Enter address"
//       />
//       <button onClick={handleSearch}>Search</button>
//       <div>
//         {carResults.map((carResult) => (
//           <div key={carResult.car.idcar} onClick={() => handleCarClick(carResult.car.idcar)} style={{ cursor: 'pointer' }}>
//             <h2>{carResult.car.make} {carResult.car.model}</h2>
//             <p>Year: {carResult.car.year}</p>
//             <p>Color: {carResult.car.color}</p>
//             <p>Price per day: {carResult.car.pricePerDay}</p>
//             <p>Status: {carResult.car.status}</p>
//             <p>Address: {carResult.car.address}</p>
//             <p>Rate: {carResult.rate}</p>
//             <p>Booking Number: {carResult.bookingNumber}</p>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default SearchCarPage;

"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";

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
    <div>
      <h1>Search Car</h1>
      <input
        type="text"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
        placeholder="Enter address"
      />
      <div>
        <label htmlFor="startDateTime">Start Date & Time:</label>
        <input
          type="datetime-local"
          id="startDateTime"
          value={startDateTime}
          onChange={(e) => setStartDateTime(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="endDateTime">End Date & Time:</label>
        <input
          type="datetime-local"
          id="endDateTime"
          value={endDateTime}
          onChange={(e) => setEndDateTime(e.target.value)}
        />
      </div>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchCarPage;
