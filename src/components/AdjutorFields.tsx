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
  options: optionEntity[];
  id: string;
  disabled: boolean;
  children?: React.ReactElement;
}

type optionEntity = {
  id: number;
  label: string;
};



export const AdjutorAutoCompleteField = ({
  label,
  options,
  ...props
}: AutoCompleteProps) => {
  const [field, meta, helpers] = useField({ ...props });
  return (
    <Autocomplete
      {...field}
      value={field.value?.id}
      onChange={(event: any, newValue) => {
        console.log("change is ", newValue)
        const value = newValue ? newValue.id : undefined;
        helpers.setValue(value);
      }}
      getOptionLabel={(option) => {
        return option.label || undefined;
      }}
      isOptionEqualToValue={(option, value) => {
        // console.log(value);
        return option.id === value.id}}
      id={props.id + "ac"}
      options={options}
      renderInput={(params) => (
        <TextField
          sx={{ m: 1 }}
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
