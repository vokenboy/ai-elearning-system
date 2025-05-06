import React, { useState, useEffect } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth/authAPI";
import { useAuth } from "../context/authContext";
import { FcGoogle } from "react-icons/fc";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { setAuthenticated, setUser } = useAuth();

    useEffect(() => {
        if (localStorage.getItem("jwt")) {
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await loginUser({ email, password });
            setAuthenticated(true);
            if (response.user) {
                setUser(response.user);
            }
            navigate("/");
        } catch (err) {
            setError(err.message);
            console.error("Login failed:", err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
            <div className="card w-full max-w-md bg-base-100 shadow-xl">
                <div className="card-body">
                    <h2 className="card-title text-2xl font-bold mb-6">
                        Login
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
                            Login
                        </button>
                    </form>

                    <div className="divider">Or</div>

                    <button className="btn btn-outline w-full gap-2">
                        <FcGoogle className="text-xl" />
                        Login with Google
                    </button>

                    <div className="text-center mt-4">
                        <p className="text-sm">
                            Don't have an account?{" "}
                            <RouterLink
                                to="/register"
                                className="text-primary hover:underline"
                            >
                                Register here
                            </RouterLink>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
