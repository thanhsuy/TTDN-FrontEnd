import { Col, Container, Row } from "react-bootstrap";
import FilterSelect from "../components/FilterSelect";
import SearchBar from "../components/SeachBar/SearchBar";
import { Fragment, useState } from "react";
import { products } from "../utils/products";
import ShopList from "../components/ShopList";
import Banner from "../components/Banner/Banner";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import Section from "../components/Section";
import { Navigate } from "react-router-dom";


const Signin = () => {
    // Khai báo trạng thái cho các trường đầu vào
    const [formData, setFormData] = useState({
        name: '',
        dateofbirth: '',
        nationalidno: '',
        email: '',
        phoneno: '',
        address: '',
        drivinglicense: '',
        roles: '',
        password: '',
        wallet: ''
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    // Xử lý khi form được gửi
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        
        // Chuyển đổi FormData thành đối tượng JavaScript
        const value = Object.fromEntries(data.entries());
        console.log(value);
        // Gửi dữ liệu dưới dạng JSON
        fetch('http://localhost:8080/user/create', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
        });      
    };
  
    return (
        <div className="container mb-4" style={{maxWidth: '60rem'}}>
            <h2 className="my-4">Register Account</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-1">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="mb-1">
                    <label className="form-label">Date of Birth</label>
                    <input type="date" className="form-control" name="dateofbirth" value={formData.dateofbirth} onChange={handleChange} required />
                </div>
                <div className="mb-1">
                    <label className="form-label">National ID No</label>
                    <input type="number" className="form-control" name="nationalidno" value={formData.nationalidno} onChange={handleChange} required />
                </div>
                <div className="mb-1">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-1">
                    <label className="form-label">Phone No</label>
                    <input type="tel" className="form-control" name="phoneno" value={formData.phoneno} onChange={handleChange} required />
                </div>
                <div className="mb-1">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" name="address" value={formData.address} onChange={handleChange} required />
                </div>
                <div className="mb-1">
                    <label className="form-label">Driving License</label>
                    <input type="text" className="form-control" name="drivinglicense" value={formData.drivinglicense} onChange={handleChange} required />
                </div>
                <div className="mb-1">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                <div className="mb-1">
                    <label className="form-label">Wallet</label>
                    <input type="number" className="form-control" name="wallet" value={formData.wallet} onChange={handleChange} required />
                </div>

                <div className="dropdown d-flex gap-4">
                    <div>
                        <input type="radio" name="role" value="CUSTOMER" id="customer"/>
                        <label className="form-label" htmlFor="customer" >CUSTOMER</label>
                    </div>
                    <div>
                        <input type="radio" name="role" value="CAR OWNER" id="carowner"/>
                        <label className="form-label" htmlFor="carowner">CAR OWNER</label>
                    </div>
                </div>
                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
        </div>
    );
  };
  
  export default Signin;