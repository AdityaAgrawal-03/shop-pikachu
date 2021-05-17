import { useData } from "../context/data-context";

export function ProductCard({ item, setRoute }) {
  const {
    state: { cart, wishlist },
    dispatch,
  } = useData();

  const isInCart = cart.find((cartItem) => cartItem.id === item.id);
  const isInWishlist = wishlist.find(
    (wishlistItem) => wishlistItem.id === item.id
  );

  return (
    <div className="card card-shadow card-badge">
      <span className="badge badge-best-value">Best Value</span>
      <div className="card-header">
        <img src={item.image} alt="bicycle-1" className="card-image" />
      </div>
      <div className="card-content">
        <div className="card-title">
          <h3>{item.name}</h3>
        </div>
        <div className="card-price">{item.price}</div>
        {item.inStock && <div>In stock</div>}
        {!item.inStock && <div>Out of stock</div>}
        {item.fastDelivery ? (<div> Fast delivery </div>) : (<div> 5 days minimum </div>)}
        {isInCart ? (
          <button
            className="btn btn-primary btn-primary-icon-label"
            onClick={() => setRoute("cart")}
          >
            Go to cart
            <span class="material-icons-outlined">east</span>
          </button>
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
            Add to Wishlist
          </button>
        )}
      </div>
    </div>
  );
}
