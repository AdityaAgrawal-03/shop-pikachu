export const reducerFunc = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {...state, cart: [...state.cart, action.payload]};

    case "INC_QTY":
      return {...state, cart: state.cart.map(currentCartItem => currentCartItem.id === action.payload.id ? {...currentCartItem, count: currentCartItem.count + 1} : currentCartItem)};

      case "DEC_QTY":
        return {...state, cart: state.cart.map(currentCartItem => currentCartItem.id === action.payload.id ? {...currentCartItem, count: currentCartItem.count - 1} : currentCartItem)}
    
    case "ADD_TO_WISHLIST": 
      return {...state, wishlist: [...state.wishlist, action.payload]};

    case "REMOVE_FROM_CART": 
      return {...state, cart: state.cart.filter(currentCartItem => currentCartItem.id !== action.payload.id)};

    case "REMOVE_FROM_WISHLIST":
      return {...state, wishlist: state.wishlist.filter(currentWishlistItem => currentWishlistItem.id !== action.payload.id)}

    default: 
      return state;
  }
}