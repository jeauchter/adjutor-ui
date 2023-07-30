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
import MultiStepForm, { FormStep } from "../../components/MultiStepForm";

const steps = ["Basics", "Attributes", "Define Variants"];

const validationSchema = yup.object({
  name: yup.string().required("Product Name is Required"),
  class: yup.string().required("Product Must have a class"),
});

const validationAttibuteSchema = yup.object({
  attributes: yup.string().required("Product Name is Required"),
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
    <div>
      <Title>Add Product</Title>
      <MultiStepForm
        initialValues={{
          name: "",
          class: "",
          attributes: "",
        }}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
        }}
        
      >
        <FormStep
          stepName="Basics"
          onSubmit={() => {
            console.log("Step 1 Submit");
          }}
          validationSchema={validationSchema}
        >
          <InputField name="name" label="Name" />
          <InputField name="class" label="Class" />
        </FormStep>
        <FormStep
          stepName="Attirbutes"
          onSubmit={() => {
            console.log("Step 2 Submit");
          }}
          validationSchema={validationAttibuteSchema}
        >
          <InputField name="attributes" label="Attributes" />
        </FormStep>
      </MultiStepForm>
    </div>
  );
}
