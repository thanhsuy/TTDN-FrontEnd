import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../../components/FilterSelect";
import SearchBar from "../../components/SeachBar/SearchBar";
import { Fragment, useEffect, useState } from "react";
import { products } from "../../utils/products";
import ShopList from "../../components/ShopList";
import Banner from "../../components/Banner/Banner";
import useWindowScrollToTop from "../../hooks/useWindowScrollToTop";
import Section from "../../components/Section";
import { Navigate, useNavigate } from "react-router-dom";
import { south } from "@cloudinary/url-gen/qualifiers/compass";
import { useParams } from "react-router-dom";
import React from "react";
const PaidDeposite = () => {
    // Khai báo trạng thái cho các trường đầu vào
    const [formData, setFormData] = useState({
      name: '',
      startdatetime: '',
      enddatetime: '',
      email: '',
      phoneno: '',
      address: '',
      drivinglicense: '',
      roles: '',
      password: '',
      wallet: ''
  });

  const [wallet, setWallet] = useState();
  const [booking, setBooking] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState([]);
  const [car, setCar] = useState([]);
  const navigate = useNavigate();
  const isInitialRender = React.useRef(true);
  const { idbooking } = useParams(); // Lấy giá trị idbooking từ URL

  const getBooking = async () => {
    try {
      const response = await fetch(`http://localhost:8080/getbooking/${idbooking}`, {
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
  }, [idbooking])
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
      } catch (error) {
        console.error('Error fetching car:', error);
      }
    };
    
    useEffect(() => {
      if(booking?.carIdcar){
        getCar(booking.carIdcar);
      }
    }, [booking])
  


    // Xử lý khi form được gửi
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        
        // Chuyển đổi FormData thành đối tượng JavaScript
        const value = Object.fromEntries(data.entries());
        console.log(value);
        // Gửi dữ liệu dưới dạng JSON
        fetch(`http://localhost:8080/paidDeposid/${idbooking}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        })
        .then(response => response.json())
        .then(data => {
        });      
        navigate(`/confirmpickup/${idbooking}`);
        
    };

    return (
        
        <div className="container mb-4" style={{maxWidth: '60rem'}}>
            <h2 className="my-4">Xác nhận thanh toán</h2>
            <div className="container">
                <div className="row">
                    <div className="col-6">
                        <p>Tên tài khoản: {user.name}</p>
                        <p className="text-success">Wallet: {user.wallet}$</p>
                        <p>STATUS: {booking.status}</p>
                    </div>
                    <div className="col-6">
                        <p>Thông tin phiếu thuê</p>
                        <p>Start: {booking.startdatetime}</p>
                        <p>End: {booking.enddatetime}</p>
                        <img src={car.images} alt=""  style={{width: '200px', height: '200px' }}/>
                    </div>
                </div>
            </div>
            <form onSubmit={handleSubmit}>
                <div className="container d-flex">
                <button type="" className="btn btn-secondary w-40">BACK</button>
                <button type="submit" className="btn btn-primary w-40">NEXT</button>
                </div>
            </form>
        </div>
    );
  };
  
  export default PaidDeposite;