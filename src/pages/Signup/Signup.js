import { useState } from "react";
import { useAuth } from "../../context/AuthContext";
import "./Signup.css";

export function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signupUser } = useAuth();
  

  const signupHandler = async (e) => {
    e.preventDefault();
    try {
      const signupResponse = await signupUser(firstName, lastName, email, password);
      console.log({signupResponse});
    } catch (error) {
      console.error(error)
    }
    
  }

  return (
    <div className="signup-page">
      <div className="signup-page-content">
        <div className="signup-form-heading">
          <h1> Signup </h1>
        </div>
        <div className="signup-form">
          <form onSubmit={(e) => signupHandler(e)}>
            <label htmlFor="firstName">First Name</label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              placeholder="Enter your first name"
              value={firstName}
              onChange={(e) => setFirstName(() => e.target.value)}
            />

            <label htmlFor="lastName">Last Name</label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              placeholder="Enter your last name"
              value={lastName}
              onChange={(e) => setLastName(() => e.target.value)}
            />

            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email address"
              value={email}
              onChange={(e) => setEmail(() => e.target.value)}
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(() => e.target.value)}
            />

            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
}
