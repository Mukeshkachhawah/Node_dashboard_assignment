import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Typography,
  Avatar,
} from "@mui/material";
import {
  ArrowDropDown,
  Notifications,
  Add,
  Search,
  HelpOutline,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const NavBar = () => {
  const [anchorEl, setAnchorEl] = useState(null); // State for dropdown menu
  const [menuName, setMenuName] = useState("");
  const [anchorProfile, setAnchorProfile] = useState(null); // For profile menu

  const navigate = useNavigate(); // Initialize useNavigate hook

  const handleMenuClick = (event, menu) => {
    setAnchorEl(event.currentTarget);
    setMenuName(menu);
  };

  const handleProfileMenuClick = (event) => {
    setAnchorProfile(event.currentTarget); // Open profile menu
  };

  const handleProfileMenuClose = () => {
    setAnchorProfile(null); // Close profile menu
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuName("");
  };

  const handleUpdateProfileClick = () => {
    // Navigate to the Update Profile page when clicked
    navigate("/update-profile");
    handleProfileMenuClose();
  };
  const handleNavigateToTaskboard = () => {
    navigate("/taskboard"); // Navigate to the taskboard page
  };

  return (
    <>
      {/* Top Navigation Bar */}
      <AppBar position="fixed" sx={{ backgroundColor: "#1c1c1c" }}>
        <Toolbar>
          {/* Left Section */}
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography
              variant="h5"
              sx={{ color: "#fff", fontWeight: "bold", cursor: "pointer" }}
              onClick={handleNavigateToTaskboard}
            >
              Trello
            </Typography>
          </Box>

          {/* Middle Section: Dropdown Menus */}
          <Box sx={{ display: "flex", gap: 2, marginLeft: 1 }}>
            {["Workspaces", "Recent", "Starred", "Templates"].map((menu) => (
              <Box key={menu}>
                <Button
                  endIcon={<ArrowDropDown />}
                  onClick={(e) => handleMenuClick(e, menu)}
                  sx={{
                    color: "darkgray",
                    "&:hover": { backgroundColor: "transparent" },
                  }}
                >
                  {menu}
                </Button>
                {/* Dropdown Menu */}
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl) && menuName === menu}
                  onClose={handleClose}
                >
                  <MenuItem onClick={handleClose}>Option 1</MenuItem>
                  <MenuItem onClick={handleClose}>Option 2</MenuItem>
                </Menu>
              </Box>
            ))}
          </Box>

          {/* Create Button */}
          <Button
            startIcon={<Add />}
            variant="contained"
            color="secondary"
            sx={{
              backgroundColor: "#007FFF",
              "&:hover": { backgroundColor: "#007FFF" },
            }}
          >
            Create
          </Button>

          {/* Center Section: Search Box */}
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#555",
                borderRadius: "4px",
                padding: "0 8px",
                color: "#fff",
              }}
            >
              <Search />
              <input
                placeholder="Search"
                style={{
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  color: "#fff",
                  padding: "5px",
                  fontSize: "16px",
                  width: "200px",
                }}
              />
            </Box>
          </Box>

          {/* Right Section: Icons and Profile */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <IconButton
              color="inherit"
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
            >
              <Notifications />
            </IconButton>
            <IconButton
              color="inherit"
              sx={{ "&:hover": { backgroundColor: "transparent" } }}
            >
              <HelpOutline />
            </IconButton>
          </Box>

          {/* Profile Avatar */}
          <Avatar
            sx={{
              bgcolor: "#579DFF",
              marginX: 1,
              width: 36,
              height: 36,
              fontSize: "0.9rem",
              cursor: "pointer",
            }}
            onClick={handleProfileMenuClick} // Open profile menu when clicked
          >
            MK
          </Avatar>

          {/* Profile Menu */}
          <Menu
            anchorEl={anchorProfile}
            open={Boolean(anchorProfile)}
            onClose={handleProfileMenuClose}
          >
            <MenuItem onClick={handleUpdateProfileClick}>
              Update Profile
            </MenuItem>
            <MenuItem onClick={handleProfileMenuClose}>Logout</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
