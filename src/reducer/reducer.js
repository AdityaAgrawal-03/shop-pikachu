export const reducerFunc = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.payload],
        totalPrice: state.totalPrice + Number(action.payload.price),
      };

    case "INC_QTY":
      return {
        ...state,
        cart: state.cart.map((currentCartItem) =>
          currentCartItem.id === action.payload.id
            ? { ...currentCartItem, count: currentCartItem.count + 1 }
            : currentCartItem
        ),
        totalPrice: state.totalPrice + Number(action.payload.price),
      };

    case "DEC_QTY":
      return {
        ...state,
        cart: state.cart.map((currentCartItem) =>
          currentCartItem.id === action.payload.id
            ? { ...currentCartItem, count: currentCartItem.count - 1 }
            : currentCartItem
        ),
        totalPrice: state.totalPrice - Number(action.payload.price),
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (currentCartItem) => currentCartItem.id !== action.payload.id
        ),
        totalPrice: state.totalPrice - (action.payload.count * Number(action.payload.price))
      };

    case "ADD_TO_WISHLIST":
      return { ...state, wishlist: [...state.wishlist, action.payload] };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (currentWishlistItem) => currentWishlistItem.id !== action.payload.id
        ),
      };

    case "SORT":
      return { ...state, sortBy: action.payload };

    case "TOGGLE_INVENTORY":
      return { ...state, showInventoryAll: !state.showInventoryAll };

    case "TOGGLE_DELIVERY":
      return { ...state, showFastDeliveryOnly: !state.showFastDeliveryOnly };

    case "TOGGLE_BIKE":
      return { ...state, sortByType: action.payload };

    default:
      return state;
  }
};
