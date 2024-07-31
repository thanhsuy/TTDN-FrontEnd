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
const CarOwnerPage = () => {

const navigate = useNavigate();

  const goToListBooking = () =>{
    navigate('/carowner/listbooking');
  };
  const goToAddCar = () =>{
    navigate('/addcar');
  };

  const goToListCar = () =>{
    navigate('/carowner/listcarofcarowner');
  };
    return (
        <div className="container d-flex">
            <Button onClick={goToListBooking}>
                My LIST BOOKING
            </Button>
            <Button onClick={goToAddCar}>
                ADD CAR
            </Button>
            <Button onClick={goToListCar}>
                MY CAR
            </Button>

        </div>
    );
  };
  
  export default CarOwnerPage;