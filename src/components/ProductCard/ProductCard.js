import { Link, useNavigate } from "react-router-dom";
import { useData } from "../../context/DataContext";
import "./ProductCard.css";

export function ProductCard({ item }) {
  const {
    state: { cart, wishlist },
    dispatch,
  } = useData();

  const navigate = useNavigate();

  const { id, price, fastDelivery, inStock, name, image } = item;

  const isInCart = cart.find((cartItem) => cartItem.id === item.id);
  const isInWishlist = wishlist.find(
    (wishlistItem) => wishlistItem.id === item.id
  );

  const cartHandler = (e) => {
    e.preventDefault();
    isInCart
      ? navigate("/cart")
      : dispatch({ type: "ADD_TO_CART", payload: item });
  };

  const wishlistHandler = (e) => {
    e.preventDefault();
    isInWishlist
      ? navigate("/wishlist")
      : dispatch({ type: "ADD_TO_WISHLIST", payload: item });
  };

  return (
    <>
      <Link to={`/productDetails/${id}`} className="link">
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
                <span class="material-icons-outlined">east</span>
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
            {isInWishlist ? (
              <button
                className="btn btn-secondary btn-secondary-icon-label"
                disabled="true"
                style={{
                  cursor: "default",
                }}
                onClick={(e) => wishlistHandler(e)}
              >
                <span class="material-icons-outlined md-light">favorite</span>
                Wishlisted
              </button>
            ) : (
              <button
                className="btn btn-secondary btn-secondary-icon-label"
                onClick={(e) => wishlistHandler(e)}
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
