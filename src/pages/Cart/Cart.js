import { useData } from "../../context/data-context";
import { CartCard } from "../../components/CartCard/CartCard";
import "./Cart.css";

export function Cart() {
  const {
    state: { cart, totalPrice },
  } = useData();

  console.log({ cart });

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2 className="cart-container-heading">Cart</h2>
        <div className="card-container">
          {cart.map((item) => (
            <CartCard item={item} key={item.id} />
          ))}
        </div>
      </div>
      <div className="cart-checkout">
        <h2 className="cart-checkout-heading"> Order Summary </h2>
        <div className="cart-checkout-info">
          <p>SUBTOTAL</p>
          <p>Rs. {totalPrice}</p>
        </div>
        <button className="btn btn-primary btn-cart-checkout">Proceed to checkout</button>
      </div>
    </div>
  );
}
