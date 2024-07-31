import { Button, Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../../components/FilterSelect";
import SearchBar from "../../components/SeachBar/SearchBar";
import { Fragment, useState } from "react";
import { products } from "../../utils/products";
import ShopList from "../../components/ShopList";
import Banner from "../../components/Banner/Banner";
import useWindowScrollToTop from "../../hooks/useWindowScrollToTop";
import Section from "../../components/Section";
import { Navigate } from "react-router-dom";
import MakeABooking from "../Booking/MakeABooking";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
const ListBooking = () => {

  const [wallet, setWallet] = useState();
  const [booking, setBooking] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState([]);
  const [car, setCar] = useState([]);
  const navigate = useNavigate();
  const isInitialRender = React.useRef(true);
  const idbooking = 33;
  const getBooking = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getbooking/carowner`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log("data", data)
        setBooking(data?.result)
      } catch (error) {
        console.error('Error fetching booking:', error);
      }
    };

    useEffect(() => {
      const resBooking = async() => {
        await getBooking();
      };
      resBooking();
    }, [idbooking])
    

    const handleConfirmDeposite = async (idbooking) => {
        try {
            const response = await fetch(`http://localhost:8080/confirmdeposit/${idbooking}`, {
              method: 'POST',
              headers: {
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                'Content-Type': 'application/json',
              },
            });
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            const data = await response.json();
            console.log("data", data)
            setBooking(data?.result)
          } catch (error) {
            console.error('Error fetching booking:', error);
          }
          window.location.reload();
        };
    // Xử lý khi form được gửi
    const handleClick = () => {
        // Điều hướng đến route /about
        console.log("booking", booking);
        switch(booking.status){
          case "Pending Deposit":
            navigate(`/paiddeposite/${idbooking}`);
            break;
          case "Confirmed":
            navigate(`/confirmpickup/${idbooking}`);
            break;
          case "In - Progress":
            navigate(`/returncar/${idbooking}`);
            break;
          case "Pending Payment":
            navigate(`/pendingpayment/${idbooking}`);
            break;
          case "Completed":
            navigate(`/complete/${idbooking}`);
            break;
          case "Cancelled":
            navigate(`/complete/${idbooking}`);
            break;
          default:
            navigate(`/booking/${idbooking}`)
            break;
        }
      };
  
    return (
        <div className="container">
            <ul>
                {booking.map((book) => (
                <li key={book.idbooking} className="mt-4 bg-primary">
                    <div className="d-flex">
                    <div className="">
                    <h2>{book.idbooking}</h2>
                    <h2>{book.status}</h2>
                    </div>
                    
                    {(book.status == "Pending Deposit") ? <Button onClick={() => handleConfirmDeposite(book.idbooking) } className="btn btn-danger" style={{margin: '0 10px'}}> 
                        CONFIRM DEPOSITE
                    </Button> : ""}
                    </div>
                </li>
                ))}
      </ul>

        </div>
    );
  };
  
  export default ListBooking;