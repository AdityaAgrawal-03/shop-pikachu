import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Cart } from "./pages/Cart/Cart";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import { Products } from "./pages/Products/Products";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";
import { Header } from "./components/Header/Header";
import { NoMatch } from "./pages/NoMatch";
import { Login } from "./pages/Login/Login";
import { Signup } from "./pages/Signup/Signup";
import { PrivateRoute } from "./PrivateRoute";

function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/product/:productId" element={<ProductDetails />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/wishlist" element={<Wishlist />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<NoMatch />} />
      </Routes>
    </div>
  );
}

export default App;
