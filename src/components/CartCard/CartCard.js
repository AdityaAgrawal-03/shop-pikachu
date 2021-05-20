import { useData } from "../../context/data-context";
import "./CartCard.css";

export function CartCard({ item }) {
  const { dispatch } = useData();

  const {
    name,
    price,
    count
  } = item;

  return (
    <div className="card card-shadow card-badge card-cart">
      <span className="badge badge-best-value">Best Value</span>
      <div className="card-header">
        <img src="https://images.bikesonline.com/assets/thumbL/23456.jpg?tr=w-316,h-226" alt="bicycle-1" className="card-image" />
      </div>
      <div className="card-content">
        <div className="card-title">
          <h3>{name}</h3>
        </div>
        <div className="card-price">Rs. {price}</div>
        <div>
          <button
            className="btn btn-primary"
            onClick={() => dispatch({ type: "INC_QTY", payload: item })}
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
            onClick={() => dispatch({ type: "DEC_QTY", payload: item })}
          >
            -
          </button>
        </div>

        <button
          className="btn"
          onClick={() => dispatch({ type: "REMOVE_FROM_CART", payload: item })}
        >
          Remove from Cart
        </button>
      </div>
    </div>
  );
}
