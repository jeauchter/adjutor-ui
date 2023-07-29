import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Formik } from "formik";
import { ButtonBase, TextField } from "@mui/material";
import Title from "../../components/Title";
import * as yup from "yup";
import InputField from "../../components/InputField";

const steps = ["Basics", "Attributes", "Define Variants"];

const validationSchema = yup.object({
  name: yup.string().required("Product Name is Required"),
  class: yup.string().required("Product Must have a class"),
});

export default function AddProductStepper() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Formik
      initialValues={{
        name: "",
        class: "",
      }}
      onSubmit={(values) => {
        alert(JSON.stringify(values, null, 2));
      }}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <form onSubmit={formik.handleSubmit}>
          <Title>Add Product</Title>
          <InputField name="name" label="Name"/>
          <InputField name="class" label="Class"/>
          
          <Button type="submit" color="primary" variant="contained" fullWidth sx={{mt: 3}} >Add Product</Button>
        </form>
      )}
    </Formik>
  );
}
