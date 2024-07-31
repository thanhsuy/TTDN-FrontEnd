import { Button, Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { useEffect, useState } from "react";


const CarItem = ({ car }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const stopCar = async (car) => {
    try {
      const response = await fetch(`http://localhost:8080/stoprentingcar/${car.idcar}`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
    } catch (error) {
      console.error('Error fetching booking:', error);
    }
  };
    const handleClick = (car) => {

        stopCar(car);
    };
  return (
    <Col md={3} sm={5} xs={10} className="product mtop">
      <img
        loading="lazy"
        src={car.images}
        alt=""
      />
      
    <div className="container d-flex gap-4 p-4">
        <p>CarID: {car.idcar}</p>
        <p>Status: {car.status}</p>
        {(car.status == "Available")? <Button onClick={() => handleClick(car)} className="btn btn-danger">
        STOP CAR
        </Button> : ""}
        
    </div>
    </Col>
  );
};

export default CarItem;
