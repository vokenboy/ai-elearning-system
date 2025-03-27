import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/authContext";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import icon from "./icon.png";

const Header = () => {
    const { authenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <AppBar position="fixed">
            <Toolbar>
            <img
    src={icon}
    alt="Logo"
    style={{
        height: "40px", // Adjust size as needed
        cursor: "pointer",
    }}
    onClick={() => navigate("/")} // Clicking the logo navigates home
/>
<div style={{ flexGrow: 1 }} />
                {authenticated ? (
                    <>
                    <Button color="inherit" onClick={() => navigate("/courses")}>
                        Courses
                    </Button>

                    <Button color="inherit" onClick={handleLogout}>
                        Logout
                    </Button>
                    
                    </>
                ) : (
                    <>
                        <Button color="inherit" onClick={() => navigate("/courses")}>
                        Courses
                    </Button>
                        <Button color="inherit" component={Link} to="/login">
                            Login
                        </Button>
                        <Button color="inherit" component={Link} to="/register">
                            Register
                        </Button>
                       
                    </>
                )}
            </Toolbar>
        </AppBar>
    );
};

export default Header;
