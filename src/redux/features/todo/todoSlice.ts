import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface TodoState {
  todos: [
    {
      id: string;
      description: string;
      completed: boolean;
    }
  ];
}

const initialState: TodoState = {
  todos: [
    {
      id: "",
      description: "",
      completed: false,
    },
  ],
};

export const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<string>) => {
      const todo = {
        id: (Math.random() * 100).toString(),
        description: action.payload,
        completed: false,
      };

      state.todos.push(todo);
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      console.log(action.payload);
      const index = state.todos.findIndex((todo) => todo.id);
      console.log("index >> ", index);
      // state.todos.splice(index, 1);
      // state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
  },
});

export const { addTodo, removeTodo } = todoSlice.actions;

export default todoSlice.reducer;
