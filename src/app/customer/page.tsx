// pages/index.tsx
"use client";
import Head from "next/head";
<<<<<<< HEAD
import Navbar from "../../components/Navbarowner";
import Banner from "../../components/Banner";
import WhyUs from "../../components/WhyUs";
import PeopleSay from "../../components/PeopleSayCustomer";
import FindUs from "../../components/FindUsCustomer";
import Footer from "../../components/Footerowner";
=======
import Navbar from "@/components/Navbarowner";
import Banner from "@/components/Banner";
import WhyUs from "@/components/WhyUs";
import PeopleSay from "@/components/PeopleSay";
import FindUs from "@/components/FindUs";
import Footer from "@/components/Footerowner";
>>>>>>> 3e42a36f006cb7135cf513594c020c017b5a4482
import "../styles.css";
import { getUser } from "@/components/UserInfo";
import { useEffect, useState } from "react";
("D:/TTDN/FPT/FE/ttdn-fpt/src/components/UserInfo");
import SearchCarPage from "../searchCar/page";
import ListCar from "@/components/ListCar";

type CarData = [string, number];

type User = {
  iduser: number;
  name: string;
  dateofbirth: string;
  nationalidno: number;
  phoneno: string;
  email: string;
  address: string;
  drivinglicense: string;
  password: string;
  role: string;
  wallet: number;
};

type FeedbackData = {
  bookingCarIdcar: number;
  bookingCarIdcarowner: number;
  bookingIdbooking: number;
  bookingUserIduser: number;
  content: string;
  datetime: string;
  idfeedback: number;
  rate: number;
  user: User;
};

type Section = {
  icon: string;
  title: string;
  content: string;
};

type UserName = {
  name: string;
  role: string;
};

const sections: Section[] = [
  {
    icon: "fa-dollar-sign",
    title: "Save money",
    content:
      "We have no setup or registration fees. You are only charged when you rent a car. So get started for FREE!",
  },
  {
    icon: "fa-car",
    title: "Variety of cars",
    content:
      "Choose from a wide range of cars available for rent at competitive prices.",
  },
  {
    icon: "fa-thumbs-up",
    title: "Trusted service",
    content:
      "Our customers trust us to provide reliable and quality service every time.",
  },
];
const getToken = () => {
  return localStorage.getItem("authToken");
};

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [carData, setCarData] = useState<CarData[]>([]);
  const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);
  const [listCar, setListCar] = useState([]);

  const getCar = async () => {
    try {
      const response = await fetch(`http://localhost:8080/getlistcar`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      setListCar(data.result);
    } catch (error) {
      console.error("Error fetching car:", error);
    }
  };

  useEffect(() => {
    const resBooking = async () => {
      await getCar();
    };
    resBooking();
  }, []);

  useEffect(() => {
    const fetchCarData = async () => {
      const token = getToken();
      const carRes = await fetch(
        "http://localhost:8080/viewhomeCustomer/top-cities",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const carData = await carRes.json();
      setCarData(carData.result);
    };

    const fetchFeedbackData = async () => {
      const token = getToken();
      const feedbackRes = await fetch(
        "http://localhost:8080/viewhomeCustomer/feedback",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
      const feedbackData = await feedbackRes.json();
      setFeedbackData(feedbackData.result);
    };

    fetchCarData();
    fetchFeedbackData();
  }, []);

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
      <SearchCarPage />
      {/* <ListCar listCar={listCar.filter((car) => car.status == "Available")} /> */}
      <ListCar listCar={listCar.filter((car) => car.status != "Stopped")} />
      <WhyUs sections={sections} />
      <PeopleSay feedbackData={feedbackData} />
      <FindUs carData={carData} />
      <Footer />
    </>
  );
};

export default HomePage;
