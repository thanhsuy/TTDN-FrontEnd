import { Fragment, useEffect, useState } from "react";
import Wrapper from "../components/wrapper/Wrapper";
import Section from "../components/Section";
import { products, discoutProducts } from "../utils/products";
import SliderHome from "../components/Slider";
import useWindowScrollToTop from "../hooks/useWindowScrollToTop";
import { useNavigate } from "react-router-dom";

const Home = () => {
  // const loadingProducts = useSelector(loadingSelector);

  const [wallet, setWallet] = useState();
  const [listBooking, setListBooking] = useState([]);
  const [user, setUser] = useState([]);
  const [error, setError] = useState([]);
  const [listCar, setListCar] = useState([]);
  const navigate = useNavigate();
  function getToken()
  {
      return localStorage.getItem("authToken");
  }


  const getUser = async () => {
    console.log("getUser");
    try {
      const response = await fetch(`http://localhost:8080/user/myInfo`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setUser(data.result);
      setWallet(data.result.wallet);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };
  const getCar = async () => {
    try {
      const response = await fetch(`http://localhost:8080/getlistcar`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setListCar(data.result);
    } catch (error) {
      console.error('Error fetching car:', error);
    }
  };
  useEffect(() => {
    const resBooking = async() => {
      await getUser();
      await getCar();
    };
    resBooking();
  }, [])
  
    

  const [cars, setCars] = useState([]);


  const newArrivalData = products.filter(
    (item) => item.category === "mobile" || item.category === "wireless"
  );
  const bestSales = products.filter((item) => item.category === "sofa");
  useWindowScrollToTop();
  return (
    <Fragment>
      <SliderHome />
      <Wrapper />
      <Section
        title="Big Discount"
        bgColor="#f6f9fc"
        productItems={listCar}
      />
      <Section
        title="New Arrivals"
        bgColor="white"
        productItems={newArrivalData}
      />
      <Section title="Best Sales" bgColor="#f6f9fc" productItems={bestSales} />
    </Fragment>
  );
};

export default Home;
