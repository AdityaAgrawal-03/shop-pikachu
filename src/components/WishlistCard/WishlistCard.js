import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import "./WishlistCard.css";

export function WishlistCard({ item }) {
  const {
    state: { cart, wishlist },
    dispatch,
  } = useData();

  const { price, inStock } = item;

  const isInCart = cart.find((cartItem) => cartItem.id === item.id);
  const isInWishlist = wishlist.find(
    (wishlistItem) => wishlistItem.id === item.id
  );

  return (
    <div className="card card-shadow card-badge card-wishlist">
      <span className="badge badge-best-value">Best Value</span>
      <div className="card-header">
        <img
          src="https://images.bikesonline.com/assets/thumbL/23456.jpg?tr=w-316,h-226"
          alt="bicycle-1"
          className="card-image"
        />
      </div>
      <div className="card-content">
        <div className="card-title">
          <h3>2021 Polygon Strattos S5 - Shimano 105 Road Bike</h3>
        </div>
        <div className="card-price">Rs. {price}</div>
        <div className="card-buttons">
          {inStock ? (
            <>
              {isInCart ? (
                <Link to="/cart" className="link">
                  <button className="btn btn-primary btn-primary-icon-label">
                    Go to cart
                    <span class="material-icons-outlined">east</span>
                  </button>
                </Link>
              ) : (
                <button
                  className="btn btn-primary btn-primary-icon-label"
                  onClick={() =>
                    dispatch({ type: "ADD_TO_CART", payload: item })
                  }
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
              <Link to="/" className="link">
                <button className="btn btn-primary">Show similar items</button>
              </Link>
            </div>
          )}

          {isInWishlist ? (
            <button
              className="btn btn-default"
              onClick={() =>
                dispatch({ type: "REMOVE_FROM_WISHLIST", payload: item })
              }
            >
              Remove from Wishlist
            </button>
          ) : (
            ""
          )}
        </div>
      </div>
    </div>
  );
}
