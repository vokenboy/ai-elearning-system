import React, { useState } from "react";
import {
    Box,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Collapse,
    Typography,
    Divider,
    Avatar,
    IconButton,
    Tooltip,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import FeedIcon from "@mui/icons-material/DynamicFeed";
import PeopleIcon from "@mui/icons-material/People";
import HistoryIcon from "@mui/icons-material/History";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";
import DescriptionIcon from "@mui/icons-material/Description";

const Sidebar = ({ topics = [], onTopicSelect }) => {
    const [collapsed, setCollapsed] = useState(false);
    const [openSections, setOpenSections] = useState({
        learning: true,
        progress: true,
        community: true,
        bookmarks: true,
        topics: true,
    });

    const toggleSection = (key) => {
        setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
    };

    const navigate = useNavigate();

    return (
        <Box
            sx={{
                width: collapsed ? 80 : 260,
                height: "100vh",
                bgcolor: "background.paper",
                borderRight: "1px solid #e0e0e0",
                position: "fixed",
                top: "64px",
                left: 0,
                overflowY: "auto",
                transition: "width 0.2s ease-in-out",
                zIndex: 1100,
            }}
        >
            <Box
                p={2}
                sx={{
                    display: "flex",
                    justifyContent: collapsed ? "center" : "space-between",
                    alignItems: "center",
                }}
            >
                {!collapsed && (
                    <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        sx={{ fontWeight: "bold" }}
                    >
                        Menu
                    </Typography>
                )}
                <Tooltip title={collapsed ? "Expand" : "Collapse"}>
                    <IconButton onClick={() => setCollapsed(!collapsed)}>
                        {collapsed ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                    </IconButton>
                </Tooltip>
            </Box>

            {topics.length > 0 && (
                <SidebarSection
                    title="Course Topics"
                    open={openSections.topics}
                    onToggle={() => toggleSection("topics")}
                    items={topics.map((topic) => ({
                        label: topic.title,
                        icon: <DescriptionIcon />,
                        onClick: () => onTopicSelect(topic.id),
                    }))}
                    collapsed={collapsed}
                />
            )}

            <SidebarSection
                title="Learning"
                open={openSections.learning}
                onToggle={() => toggleSection("learning")}
                collapsed={collapsed}
                items={[
                    {
                        label: "Courses",
                        icon: <FeedIcon />,
                        onClick: () => navigate("/courses"),
                    },
                ]}
            />

            <SidebarSection
                title="Progress"
                open={openSections.progress}
                onToggle={() => toggleSection("progress")}
                collapsed={collapsed}
                items={[
                    {
                        label: "Learning Progress",
                        icon: <HistoryIcon />,
                        // onClick: () => navigate("/progress"),
                    },
                    {
                        label: "Achievements",
                        icon: <EmojiEventsIcon />,
                        // onClick: () => navigate("/achievements"),
                    },
                    {
                        label: "Leaderboard",
                        icon: <PeopleIcon />,
                        // onClick: () => navigate("/leaderboard"),
                    },
                ]}
            />
        </Box>
    );
};

const SidebarSection = ({ title, open, onToggle, items, collapsed }) => (
    <>
        <Divider sx={{ my: 2 }} />
        {!collapsed && (
            <Typography
                variant="subtitle2"
                color="text.secondary"
                sx={{
                    px: 2,
                    cursor: "pointer",
                    display: "flex",
                    alignItems: "center",
                }}
                onClick={onToggle}
            >
                {title}
                <Box sx={{ ml: "auto" }}>
                    {open ? <ExpandLess /> : <ExpandMore />}
                </Box>
            </Typography>
        )}

        <Collapse in={open || collapsed} timeout="auto" unmountOnExit>
            <List disablePadding>
                {items.map((item, index) => (
                    <ListItemButton
                        key={index}
                        onClick={item.onClick}
                        sx={{
                            pl: collapsed ? 2 : 4,
                            justifyContent: collapsed ? "center" : "flex-start",
                        }}
                    >
                        <ListItemIcon
                            sx={{ minWidth: collapsed ? "auto" : undefined }}
                        >
                            {item.icon}
                        </ListItemIcon>
                        {!collapsed && <ListItemText primary={item.label} />}
                    </ListItemButton>
                ))}
            </List>
        </Collapse>
    </>
);

export default Sidebar;
