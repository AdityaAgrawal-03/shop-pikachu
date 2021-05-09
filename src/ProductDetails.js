import { useState } from 'react';
import { useCart } from './context/cart-context';
import { useWishlist } from './context/wishlist-context';

export function ProductDetails({item, setRoute}) {
  const [cartBtnText, setCartBtnText] = useState("addToCart");
  const [wishlistBtnText, setWishlistBtnText] = useState("addToWishlist");

  const { itemsInCart, setItemsInCart } = useCart();
  const { itemsInWishlist, setItemsInWishlist } = useWishlist();

  function addToCartHandler(item) {
    const isInCart = itemsInCart.find((cartItem) => cartItem.id === item.id )
     if (isInCart) {
       return setItemsInCart((previousCart) => previousCart.map((cartItem) => {
         if (cartItem.id === item.id) {
           return {...cartItem, count: cartItem.count + 1}
         } return cartItem;
       }))
      } 
      setItemsInCart((items) => [...items, {...item, count: 1}]);
     
  }

  function addToWishlistHandler(item) {
    const isInWishlist = itemsInWishlist.find((wishlistItem) => wishlistItem.id === item.id);
    if (isInWishlist) {
      return setItemsInWishlist((previousWishlist) => previousWishlist.map((wishlistItem) => {
        if (wishlistItem.id === item.id) {
          return {...wishlistItem, count: wishlistItem.count + 1}
        } return wishlistItem;
      }))
    }
    setItemsInWishlist((items) => [...items, {...item, count: 1}])
  }
  return (
    <div className="card card-shadow card-badge" id={item.id}>
          <span className="badge badge-best-value">Best Value</span>
          <div className="card-header">
            <img src="./assests/bicycle-images/bicycle-1.jpg" alt="bicycle-1" className="card-image" />
          </div>
          <div className="card-content">
            <div className="card-title">
              <h3>{item.name}</h3></div>
            <div className="card-price">{item.price}</div>
            {
              wishlistBtnText === 'addToWishlist' ? (
                <button 
                  className="btn btn-secondary btn-secondary-icon-label"
                  onClick={() => {
                      addToWishlistHandler(item)
                      setWishlistBtnText("Wishlisted");
                    }}>
                  <span className="material-icons-outlined md-light">
                    favorite_border
                  </span>
                    Add to Wishlist
                </button>
              ) : (
                <button className="btn btn-secondary" disabled="true" style={{cursor: 'default'}}>Wishlisted</button>
              )
            }
            
            {
              cartBtnText === 'addToCart' ? (
                <button 
                  className="btn btn-primary btn-primary-icon-label" 
                  onClick={() => {
                      addToCartHandler(item)
                      setCartBtnText("goToCart");
                    }}>
                  <span className="material-icons-outlined md-light">
                    add_shopping_cart
                  </span>
                    Add to Cart
                </button>
              ) : (
                <button 
                  className="btn btn-primary"  
                  onClick={() => setRoute("cart")}>Go to cart</button>
              )
            }
          </div>
    </div>
  )
}