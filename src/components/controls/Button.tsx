import React from "react";
import { Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles((theme:TODO) => ({
  root: {
    margin: theme.spacing(1)
  },
  label: {
    textTransform: "none"
  }
}));

export default function ButtonGenerator(props: TODO) {
  const classes = useStyles();
  const { text, size, color, variant, onClick, ...other } = props;
  return (
    <Button
      classes={{ root: classes.root, label: classes.label }}
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
