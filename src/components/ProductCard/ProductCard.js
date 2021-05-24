import { Link } from "react-router-dom";
import { useData } from "../../context/DataContext";
import "./ProductCard.css";

export function ProductCard({ item }) {
  const {
    state: { cart, wishlist },
    dispatch,
  } = useData();

  const { price, fastDelivery, inStock, bikes } = item;

  const isInCart = cart.find((cartItem) => cartItem.id === item.id);
  const isInWishlist = wishlist.find(
    (wishlistItem) => wishlistItem.id === item.id
  );

  return (
    <div className="card card-shadow card-badge">
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
        <div className="card-price"> Rs. {price} /-</div>
        {inStock && <div>In stock</div>}
        {!inStock && <div>Out of stock</div>}
        {fastDelivery ? (
          <div> Fast delivery </div>
        ) : (
          <div> 5 days minimum </div>
        )}
        {console.log(bikes)}

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
            onClick={() => dispatch({ type: "ADD_TO_CART", payload: item })}
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
            disabled="true"
            style={{
              cursor: "default",
            }}
          >
            <span class="material-icons-outlined md-light">favorite</span>
            Wishlisted
          </button>
        ) : (
          <button
            className="btn btn-secondary btn-secondary-icon-label"
            onClick={() => dispatch({ type: "ADD_TO_WISHLIST", payload: item })}
          >
            <span className="material-icons-outlined md-light">
              favorite_border
            </span>
            Wishlist
          </button>
        )}
      </div>
    </div>
  );
}
