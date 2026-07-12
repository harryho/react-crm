import React from "react";
import { Button, type ButtonProps } from "@mui/material";

type ButtonGeneratorProps = ButtonProps & {
  text: React.ReactNode;
};

export default function ButtonGenerator(props: ButtonGeneratorProps) {
  const { text, size, color, variant, onClick, sx, ...other } = props;
  return (
    <Button
      sx={{ m: 1, textTransform: "none", ...sx }}
      variant={variant || "contained"}
      size={size || "large"}
      color={color || "primary"}
      onClick={onClick}
      {...other}
    >
      {text}
    </Button>
  );
}
