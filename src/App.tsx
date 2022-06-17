import React from "react";
import "./App.css";
import { Box, css, styled } from "@mui/material";
import { FileDnD, Todos } from "./components";
import { TodosContextProvider } from "./context/TodosContext";

const Container = styled(Box)(({ theme }) => {
  return css`
    display: flex;
    justify-content: center;
    align-items: flex-start;

    width: 100vw;
    height: 100vh;
  `;
});

function App() {
  return (
    <Container>
      <TodosContextProvider>
        <Todos />
      </TodosContextProvider>
    </Container>
  );
}

export default App;
