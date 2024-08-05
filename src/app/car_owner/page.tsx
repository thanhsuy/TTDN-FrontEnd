// pages/index.tsx
"use client";
import Head from "next/head";
import Navbar from "@/components/Navbarowner";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footerowner";
import "../styles.css";
import { getUser } from "@/components/UserInfo";
import { useEffect, useState } from "react";

const HomePage = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  return (
    <>
      <Head>
        <title>Rent-a-car</title>
        <link rel="stylesheet" href="styles.css" />
      </Head>
      {user && <Navbar name={user.result.name} role={user.result.role} />}
      <main>
        <BenefitsSection />
        <div className="sec-2">
          <h1>Make money on your car right away</h1>
          <div className="btn-list">
            <button className="cta-button">List Your Car Today</button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HomePage;
