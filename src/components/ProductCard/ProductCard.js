import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useData } from "../../context/DataContext";
import "./ProductCard.css";

export function ProductCard({ product }) {
  const {
    state: { cart, wishlist },
    dispatch,
  } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const { _id, price, fastDelivery, inStock, name, image } = product;

  const isInCart = cart?.find((cartItem) => cartItem._id === _id);
  const isInWishlist = wishlist?.find(
    (wishlistItem) => wishlistItem._id === _id
  );

  const cartHandler = async (e) => {
    e.preventDefault();
    if (!isInCart) {
      try {
        const {
          data: { success },
        } = await axios.post(
          `https://shop-pikachu-backend.aditya365.repl.co/cart/${user._id}`,
          {
            product: {
              _id,
              quantity: 1,
            },
          }
        );

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

  const wishlistHandler = async (e) => {
    e.preventDefault();
    if (!isInWishlist) {
      try {
        const {
          data: { success },
        } = await axios.post(
          `https://shop-pikachu-backend.aditya365.repl.co/wishlist/${user._id}`,
          {
            product: {
              _id,
            },
          }
        );

        if (success) {
          dispatch({ type: "ADD_TO_WISHLIST", payload: product });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  return (
    <>
      <Link to={`/product/${_id}`} className="link">
        <div className="card card-shadow card-badge card-product">
          <span className="badge badge-best-value">Best Value</span>
          <div className="card-header">
            <img src={image} alt="bicycle-1" className="card-image" />
          </div>
          <div className="card-content">
            <div className="card-title">
              <h3>{name}</h3>
            </div>
            <div className="card-price"> Rs. {price} /-</div>
            {inStock && <div>In stock</div>}
            {!inStock && <div>Out of stock</div>}
            {fastDelivery ? (
              <div> Fast delivery </div>
            ) : (
              <div> 5 days minimum </div>
            )}

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
                onClick={(e) => {
                  e.preventDefault();
                  user ? cartHandler(e) : navigate("/login");
                }}
              >
                <span className="material-icons-outlined md-light">
                  add_shopping_cart
                </span>
                Add to Cart
              </button>
            )}
            {isInWishlist ? (
              <button
                className="btn btn-secondary btn-secondary-icon-label"
                disabled={true}
                style={{
                  cursor: "default",
                }}
              >
                <span className="material-icons-outlined md-light">
                  favorite
                </span>
                Wishlisted
              </button>
            ) : (
              <button
                className="btn btn-secondary btn-secondary-icon-label"
                onClick={(e) => {
                  e.preventDefault();
                  user ? wishlistHandler(e) : navigate("/login");
                }}
              >
                <span className="material-icons-outlined md-light">
                  favorite_border
                </span>
                Wishlist
              </button>
            )}
          </div>
        </div>
      </Link>
    </>
  );
}
