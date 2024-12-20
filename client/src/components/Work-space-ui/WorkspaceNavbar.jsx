import { useState } from "react";
import {
  Typography,
  IconButton,
  Button,
  Avatar,
  Menu,
  MenuItem,
  Box,
  Grid,
} from "@mui/material";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
} from "@mui/material";
import {
  ChevronRight,
  Dashboard,
  Group,
  Settings,
  TableChart,
  CalendarToday,
  ViewList,
} from "@mui/icons-material";

import {
  Star as StarIcon,
  Bolt as PowerIcon,
  Build as AutomationIcon,
  FilterList as FilterIcon,
  Share as ShareIcon,
  MoreVert as MoreVertIcon,
} from "@mui/icons-material";

const WorkspaceNavbar = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = (open) => () => {
    setSidebarOpen(open);
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="absolute" sx={{ backgroundColor: "#1C2B41", top: "10%" }}>
      {/* Sidebar Drawer */}
      <Drawer anchor="left" open={sidebarOpen} onClose={toggleSidebar(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={toggleSidebar(false)}
          onKeyDown={toggleSidebar(false)}
        >
          <List>
            <ListItem>
              <Typography variant="h6" fontWeight="bold">
                Trello Workspace
              </Typography>
            </ListItem>
            <Divider />
            {/* Workspace Menu Items */}
            <ListItemButton>
              <ListItemIcon>
                <Dashboard />
              </ListItemIcon>
              <ListItemText primary="Boards" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="Members" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <Settings />
              </ListItemIcon>
              <ListItemText primary="Workspace settings" />
            </ListItemButton>

            <Divider />
            <ListItem>
              <Typography variant="subtitle1" color="textSecondary">
                PREMIUM
              </Typography>
            </ListItem>
            <ListItemButton>
              <ListItemIcon>
                <TableChart />
              </ListItemIcon>
              <ListItemText primary="Table" />
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <CalendarToday />
              </ListItemIcon>
              <ListItemText primary="Calendar" />
            </ListItemButton>
            <Divider />
            {/* User Boards */}
            <ListItem>
              <Typography variant="subtitle1" fontWeight="bold">
                Your Boards
              </Typography>
            </ListItem>
            <ListItemButton>
              <ListItemIcon>
                <ViewList />
              </ListItemIcon>
              <ListItemText primary="First Task" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>

      {/* Top Toolbar */}
      <Toolbar sx={{ width: "100%" }}>
        <Grid container alignItems="center">
          {/* Left Section */}
          <Grid item xs={2} display="flex" alignItems="center">
            <IconButton
              edge="start"
              color="inherit"
              onClick={toggleSidebar(true)}
            >
              <ChevronRight sx={{ color: "#E2B203" }} />
            </IconButton>
            <IconButton edge="start" color="inherit">
              <StarIcon sx={{ color: "#E2B203" }} />
            </IconButton>
            <Typography
              variant="body1"
              sx={{ marginLeft: 1, color: "#FFFFFF" }}
            >
              First Task
            </Typography>
          </Grid>

          {/* Center Section */}
          <Grid item xs={6} display="flex" justifyContent="center">
            <Typography
              variant="h6"
              sx={{ color: "#FFFFFF", fontWeight: "bold" }}
            >
              Workspace
            </Typography>
          </Grid>

          {/* Right Section */}
          <Grid
            item
            xs={4}
            display="flex"
            alignItems="center"
            justifyContent="flex-end"
          >
            {/* Icons */}
            <IconButton color="inherit">
              <PowerIcon sx={{ color: "#579DFF" }} />
            </IconButton>
            <IconButton color="inherit">
              <AutomationIcon sx={{ color: "#7EE2B8" }} />
            </IconButton>
            <IconButton color="inherit">
              <FilterIcon sx={{ color: "#F5CD47" }} />
            </IconButton>

            {/* Profile Avatar */}
            <Avatar sx={{ bgcolor: "#579DFF", marginX: 1 }}>MK</Avatar>

            {/* Share Button */}
            <Button
              variant="contained"
              startIcon={<ShareIcon />}
              sx={{
                backgroundColor: "#579DFF",
                color: "#1D2125",
                marginRight: 1,
                "&:hover": { backgroundColor: "#4A8FE3" },
              }}
            >
              Share
            </Button>

            {/* Three-Dot Menu */}
            <IconButton color="inherit" onClick={handleMenuClick}>
              <MoreVertIcon />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleMenuClose}>
              <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
              <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
              <MenuItem onClick={handleMenuClose}>Option 3</MenuItem>
            </Menu>
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default WorkspaceNavbar;
