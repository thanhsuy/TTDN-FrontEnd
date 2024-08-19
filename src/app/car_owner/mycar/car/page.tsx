import { useEffect, useState } from "react";
import { json } from "stream/consumers";
import styles from "../car/styles.module.css";
import { useRouter } from "next/navigation";

const Car = ({ car, star }: Props) => {
  const [status, setStatus] = useState(car.status);
  const router = useRouter();

  const handleStopCar = async () => {
    try {
      const url = `http://localhost:8080/stoprentingcar/${car.idcar}`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("authToken")}`,
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const jsonData = await response.json();
      var statusResponse = jsonData.result.status;
      alert("Ban co chac muon STOP car không!");
      setStatus(statusResponse);
      return jsonData;
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleEditCar = async () => {
    try {
      router.push(`/car_owner/mycar/cardetail/${car.idcar}`);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {}, [status]);

  return (
    <div className={`col-12 ${styles.carCard}`}>
      <div className={styles.carImageContainer}>
        <img src={car.images} alt="" className={styles.carImage} />
      </div>
      <div className={styles.carDetails}>
        <h5>{car.name}</h5>
        <div className={styles.rating}>
          Ratings: <span>★★★★★</span> (No ratings yet)
        </div>
        <p>No. of rides: {car.idcar}</p>
        <p>Price: {car.baseprice}/day</p>
        <p>Locations: {car.address}</p>
        <p>
          Status:{" "}
          <span className={status === "Stopped" ? styles.statusStopped : ""}>
            {status}
          </span>
        </p>
        {status === "Available" && (
          <button className="btn btn-danger" onClick={handleStopCar}>
            STOP
          </button>
        )}
        {status !== "Booked" && (
          <button className="btn btn-danger" onClick={handleEditCar}>
            Edit
          </button>
        )}
      </div>
    </div>
  );
};

export default Car;
