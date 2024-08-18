"use client";
import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import styles from "../../../styles/ResetPassword.module.css";

const ResetPassword = () => {
  const router = useRouter();
  const params = useParams();
  // Kiểm tra xem emailParam có phải là một chuỗi không
  const decodedEmai = Array.isArray(params) ? params[0] : params;

  // Giải mã giá trị nếu nó là một chuỗi
  const email = decodeURIComponent(decodedEmai.email);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    const response = await fetch("http://localhost:8080/user/forgot", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        newpassword: password,
        confirmpassword: confirmPassword,
      }),
    });

    console.log(response);

    if (response.ok) {
      console.log("Password reset successful");
      router.push("/login");
    } else {
      console.log("Password reset failed");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/icon/vehicle.png" alt="Car Icon" className={styles.icon} />
        <h1>Rent a car today!</h1>
      </div>
      <div className={styles.formContainer}>
        <h2>Reset Password</h2>
        <p>Please set your new password</p>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Pick a password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <p>Use at least one item, one number, and seven characters</p>
          <input
            type="password"
            placeholder="Confirm password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            <img
              src="/icon/control-icon.png"
              alt="Lock Icon"
              className={styles.lockIcon}
            />
            RESET
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
