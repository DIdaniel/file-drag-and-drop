import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { FileDnD } from "./components/FileDnD";
import { Box, css, styled } from "@mui/material";

const Container = styled(Box)(({ theme }) => {
  return css`
    display: flex;
    justify-content: center;
    align-items: center;

    width: 100vw;
    height: 100vh;
  `;
});

function App() {
  const onUpload = (files: any) => {
    console.log(files);
  };

  return (
    <Container>
      <FileDnD onUpload={onUpload} />
    </Container>
  );
}

export default App;
