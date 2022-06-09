import React, { useRef } from "react";
import { Box } from "@mui/material";

type CustomChildrenProps = {
  onUpload: (files: any) => void;
  children: any;
};

export const CustomChildren = (props: CustomChildrenProps) => {
  const { onUpload, children, ...others } = props;

  const dropRef = useRef(null);

  return <Box ref={dropRef}>{children}</Box>;
};
