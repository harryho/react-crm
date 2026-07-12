import React, { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type FormValues = Record<string, any>;

// selectedData comes from React Router's useLoaderData(), typed `unknown`
// by design - cast once here rather than forcing every call site to cast.
export function useForm(initialFieldValues: FormValues, selectedData: unknown) {

  const [values, setValues] = useState<FormValues>(
    (selectedData ? selectedData : initialFieldValues) as FormValues
  );
  const [errors, setErrors] = useState({});
  const [currentField, setcurrentField] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
