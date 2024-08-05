// components/ListCar.js
import Link from "next/link";
import { list } from "postcss";
import { useEffect, useState } from "react";
import { useRouter } from 'next/router';

const BookingItemCustomer = ({booking} :any) => {
    const status = {
        'Pending Deposit': 'DANG CHO THANH TOAN',
        'Confirmed': 'DA DUOC CHU XE XAC NHAN THANH TOAN',
        'Pending Payment': 'DANG CHO THANH TOAN NOT HOA DON',
        'In - Progress': 'PHUONG TIEN DANG DUOC SU DUNG',
        'Cancelled': 'HOA DON DA BI HUY',
        'Completed': 'Completed'
    }

    const listMethod = {
        'Pending Deposit': 'paidDeposid',
        'Confirmed': 'confirmpickup',
        'In - Progress': 'returncar'
    }
    const [car, setCar] = useState(null);

    const fetchCar = async (idcar : any) => {
        try {
            const response = await fetch(
              `http://localhost:8080/getcar/${idcar}`,
              {
                method: "GET",
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("authToken")}`,
                  "Content-Type": "application/json",
                },
              }
            );
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setCar(data?.result);
          } catch (error) {
            console.error("Error fetching booking:", error);
          }
    };

    useEffect(() => {
        fetchCar(booking.carIdcar);
    },[]);

    return (
        <div className="container d-flex pt-4">
            <Link href={`/customer/booking/book/${booking.idbooking}`} className="row d-flex align-items-center"> 
                <div className="col-6">
                    {car && <img src={car.images} alt="" style={{width: '100%'}} /> }
                </div>
                {booking && car &&
                    <div className="col-6">
                        <p>Name: {car.name}</p>
                        <p>Start: {booking.startdatetime}</p>
                        <p>End: {booking.enddatetime}</p>
                        <p>Status: {status[booking.status]}</p>
                        <div className="row btn btn-primary w-100">
                            Xem chi tiet
                        </div>
                    </div>
                }
                
            </Link>
        </div>
    );
};

export default BookingItemCustomer;
