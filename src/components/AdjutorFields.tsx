import { Autocomplete, TextField } from "@mui/material";
import { FieldConfig, Formik, useField } from "formik";
import React from "react";

export interface Props extends FieldConfig {
  label: string;
  children?: React.ReactElement;
}

const AdjutorTextField = ({ label, ...props }: Props) => {
  const [field, meta] = useField({ ...props });
  return (
    <TextField
      fullWidth
      sx={{ mb: 1, mt: 1 }}
      label={label}
      {...field}
      {...props}
      error={meta.touched && Boolean(meta.error)}
      helperText={meta.touched && meta.error}
    />
  );
};

export interface AutoCompleteProps extends FieldConfig {
  label: string;
  options: any;
  id: string;
  children?: React.ReactElement;
}

export const AdjutorAutoCompleteField = ({
  label,
  options,
  ...props
}: AutoCompleteProps) => {
  const [field, meta, helpers] = useField({ ...props });
  return (
    <Autocomplete
      {...field}
      value={field.value}
      onChange={(event: any, newValue: string | null) => {
        helpers.setValue(newValue);
      }}
      id={props.id + "ac"}
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField
          {...params}
          label={label}
          {...field}
          {...props}
          error={meta.touched && Boolean(meta.error)}
          helperText={meta.touched && meta.error}
        />
      )}
    />
  );
};

export default AdjutorTextField;
