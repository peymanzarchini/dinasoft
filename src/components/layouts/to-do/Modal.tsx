import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from "@mui/material";
import { useEffect } from "react";

import { useForm, SubmitHandler, Controller } from "react-hook-form";

type row = {
  id: string;
  title: string;
  status: "To-Do" | "Done";
};

type ModalProps = {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  toDos: row[];
  setToDos: (todos: row[]) => void;
  edit: row | null;
  setEdit: (edit: row | null) => void;
};

type ToDo = {
  title: string;
  status: "To-Do" | "Done";
};

export default function Modal({
  isOpen,
  setIsOpen,
  toDos,
  setToDos,
  edit,
  setEdit,
}: ModalProps) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ToDo>({
    defaultValues: {
      title: "",
      status: "To-Do",
    },
  });

  const statuses = ["To-Do", "Done"];

  useEffect(() => {
    if (edit) {
      reset({
        title: edit.title,
        status: edit.status,
      });
    }
  }, [edit, reset]);

  useEffect(() => {
    if (!isOpen) {
      reset({
        title: "",
        status: "To-Do",
      });
    }
  }, [isOpen, reset]);

  const onSubmit: SubmitHandler<ToDo> = (data) => {
    if (edit) {
      // Update existing todo
      const updatedTodos = toDos.map((todo) =>
        todo.id === edit.id ? { ...todo, ...data } : todo
      );
      localStorage.setItem("todos", JSON.stringify(updatedTodos));
      setToDos(updatedTodos);
    } else {
      // Add new todo
      const dataWithId = { id: String(crypto.randomUUID()), ...data };
      localStorage.setItem("todos", JSON.stringify([...toDos, dataWithId]));
      setToDos([...toDos, dataWithId]);
    }

    reset();
    setEdit(null);
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onClose={() => setIsOpen(false)}>
      <DialogTitle align="center">Add To-Do</DialogTitle>
      <Box
        component="form"
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        onSubmit={handleSubmit(onSubmit)}
      >
        <TextField
          label="Title"
          fullWidth
          multiline
          rows={4}
          {...register("title", { required: "Title is required" })}
          error={!!errors.title}
          helperText={errors.title?.message}
        />
        <Controller
          name="status"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <FormControl fullWidth>
              <InputLabel id="status" sx={{ pr: 0.6 }}>
                Status
              </InputLabel>
              <Select
                {...field}
                labelId="status"
                label="status"
                defaultValue={statuses[0]}
                {...register("status")}
              >
                {statuses.map((status) => (
                  <MenuItem value={status} key={status}>
                    {status}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
        />
        <Stack direction="row" spacing={2} sx={{ justifyContent: "flex-end" }}>
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{ width: "105px" }}
          >
            {edit ? "Update" : "Add"}
          </Button>
          <Button
            variant="outlined"
            size="large"
            sx={{ width: "105px" }}
            onClick={() => {
              reset();
              setIsOpen(false);
            }}
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Dialog>
  );
}
