// src/pages/Register.jsx
import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { registerUser } from "../api/auth/authAPI";
import { FcGoogle } from "react-icons/fc";

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            // Derive a username from email
            const name = email.split("@")[0] || "User";
            await registerUser({ name, email, password });
            navigate("/login");
        } catch (err) {
            setError(err.message || "Registration failed");
            console.error("Registration error:", err);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold mb-6">
                        Register
                    </h2>

                    {error && (
                        <div className="alert alert-error mb-4">
                            <span>{error}</span>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">
                                    Email address
                                </span>
                            </label>
                            <input
                                type="email"
                                placeholder="email@address.com"
                                className="input input-bordered w-full"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>

                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                className="input input-bordered w-full"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className="btn btn-primary w-full"
                        >
                            Create Account
                        </button>
                    </form>

                    <div className="divider">Or</div>

                    <button className="btn btn-outline w-full gap-2">
                        <FcGoogle className="text-xl" />
                        Register with Google
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-sm">
                            Already have an account?{" "}
                            <RouterLink
                                to="/login"
                                className="text-primary hover:underline"
                            >
                                Login here
                            </RouterLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
