import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  useColorScheme,
} from "@mui/material";
import { useState } from "react";

import useName from "../../../contexts/name";
import { capitalize } from "../../../utils";

export default function ProfileLayout() {
  const { name, setName } = useName();
  const [inputName, setInputName] = useState(name);
  const [error, setError] = useState("");
  const { mode, setMode } = useColorScheme();
  const muiMode = localStorage.getItem("mui-mode");

  return (
    <Stack
      spacing={8}
      sx={{
        p: 4,
        alignItems: "flex-start",
      }}
    >
      <Stack spacing={2} sx={{ maxWidth: "512px", width: "100%" }}>
        <label htmlFor="name">Name</label>
        <TextField
          id="name"
          label="Name"
          variant="filled"
          value={inputName}
          error={!!error}
          helperText={error}
          onChange={(event) => {
            setError("");
            if (event.target.value.includes(" ")) {
              setError("Name cannot contain spaces");
              return;
            }
            setInputName(event.target.value);
          }}
        />
        <Button
          variant="contained"
          onClick={() => {
            if (!inputName) {
              setError("Name is required");
              return;
            }

            if (error) return;

            localStorage.setItem("name", capitalize(inputName));
            setName(capitalize(inputName));
          }}
        >
          Update
        </Button>
      </Stack>
      <hr style={{ maxWidth: "512px", width: "100%" }} />
      <FormControl sx={{ maxWidth: "512px", width: "100%" }}>
        <InputLabel id="theme">Theme</InputLabel>
        <Select
          labelId="theme"
          id="theme"
          value={muiMode || mode}
          label="Theme"
          onChange={(event) => {
            setMode(event.target.value as "system" | "light" | "dark");
          }}
        >
          <MenuItem value={"system"}>System</MenuItem>
          <MenuItem value={"light"}>Light</MenuItem>
          <MenuItem value={"dark"}>Dark</MenuItem>
        </Select>
      </FormControl>
    </Stack>
  );
}
