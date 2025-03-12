import { useState } from "react";
import { registerUser } from "../api/auth/authAPI";
import { useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    const newUser = {
      name: email.split("@")[0] || "User",
      email,
      password,
    };

    console.log("Sending data:", newUser);

    try {
      const response = await registerUser(newUser);
      setSuccess("User registered successfully");
      console.log("Registration successful", response);
      navigate("/login");
    } catch (error) {
      setError(error.message);
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit}>
        <label>Email address</label>
        <div className="input-container">
          <span className="icon">📧</span>
          <input
            type="email"
            placeholder="email@address.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <label>Password</label>
        <div className="input-container">
          <span className="icon">🔒</span>
          <input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span className="eye-icon">👁️</span>
        </div>

        <button type="submit" className="create-account">
          Create Account
        </button>
      </form>
      {error && <p className="error">{error}</p>}
      {success && <p className="success">{success}</p>}

      <p className="login-link">
        Already have an account? <a href="#">Log in here</a>
      </p>
    </div>
  );
};

export default Register;
