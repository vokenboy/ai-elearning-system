import { useState } from "react";
import { registerUser } from "../api/auth/authAPI";
import { useNavigate, Link as RouterLink } from "react-router-dom";

import {
    Container,
    Box,
    Typography,
    TextField,
    IconButton,
    InputAdornment,
    Button,
    Divider,
    Link,
} from "@mui/material";
import {
    Email as EmailIcon,
    Lock as LockIcon,
    Visibility,
    VisibilityOff,
} from "@mui/icons-material";

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const navigate = useNavigate();

    const handleClickShowPassword = () => {
        setShowPassword((prev) => !prev);
    };

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

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
        } catch (err) {
            setError(err.message);
            console.error("Registration error:", err);
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
                <Typography variant="h5" component="h1" sx={{ mb: 3 }}>
                    Register
                </Typography>

                {error && (
                    <Typography variant="body2" color="error" align="center">
                        {error}
                    </Typography>
                )}

                {success && (
                    <Typography
                        variant="body2"
                        color="success.main"
                        align="center"
                    >
                        {success}
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
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <EmailIcon />
                            </InputAdornment>
                        ),
                    }}
                />

                <TextField
                    label="Password"
                    variant="outlined"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    fullWidth
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockIcon />
                            </InputAdornment>
                        ),
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

                <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    fullWidth
                    sx={{ mt: 1 }}
                >
                    Create Account
                </Button>

                <Divider sx={{ my: 2 }}>Or</Divider>
                <Button variant="outlined" size="large" fullWidth>
                    Register with Google
                </Button>

                <Box textAlign="center">
                    <Typography variant="body2">
                        Already have an account?{" "}
                        <Link
                            component={RouterLink}
                            to="/login"
                            underline="hover"
                        >
                            Login here
                        </Link>
                    </Typography>
                </Box>
            </Box>
        </Container>
    );
};

export default Register;
