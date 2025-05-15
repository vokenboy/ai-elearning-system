import React, { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Avatar,
  Grid,
  Chip,
  TextField,
  Button,
} from "@mui/material";
import axios from "axios";
import UserInfoSection from "./UserInfoSection";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(null);
  const [courses, setCourses] = useState([]);
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndCourses = async () => {
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

        
        if (Array.isArray(userResponse.data.courses) && userResponse.data.courses.length > 0) {
          const coursesData = await Promise.all(
            userResponse.data.courses.map(courseId =>
              axios.get(`http://localhost:5000/api/courses/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` },
              }).then(res => res.data)
            )
          );
          setCourses(coursesData);
        } else {
          setCourses([]);
        }
      } catch (err) {
        console.error("Error fetching user or courses data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserAndCourses();
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
          headers: {
            Authorization: `Bearer ${token}`,
          },
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
      {/* User Info */}
      <UserInfoSection
        editMode={editMode}
        formData={formData}
        handleChange={handleChange}
        user={user}
      />
      <Box ml={2}>
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

      {}
      <Grid container spacing={2} mb={4} mt={2}>
        <Grid item xs={4}>
          <Card sx={{ backgroundColor: "#f0f0f0", textAlign: "center", p: 2 }}>
            <Typography variant="subtitle2">Courses</Typography>
            <Typography variant="h6">{user.courses?.length || 0}</Typography>
          </Card>
        </Grid>
      </Grid>

      {/* Courses */}
      <Typography variant="h6" gutterBottom>
        Enrolled Courses
      </Typography>
      <Grid container spacing={2}>
        {courses.length === 0 && <Typography>No courses found.</Typography>}
            {courses.map((course) => (
              <Grid item xs={12} sm={6} md={4} key={course._id || course.id}>
                <Card sx={{ backgroundColor: "#f0f0f0", color: "#000000", height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {course.description || "No description"}
                    </Typography>

        <Chip label="Easy" color="success" size="small" sx={{ mt: 1 }} />
      </CardContent>
    </Card>
  </Grid>
))}

      </Grid>
    </Card>
  </Box>
</Box>

  );
};

export default UserProfile;
