import { createContext, useContext, useReducer} from "react";
import { reducerFunc } from "../reducer/reducer";

export const products = [
  {
    id: 1,
    name: "denim jacket",
    price: "Rs. 5000",
    count: 1
  },
  {
    id: 2,
    name: "sunglasses",
    price: "Rs. 2000",
    count: 1
  },
  {
    id: 3,
    name: "black jacket",
    price: "Rs. 4000",
    count: 1
  },
  {
    id: 4,
    name: "air buds",
    price: "Rs. 7000",
    count: 1
  }
];

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunc, {cart: [], wishlist: []});

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      { children }
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext);
}