// components/ListCar.js
import Link from "next/link";
import { list } from "postcss";
import "./ListCar.css"

const ListCar = ({ listCar }: any) => {
  return (
    <div className="list-car-container">
      <div className="list-car-row">
        {listCar.map((car) => (
          <div key={car.idcar} className="list-car-item">
            <Link href={`/viewCarDetails/${car.idcar}`}>
              <img src={car.images} alt={car.name} className="list-car-img" />
              <div className="list-car-info">
                <p>{car.name}</p>
                <button className="list-car-btn">Rent Now!</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCar;
