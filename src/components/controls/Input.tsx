import { TextField } from "@mui/material";
import React from "react";

export default function Input(props: any) {
  const { name, label, variant, value, error = null, onChange, ...others } = props;
  console.log( JSON.stringify(others))
  return (
    <TextField
      variant={variant}
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      {...(error && { error: true, helperText: error })

      }
      {
      ...others
      }
     

    />
  );
}
