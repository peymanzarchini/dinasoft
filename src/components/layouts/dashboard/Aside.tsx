import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";

// Icons
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import TaskIcon from "@mui/icons-material/Task";
import ThermostatIcon from "@mui/icons-material/Thermostat";

import { NavLink } from "react-router";

import usePath from "../../../contexts/path";
import { Item } from "../../../types";

export default function Aside() {
  const { selectedPath, setSelectedPath } = usePath();
  const listItems: Item[] = [
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

  return (
    <Paper
      component="aside"
      variant="outlined"
      sx={{ width: { xs: "100%", sm: "100%", md: "20%" } }}
    >
      <Box component="nav">
        <List
          sx={{
            display: { xs: "flex", sm: "flex", md: "block" },
            px: { xs: 0.5, sm: 0.5, md: 0 },
          }}
        >
          {listItems.map((listItem) => (
            <ListItem
              key={listItem.label}
              sx={{
                px: { xs: 0.5, sm: 0.5, md: 2 },
                py: { xs: 0, sm: 0, md: 1 },
              }}
            >
              <ListItemButton
                component={NavLink}
                to={listItem.path}
                selected={selectedPath === listItem.path}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  borderRadius: 1,
                }}
                onClick={() => setSelectedPath(listItem.path)}
              >
                <ListItemIcon sx={{ minWidth: { xs: "auto", sm: "40px" } }}>
                  {listItem.icon}
                </ListItemIcon>
                <ListItemText
                  primary={listItem.label}
                  sx={{ display: { xs: "none", sm: "block" } }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  );
}
