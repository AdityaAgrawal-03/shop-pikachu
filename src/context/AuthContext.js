import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { API_URL } from "../utils";

export const AuthContext = createContext();

export function setUpAuthHeaderForServiceCalls(token) {
  if (token) {
    return (axios.defaults.headers.common["Authorization"] = token);
  }
  return (axios.defaults.headers.common["Authorization"] = null);
}

function setUpAuthExceptionHandler(logout, navigate) {
  const UNAUTHORIZED = 401;
  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error?.response?.status === UNAUTHORIZED) {
        logout();
        navigate("/login");
      }
      return Promise.reject(error);
    }
  );
}

export function AuthProvider({ children }) {
  const getTokenFromLocalStorage = JSON.parse(localStorage?.getItem("token"));
  const getUserFromLocalStorage = JSON.parse(localStorage?.getItem("user"));
  const [token, setToken] = useState(getTokenFromLocalStorage?.token);
  const navigate = useNavigate();
  const [user, setUser] = useState(getUserFromLocalStorage?.user);

  useEffect(() => {
    setUpAuthExceptionHandler(logout, navigate);
  });

  const checkUserWithCredentials = async (email, password) => {
    try {
      const {
        data: { success, user, token },
      } = await axios.post(`${API_URL}/login`, {
        email,
        password,
      });

      if (success) {
        setToken(token);
        localStorage?.setItem("token", JSON.stringify({ token: token }));
        localStorage?.setItem(
          "user",
          JSON.stringify({ user: { name: user.firstName, email: user.email } })
        );
        setUpAuthHeaderForServiceCalls(token);
      }

      return { success, token, user };
    } catch (error) {
      console.error(error);
    }
  };

  const signupUser = async (firstName, lastName, email, password) => {
    try {
      const {
        data: { success, user, token },
      } = await axios.post(`${API_URL}/signup`, {
        firstName,
        lastName,
        email,
        password,
      });

      if (success) {
        setToken(token);

        localStorage?.setItem("token", JSON.stringify({ token: token }));
        localStorage?.setItem(
          "user",
          JSON.stringify({ user: { name: user.firstName, email: user.email } })
        );
        setUpAuthHeaderForServiceCalls(token);
      }

      return { success, token, user };
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setToken(null);
    localStorage?.removeItem("token");
    setUser(null);
    localStorage?.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        checkUserWithCredentials,
        signupUser,
        logout,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
