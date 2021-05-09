import { createContext, useContext, useState } from "react";

export const WishlistContext = createContext();

export function WishlistProvider({ children }) {
  const [ itemsInWishlist, setItemsInWishlist ] = useState([]);

  return (
    <WishlistContext.Provider value={{ itemsInWishlist, setItemsInWishlist }}>
      { children }
    </WishlistContext.Provider>
  )
}

export function useWishlist() {
  return useContext(WishlistContext);
}