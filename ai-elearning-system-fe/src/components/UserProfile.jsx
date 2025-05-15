import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  Chip,
  TextField,
  Button,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import UserInfoSection from "./UserInfoSection";

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [solutions, setSolutions] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("jwt");
        if (!token) {
          console.error("Token is missing.");
          setLoading(false);
          return;
        }

        const userResponse = await axios.get("http://localhost:5000/api/users/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setUser(userResponse.data);
        setFormData(userResponse.data);

        if (Array.isArray(userResponse.data.courses)) {
          const coursesData = await Promise.all(
            userResponse.data.courses.map((courseId) =>
              axios
                .get(`http://localhost:5000/api/courses/${courseId}`, {
                  headers: { Authorization: `Bearer ${token}` },
                })
                .then((res) => res.data)
            )
          );
          setCourses(coursesData);
        }

        const solutionsResponse = await axios.get("http://localhost:5000/api/users/solutions", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setSolutions(solutionsResponse.data);
      } catch (err) {
        console.error("Error fetching data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("jwt");
      if (!token) {
        console.error("Token is missing.");
        return;
      }

      const response = await axios.put(
        "http://localhost:5000/api/users/me",
        {
          name: formData.name,
          email: formData.email,
          role: formData.role,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setUser(response.data);
      setEditMode(false);
    } catch (error) {
      console.error("Error updating user", error);
    }
  };

  if (loading) return <Typography>Loading...</Typography>;
  if (!user) return <Typography>Error loading user data</Typography>;

  return (
    <Box sx={{ backgroundColor: "#f5f5f5", minHeight: "100vh", py: 5 }}>
      <Box display="flex" justifyContent="center">
        <Card sx={{ backgroundColor: "#fff", width: "90%", borderRadius: 3, p: 3, boxShadow: 3 }}>
          <UserInfoSection
            editMode={editMode}
            formData={formData}
            handleChange={handleChange}
            user={user}
          />
          <Box ml={2} mb={2}>
            {editMode ? (
              <>
                <Button onClick={handleSave} variant="contained" size="small" sx={{ mr: 1 }}>
                  Save
                </Button>
                <Button onClick={() => setEditMode(false)} variant="outlined" size="small">
                  Cancel
                </Button>
              </>
            ) : (
              <Button onClick={() => setEditMode(true)} variant="outlined" size="small">
                Edit
              </Button>
            )}
          </Box>

          {/* Stats */}
          <Grid container spacing={2} mb={4}>
            <Grid item xs={4}>
              <Card sx={{ backgroundColor: "#f0f0f0", textAlign: "center", p: 2 }}>
                <Typography variant="subtitle2">Courses</Typography>
                <Typography variant="h6">{user.courses?.length || 0}</Typography>
              </Card>
            </Grid>
          </Grid>

          {/* Enrolled Courses */}
          <Typography variant="h6" gutterBottom>
            Enrolled Courses
          </Typography>
          <Grid container spacing={2} mb={4}>
            {courses.length === 0 ? (
              <Typography>No courses found.</Typography>
            ) : (
              courses.map((course) => (
                <Grid item xs={12} sm={6} md={4} key={course._id}>
                  <Card sx={{ backgroundColor: "#f0f0f0", height: "100%" }}>
                    <CardContent>
                      <Typography variant="h6">{course.title}</Typography>
                      <Typography variant="body2" gutterBottom>
                        {course.description || "No description"}
                      </Typography>
                      <Chip label="Easy" color="success" size="small" sx={{ mt: 1 }} />
                    </CardContent>
                  </Card>
                </Grid>
              ))
            )}
          </Grid>

          {/* Submitted Solutions */}
          <Typography variant="h6" gutterBottom>
            Submitted Solutions
          </Typography>
          {solutions.length === 0 ? (
            <Typography>No solutions submitted yet.</Typography>
          ) : (
            <Box>
              {solutions.map((solution) => (
                <Accordion key={solution._id} sx={{ mb: 1 }}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Box
                      display="flex"
                      justifyContent="space-between"
                      alignItems="center"
                      width="100%"
                    >
                      <Typography variant="subtitle2" fontWeight="bold">
                        {solution.task.slice(0, 50)}...
                      </Typography>
                      <Chip
                        label={`Score: ${solution.evaluation}%`}
                        color={solution.evaluation >= 80 ? "success" : "warning"}
                        size="small"
                      />
                    </Box>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Task:</strong> {solution.task}
                    </Typography>
                    <Typography variant="body2" sx={{ mb: 1 }}>
                      <strong>Feedback:</strong> {solution.feedback}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Submitted: {new Date(solution.createdAt).toLocaleString()}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
              ))}
            </Box>
          )}
        </Card>
      </Box>
    </Box>
  );
};

export default UserProfile;
