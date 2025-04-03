import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    AppBar,
    Toolbar,
    InputBase,
    Box,
    IconButton,
    Avatar,
    Paper,
    Popover,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import icon from "./icon.png";
import ProfileMenu from "./ProfileMenu";

const Header = () => {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleAvatarClick = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);

    return (
        <>
            <AppBar position="fixed" color="primary" sx={{ boxShadow: 1 }}>
                <Toolbar sx={{ justifyContent: "space-between", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <img
                            src={icon}
                            alt="Logo"
                            style={{ height: "36px", cursor: "pointer" }}
                            onClick={() => navigate("/")}
                        />
                    </Box>

                    <Paper
                        component="form"
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            px: 1.5,
                            py: 0.5,
                            borderRadius: 2,
                            bgcolor: "#f5f5f5",
                            flexGrow: 1,
                            maxWidth: 400,
                        }}
                        elevation={0}
                    >
                        <SearchIcon sx={{ color: "text.secondary", mr: 1 }} />
                        <InputBase
                            placeholder="Search"
                            fullWidth
                            sx={{ fontSize: "0.9rem" }}
                        />
                    </Paper>

                    <IconButton onClick={handleAvatarClick}>
                        <Avatar
                            variant="square"
                            sx={{
                                bgcolor: "#d81b60",
                                borderRadius: "10px",
                            }}
                        >
                            V
                        </Avatar>
                    </IconButton>
                </Toolbar>
            </AppBar>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                PaperProps={{
                    sx: { mt: 1 },
                }}
            >
                <ProfileMenu />
            </Popover>
        </>
    );
};

export default Header;
