import {
  Button,
  Paper,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useState } from "react";

import Modal from "./Modal";

function createData(id: string, title: string, status: "To-Do" | "Done") {
  return { id, title, status };
}

const rows = [
  createData("1", "Task 1", "Done"),
  createData("2", "Task 2", "To-Do"),
  createData("3", "Task 3", "Done"),
  createData("4", "Task 4", "To-Do"),
];

type ToDo = {
  id: string;
  title: string;
  status: "To-Do" | "Done";
};

export default function ToDoLayout() {
  const todoList: typeof rows = JSON.parse(
    localStorage.getItem("todos") || "[]"
  );
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState<ToDo | null>(null);
  const [toDos, setToDos] = useState<typeof rows>(
    todoList.length === 0 ? rows : todoList
  );

  return (
    <>
      <Modal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        toDos={toDos}
        setToDos={setToDos}
        edit={edit}
        setEdit={setEdit}
      />
      <Stack
        spacing={2}
        sx={{
          alignItems: "flex-end",
          justifyContent: "flex-start",
          height: "100%",
          p: 2,
        }}
      >
        <Stack direction="row">
          <Button variant="contained" onClick={() => setIsOpen(true)}>
            Add To-Do
          </Button>
        </Stack>
        <TableContainer component={Paper} variant="outlined">
          <Table sx={{ minWidth: 748 }}>
            <TableHead>
              <TableRow
                sx={{
                  backgroundColor: "secondary.main",
                  "& > *": {
                    color: "primary.contrastText",
                  },
                }}
              >
                <TableCell>Title</TableCell>
                <TableCell>Status</TableCell>
                <TableCell></TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {toDos.map((toDo) => (
                <TableRow key={toDo.id}>
                  <TableCell sx={{ width: "100%" }}>{toDo.title}</TableCell>
                  <TableCell
                    sx={{
                      color:
                        toDo.status === "To-Do"
                          ? "warning.light"
                          : "success.main",
                      fontWeight: "bold",
                    }}
                  >
                    {toDo.status}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => {
                        setEdit(toDo);
                        console.log(toDo);
                        setIsOpen(true);
                      }}
                    >
                      Edit
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={() => {
                        const newToDos = toDos.filter(
                          (todo) => todo.id !== toDo.id
                        );
                        localStorage.setItem("todos", JSON.stringify(newToDos));
                        setToDos(newToDos);
                      }}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Stack>
    </>
  );
}
