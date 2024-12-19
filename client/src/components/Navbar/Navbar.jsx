import React from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import {
  ArrowDropDown,
  Notifications,
  Add,
  Search,
  HelpOutline,
} from "@mui/icons-material";

const NavBar = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [menuName, setMenuName] = React.useState("");

  const handleMenuClick = (event, menu) => {
    setAnchorEl(event.currentTarget);
    setMenuName(menu);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setMenuName("");
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#333" }}>
      <Toolbar>
        {/* Logo Section */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            marginRight: 4,
          }}
        >
          <Typography variant="h4" sx={{ color: "#fff", fontWeight: "bold" }}>
            Trello
          </Typography>
        </Box>

        {/* Left Section: Dropdown Buttons */}
        <Box sx={{ display: "flex", gap: 2 }}>
          {["Workspaces", "Recent", "Starred", "Templates"].map((menu) => (
            <Box key={menu}>
              <Button
                endIcon={<ArrowDropDown />}
                onClick={(e) => handleMenuClick(e, menu)}
                sx={{
                  color: "#fff",
                  "&:hover": { backgroundColor: "transparent" },
                }}
              >
                {menu}
              </Button>
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

        {/* Center Section: Search */}
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

        {/* Right Section: Icons */}
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
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
