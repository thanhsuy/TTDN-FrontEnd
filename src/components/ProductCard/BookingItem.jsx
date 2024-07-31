import { Button, Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";
import { useEffect, useState } from "react";


const BookingItem = ({ bookingItem }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

    const [car, setCar] = useState([]);
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
    
    useEffect(() =>{
        getCar(bookingItem.carIdcar);
    },[]);

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
    <Col md={3} sm={5} xs={10} className="product mtop">
      <img
        loading="lazy"
        src={car.images}
        alt=""
      />
      
    <div className="container d-flex gap-4 p-4">
        <p>BookingID: {bookingItem.idbooking}</p>
        <p>{bookingItem.status}</p>
        <Button onClick={() => handleClick(bookingItem)}>
        {bookingItem.status}
        </Button>
    </div>
    </Col>
  );
};

export default BookingItem;
