import { Autocomplete, TextField } from "@mui/material";
import { FieldConfig, useField } from "formik";
import React from "react";

export interface Props extends FieldConfig {
  label: string;
  children?: React.ReactElement;
  options?: any;
  disabled:boolean
  value?: string 
  setValue?: any
  inputValue?: string
  setInputValue?: any
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

export const AdjutorAutoCompleteField = ({
  label,
  setValue,
  setInputValue,
  ...props
}: Props) => {
  const [field, meta] = useField({ ...props });
  return (
    <Autocomplete
      value={props.value}
      disabled={props.disabled}
      onChange={(event: any, newValue: string | null) => {
        setValue(newValue);
      }}
      inputValue={props.inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={props.options}
      sx={{ width: 300 }}
      renderInput={(params) => (

        <AdjutorTextField {...params}  label={label} name={field.name}/>
      )}
    />
  );
};

export default AdjutorTextField;
