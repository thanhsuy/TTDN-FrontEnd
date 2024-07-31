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
import ProductCard from "../../components/ProductCard/ProductCard";
import CarItem from "../../components/ProductCard/CarItem";
const ListCar = () => {

  const [wallet, setWallet] = useState();
  const [booking, setBooking] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState([]);
  const [listCar, setListCar] = useState([]);
  const navigate = useNavigate();
  const isInitialRender = React.useRef(true);
  const getListCar = async () => {
      try {
        const response = await fetch(`http://localhost:8080/stoprentingcar/getlistcarbyidcarowner`, {
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
        setListCar(data?.result)
      } catch (error) {
        console.error('Error fetching booking:', error);
      }
    };

    useEffect(() => {
      const resBooking = async() => {
        await getListCar();
      };
      resBooking();
    }, [])
    

    return (
        <div className="container">
            <ul>
                {listCar.map((car) => (
                    <CarItem car={car} />
                ))}
      </ul>

        </div>
    );
  };
  
  export default ListCar;