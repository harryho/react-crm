import React, { useState } from "react";
import { makeStyles } from "@mui/styles";

export function useForm(initialFieldValues: TODO, selectedData: TODO) {

  const [values, setValues] = useState(selectedData?selectedData:initialFieldValues);
  const [errors, setErrors] = useState({});
  const [currentField, setcurrentField] = useState("");

  const handleInputChange = (e:TODO) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value
    });
    console.log("inputChange");
    setcurrentField(name);
  };

  const resetForm = () => {
    setValues(initialFieldValues);
    setErrors({});
  };

  return {
    values,
    setValues,
    errors,
    setErrors,
    handleInputChange,
    resetForm,
    currentField
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: (theme as TODO).spacing(1)
    }
  }
}));

