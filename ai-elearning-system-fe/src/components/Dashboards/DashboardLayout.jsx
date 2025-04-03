import React from "react";
import { Box } from "@mui/material";
import Sidebar from "./Sidebar";

const DashboardLayout = ({ children, topics = [], onTopicSelect }) => {
    return (
        <Box
            display="flex"
            sx={{
                pt: "64px",
            }}
        >
            <Sidebar topics={topics} onTopicSelect={onTopicSelect} />
            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    ml: { xs: 8, sm: 10, md: 32 },
                }}
            >
                {children}
            </Box>
        </Box>
    );
};

export default DashboardLayout;
