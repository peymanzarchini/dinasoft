import {
  Avatar,
  Box,
  Divider,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from "@mui/material";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import TaskIcon from "@mui/icons-material/Task";
import ThermostatIcon from "@mui/icons-material/Thermostat";

import { useState } from "react";
import { useNavigate } from "react-router";

import useName from "../../../contexts/name";
import usePath from "../../../contexts/path";
import { Item, Path } from "../../../types";

export default function Header() {
  const navigate = useNavigate();
  const { setSelectedPath } = usePath();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { name } = useName();
  const menuItems: Item[] = [
    {
      label: "Home",
      icon: <HomeIcon />,
      path: "/",
    },
    {
      label: "To-Do",
      icon: <TaskIcon />,
      path: "/to-do",
    },
    {
      label: "Weather",
      icon: <ThermostatIcon />,
      path: "/weather",
    },
    {
      label: "Profile",
      icon: <PersonIcon />,
      path: "/profile",
    },
  ];

  const handleOnClick = (path: Path) => {
    navigate(path);
    setSelectedPath(path);
    setAnchorEl(null);
  };

  return (
    <Stack
      component="header"
      direction="row"
      sx={{ px: 2, justifyContent: "space-between" }}
    >
      <Typography
        color="primary"
        sx={{
          fontFamily: "Audiowide",
          fontSize: 32,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        DinaSoft
      </Typography>
      <Box>
        <IconButton onClick={(event) => setAnchorEl(event.currentTarget)}>
          <Avatar>{name && name[0]}</Avatar>
        </IconButton>
        <Menu anchorEl={anchorEl} open={open} onClose={() => setAnchorEl(null)}>
          <Box component="li" sx={{ p: "6px 16px" }}>
            {name}
          </Box>
          <Divider />
          {menuItems.map((menuItem) => (
            <MenuItem
              key={menuItem.label}
              onClick={() => handleOnClick(menuItem.path)}
            >
              <ListItemIcon>{menuItem.icon}</ListItemIcon>
              <ListItemText primary={menuItem.label} />
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Stack>
  );
}
