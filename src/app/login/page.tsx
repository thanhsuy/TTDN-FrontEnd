"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import "../styles.css";
import Navbar from "../../components/Navbar";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [registerData, setRegisterData] = useState({
    name: "",
    dateofbirth: "",
    nationalidno: "",
    email: "",
    phoneno: "",
    address: "",
    drivinglicense: "",
    role: "CUSTOMER",
    password: "",
    wallet: 200,
  });
  const router = useRouter();

  const getToken = () => {
    return localStorage.getItem("authToken");
  };

  const getUser = async () => {
    const token = getToken();
    try {
      const response = await fetch("http://localhost:8080/user/myInfo", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      router.push("/login");
    }
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.message === "Success") {
        const token = data.result.token;
        localStorage.setItem("authToken", token);
        setMessage("Login success");
        const user = await getUser();
        if (user.result.role === "CAROWNER") {
          router.push("/car_owner");
        } else if (user.result.role === "CUSTOMER") {
          router.push("/customer");
        }
      } else {
        setMessage("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred during login");
    }
  };

  const handleRegister = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registerData),
      });

      if (!response.ok) {
        // throw new Error("Network response was not ok");
        response.json().then((data) => alert(data.message));
      }

      const data = await response.json();

      if (data.message === "Success") {
        setMessage("Registration success");
        // Auto login after successful registration
        setEmail(registerData.email);
        setPassword(registerData.password);
        console.log(registerData.email);
      } else {
        setMessage("Registration failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred during registration");
    }
  };

  return (
    <div className="">
      {" "}
      <Navbar />{" "}
      {isRegister ? (
        <div
          className="container d-flex align-items-center border-0 flex-column vh-100"
          style={{ marginTop: "50px" }}
        >
          <form
            onSubmit={handleRegister}
            className="register w-50 border p-4 bg-light shadow-sm"
          >
            {" "}
            <h2 className="mb-4">Register</h2>{" "}
            <div className="form-group mb-3">
              {" "}
              <label className="form-label">Name:</label>{" "}
              <input
                type="text"
                className="form-control"
                name="name"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
              />{" "}
            </div>{" "}
            <div className="form-group mb-3">
              {" "}
              <label className="form-label">Date of Birth:</label>{" "}
              <input
                type="date"
                className="form-control"
                name="dateofbirth"
                value={registerData.dateofbirth}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    dateofbirth: e.target.value,
                  })
                }
              />{" "}
            </div>{" "}
            <div className="form-group mb-3">
              {" "}
              <label className="form-label">National ID No:</label>{" "}
              <input
                type="number"
                className="form-control"
                name="nationalidno"
                value={registerData.nationalidno}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    nationalidno: e.target.value,
                  })
                }
              />{" "}
            </div>{" "}
            <div className="form-group mb-3">
              {" "}
              <label className="form-label">Email:</label>{" "}
              <input
                type="email"
                className="form-control"
                name="email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />{" "}
            </div>{" "}
            <div className="form-group mb-3">
              {" "}
              <label className="form-label">Phone No:</label>{" "}
              <input
                type="text"
                className="form-control"
                name="phoneno"
                value={registerData.phoneno}
                onChange={(e) =>
                  setRegisterData({ ...registerData, phoneno: e.target.value })
                }
              />{" "}
            </div>{" "}
            <div className="form-group mb-3">
              {" "}
              <label className="form-label">Address:</label>{" "}
              <input
                type="text"
                className="form-control"
                name="address"
                value={registerData.address}
                onChange={(e) =>
                  setRegisterData({ ...registerData, address: e.target.value })
                }
              />{" "}
            </div>{" "}
            <div className="form-group mb-3">
              {" "}
              <label className="form-label">Driving License:</label>{" "}
              <input
                type="text"
                className="form-control"
                name="drivinglicense"
                value={registerData.drivinglicense}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    drivinglicense: e.target.value,
                  })
                }
              />{" "}
            </div>{" "}
            <div className="form-group mb-3">
              {" "}
              <label className="form-label">Role:</label>{" "}
              <select
                className="form-control"
                name="role"
                value={registerData.role}
                onChange={(e) =>
                  setRegisterData({ ...registerData, role: e.target.value })
                }
              >
                {" "}
                <option value="CUSTOMER">CUSTOMER</option>{" "}
                <option value="CAROWNER">CAROWNER</option>{" "}
              </select>{" "}
            </div>{" "}
            <div className="form-group mb-3">
              {" "}
              <label className="form-label">Password:</label>{" "}
              <input
                type="password"
                className="form-control"
                name="password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />{" "}
            </div>{" "}
            <div className="d-grid mb-3">
              {" "}
              <input
                type="submit"
                value="Register"
                className="btn btn-primary"
              />{" "}
            </div>{" "}
            <div className="text-center">
              {" "}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="btn btn-link"
              >
                {" "}
                {isRegister ? "Go to Login" : "Go to Register"}{" "}
              </button>{" "}
            </div>{" "}
          </form>{" "}
        </div>
      ) : (
        <div
          className="container d-flex align-items-center border-0 flex-column vh-100"
          style={{ marginTop: "50px" }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="login w-50 border p-4 bg-light shadow-sm"
          >
            {" "}
            <h2 className="mb-4">Đăng nhập</h2>{" "}
            <div className="form-group mb-3">
              {" "}
              <label className="form-label">Email:</label>{" "}
              <input
                type="text"
                className="form-control"
                name="username"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="form-group mb-3">
              {" "}
              <label className="form-label">Password:</label>{" "}
              <input
                type="password"
                className="form-control"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />{" "}
            </div>{" "}
            <div className="d-grid mb-3">
              {" "}
              <input
                type="submit"
                value="Log In"
                className="btn btn-primary"
              />{" "}
            </div>{" "}
            <div className="d-flex w-100 justify-content-between">
              {" "}
              <button
                type="button"
                onClick={() => router.push("/forget_password")}
                className="btn btn-success"
              >
                {" "}
                Quên mật khẩu{" "}
              </button>{" "}
              <button
                type="button"
                onClick={() => setIsRegister(!isRegister)}
                className="btn btn-primary"
              >
                {" "}
                {isRegister ? "Go to Login" : "Go to Register"}{" "}
              </button>{" "}
              <button
                type="button"
                onClick={() => router.back()}
                className="btn btn-secondary"
              >
                {" "}
                Quay lại{" "}
              </button>{" "}
            </div>{" "}
          </form>{" "}
        </div>
      )}{" "}
      <div id="messageContainer">{message}</div>{" "}
    </div>
  );
}
