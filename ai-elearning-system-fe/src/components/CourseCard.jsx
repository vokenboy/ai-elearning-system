import {
    Card,
    CardContent,
    Typography,
    Chip,
    Box,
    Avatar,
    Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const CourseCard = ({ course }) => {
    const navigate = useNavigate();

    return (
        <Card
            sx={{
                width: "100%",
                maxWidth: 320,
                minHeight: 200,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                bgcolor: "background.paper",
                color: "text.primary",
                borderRadius: 3,
                boxShadow: 3,
                mx: "auto",
            }}
        >
            <Box display="flex" alignItems="center" gap={1} p={2}>
                <Avatar sx={{ width: 28, height: 28 }}>
                    {course.creator?.charAt(0).toUpperCase()}
                </Avatar>
                <Typography variant="subtitle2">{course.creator}</Typography>
            </Box>

            <CardContent
                sx={{ pt: 0, px: 2, pb: 2, flexGrow: 1, cursor: "pointer" }}
                onClick={() => navigate(`/courses/${course._id}/content`)}
            >
                <Typography variant="h6" gutterBottom>
                    {course.title}
                </Typography>

                <Stack direction="row" spacing={1} mb={1} flexWrap="wrap">
                    {course.tags.map((tag, idx) => (
                        <Chip key={idx} label={`#${tag}`} size="small" />
                    ))}
                </Stack>

                <Typography variant="caption" color="text.secondary">
                    {new Date(course.createdAt).toLocaleDateString()}
                </Typography>
            </CardContent>
        </Card>
    );
};

export default CourseCard;
