import {
    FormControl,
    FormControlLabel,
    FormGroup,
    FormLabel,
    Checkbox
  } from "@mui/material";
  import React, { ReactEventHandler } from "react";
  
  const checkedtoValue = (e: React.SyntheticEvent & TODO) => ({
    target: {
      name: e.target.name,
      value: e.target.checked
    }
  });
  
  export default function CheckboxGenerator(props:any) {
    const { name, label, value, onChange } = props;
    return (
      <FormControl>
        <FormControlLabel
          control={
            <Checkbox
              checked={value}
              onChange={(e) => onChange(checkedtoValue(e))}
              name={name}
            />
          }
          label={label}
        />
      </FormControl>
    );
  }
  