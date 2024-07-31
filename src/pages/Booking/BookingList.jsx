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
import MakeABooking from "./MakeABooking";
import { useNavigate } from "react-router-dom";
import React from "react";
import { useEffect } from "react";
import ProductCard from "../../components/ProductCard/ProductCard";
import BookingItem from "../../components/ProductCard/BookingItem";

const BookingList = () => {

  const [wallet, setWallet] = useState();
  const [booking, setBooking] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState([]);
  const [car, setCar] = useState([]);
  const navigate = useNavigate();
  const isInitialRender = React.useRef(true);

  const getBooking = async () => {
      try {
        const response = await fetch(`http://localhost:8080/getbooking/user`, {
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

    const getUser = async () => {
      console.log("getUser");
      try {
        const response = await fetch(`http://localhost:8080/user/myInfo`, {
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
        setUser(data.result);
        setWallet(data.result.wallet);
      } catch (error) {
        console.error('Error fetching user:', error);
      }
    };

    useEffect(() => {
      const resBooking = async() => {
        await getBooking();
        await getUser();
      };
      resBooking();
    }, [])
    const getCar = async (carId) => {
        try {
          const response = await fetch(`http://localhost:8080/getcar/${carId}`, {
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
          setCar(data.result);
          console.log(car);
       } catch (error) {
          console.error('Error fetching car:', error);
        }
      };
      
      useEffect(() => {

          // await getCar(booking.carIdcar);
        
      }, [booking])

    // Xử lý khi form được gửi
    const handleClick = (book) => {
        // Điều hướng đến route /about
        switch(book.status){
          case "Pending Deposit":
            navigate(`/paiddeposite/${book.idbooking}`);
            break;
          case "Confirmed":
            navigate(`/confirmpickup/${book.idbooking}`);
            break;
          case "In - Progress":
            navigate(`/returncar/${book.idbooking}`);
            break;
          case "Pending Payment":
            navigate(`/pendingpayment/${book.idbooking}`);
            break;
          case "Completed":
            navigate(`/complete/${book.idbooking}`);
            break;
          case "Cancelled":
            navigate(`/complete/${book.idbooking}`);
            break;
          default:
            navigate(`/booking/${book.idbooking}`)
            break;
        }
      };
  
    return (
<div className="container">
            <ul>
              {console.log(car)}
                {booking.map((book) => (
                <BookingItem bookingItem={book} />
                ))}
      </ul>

        </div>
    );
  };
  
  export default BookingList;