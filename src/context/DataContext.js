import { createContext, useContext, useReducer} from "react";
import { reducerFunc } from "../reducer/reducer";

export const DataContext = createContext();

const initialState = {
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
  ]
}

export const DataProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducerFunc, initialState);

  return (
    <DataContext.Provider value={{ state, dispatch }}>
      { children }
    </DataContext.Provider>
  )
}

export const useData = () => {
  return useContext(DataContext);
}