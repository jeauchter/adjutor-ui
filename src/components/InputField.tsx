import { TextField, TextFieldProps } from "@mui/material";
import {
  FieldConfig,
  useField
} from "formik";
import React from "react";

export interface  Props  {
  label: string,
  name:string,
} 


const InputField = ({label, ...props} :Props,  ) => {
  const [field, meta] = useField({...props, type:"textfield"});
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
