import React, { useState, useEffect } from "react";
import { Box, TextField, Button, Typography, Divider } from "@mui/material";

const ProfilePage = () => {
  // Fetch the email from localStorage or user data
  const storedEmail = localStorage.getItem("userEmail"); // Assuming userEmail is saved during login
  const [username, setUsername] = useState("mukeshkachhawah");
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState(storedEmail || "mukesh@example.com"); // Use stored email
  const [isPublic, setIsPublic] = useState(true);
  const [isActivityVisible, setIsActivityVisible] = useState(true);
  const [emailError, setEmailError] = useState(""); // To handle email validation error

  useEffect(() => {
    // You could fetch additional profile data here if needed
  }, []);

  const handleSaveProfile = async () => {
    const token = localStorage.getItem("token"); // Assuming the token is stored in localStorage

    // Check if token exists before proceeding
    if (!token) {
      console.error("Token not found.");
      return;
    }

    // Validate email before sending request
    if (email !== storedEmail) {
      setEmailError("Email cannot be changed.");
      return;
    } else {
      setEmailError(""); // Clear error if email is valid
    }

    try {
      const response = await fetch(
        "http://localhost:3000/auth/update-profile",
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: username,
            email: email, // Sending updated email
            bio: bio,
          }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        console.log("Profile updated:", data);
      } else {
        console.error("Error updating profile:", data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  return (
    <Box
      sx={{
        padding: "40px",
        maxWidth: "600px",
        margin: "0 auto",
        backgroundColor: "#fff",
        borderRadius: "8px",
        boxShadow: 3,
      }}
    >
      <Typography
        variant="h5"
        sx={{ fontWeight: "bold", marginBottom: "20px" }}
      >
        Profile and Visibility
      </Typography>

      {/* Profile Information */}
      <Box sx={{ marginBottom: "30px" }}>
        <Typography variant="h6">Profile Information</Typography>

        <TextField
          label="Username"
          fullWidth
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          sx={{
            marginBottom: "16px",
            backgroundColor: "#f9f9f9",
            borderRadius: "4px",
          }}
        />

        {/* Email Field */}
        <TextField
          label="Email"
          fullWidth
          value={email} // Bind email value to state
          onChange={(e) => setEmail(e.target.value)} // Handle email change
          sx={{
            marginBottom: "16px",
            backgroundColor: "#f9f9f9",
            borderRadius: "4px",
          }}
        />
        {emailError && (
          <Typography variant="body2" color="error">
            {emailError}
          </Typography>
        )}

        <TextField
          label="Bio"
          fullWidth
          multiline
          rows={4}
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          sx={{
            marginBottom: "16px",
            backgroundColor: "#f9f9f9",
            borderRadius: "4px",
          }}
        />
      </Box>

      <Divider sx={{ marginBottom: "30px" }} />

      {/* Save Button */}
      <Box sx={{ display: "flex", gap: 2 }}>
        <Button
          variant="outlined"
          sx={{
            flex: 1,
            borderColor: "#007FFF",
            color: "#007FFF",
            "&:hover": {
              borderColor: "#005BBB",
              backgroundColor: "#f0f8ff",
            },
          }}
          onClick={() => window.history.back()}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{
            flex: 1,
            backgroundColor: "#007FFF",
            color: "#fff",
            "&:hover": {
              backgroundColor: "#005BBB",
            },
          }}
          onClick={handleSaveProfile}
        >
          Save
        </Button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
