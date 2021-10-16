import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useData } from "../../context/DataContext";
import { API_URL } from "../../utils";
import "./WishlistCard.css";

export function WishlistCard({ product }) {
  const {
    state: { cart },
    dispatch,
  } = useData();

  const navigate = useNavigate();

  const { _id, name, image, price, inStock } = product;

  const isInCart = cart.find((cartItem) => cartItem._id === _id);

  const cartHandler = async (e) => {
    e.preventDefault();

    if (!isInCart) {
      try {
        const {
          data: { success },
        } = await axios.post(`${API_URL}/cart`, {
          product: {
            _id,
            quantity: 1,
          },
        });

        if (success) {
          dispatch({ type: "ADD_TO_CART", payload: product });
        }
      } catch (error) {
        console.error(error);
      }
    } else {
      navigate("/cart");
    }
  };

  const removeProductFromWishlist = async (e) => {
    e.preventDefault();
    try {
      const {
        data: { success },
      } = await axios.delete(`${API_URL}/wishlist/${_id}`);

      if (success) {
        dispatch({ type: "REMOVE_FROM_WISHLIST", payload: product });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Link to={`/productDetails/${_id}`} className="link card-link">
      <div className="card card-shadow card-badge card-wishlist">
        <span className="badge badge-best-value">Best Value</span>
        <div className="card-header">
          <img src={image} alt="product" className="card-image" />
        </div>
        <div className="card-content">
          <div className="card-title">
            <h3>{name}</h3>
          </div>
          <div className="card-price">Rs. {price}</div>
          <div className="card-buttons">
            {inStock ? (
              <>
                {isInCart ? (
                  <button
                    className="btn btn-primary btn-primary-icon-label"
                    onClick={(e) => cartHandler(e)}
                  >
                    Go to cart
                    <span className="material-icons-outlined">east</span>
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-primary-icon-label"
                    onClick={(e) => cartHandler(e)}
                  >
                    <span className="material-icons-outlined md-light">
                      add_shopping_cart
                    </span>
                    Add to Cart
                  </button>
                )}
              </>
            ) : (
              <div>
                Out of stock
                <button className="btn btn-primary">Show similar items</button>
              </div>
            )}

            <button
              className="btn-remove"
              onClick={(e) => removeProductFromWishlist(e)}
            >
              <span className="underline-animation"> Remove </span>
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}
