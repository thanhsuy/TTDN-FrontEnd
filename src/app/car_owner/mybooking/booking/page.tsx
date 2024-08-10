"use client";

import { useEffect, useState } from "react";
import { json } from "stream/consumers";

const Booking = ({ booking}: any) => {

    const [status, setStatus] = useState(booking.status);
    const [car, setCar] = useState();

    const fetchCar = async () =>{
        try {
            const url = `http://localhost:8080/getcar/${booking.carIdcar}`;
            const response = await fetch(url, {
              method: 'GET',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                'Content-Type': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const jsonData = await response.json().then(data => setCar(data.result));          
            return jsonData;
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    }

    const handleConfirm = async () =>{
      try {
        const url = `http://localhost:8080/confirmdeposit/${booking.idbooking}`;
        const response = await fetch(url, {
          method: 'post',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const jsonData = await response.json().then(data => setCar(data.result));   
        location.reload();       
        return jsonData;
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    }
    useEffect(() => {
      fetchCar();
    },[]);
    return (    
    <div className="col-12 flex-column">
      
        <div className="row d-flex justify-content-end">
            {car && 
            <div className="container">
              <div className="row d-flex justify-content-between">
                <div className="col-6 d-flex">
                  <img src={car.images} alt="" style={{ width: '40%' }} />
                  <div className="specifications flex-1">
                    <p>Name: {car.name}</p>
                    <p>Deposite: {car.deposite}$</p>
                    <p>Base Price: {car.baseprice}$</p>
                    <p>STATUS: {status}</p>
                  </div>
                </div>
                {booking.status === "Pending Deposit" && 
                <div className="col-5">
                  <button className="btn btn-primary" onClick={handleConfirm}>Confirm</button>
                </div>
                }
                
              </div>
              
            </div> 
            }
        </div>
    </div>
    );
};

export default Booking;
