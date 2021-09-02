import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./Signup.css";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signupUser } = useAuth();
  const navigate = useNavigate();

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const { success } = await signupUser(
        firstName,
        lastName,
        email,
        password
      );
      if (success) {
        navigate("/");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-page-content">
        <div className="signup-form-heading">
          <h1> Signup </h1>
        </div>
        <div className="signup-form">
          <form onSubmit={(e) => signupHandler(e)}>
            <label htmlFor="firstName" className="label">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              className="input-text input-text-lg input-text-form"
              onChange={(e) => setFirstName(() => e.target.value)}
              required
            />

            <label htmlFor="lastName" className="label">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              className="input-text input-text-lg input-text-form"
              onChange={(e) => setLastName(() => e.target.value)}
              required
            />

            <label htmlFor="email" className="label">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              className="input-text input-text-lg input-text-form"
              onChange={(e) => setEmail(() => e.target.value)}
              required
            />

            <label htmlFor="password" className="label">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              className="input-text input-text-lg input-text-form"
              onChange={(e) => setPassword(() => e.target.value)}
              required
            />

            <button className="btn btn-primary btn-signup" type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}
