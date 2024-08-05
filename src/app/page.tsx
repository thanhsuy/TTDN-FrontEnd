// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import NavbarCarOwner from "../components/Navbarowner";
import Banner from "../components/Banner";
import WhyUs from "../components/WhyUs";
import PeopleSay from "../components/PeopleSay";
import FindUs from "../components/FindUs";
import Footer from "../components/Footerowner";
import "../app/styles.css";

type CarData = {
  address: string;
  car_count: number;
  car_count_rounded: string;
  image: string;
};

type listCar = [CarData];

type FeedbackData = {
  UserName: string;
  FeedbackContent: string;
  Rating: number;
  Date: string;
};

type Section = {
  icon: string;
  title: string;
  content: string;
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

const HomePage: React.FC = () => {
  const [carData, setCarData] = useState<CarData[]>([]);
  const [feedbackData, setFeedbackData] = useState<FeedbackData[]>([]);

  useEffect(() => {
    const fetchCarData = async () => {
      const carRes = await fetch("http://localhost:8080/viewHomepage/getCity");
      const carData = await carRes.json();
      setCarData(carData.result);
    };

    const fetchFeedbackData = async () => {
      const feedbackRes = await fetch(
        "http://localhost:8080/viewHomepage/getFeedback"
      );
      const feedbackData = await feedbackRes.json();
      setFeedbackData(feedbackData.result);
    };

    fetchCarData();
    fetchFeedbackData();
  }, []);

  return (
    <>
      <Head>
        <title>Home Page</title>
        <link
          rel="stylesheet"
          href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.4/css/all.min.css"
        />
        <link rel="stylesheet" href="/css/style.css" />
      </Head>
      <Navbar />
      <Banner />
      <WhyUs sections={sections} />
      <PeopleSay feedbackData={feedbackData} />
      <FindUs carData={carData} />
      <Footer />
      <script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.3/dist/umd/popper.min.js"></script>
      <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
    </>
  );
};

export default HomePage;
