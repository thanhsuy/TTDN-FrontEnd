"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8080/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await response.json();

      console.log(data);

      if (data.message === "Success") {
        const token = data.result.token;
        localStorage.setItem("authToken", token);
        setMessage("Login success");
        router.push("/profile");
      } else {
        setMessage("Login failed");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("An error occurred during login");
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
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
      <div id="messageContainer">{message}</div>
    </div>
  );
}
