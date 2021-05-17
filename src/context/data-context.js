import { createContext, useContext, useReducer} from "react";
import { reducerFunc } from "../reducer/reducer";

export const DataContext = createContext();

const initialState = {
  cart: [],
  wishlist: [],
  sortBy: null,
  showFastDeliveryOnly: false,
  showInventoryAll: false,
}

export function DataProvider({ children }) {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      { children }
    </DataContext.Provider>
  )
}

export function useData() {
  return useContext(DataContext);
}