import React from "react";
import "./register.css";

const Register = () => {
  return (
    <div className="register-container">
      <h2>Create Your Account</h2>
      <button className="google-button">
        <span className="google-icon">G</span> Continue with Google
      </button>
      <div className="divider">Or</div>
      
      <label>Email address</label>
      <div className="input-container">
        <span className="icon">📧</span>
        <input type="email" placeholder="email@address.com" />
      </div>

      <label>Password</label>
      <div className="input-container">
        <span className="icon">🔒</span>
        <input type="password" placeholder="Enter your password" />
        <span className="eye-icon">👁️</span>
      </div>

      <button className="create-account">Create Account</button>

      <p className="login-link">
        Already have an account? <a href="#">Log in here</a>
      </p>
    </div>
  );
};

export default Register;
