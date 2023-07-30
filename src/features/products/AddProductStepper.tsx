import * as React from "react";
import * as yup from "yup";
import AdjutorTextField from "../../components/AdjutorTextField";
import MultiStepForm, { FormStep } from "../../components/MultiStepForm";
import Title from "../../components/Title";
import { Paper } from "@mui/material";

const steps = ["Basics", "Attributes", "Define Variants"];

const validationSchema = yup.object({
  name: yup.string().required("Product Name is Required"),
  class: yup.string().required("Product Must have a class"),
});

const validationAttibuteSchema = yup.object({
  attributes: yup.string().required("Product Name is Required"),
});

export default function AddProductStepper() {
  return (
    <div>
      <Paper sx={{ m: 5, p: 5 }}>
        <Title>Add Product</Title>
        <MultiStepForm
          initialValues={{
            name: "",
            class: "",
            attributes: "",
          }}
          onSubmit={(values, { resetForm }) => {
            resetForm();
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <FormStep
            stepName="Basics"
            onSubmit={() => console.log("Step 1 Submit")}
            validationSchema={validationSchema}
          >
            <AdjutorTextField name="name" label="Name" />
            <AdjutorTextField name="class" label="Class" />
          </FormStep>
          <FormStep
            stepName="Attirbutes"
            onSubmit={() => console.log("Step 2 Submit")}
            validationSchema={validationAttibuteSchema}
          >
            <AdjutorTextField name="attributes" label="Attributes" />
          </FormStep>
        </MultiStepForm>
      </Paper>
    </div>
  );
}
