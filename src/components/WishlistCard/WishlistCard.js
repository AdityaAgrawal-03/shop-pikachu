import { Link, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import "./WishlistCard.css";

export function WishlistCard({ item }) {
  const {
    state: { cart, wishlist },
    dispatch,
  } = useData();

  const navigate = useNavigate();

  const { id, name, image, price, inStock } = item;

  const isInCart = cart.find((cartItem) => cartItem.id === item.id);
  const isInWishlist = wishlist.find(
    (wishlistItem) => wishlistItem.id === item.id
  );

  const cartButtonHandler = (e) => {
    e.preventDefault();
    isInCart
      ? navigate("/cart")
      : dispatch({ type: "ADD_TO_CART", payload: item });
  };

  return (
    <Link to={`/productDetails/${id}`} className="link card-link">
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
                    onClick={(e) => cartButtonHandler(e)}
                  >
                    Go to cart
                    <span class="material-icons-outlined">east</span>
                  </button>
                ) : (
                  <button
                    className="btn btn-primary btn-primary-icon-label"
                    onClick={(e) => cartButtonHandler(e)}
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
                {" "}
                Out of stock
                <button className="btn btn-primary">Show similar items</button>
              </div>
            )}

            {isInWishlist ? (
              <button
                className="btn btn-default"
                onClick={(e) => {
                  e.preventDefault();
                  dispatch({ type: "REMOVE_FROM_WISHLIST", payload: item });
                }}
              >
                Remove from Wishlist
              </button>
            ) : (
              ""
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
