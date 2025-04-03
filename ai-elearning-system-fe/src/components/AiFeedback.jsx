import { Typography, Paper } from "@mui/material";

export default function AIFeedback({ feedback }) {
    return (
        <Paper
            elevation={0}
            variant="outlined"
            sx={{
                p: 2,
                bgcolor: "primary.light",
                color: "primary.contrastText",
            }}
        >
            <Typography variant="body1">{feedback}</Typography>
        </Paper>
    );
}
