// pages/signin.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignIn() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/user/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();
      if (data.code === 1000) {
        router.push("/"); // Chuyển hướng đến trang index
      } else {
        setMessage(`Registration failed: ${data.message}`);
      }
    } catch (error) {
      console.error("There was a problem with the fetch operation:", error);
      setMessage("Error fetching data");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>
            User Name:
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <label>
            Password:
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div>
          <input type="submit" value="Sign In" />
        </div>
        <div id="messageContainer">{message}</div>
      </form>
    </div>
  );
}
