import { Paper } from "@mui/material";
import { Outlet } from "react-router";

export default function Section() {
  return (
    <Paper
      component="section"
      variant="outlined"
      sx={{ height: "100%", width: "100%" }}
    >
      <Outlet />
    </Paper>
  );
}
