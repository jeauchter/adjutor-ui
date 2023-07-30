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

const steps = ["Basics", "Attributes", "Define Variants"];

const validationSchema = yup.object({
  name: yup.string().required("Product Name is Required"),
  ACclass: yup.string().required("Product Must have a class"),
});

const validationAttibuteSchema = yup.object({
  attributes: yup.string().required("Product Name is Required"),
});


const options = ['Option 1', 'Option 2'];


export default function AddProductStepper() {
  const [disabledInput, setDisabledInput] = useState(false);
  
  const { data: classes = [], isLoading, isFetching, isSuccess } = useGetClassesQuery();

  // const [options, setOptions] = useState(classes);

  // {
  //   (isLoading || isFetching) && setDisabledInput(true);
  // }



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
            <AdjutorTextField
              name="name"
              label="Name"
            />
            <AdjutorAutoCompleteField
              name="class"
              label="Class"
              options={options}
              disabled={disabledInput}
            />
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
          </FormStep>
        </MultiStepForm>
      </Paper>
    </div>
  );
}
