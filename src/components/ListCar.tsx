import Link from "next/link";
import "./ListCar.css";

const ListCar = ({ listCar }: any) => {
  return (
    <div className="list-car-container">
      <h2 className="list-car-title">🚗 Danh sách xe</h2>
      <div className="list-car-grid">
        {listCar.map((car) => (
          <div key={car.idcar} className="list-car-item">
            <Link
              href={`/viewCarDetails/${car.idcar}`}
              className="list-car-link"
            >
              <img src={car.images} alt={car.name} className="list-car-img" />
              <div className="list-car-info">
                <p className="list-car-name">{car.name}</p>
                <button className="list-car-btn">Thuê ngay</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCar;
