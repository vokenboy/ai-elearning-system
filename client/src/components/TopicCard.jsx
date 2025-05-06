import React from "react";
import {
    Typography,
    Box,
    Divider,
    Card,
    CardContent,
    CardActions,
    IconButton,
    Chip,
    Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import LanguageIcon from "@mui/icons-material/Language";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ReactMarkdown from "react-markdown";
import MarkdownStyles from "./MarkdownStyles";

const TopicCard = ({ topic, onEdit, onDelete }) => {
    return (
        <Card
            variant="outlined"
            sx={{
                height: "100%",
                minHeight: "400px",
                display: "flex",
                flexDirection: "column",
                transition: "all 0.2s",
                "&:hover": {
                    boxShadow: 2,
                },
            }}
        >
            <CardContent sx={{ flexGrow: 1, p: 3 }}>
                <Typography
                    variant="h5"
                    sx={{
                        pb: 1,
                        fontWeight: "500",
                    }}
                >
                    {topic.topic}
                </Typography>

                <Divider sx={{ mb: 2 }} />

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                    }}
                >
                    <LanguageIcon fontSize="small" sx={{ mr: 1 }} />
                    <Typography variant="subtitle2" sx={{ mr: 1 }}>
                        Language:
                    </Typography>
                    <Chip label={topic.language} size="small" />
                </Box>

                <Box sx={{ display: "flex", mb: 2 }}>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            mr: 1,
                            minWidth: "60px",
                        }}
                    >
                        <LocalOfferIcon
                            fontSize="small"
                            sx={{ mr: 1, mt: 0.5 }}
                        />
                        <Typography variant="subtitle2" sx={{ mt: 0.5 }}>
                            Tags:
                        </Typography>
                    </Box>
                    <Box
                        sx={{
                            display: "flex",
                            flexWrap: "wrap",
                        }}
                    >
                        {topic.tags.map((tag, idx) => (
                            <Chip
                                key={idx}
                                label={tag}
                                size="small"
                                sx={{ mr: 0.5, mb: 0.5 }}
                            />
                        ))}
                    </Box>
                </Box>

                <Divider sx={{ mb: 2 }} />

                <Typography
                    variant="subtitle1"
                    sx={{ fontWeight: "bold", mb: 1 }}
                >
                    Description:
                </Typography>

                <Box sx={MarkdownStyles}>
                    <ReactMarkdown>{topic.description}</ReactMarkdown>
                </Box>
            </CardContent>
            <CardActions
                sx={{
                    justifyContent: "flex-end",
                    p: 2,
                    pt: 0,
                }}
            >
                <Tooltip title="Edit">
                    <IconButton onClick={onEdit} color="primary">
                        <EditIcon />
                    </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                    <IconButton onClick={onDelete} color="error">
                        <DeleteIcon />
                    </IconButton>
                </Tooltip>
            </CardActions>
        </Card>
    );
};

export default TopicCard;
