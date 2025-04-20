import {
    FormControl,
    FormHelperText,
    InputLabel,
    MenuItem,
    Select
  } from "@mui/material";
  import React from "react";
  
  export default function SelectDropdown(props:any) {
    const { name, label, value, error = null, options, onChange } = props;
    return (
      <FormControl variant="outlined" {...(error && { error: true })}>
        <InputLabel>{label}</InputLabel>
        <Select label={label} name={name} onChange={onChange} value={value}>
          <MenuItem value="">None</MenuItem>
          {options.map((item:any) => (
            <MenuItem key={item.id} value={item.title}>
              {item.title}
            </MenuItem>
          ))}
        </Select>
        {error && <FormHelperText>{error}</FormHelperText>}
      </FormControl>
    );
  }
  