import { TextField } from "@mui/material";
import {
  FieldConfig,
  useField
} from "formik";
import React from "react";

export interface  Props extends FieldConfig  {
  label: string,
  children?: React.ReactElement
} 


const AdjutorTextField = ({label, ...props} :Props  ) => {
  const [field, meta] = useField({...props});
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

export default AdjutorTextField;
