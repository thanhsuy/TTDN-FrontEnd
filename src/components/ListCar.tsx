// components/ListCar.js
import Link from "next/link";
import { list } from "postcss";

const ListCar = ({ listCar }: any) => {
  const handleClick = () => {};

  return (
    <div className="container d-flex pt-4">
      <div className="row">
        {listCar.map((car) => (
          <div className="col-4">
            <Link href={`/viewCarDetails/${car.idcar}`} className="row">
              <div className="col-5">
                <img
                  src={car.images}
                  alt=""
                  style={{ width: "100%" }}
                  onClick={handleClick}
                />
              </div>
              <div className="col-5">
                <p>Name: {car.name}</p>
                <button className="btn btn-primary">Rent Now!</button>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ListCar;
