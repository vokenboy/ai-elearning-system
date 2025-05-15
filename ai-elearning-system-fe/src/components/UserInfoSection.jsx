import React from "react";
import {
  Box,
  Avatar,
  TextField,
  Typography,
  Chip,
} from "@mui/material";

const UserInfoSection = ({ editMode, formData, handleChange, user }) => {
  return (
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
            <TextField
              label="Role"
              value={formData.role}
              fullWidth
              size="small"
              disabled
              sx={{ mb: 1 }}
            />
          </>
        ) : (
          <>
            <Typography variant="h5" fontWeight="bold">
              {user.name} <Chip label="Approved" color="success" size="small" />
            </Typography>
            <Typography variant="subtitle1">{user.email}</Typography>
            <Typography variant="subtitle2">Role: {user.role} 🇱🇹</Typography>
          </>
        )}
      </Box>
    </Box>
  );
};

export default UserInfoSection;
