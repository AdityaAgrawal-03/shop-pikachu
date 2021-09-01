export const reducerFunc = (state, action) => {
  switch (action.type) {
    case "INITIALIZE_PRODUCTS":
      return {
        ...state,
        inventory: action.payload,
      };

    case "INITIALIZE_CART":
      return {
        ...state,
        cart: action.payload,
      };

    case "INITIALIZE_WISHLIST":
      return {
        ...state,
        wishlist: action.payload,
      };

    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, { ...action.payload, quantity: 1 }],
        totalPrice: state.totalPrice + action.payload.price,
      };

    case "INC_QTY":
      return {
        ...state,
        cart: state.cart.map((currentCartItem) =>
          currentCartItem._id === action.payload._id
            ? { ...currentCartItem, quantity: currentCartItem.quantity + 1 }
            : currentCartItem
        ),
        totalPrice: state.totalPrice + action.payload.price
      };

    case "DEC_QTY":
      return {
        ...state,
        cart: state.cart.map((currentCartItem) =>
          currentCartItem._id === action.payload._id
            ? { ...currentCartItem, quantity: currentCartItem.quantity - 1 }
            : currentCartItem
        ),
        totalPrice: state.totalPrice - action.payload.price,
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter(
          (currentCartItem) => currentCartItem._id !== action.payload._id
        ),
        totalPrice:
          state.totalPrice -
          action.payload.quantity * action.payload.price,
      };

    case "ADD_TO_WISHLIST":
      return { ...state, wishlist: [...state.wishlist, action.payload] };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (currentWishlistItem) =>
            currentWishlistItem._id !== action.payload._id
        ),
      };

    case "SORT":
      return { ...state, sortBy: action.payload };

    case "TOGGLE_INVENTORY":
      return { ...state, showInventoryAll: !state.showInventoryAll };

    case "TOGGLE_DELIVERY":
      return { ...state, showFastDeliveryOnly: !state.showFastDeliveryOnly };

    case "TOGGLE_MOUNTAIN_BIKE":
      return {
        ...state,
        showTypeOfBike: state.showTypeOfBike.map(
          ({ mountainBike }) => !mountainBike
        ),
      };

    case "TOGGLE_ROAD_BIKE":
      return {
        ...state,
        showTypeOfBike: state.showTypeOfBike.map(({ roadBike }) => !roadBike),
      };

    case "TOGGLE_HYBRID_BIKE":
      return {
        ...state,
        showTypeOfBike: state.showTypeOfBike.map(
          ({ hybridBike }) => !hybridBike
        ),
      };

    case "TOGGLE_KIDS_BIKE":
      return {
        ...state,
        showTypeOfBike: state.showTypeOfBike.map(({ kidsBike }) => !kidsBike),
      };

    case "RESET":
      return {
        ...state,
        cart: [],
        wishlist: [],
        sortBy: null,
        showFastDeliveryOnly: false,
        showInventoryAll: false,
        totalPrice: 0,
      };

    default:
      return state;
  }
};
