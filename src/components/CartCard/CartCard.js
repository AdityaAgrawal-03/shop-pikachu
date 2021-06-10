import { useData } from "../../context/DataContext";
import { Link } from "react-router-dom";
import "./CartCard.css";

export function CartCard({ item }) {
  const { dispatch } = useData();

  const { id, name, image, price, count } = item;

  return (
    <Link to={`/productDetails/${id}`} className="link">
      <div className="card card-shadow card-badge card-cart">
        <span className="badge badge-best-value">Best Value</span>
        <div className="card-header">
          <img src={image} alt="bicycle-1" className="card-image" />
        </div>
        <div className="card-content">
          <div className="card-title">
            <h3>{name}</h3>
          </div>
          <div className="card-price">Rs. {price}</div>
          <div className="card-quantity">
            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: "INC_QTY", payload: item });
              }}
            >
              +
            </button>
            {count ? (
              <span> Quantity: {count} </span>
            ) : (
              dispatch({ type: "REMOVE_FROM_CART", payload: item })
            )}

            <button
              className="btn btn-primary"
              onClick={(e) => {
                e.preventDefault();
                dispatch({ type: "DEC_QTY", payload: item });
              }}
            >
              -
            </button>
          </div>

          <button
            className="btn"
            onClick={(e) => {
              e.preventDefault();
              dispatch({ type: "REMOVE_FROM_CART", payload: item });
            }}
          >
            Remove from Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
