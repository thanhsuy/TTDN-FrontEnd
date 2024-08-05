"use client";
// pages/request-reset.tsx
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/ResetPassword.module.css";

const RequestReset = () => {
  const [email, setEmail] = useState("");
  const router = useRouter();

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push(`forget_password/reset-password/${encodeURIComponent(email)}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <img src="/icon/vehicle.png" alt="Car Icon" className={styles.icon} />
        <h1>Rent a car today!</h1>
      </div>
      <div className={styles.formContainer}>
        <h2>Reset Password</h2>
        <p>
          Enter the email address associated with your account, and we'll email
          you with the link to reset your password.
        </p>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className={styles.input}
          />
          <button type="submit" className={styles.button}>
            <img
              src="/icon/control-icon.png"
              alt="Lock Icon"
              className={styles.lockIcon}
            />
            SUBMIT
          </button>
        </form>
      </div>
    </div>
  );
};

export default RequestReset;
