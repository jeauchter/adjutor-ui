import { Autocomplete, TextField } from "@mui/material";
import { FieldConfig, useField } from "formik";
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
  children?: React.ReactElement;
  options: any;
  disabled:boolean
}

export const AdjutorAutoCompleteField = ({
  label,
  options,
  ...props
}: AutoCompleteProps) => {
  const [field, meta] = useField({ ...props });
  const [value, setValue] = React.useState<string | null>(options[0]);
  const [inputValue, setInputValue] = React.useState("");
  return (
    <Autocomplete
      value={value}
      disabled={props.disabled}
      onChange={(event: any, newValue: string | null) => {
        setValue(newValue);
      }}
      inputValue={inputValue}
      onInputChange={(event, newInputValue) => {
        setInputValue(newInputValue);
      }}
      id="controllable-states-demo"
      options={options}
      sx={{ width: 300 }}
      renderInput={(params) => (

        <AdjutorTextField {...params}  label={label} name={"AC" + field.name}/>
      )}
    />
  );
};

export default AdjutorTextField;
