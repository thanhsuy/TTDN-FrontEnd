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
        response.json().then(data => alert(data.message));   
      }

      const data = await response.json();

      if (data.message === "Success") {
        setMessage("Registration success");
        // Auto login after successful registration
        setEmail(registerData.email);
        setPassword(registerData.password);
        console.log(registerData.email);
        handleSubmit();
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
      <Navbar />
      {isRegister ? (
        <div className="container align-items-center border-0 flex-column justify-content-center">
          <form onSubmit={handleRegister} className="register w-100 border p-4">
          <div>
            <label>
              Name:
              <input
                type="text"
                name="name"
                value={registerData.name}
                onChange={(e) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Date of Birth:
              <input
                type="date"
                name="dateofbirth"
                value={registerData.dateofbirth}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    dateofbirth: e.target.value,
                  })
                }
              />
            </label>
          </div>
          <div>
            <label>
              National ID No:
              <input
                type="number"
                name="nationalidno"
                value={registerData.nationalidno}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    nationalidno: e.target.value,
                  })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Email:
              <input
                type="email"
                name="email"
                value={registerData.email}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Phone No:
              <input
                type="text"
                name="phoneno"
                value={registerData.phoneno}
                onChange={(e) =>
                  setRegisterData({ ...registerData, phoneno: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Address:
              <input
                type="text"
                name="address"
                value={registerData.address}
                onChange={(e) =>
                  setRegisterData({ ...registerData, address: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Driving License:
              <input
                type="text"
                name="drivinglicense"
                value={registerData.drivinglicense}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    drivinglicense: e.target.value,
                  })
                }
              />
            </label>
          </div>
          <div>
            <label>
              Role:
              <select
                name="role"
                value={registerData.role}
                onChange={(e) =>
                  setRegisterData({ ...registerData, role: e.target.value })
                }
              >
                <option value="CUSTOMER">CUSTOMER</option>
                <option value="CAROWNER">CAROWNER</option>
              </select>
            </label>
          </div>
          <div>
            <label>
              Password:
              <input
                type="password"
                name="password"
                value={registerData.password}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />
            </label>
          </div>
          <div>
            <input type="submit" value="Register" />
          </div>
          <button onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? "Go to Login" : "Go to Register"}
          </button>
        </form>
        </div>
      ) : (
        <div
          className="container align-items-center border-0 flex-column"
          style={{ height: "50vh" }}
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="login w-100 border p-4"
          >
            <h2>Đăng nhập</h2>
            <div>
              <label>
                Email:
                <input
                  type="text"
                  name="username"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
            </div>
            <div>
              <label>
                Password:
                <input
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
            </div>
            <div>
              <input type="submit" value="Log In" />
            </div>
            <div className="d-flex w-100 justify-content-between">
              <button
                onClick={() => setIsRegister(!isRegister)}
                className="col-3 bg-primary"
              >
                {isRegister ? "Go to Login" : "Go to Register"}
              </button>
              <button
                onClick={() => router.back()}
                className="col-3 bg-secondary"
              >
                Quay lại
              </button>
            </div>
          </form>
        </div>
      )}
      <div id="messageContainer">{message}</div>
      <button
        onClick={() => router.push("/forget_password")}
        className="col-3 bg-success"
      >
        Quên mật khẩu
      </button>
    </div>
  );
}
