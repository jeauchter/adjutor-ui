import { Button } from "@mui/material";
import { FormikValues } from "formik";
import React from "react";

interface Props {
  hasPrevious?: boolean;
  onBackClick: (values: FormikValues) => void;
  isLastStep: boolean;
}

const MultiStepFormNav = (props: Props) => {
  return (
    <div
      style={{
        display: "flex",
        margin: 50,
        justifyContent: "space-between",
      }}
    >
      {props.hasPrevious && (
        <Button type="button" onClick={props.onBackClick}>
          Back
        </Button>
      )}
      <Button type="submit" color="primary">
        {props.isLastStep ? "Submit" : "Next"}
      </Button>
    </div>
  );
};

export default MultiStepFormNav