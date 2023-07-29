import { TextField, TextFieldProps } from "@mui/material";
import {
  FieldConfig,
  useField
} from "formik";
import React from "react";

type Props =  {
  label: string,
} & TextFieldProps

const InputField = ({label, ...props}:Props ) => {
  const [field, meta] = useField(label);
  return (
    <TextField
      fullWidth
      label={label}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export default InputField;
