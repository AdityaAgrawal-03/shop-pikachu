import { useState } from 'react';
import './App.css';
import { Cart } from './pages/Cart/Cart';
import { Wishlist } from './pages/Wishlist/Wishlist';
import { Products } from './pages/Products/Products';
import { Header } from './Header';

function App() {
  const [route, setRoute] = useState("products");

  return (
    <div className="App">
      <div className="app-header">
        <Header setRoute={setRoute} />
      </div>
      <div className="app-body">
        {route === 'products' && <Products setRoute={setRoute}/>}
        {route === 'cart' && <Cart />}
        {route === 'wishlist' && <Wishlist setRoute={setRoute}/>}
      </div>
    </div>
  );
}

export default App;
