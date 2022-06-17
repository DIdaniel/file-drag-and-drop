import React, { useState, useRef } from "react";
import { Box, Button, TextField } from "@mui/material";
import { useDispatch } from "react-redux";
import { addTodo } from "../../redux/features/todo/todoSlice";

export const Todo = () => {
  /** Property */
  const dispatch = useDispatch();

  const [text, setText] = useState("");

  /** Function */
  const handleChange = (word: string) => {
    setText(word);
  };

  const handleAddTodo = () => {
    dispatch(addTodo(text));
    setText("");
  };

  /** Render */
  return (
    <Box>
      <TextField
        label="todo-list"
        variant="standard"
        sx={{ width: "300px" }}
        value={text || ""}
        onChange={(e) => handleChange(e.target.value)}
      />
      <Button onClick={handleAddTodo}>ADD</Button>
    </Box>
  );
};
