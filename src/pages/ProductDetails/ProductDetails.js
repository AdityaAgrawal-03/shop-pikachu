import { useParams, useNavigate } from "react-router";
import axios from "axios";
import "./ProductDetails.css";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";

export function ProductDetails() {
  const { productId } = useParams();
  const {
    state: { cart, wishlist, inventory },
    dispatch,
  } = useData();

  const { user } = useAuth();

  const navigate = useNavigate();

  const product = inventory?.find((product) => product._id === productId);

  const isInCart = cart?.find((cartItem) => cartItem._id === productId);
  const isInWishlist = wishlist?.find(
    (wishlistItem) => wishlistItem._id === productId
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
              productId,
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
              productId,
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
                    <button
                      className="btn btn-primary btn-primary-icon-label btn-productDetail"
                      onClick={(e) => cartHandler(e)}
                    >
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
                  ) : (
                    <button
                      className="btn btn-primary btn-primary-icon-label btn-productDetail"
                      onClick={(e) => cartHandler(e)}
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
                      disabled={true}
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
                      onClick={(e) => wishlistHandler(e)}
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
