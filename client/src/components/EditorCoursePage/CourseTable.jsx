import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    Typography,
    Box,
    Button,
    IconButton,
    Tooltip,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

const CourseTable = ({ courses, onNavigate, onEdit, onDelete }) => {
    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Title
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Description
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Difficulty
                        </Typography>
                    </TableCell>
                    {/* <TableCell>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Created At
                        </Typography>
                    </TableCell> */}
                    <TableCell align="center">
                        <Typography variant="subtitle1" fontWeight="bold">
                            Actions
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {courses.length > 0 ? (
                    courses.map((course) => (
                        <TableRow key={course._id} hover>
                            <TableCell>{course.title}</TableCell>
                            <TableCell>
                                {course.description &&
                                course.description.length > 100
                                    ? `${course.description.substring(
                                          0,
                                          100
                                      )}...`
                                    : course.description || "No description"}
                            </TableCell>
                            <TableCell>{course.difficulty}</TableCell>
                            {/* <TableCell>
                                {new Date(
                                    course.createdAt
                                ).toLocaleDateString()}
                            </TableCell> */}
                            <TableCell align="center">
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "center",
                                        gap: 1,
                                    }}
                                >
                                    <Tooltip title="View Course">
                                        <Button
                                            variant="text"
                                            size="small"
                                            onClick={() =>
                                                onNavigate(course._id)
                                            }
                                        >
                                            View
                                        </Button>
                                    </Tooltip>
                                    <Tooltip title="Edit Course">
                                        <IconButton
                                            onClick={() => onEdit(course._id)}
                                        >
                                            <EditIcon />
                                        </IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete Course">
                                        <IconButton
                                            color="error"
                                            onClick={() => onDelete(course._id)}
                                        >
                                            <DeleteIcon />
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                            </TableCell>
                        </TableRow>
                    ))
                ) : (
                    <TableRow>
                        <TableCell colSpan={5} align="center">
                            <Typography variant="body1" sx={{ py: 2 }}>
                                No courses available. Create a new course to get
                                started.
                            </Typography>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );
};

export default CourseTable;
