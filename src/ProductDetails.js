import { useData } from './context/data-context';

 
export function ProductDetails({item, setRoute}) {

  const {state : { cart, wishlist }, dispatch} = useData();
  


  const isInCart = cart.find((cartItem) => cartItem.id === item.id);
  const isInWishlist = wishlist.find((wishlistItem) => wishlistItem.id === item.id);

  // function addToCartHandler(item) {
   
  //    if (isInCart) {
  //      return setItemsInCart((previousCart) => previousCart.map((cartItem) => {
  //        if (cartItem.id === item.id) {
  //          return {...cartItem, count: cartItem.count + 1}
  //        } return cartItem;
  //      }))
  //     } 
  //     setItemsInCart((items) => [...items, {...item, count: 1}]);
     
  // }

  // function addToWishlistHandler(item) {
    
  //   if (isInWishlist) {
  //     return setItemsInWishlist((previousWishlist) => previousWishlist.map((wishlistItem) => {
  //       if (wishlistItem.id === item.id) {
  //         return {...wishlistItem, count: wishlistItem.count + 1}
  //       } return wishlistItem;
  //     }))
  //   }
  //   setItemsInWishlist((items) => [...items, {...item, count: 1}])
  // }
  
  return (
    <div className="card card-shadow card-badge">
          <span className="badge badge-best-value">Best Value</span>
          <div className="card-header">
            <img src="./assests/bicycle-images/bicycle-1.jpg" alt="bicycle-1" className="card-image" />
          </div>
          <div className="card-content">
            <div className="card-title">
              <h3>{item.name}</h3></div>
            <div className="card-price">{item.price}</div>
            {
              isInCart ? (
                <button className="btn btn-primary" onClick={() => setRoute("cart")}>Go to cart</button>
                ) : (
                  <button 
                    className="btn btn-primary btn-primary-icon-label" 
                    onClick={() => dispatch({ type: "ADD_TO_CART", payload: item })}
                    >
                    <span className="material-icons-outlined md-light">
                    add_shopping_cart
                    </span>
                    Add to Cart
                 </button>
                  
                )
            }
            {
              isInWishlist ? (
                <button 
                  className="btn btn-secondary" disabled="true" style={{
                    cursor: "default"
                  }}>
                  Wishlisted
                </button>
                
              ) : (
                <button 
                  className="btn btn-secondary btn-secondary-icon-label"
                  onClick={() => dispatch({ type: "ADD_TO_WISHLIST", payload: item})}
                  >
                  <span className="material-icons-outlined md-light">
                    favorite_border
                  </span>
                    Add to Wishlist
                </button>
              )
            }
          </div>
    </div>
  )
}