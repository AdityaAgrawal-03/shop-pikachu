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
  const [token, setToken] = useState(
    JSON.parse(localStorage?.getItem("token"))
  );

  const navigate = useNavigate();

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

      console.log({ success, user });

      if (success) {
        setToken(token);
        localStorage?.setItem("token", JSON.stringify({ token: token }));
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

      console.log({ success, user });

      if (success) {
        setToken(token);

        localStorage?.setItem("token", JSON.stringify({ token: token }));
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
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        token,
        checkUserWithCredentials,
        signupUser,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  return useContext(AuthContext);
};
