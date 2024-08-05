import { useEffect, useState } from "react";
import { json } from "stream/consumers";

const   Car = ({ car , star}: Props) => {

    const [status, setStatus] = useState(car.status);

    const handleStopCar = async () => {
        try {
              const url = `http://localhost:8080/stoprentingcar/${car.idcar}`;
              const response = await fetch(url, {
                method: 'POST',
                headers: {
                  'Authorization': `Bearer ${localStorage.getItem("authToken")}`,
                  'Content-Type': 'application/json',
                },
              });
              if (!response.ok) {
                throw new Error('Network response was not ok');
              }
              const jsonData = await response.json();
              var statusResponse = jsonData.result.status;
              alert("Ban co chac muon STOP car không!");
              setStatus(statusResponse);                            
              return jsonData;
            } catch (error) {
              console.error('Error fetching data:', error);
            }
    };
    useEffect(() => {
    },[status]);

    return (
        <div className="col-4 flex-column">
        <img src={car.images} alt=""  style={{width: '30%'}} />
        <h6>{car.name}</h6>
        <div className="row d-flex justify-content-around">
            <h6 className="col-4">{car.baseprice}</h6>
            <h6 className="col-4">{status}</h6>
        </div>
        <div className="row d-flex justify-content-end">
            {
                status === "Available" ? <button className="col-4 btn-danger btn" onClick={handleStopCar}>
                STOP
            </button> : ""
            }
        </div>
    </div>
    );
};

export default Car;
