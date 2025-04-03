import {
    Avatar,
    Box,
    Divider,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";

const ProfileDropDown = () => {
    const { logout, user } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <Paper
            elevation={6}
            sx={{
                width: 300,
                borderRadius: 3,
                bgcolor: "background.paper",
                color: "text.primary",
                overflow: "hidden",
            }}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    px: 2,
                    py: 2,
                    bgcolor: "background.paper",
                }}
            >
                <Avatar
                    variant="square"
                    sx={{
                        bgcolor: "#d81b60",
                        width: 60,
                        height: 60,
                        borderRadius: "10px",
                        fontSize: "1.5rem",
                    }}
                >
                    {user?.name?.charAt(0)?.toUpperCase() || "U"}
                </Avatar>
                <Typography fontWeight={600} mt={1}>
                    {user?.name || "User"}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    @{user?.username || "guest"} • Joined April 2025
                </Typography>
            </Box>

            <List dense>
                <ListItemButton>
                    <ListItemIcon>
                        <PersonIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                </ListItemButton>

                <ListItemButton>
                    <ListItemIcon>
                        <GroupAddIcon />
                    </ListItemIcon>
                    <ListItemText primary="Invite friends" />
                </ListItemButton>

                <Divider sx={{ my: 1 }} />

                <ListItemButton onClick={handleLogout}>
                    <ListItemIcon>
                        <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                </ListItemButton>
            </List>
        </Paper>
    );
};

export default ProfileDropDown;
