import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import { Todo } from "./Todo";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { removeTodo } from "../../redux/features/todo/todoSlice";

export const Todos = () => {
  /** Property */
  const count = useSelector((state: RootState) => state.counter.count);
  const todos = useSelector((state: RootState) => state.todo.todos);
  const dispatch = useDispatch();

  /** Function */
  const handleDelete = (index: number) => {
    console.log(index.toString());
    dispatch(removeTodo(index.toString()));
  };

  useEffect(() => {
    console.log(todos);
  }, [todos]);

  /** Render */
  return (
    <Box>
      <Todo />
      {todos &&
        todos.map((todo, index) => (
          <Box key={index} sx={{ display: "flex" }}>
            <Typography>{todo.description}</Typography>
            <Button onClick={() => handleDelete(index)}>Delete</Button>
          </Box>
        ))}
    </Box>
  );
};
