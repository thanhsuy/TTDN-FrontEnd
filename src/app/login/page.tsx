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
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      if (data.message === "Success") {
        setMessage("Registration success");
        // Auto login after successful registration
        setRegisterData(data.result);
        console.log(email);
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
    <div>
      <Navbar />
      {isRegister ? (
        <form onSubmit={handleRegister} className="register">
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
        </form>
      ) : (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="login"
        >
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
        </form>
      )}
      <div id="messageContainer">{message}</div>
      <button onClick={() => setIsRegister(!isRegister)}>
        {isRegister ? "Go to Login" : "Go to Register"}
      </button>
      <button onClick={() => router.back()}>Quay lại</button>
      <button onClick={() => router.push("/forget_password")}>
        Quên mật khẩu
      </button>
    </div>
  );
}
