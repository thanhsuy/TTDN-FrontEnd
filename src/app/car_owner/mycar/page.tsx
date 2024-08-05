"use client";
import Head from "next/head";
import Navbar from "@/components/Navbarowner";
import BenefitsSection from "@/components/BenefitsSection";
import Footer from "@/components/Footerowner";
import "./styles.css";
import { getUser } from "@/components/UserInfo";
import RootLayout from "@/app/layout";
import { useEffect, useState } from "react";
import Car from "./car/page";
import Link from "next/link";

type UserName = {
    name: string;
    role: string;
  };

  
const CarOwner_MyCar = () =>{

    const [listCar, setListCar] = useState([]);
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
    async function fetchListCar() {
        try {
          const url = 'http://localhost:8080/stoprentingcar/getlistcarbyidcarowner';
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
        const data = fetchListCar().then(data => setListCar(data.result));  
    },[]);

    

    return (
      <>
      <Head>
        <title>Rent-a-car</title>
        <link rel="stylesheet" href="styles.css" />
      </Head>
      {user && <Navbar name={user.result.name} role={user.result.role}/>}
      <main>
        <div className="container d-flex flex-column pt-4">
          <div className="row">
            <div className="col-2">
            <Link href="/car_owner/addcar" className="btn btn-primary">ADD CAR</Link>
            </div>
            <div className="col-2">
              <div className="btn btn-success">
                NONE
              </div>
            </div>
          </div>
          <div className="row">
              {listCar.map((car) => (
                  <Car car={car} key={car.idcar}/>
              ))}
          </div>
      </div>
      </main>
      <Footer />
      
    </>
       
    );
};

export default CarOwner_MyCar;
