import React from "react";
import {
  FormControl,
  FormLabel,
  FormControlLabel,
  Radio,
  RadioGroup
} from "@mui/material";

function RadioItem(props:any) {
  const { value, label } = props;
  return <FormControlLabel value={value} control={<Radio />} label={label} />;
}

export default function RadioGroupGenerator(props:any) {
  const { name, label, value, onChange, items } = props;
  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <RadioGroup
        row
        name={name}
        // label={label}
        value={value}
        onChange={onChange}
      >
        {items.map((item:TODO) => (
          <RadioItem key={item.id} value={item.id} label={item.title} />
        ))}
      </RadioGroup>
    </FormControl>
  );
}
