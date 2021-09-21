import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
    dispatch,
  } = useData();
  const { user } = useAuth();
  const navigate = useNavigate();

  const clearCart = async () => {
    try {
      const response = await axios.delete(`${API_URL}/cart`);

      if (response.data.success) {
        dispatch({ type: "CLEAR_CART" });
      }
    } catch (error) {
      console.error(error);
    }
  };

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
          clearCart();
        } else {
          alert("something went wrong");
        }
      },
      prefill: {
        name: "tester",
        email: "test@gmail.com",
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

  const price = cart.reduce((previousValue, { price, quantity }) => {
    return previousValue + price * quantity;
  }, 0);

  useEffect(() => {
    dispatch({ type: "SET_TOTAL_PRICE", payload: price });
  }, [dispatch, price]);

  return (
    <div>
      {cart.length ? (
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
      ) : (
        <div className="cart-empty">
          <h2> Cart is empty! </h2>
          <button
            className="btn btn-primary btn-large"
            onClick={() => navigate("/")}
          >
            Start Shopping!
          </button>
        </div>
      )}
    </div>
  );
}
