import axios from "axios";
import { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(JSON.parse(localStorage?.getItem("user")));

  const navigate = useNavigate();

  const checkUserWithCredentials = async (email, password) => {
    try {
      const {
        data: { success, user },
      } = await axios.post(
        "https://shop-pikachu-backend.aditya365.repl.co/login",
        {
          email,
          password,
        }
      );

      console.log({ success, user });

      if (success) {
        setUser(user._id);
        localStorage?.setItem("user", JSON.stringify(user));
      }

      return user;
    } catch (error) {
      console.error(error);
    }
  };

  console.log({ user });

  const signupUser = async (firstName, lastName, email, password) => {
    try {
      const {
        data: { success, user },
      } = await axios.post(
        "https://shop-pikachu-backend.aditya365.repl.co/signup",
        {
          firstName,
          lastName,
          email,
          password,
        }
      );

      console.log({ success, user })

      if (success) {
        setUser(user._id);
        localStorage?.setItem("user", JSON.stringify(user));
      }

      return user;
    } catch (error) {
      console.error(error);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage?.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
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
