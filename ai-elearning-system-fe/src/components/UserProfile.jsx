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
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const UserProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [user, setUser] = useState(null); 
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("jwt");

        if (!token) {
          console.error("Token is missing.");
          return;
        }

        const response = await axios.get("http://localhost:5000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUser(response.data);
        setFormData(response.data);
      } catch (err) {
        console.error("Error fetching user data", err);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
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
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar src="/avatar.png" sx={{ width: 80, height: 80, mr: 2 }} />
            <Box flexGrow={1}>
              {editMode ? (
                <>
                  <TextField
                    label="Name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    sx={{ mb: 1 }}
                  />
                  <TextField
                    label="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    fullWidth
                    size="small"
                    sx={{ mb: 1 }}
                  />
                 <FormControl fullWidth size="small" sx={{ mb: 1 }}>
                <InputLabel id="role-label">Role</InputLabel>
                <Select
                  labelId="role-label"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  label="Role"
                >
                <MenuItem value="User">User</MenuItem>
                <MenuItem value="Editor">Editor</MenuItem>
               </Select>
               </FormControl>

                </>
              ) : (
                <>
                  <Typography variant="h5" fontWeight="bold">
                    {user.name} <Chip label="Patvirtintas" color="success" size="small" />
                  </Typography>
                  <Typography variant="subtitle1">{user.email}</Typography>
                  <Typography variant="subtitle2">Role: {user.role} 🇱🇹</Typography>
                </>
              )}
            </Box>
            <Box ml={2}>
              {editMode ? (
                <>
                  <Button onClick={handleSave} variant="contained" size="small" sx={{ mr: 1 }}>
                    Išsaugoti
                  </Button>
                  <Button onClick={() => setEditMode(false)} variant="outlined" size="small">
                    Atšaukti
                  </Button>
                </>
              ) : (
                <Button onClick={() => setEditMode(true)} variant="outlined" size="small">
                  Redaguoti
                </Button>
              )}
            </Box>
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

          {/* Courses */}
          <Typography variant="h6" gutterBottom>
            Enrolled Courses
          </Typography>
          <Grid container spacing={2}>
            {(user.courses || []).map((courseId, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Card sx={{ backgroundColor: "#f0f0f0", color: "#000000", height: "100%" }}>
                  <CardContent>
                    <Typography variant="h6" gutterBottom>
                      Course ID: {courseId}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      Course description placeholder.
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
