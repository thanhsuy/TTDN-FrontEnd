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


const Forgot = () => {
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
        fetch('http://localhost:8080/user/forgot', {
            method: 'PUT',
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
            <h2 className="my-4">Quên mật khẩu</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-1">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="mb-1">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} required />
                </div>
                
                <div className="mb-1">
                    <label className="form-label">New Password</label>
                    <input type="password" className="form-control" name="newpassword" />
                </div>
                <div className="mb-1">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name="confirmpassword"/>
                </div>

                <button type="submit" className="btn btn-primary w-100">Register</button>
            </form>
        </div>
    );
  };
  
  export default Forgot;