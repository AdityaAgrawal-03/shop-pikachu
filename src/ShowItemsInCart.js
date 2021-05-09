import { useCart } from "./context/cart-context";

export function ShowItemsInCart({ item }) {

  const { setItemsInCart } = useCart();

  return (
    <div className="card-container">
      <div className="card card-shadow card-badge">
        <span className="badge badge-best-value">Best Value</span>
        <div className="card-header">
          <img src="./assests/bicycle-images/bicycle-1.jpg" alt="bicycle-1" className="card-image" />
        </div>
        <div className="card-content">
          <div className="card-title">
            <h3>{item.name}</h3>
          </div>
          <div className="card-price">{item.price}</div>
          <button className="btn btn-primary" onClick={() => 
            setItemsInCart(cartItems => cartItems.filter(currentCartItem => currentCartItem !== item))
          }>
            Remove from Cart
          </button>
          <p>Count: {item.count}</p>
        </div>
      </div>
    </div>
  );
}
