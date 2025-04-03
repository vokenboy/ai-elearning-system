import React from "react";
import { Box } from "@mui/material";
import ReactMarkdown from "react-markdown";

const MarkdownRenderer = ({ content }) => {
    return (
        <ReactMarkdown
            components={{
                code({ inline, className, children, ...props }) {
                    return !inline ? (
                        <Box
                            component="pre"
                            sx={{
                                backgroundColor: "#1e1e1e",
                                color: "#f8f8f2",
                                borderRadius: 1,
                                padding: 2,
                                overflowX: "auto",
                                fontSize: "0.9rem",
                                my: 2,
                            }}
                        >
                            <code className={className} {...props}>
                                {children}
                            </code>
                        </Box>
                    ) : (
                        <code
                            style={{
                                backgroundColor: "#f4f4f4",
                                padding: "0.2rem 0.4rem",
                                borderRadius: "4px",
                                fontSize: "0.85rem",
                            }}
                            {...props}
                        >
                            {children}
                        </code>
                    );
                },
            }}
        >
            {content}
        </ReactMarkdown>
    );
};

export default MarkdownRenderer;
