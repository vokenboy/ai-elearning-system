import React, { useState, useEffect } from "react";
import {
    Container,
    Box,
    Typography,
    TextField,
    IconButton,
    InputAdornment,
    FormControlLabel,
    Switch,
    Button,
    Divider,
    Link,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { loginUser } from "../api/auth/authAPI";
import { useAuth } from "../context/authContext";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const { setAuthenticated, setUser } = useAuth();

    useEffect(() => {
        if (localStorage.getItem("jwt")) {
            navigate("/");
        }
    }, [navigate]);

    const handleClickShowPassword = () => setShowPassword((prev) => !prev);
    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
        <Container
            maxWidth="md"
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: "120%",
            }}
        >
            <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{
                    width: "100%",
                    maxWidth: 360,
                    display: "flex",
                    flexDirection: "column",
                    gap: 2,
                    p: 3,
                    backgroundColor: "#fff",
                    borderRadius: 2,
                    border: "1px solid #ddd",
                    boxShadow: 1,
                }}
            >
                <Typography variant="h5" component="h1">
                    Login
                </Typography>

                {error && (
                    <Typography variant="body2" color="error" align="center">
                        {error}
                    </Typography>
                )}

                <TextField
                    label="Email address"
                    type="email"
                    placeholder="email@address.com"
                    variant="outlined"
                    fullWidth
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? (
                                        <VisibilityOff />
                                    ) : (
                                        <Visibility />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />

                <Box textAlign="right">
                    <Link
                        component={RouterLink}
                        to="/forgot-password"
                        variant="body2"
                        underline="hover"
                    >
                        Forgot password?
                    </Link>
                </Box>

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ mt: 1 }}
                >
                    Log in
                </Button>

                <FormControlLabel
                    control={<Switch color="primary" />}
                    label="Remember me"
                    sx={{ mt: -1 }}
                />

                <Divider sx={{ my: 2 }}>Or</Divider>

                <Button variant="outlined" size="large" fullWidth>
                    Sign in with Google
                </Button>

                <Box textAlign="center">
                    <Typography variant="body2">
                        Don&apos;t have an account?{" "}
                        <Link
                            component={RouterLink}
                            to="/register"
                            underline="hover"
                        >
                            Sign up here
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Login;
