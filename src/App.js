import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Cart } from "./pages/Cart/Cart";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import { Products } from "./pages/Products/Products";
import { ProductDetails } from "./pages/ProductDetails/ProductDetails";
import { Header } from "./components/Header/Header";
import { NoMatch } from "./pages/NoMatch";
import { Login } from "./pages/Login/Login";
import { PrivateRoute } from "./PrivateRoute";

function App() {
  return (
    <Routes>
      <div>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/productDetails/:productId" element={<ProductDetails />} /> 
          <PrivateRoute path="/cart" element={<Cart />} />
          <PrivateRoute path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>

      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
