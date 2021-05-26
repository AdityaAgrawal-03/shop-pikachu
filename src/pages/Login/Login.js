import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";

export function Login() {
  const { isUserLoggedIn, checkUserWithCredentials, logout } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  console.log({ isUserLoggedIn });

  // console.log({ state });

  const loginHandler = async () => {
    isUserLoggedIn
      ? logout()
      : await checkUserWithCredentials(email, password);

    navigate(state?.from ? state.from : "/", { replace: true });
  };

  return (
    <div className="login-page">
      <div className="login-page-content">
        <div className="login-form-heading">
          <h1>Login</h1>
        </div>
        <div className="login-form">
          <form>
            <input
              type="email"
              value={email}
              placeholder="Email"
              className="input-text input-text-lg input-text-form"
              onChange={(e) => setEmail(() => e.target.value)}
              required
            />
    
            <input
              type="password"
              value={password}
              placeholder="Password"
              className="input-text input-text-lg input-text-form"
              onChange={(e) => setPassword(() => e.target.value)}
              required
            />
            <button
              className="btn btn-secondary btn-login"
              onClick={loginHandler}
            >
              {isUserLoggedIn ? "Logout" : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
