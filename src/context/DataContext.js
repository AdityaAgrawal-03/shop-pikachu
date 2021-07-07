import axios from "axios";
import { createContext, useContext, useEffect, useReducer } from "react";
import { reducerFunc } from "../reducer/reducer";
import { useAuth } from "./AuthContext";

export const DataContext = createContext();

const initialState = {
  inventory: [],
  cart: [],
  wishlist: [],
  sortBy: null,
  showFastDeliveryOnly: false,
  showInventoryAll: false,
  totalPrice: 0,
  showTypeOfBike: [
    { mountainBike: false },
    { hybridBike: false },
    { roadBike: false },
    { kidsBike: false },
  ],
};

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunc, initialState);
  const { user, isUserLoggedIn } = useAuth();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const {
          data: { products },
        } = await axios.get(
          "https://shop-pikachu-backend.aditya365.repl.co/products"
        );

        dispatch({
          type: "INITIALIZE_PRODUCTS",
          payload: products,
        });
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const {
          data: { cart },
        } = await axios.get(
          `https://shop-pikachu-backend.aditya365.repl.co/cart/${user._id}`
        );

        dispatch({ type: "INITIALIZE_CART", payload: cart });

        const {
          data: { wishlist },
        } = await axios.get(
          `https://shop-pikachu-backend.aditya365.repl.co/wishlist/${user._id}`
        );

        dispatch({ type: "INITIALIZE_WISHLIST", payload: wishlist });
      } catch (error) {
        console.error(error);
      }
    };

    isUserLoggedIn && fetchUserData();
  }, [isUserLoggedIn, user]);

 

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      {children}
    </DataContext.Provider>
  );
}

export const useData = () => {
  return useContext(DataContext);
};
