"use client";
import Head from "next/head";
import Navbar from "@/components/Navbarowner";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footerowner";
import { getUser } from "@/components/UserInfo";
import RootLayout from "@/app/layout";
import { useEffect, useState } from "react";
import Car from "../mycar/car/page";
import Booking from "./booking/page";
type UserName = {
    name: string;
    role: string;
  };

  
const MyBooking = () =>{

    const [listBooking, setListBooking] = useState([]);
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

    async function fetchListBooking() {
        try {
          const url = 'http://localhost:8080/getbooking/carowner';
          const response = await fetch(url, {
            method: 'GET',
            headers: {
              'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
              'Content-Type': 'application/json',
            },
          });
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          const jsonData = await response.json();
          return jsonData;
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
    
    useEffect(  () => {
        const data = fetchListBooking().then(data => setListBooking(data.result));        
    },[]);

    

    return (
      <>
      <Head>
        <title>Rent-a-car</title>
        <link rel="stylesheet" href="styles.css" />
      </Head>
      {user && <Navbar name={user.result.name} role={user.result.role} />}
      <main>
        <div className="container d-flex w-100 pt-4">
          <div className="row">
              {listBooking.map((booking) => (
                  <Booking booking={booking} key={booking.idbooking}/>
              ))}
          </div>
      </div>
      </main>
      <Footer />
      
    </>
       
    );
};

export default MyBooking;
