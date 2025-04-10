const MarkdownStyles = {
    mt: 1,
    maxHeight: "250px",
    overflow: "auto",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
    "&::-webkit-scrollbar": {
        display: "none",
    },
    fontSize: "0.9rem",
    padding: "8px",
    backgroundColor: "#fafafa",
    borderRadius: "4px",
    "& pre": {
        backgroundColor: "#f0f0f0",
        padding: "12px",
        borderRadius: "4px",
        overflowX: "auto",
        fontSize: "0.85rem",
    },
    "& code": {
        backgroundColor: "#f0f0f0",
        padding: "2px 4px",
        borderRadius: "4px",
        fontSize: "0.85rem",
    },
    "& h1, & h2, & h3, & h4, & h5, & h6": {
        margin: "12px 0 8px 0",
        fontWeight: "bold",
    },
    "& h1": { fontSize: "1.5rem" },
    "& h2": { fontSize: "1.3rem" },
    "& h3": { fontSize: "1.2rem" },
    "& h4": { fontSize: "1.1rem" },
    "& h5, & h6": { fontSize: "1rem" },
    "& ul, & ol": {
        paddingLeft: "24px",
        margin: "8px 0",
    },
    "& p": {
        margin: "8px 0",
        lineHeight: 1.5,
    },
    "& blockquote": {
        borderLeft: "4px solid #e0e0e0",
        margin: "12px 0",
        padding: "0 12px",
        color: "text.secondary",
    },
    "& table": {
        borderCollapse: "collapse",
        width: "100%",
        fontSize: "0.85rem",
        margin: "12px 0",
    },
    "& th, & td": {
        border: "1px solid #e0e0e0",
        padding: "6px 8px",
    },
    "& th": {
        backgroundColor: "#f5f5f5",
        fontWeight: "bold",
    },
    "& hr": {
        margin: "12px 0",
        border: "0",
        height: "1px",
        backgroundColor: "#e0e0e0",
    },
    "& img": {
        maxWidth: "100%",
        height: "auto",
    },
    "& a": {
        color: "primary.main",
        textDecoration: "none",
        "&:hover": {
            textDecoration: "underline",
        },
    },
};

export default MarkdownStyles;
