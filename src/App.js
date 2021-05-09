import { useState } from 'react';
import './App.css';
import { Cart } from './Cart';
import { Wishlist } from './Wishlist';
import { Products } from './Products';

function App() {
  const [route, setRoute] = useState("products");

  return (
    <div className="App">
      <h1 className="app-header">Ecommerce using context</h1>
      <div className="app-body">
        <div className="button-container">
          <button className="btn btn-primary" onClick={() => setRoute("products")}>Products</button>
          <button className="btn btn-primary" onClick={() => setRoute("cart")}>Cart</button>
          <button className="btn btn-primary" onClick={() => setRoute("wishlist")}>Wishlist</button>
        </div>
        {route === 'products' && <Products setRoute={setRoute}/>}
        {route === 'cart' && <Cart />}
        {route === 'wishlist' && <Wishlist />}
      </div>
    </div>
  );
}

export default App;
