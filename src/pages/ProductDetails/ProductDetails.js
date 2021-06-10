import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { data } from "../../data/data-model";
import "./ProductDetails.css";
import { useData } from "../../context/DataContext";

export function ProductDetails() {
  const { productId } = useParams();
  const { products } = data;
  const {
    state: { cart, wishlist },
    dispatch,
  } = useData();

  const product = products.find((product) => product.id === Number(productId));

  const isInCart = cart.find((cartItem) => cartItem.id === Number(productId));
  const isInWishlist = wishlist.find(
    (wishlistItem) => wishlistItem.id === Number(productId)
  );

  const { name, image, price, description, details } = product;

  return (
    <div className="product-details-page">
      <div className="product-container">
        <div className="card card-productDetail">
          <div className="card-header">
            <img
              src={image}
              alt="product"
              className="card-image"
            />
          </div>
          <div className="card-content">
            <div className="card-title">{name}</div>
            <div className="card-price"> Rs. {price} /- </div>
            <div className="card-buttons">
              {isInCart ? (
                <Link to="/cart" className="link">
                  <button className="btn btn-primary btn-primary-icon-label btn-productDetail">
                    Go to cart
                    <span
                      class="material-icons-outlined"
                      style={{
                        marginLeft: "2rem",
                      }}
                    >
                      east
                    </span>
                  </button>
                </Link>
              ) : (
                <button
                  className="btn btn-primary btn-primary-icon-label btn-productDetail"
                  onClick={() =>
                    dispatch({ type: "ADD_TO_CART", payload: product })
                  }
                >
                  <span className="material-icons-outlined md-light md-36">
                    add_shopping_cart
                  </span>
                  Add to Cart
                </button>
              )}
              {isInWishlist ? (
                <button
                  className="btn btn-secondary btn-secondary-icon-label btn-productDetail"
                  disabled="true"
                  style={{
                    cursor: "default",
                  }}
                >
                  <span class="material-icons-outlined md-light md-36">
                    favorite
                  </span>
                  Wishlisted
                </button>
              ) : (
                <button
                  className="btn btn-secondary btn-secondary-icon-label btn-productDetail"
                  onClick={() =>
                    dispatch({ type: "ADD_TO_WISHLIST", payload: product })
                  }
                >
                  <span className="material-icons-outlined md-light md-36">
                    favorite_border
                  </span>
                  Wishlist
                </button>
              )}
            </div>
          </div>
        </div>

        <hr />

        <div className="product-info">
          <div className="product-description">
            <h2> Description </h2>
            <p>{description}</p>
          </div>
          <div className="product-details">
            <h2>Details</h2>
            {details.map(({ title, text }) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
