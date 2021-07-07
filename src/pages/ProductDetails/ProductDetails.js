import { useParams } from "react-router";
import { Link } from "react-router-dom";
import "./ProductDetails.css";
import { useData } from "../../context/DataContext";

export function ProductDetails() {
  const { productId } = useParams();
  const {
    state: { cart, wishlist, inventory },
    dispatch,
  } = useData();

  const product = inventory.find((product) => product._id === productId);
  // const { name, image, price, description, details } = product;
  

  const isInCart = cart.find((cartItem) => cartItem.id === Number(productId));
  const isInWishlist = wishlist.find(
    (wishlistItem) => wishlistItem.id === Number(productId)
  );

  return (
    <>
      {product && (
        <div className="product-details-page">
          <div className="product-container">
            <div className="card card-productDetail">
              <div className="card-header">
                <img src={product.image} alt="product" className="card-image" />
              </div>
              <div className="card-content">
                <div className="card-title">{product.name}</div>
                <div className="card-price"> Rs. {product.price} /- </div>
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
                <p>{product.description}</p>
              </div>
              <div className="product-details">
                <h2>Details</h2>
                {product.details.map(({ title, text }) => (
                  <div key={title}>
                    <h3>{title}</h3>
                    <p>{text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
