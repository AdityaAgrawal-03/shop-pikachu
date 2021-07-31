import axios from "axios";
import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import { API_URL } from "../../utils";
import "./CartCard.css";

export function CartCard({ product }) {
  const { dispatch } = useData();

  const { _id, name, image, price, quantity } = product;

  const increaseQuantity = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { success },
      } = await axios.post(`${API_URL}/cart/${_id}`, {
        quantity: quantity + 1,
      });
      if (success) {
        dispatch({ type: "INC_QTY", payload: product });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const decreaseQuantity = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { success, product },
      } = await axios.post(`${API_URL}/cart/${_id}`, {
        quantity: quantity - 1,
      });
      if (success) {
        product.quantity === 0
          ? dispatch({ type: "REMOVE_FROM_CART", payload: product })
          : dispatch({ type: "DEC_QTY", payload: product });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const removeProductFromCart = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { success },
      } = await axios.post(`${API_URL}/cart/${_id}`, {
        quantity: 0,
      });
      if (success) {
        dispatch({ type: "REMOVE_FROM_CART", payload: product });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Link to={`/product/${_id}`} className="link">
      <div className="card card-shadow card-badge card-cart">
        <span className="badge badge-best-value">Best Value</span>
        <div className="card-header">
          <img src={image} alt="bicycle-1" className="card-image" />
        </div>
        <div className="card-content">
          <div className="card-title">
            <h3>{name}</h3>
          </div>
          <div className="card-price">{price}</div>
          <div className="card-quantity">
            <button
              className="btn btn-primary"
              onClick={(e) => increaseQuantity(e)}
            >
              +
            </button>
            <span> Quantity: {quantity} </span>

            <button
              className="btn btn-primary"
              onClick={(e) => decreaseQuantity(e)}
            >
              -
            </button>
          </div>

          <button className="btn" onClick={(e) => removeProductFromCart(e)}>
            Remove from Cart
          </button>
        </div>
      </div>
    </Link>
  );
}
