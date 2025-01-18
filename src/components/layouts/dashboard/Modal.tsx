import { Box, Button, Dialog, DialogTitle, TextField } from "@mui/material";
import { ChangeEvent, FormEvent, useState } from "react";

import useName from "../../../contexts/name";
import { capitalize } from "../../../utils";

export default function Modal() {
  const [isOpen, setIsOpen] = useState(
    localStorage.getItem("name") ? false : true
  );
  const { setName } = useName();
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setError("");

    if (event.target.value.includes(" ")) {
      setError("Name cannot contain spaces");
      return;
    }

    setInput(event.target.value);
  };

  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!input) {
      setError("Name is required");
      return;
    }

    if (error) return;

    localStorage.setItem("name", capitalize(input));
    setName(capitalize(input));
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen}>
      <DialogTitle align="center">
        Please input your name to continue
      </DialogTitle>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        onSubmit={(event) => handleOnSubmit(event)}
      >
        <TextField
          label="Name"
          fullWidth
          error={!!error}
          helperText={error}
          onChange={(event) => handleOnChange(event)}
        />
        <Button type="submit" variant="contained" size="large">
          Continue
        </Button>
      </Box>
    </Dialog>
  );
}
