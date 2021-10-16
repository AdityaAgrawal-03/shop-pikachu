import { Routes, Route } from "react-router-dom";
import "./App.css";
import {
  Cart,
  Wishlist,
  ProductDetails,
  Products,
  Login,
  Signup,
  NoMatch,
} from "./pages/index";
import { Header } from "./components/Header/Header";
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
