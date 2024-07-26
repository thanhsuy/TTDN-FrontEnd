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


const Login = () => {
    // Khai báo trạng thái cho các trường đầu vào
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

  
    // Xử lý khi form được gửi
    const handleSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const data = new FormData(form);
        
        // Chuyển đổi FormData thành đối tượng JavaScript
        const value = Object.fromEntries(data.entries());
        console.log(value);
        // Gửi dữ liệu dưới dạng JSON
        fetch('http://localhost:8080/auth/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(value),
        })
        .then(response => response.json())
        .then(data => {
            if(data.message == "Sucess")
            {
                localStorage.setItem('authToken', data.result.token);
                setError(data.message);
                window.location.href = "/";
            }else
            {
                setError(data.message);
            }
        });      
    };
  
    return (
      <div style={{ maxWidth: '400px', margin: '0 auto', padding: '120px 80px' }}>
        <h2>Đăng Nhập</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="email">Email:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
          </div>
          <div style={{ marginBottom: '10px' }}>
            <label htmlFor="password">Mật khẩu:</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            />
            <a href="/forgot" className="forgot_password">
              Quên mật khẩu
            </a>
          </div>
          {error && (
            <div style={{ color: 'red', marginBottom: '10px' }}>
              {error}
            </div>
          )}
          <div className="d-flex justify-content-between gap-2">
            <button type="submit" style={{ padding: '10px 0'  }} className="btn btn-primary w-50">
              Đăng Nhập
            </button>
            <a href="/signin" className="btn btn-success w-50" style={{padding: '10px 0' }}>
              Đăng Ký
            </a>
        
          </div>
        </form>
      </div>
    );
  };
  
  export default Login;