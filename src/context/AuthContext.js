import { createContext, useContext,  useState } from "react";
import { useNavigate } from "react-router";
import { fakeAuthApi } from "../fakeAuthApi";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUserLoggedIn, setLogin] = useState(
    JSON.parse(localStorage?.getItem("login"))
  );
  const navigate = useNavigate();

  const checkUserWithCredentials = async (username, password) => {
    try {
      const response = await fakeAuthApi(username, password);

      if (response.success) {
        setLogin(true);
        console.log("from auth context");
        localStorage?.setItem("login", true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setLogin(false);
    localStorage?.removeItem("login");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{ isUserLoggedIn, checkUserWithCredentials, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
