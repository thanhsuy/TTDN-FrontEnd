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
import React from "react";

import { useParams } from "react-router-dom";
const MakeABooking = () => {
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
    const { carIdcar } = useParams(); // Lấy giá trị idbooking từ URL

    const [wallet, setWallet] = useState();
    const [booking, setBooking] = useState([]);
    const [user, setUser] = useState([]);
    const [error, setError] = useState([]);
    const [car, setCar] = useState([]);
    const navigate = useNavigate();
    const isInitialRender = React.useRef(true);


    const getCar = async () => {
      console.log("getUser");
      try {
        const response = await fetch(`http://localhost:8080/getcar/${carIdcar}`, {
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
        console.error('Error fetching user:', error);
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
    
    useEffect( () => {
     getUser();
     getCar();
    },[]);
    // Khai báo trạng thái cho các trường đầu vào
    

  
    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);

        // Chuyển đổi FormData thành đối tượng JavaScript
        const value = Object.fromEntries(data.entries());
        console.log(value);

        // Gửi dữ liệu dưới dạng JSON
        fetch(`http://localhost:8080/makeABooking/${carIdcar}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        })
        .then(response => response.json())
        .then(data => {
          if(data.message == "Sucess")
          {
            navigate(`/paiddeposite/${data.result.idbooking}`);
          }else
          {
            setError(data.message);
          }
        });
        
    };

    return (
        <div className="container mb-4" style={{ maxWidth: '60rem' }}>
            <h2 className="my-4">Thanh toán</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-1">
                    <label className="form-label">Start date time</label>
                    <input type="date" className="form-control" name="startdatetime" value={formData.startdatetime} onChange={handleChange} required />
                </div>
                <div className="mb-1">
                    <label className="form-label">End date time</label>
                    <input type="date" className="form-control" name="enddatetime" value={formData.enddatetime} onChange={handleChange} required />
                </div>

                <div className="dropdown">
                    <div>
                        <input type="radio" name="paymentmethod" value="My wallet" id="wallet" />
                        <label className="form-label m-2" htmlFor="wallet">My wallet</label>
                        {(wallet > car.deposite) ? <span className="text-success">{wallet}$</span> : <span className="text-danger">{wallet}$</span>}
                    </div>
                    <div>
                        <input type="radio" name="paymentmethod" value="Cash" id="cash" />
                        <label className="form-label m-2" htmlFor="cash">Cash</label>
                    </div>
                    <div>
                        <input type="radio" name="paymentmethod" value="Bank transfer" id="banktransfer" />
                        <label className="form-label m-2" htmlFor="banktransfer">Bank transfer</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">NEXT</button>
            </form>
        </div>
    );
};

export default MakeABooking;
