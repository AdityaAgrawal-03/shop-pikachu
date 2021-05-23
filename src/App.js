import { Routes, Route } from "react-router-dom";
import "./App.css";
import { Cart } from "./pages/Cart/Cart";
import { Wishlist } from "./pages/Wishlist/Wishlist";
import { Products } from "./pages/Products/Products";
import { Header } from "./components/Header/Header";
import { NoMatch } from "./pages/NoMatch";

function App() {
  return (
    <div className="App">
      <div className="app-header">
        <Header />
      </div>
      <div className="app-body">
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/wishlist" element={<Wishlist />} />
          <Route path="*" element={<NoMatch />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
