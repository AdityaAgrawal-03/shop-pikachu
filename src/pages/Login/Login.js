import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Login.css";
import "../../App.css"

export function Login() {
  const { checkUserWithCredentials, token } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate();

  const loginHandler = async (e) => {
    e.preventDefault();
    try {
      const { success } = await checkUserWithCredentials(email, password);

      if (success) {
        navigate(state?.from ? state.from : "/", { replace: true });
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="login-page">
      <div className="login-page-content">
        <div className="login-form-heading">
          <h1>Login</h1>
        </div>
        <div className="login-form">
          <form onSubmit={(e) => loginHandler(e)}>
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
            <button className="btn btn-secondary btn-login" type="submit">
              {token ? "Logout" : "Login"}
            </button>
          </form>
          <div>
            Not a member yet?
            <Link to="/signup" className="link-signup">
              Signup
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
