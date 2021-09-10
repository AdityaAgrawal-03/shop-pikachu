import axios from "axios";
import { useData } from "../../context/DataContext";
import { useAuth } from "../../context/AuthContext";
import { CartCard } from "../../components/CartCard/CartCard";
import {
  API_URL,
  RAZORPAY_CHECKOUT_URL,
  RAZORPAY_KEY,
  RAZORPAY_LOGO,
} from "../../utils/index";
import "./Cart.css";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export function Cart() {
  const {
    state: { cart, totalPrice },
  } = useData();
  const { user } = useAuth();

  async function displayRazorpay() {
    const response = await loadScript(`${RAZORPAY_CHECKOUT_URL}`);

    const payment_response = await axios.post(`${API_URL}/payments/razorpay`, {
      amount: totalPrice,
    });

    if (!response) {
      alert("Razorpay SDK failed to load!");
      return;
    }

    const { amount, currency, orderId } = payment_response.data;

    const options = {
      key: RAZORPAY_KEY,
      amount: amount,
      currency: currency,
      name: "PIKACHU PAYMENTS",
      description: "Bicycle transaction",
      image: RAZORPAY_LOGO,
      order_id: orderId,
      handler: async function (response) {
        const paymentVerification = await axios.post(
          `${API_URL}/payments/verification`,
          {
            orderId: orderId,
            paymentId: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          }
        );

        if (paymentVerification.data.success) {
          alert(paymentVerification.data.message);
        } else {
          alert("something went wrong");
        }
      },
      prefill: {
        name: user.name,
        email: user.email,
        contact: "1234567890",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#00adb5",
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <div className="cart-page">
      <div className="cart-container">
        <h2 className="cart-container-heading">Cart</h2>
        <div className="card-container">
          {cart.map((product) => (
            <CartCard product={product} key={product._id} />
          ))}
        </div>
      </div>
      <div className="cart-checkout">
        <h2 className="cart-checkout-heading"> Order Summary </h2>
        <div className="cart-checkout-info">
          <p>SUBTOTAL</p>
          <p>Rs. {totalPrice}</p>
        </div>
        <button
          className={
            cart.length
              ? "btn btn-primary btn-cart-checkout"
              : "btn btn-primary btn-disabled"
          }
          disabled={cart.length ? false : true}
          onClick={displayRazorpay}
        >
          Proceed to checkout
        </button>
      </div>
    </div>
  );
}
