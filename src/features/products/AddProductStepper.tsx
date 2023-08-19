import * as React from "react";
import * as yup from "yup";
import AdjutorTextField, {
  AdjutorAutoCompleteField,
} from "../../components/AdjutorFields";
import MultiStepForm, { FormStep } from "../../components/MultiStepForm";
import Title from "../../components/Title";
import { Paper } from "@mui/material";
import { useState } from "react";
import { useGetClassesQuery } from "./classes/classSlice";
import {ClassAutocomplete} from "../../components/autocomplete/Class"
import { VendorAutocomplete } from "../../components/autocomplete/Vendor";
const steps = ["Basics", "Attributes", "Define Variants"];

const validationSchema = yup.object({
  name: yup.string().required("Product Name is Required"),
  classId: yup.string().required("Class is Required"),
});

const validationAttibuteSchema = yup.object({
  attributes: yup.string().required("Product Name is Required"),
});


// const options = ['Option 1', 'Option 2'];


export default function AddProductStepper() {


  return (
    <div>
      <Paper sx={{ m: 5, p: 5 }}>
        <Title>Add Product</Title>
        <MultiStepForm
          initialValues={{
            name: "",
            classId: 0,
            vendorId: 0
          }}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
          }}
        >
          <FormStep
            stepName="Basics"
            onSubmit={() => console.log("Step 1 Submit")}
            validationSchema={validationSchema}
          >
            <AdjutorTextField
              name="name"
              label="Name"
            />
            <ClassAutocomplete />
            
          </FormStep>
          <FormStep
            stepName="Attirbutes"
            onSubmit={() => console.log("Step 2 Submit")}
            validationSchema={validationAttibuteSchema}
          >
            <AdjutorTextField
              name="attributes"
              label="Attributes"
            />
            <VendorAutocomplete />
            
          </FormStep>
          <FormStep
            stepName="Something"
            onSubmit={() => console.log("Step 3 Submit")}
            validationSchema={validationAttibuteSchema}
          >
            <AdjutorTextField
              name="attributes"
              label="Attributes"
            />
          </FormStep>
        </MultiStepForm>
      </Paper>
    </div>
  );
}
