import { Col } from "react-bootstrap";
import "./product-card.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { addToCart } from "../../app/features/cart/cartSlice";

const ProductCard = ({ title, productItem }) => {
  const dispatch = useDispatch();
  const router = useNavigate();
  const handelClick = () => {
    router(`/booking/${productItem.idcar}`);
  };
  return (
    <Col md={3} sm={5} xs={10} className="product mtop">
      <img
        loading="lazy"
        onClick={() => handelClick()}
        src={productItem.images}
        alt=""
      />
      <div className="product-like">
        <ion-icon name="heart-outline"></ion-icon>
      </div>
      <div className="product-details">
        <h3 onClick={() => handelClick()}>{productItem.productName}</h3>
        <div className="rate">
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
          <i className="fa fa-star"></i>
        </div>
        <div className="price">
          <h4>${productItem.baseprice}</h4>
          <button
            aria-label="Add"
            type="submit"
            className="add"
          >
            <ion-icon name="add"></ion-icon>
          </button>
        </div>
      </div>
    </Col>
  );
};

export default ProductCard;
