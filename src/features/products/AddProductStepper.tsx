import * as React from "react";
import * as yup from "yup";
import AdjutorTextField, {
  AdjutorAutoCompleteField,
} from "../../components/AdjutorFields";
import MultiStepForm, { FormStep } from "../../components/MultiStepForm";
import Title from "../../components/Title";
import { Paper } from "@mui/material";
import { useEffect, useMemo, useState } from "react";
import { useGetClassesQuery } from "./classes/classSlice";
import {ClassAutocomplete} from "../../components/autocomplete/Class"
import { VendorAutocomplete } from "../../components/autocomplete/Vendor";
import { StyleAutocomplete } from "../../components/autocomplete/Style";
import { Class } from "@mui/icons-material";
import { useGetStyleQuery, useGetStylesQuery } from "./styles/styleSlice";
const steps = ["Basics", "Attributes", "Define Variants"];
import { Classes } from "../../models/classes.model";
import { createSelector } from "@reduxjs/toolkit";
import { useGetVendorsQuery } from "./vendors/vendorSlice";
import { useGetDepartmentsQuery } from "./departments/departementSlice";

const validationSchema = yup.object({
  name: yup.string().required("Product Name is Required"),
  classId: yup.string().required("Class is Required"),
});

const validationAttibuteSchema = yup.object({
  vendorId: yup.string().required("Vendor  is Required"),
  styleId: yup.string().required("Style  is Required"),
});


// const options = ['Option 1', 'Option 2'];

export default function AddProductStepper() {
  
  const [departmentId, setDepartmentId] = useState<number | undefined>(undefined)
  const {
    data: styles = [],
    isLoading: isStylesLoading,
    isFetching: isStylesFetching,
  } = useGetStylesQuery();
  
  const {
    data: classes = [],
    isLoading: areClassesLoading,
    isFetching: areClassesFetching,
  } = useGetClassesQuery();

  const {
    data: vendors = [],
    isLoading: areVendorsLoading,
    isFetching: areVendorsFetching,
    isSuccess,
  } = useGetVendorsQuery();


  

  return (
    <div>
      <Paper sx={{ m: 5, p: 5 }}>
        <Title>Add Product</Title>
        <MultiStepForm
          initialValues={{
            name: "",
            classId: 0,
            vendorId: 0,
            styleId: 0
          }}
          onSubmit={(values, { resetForm }) => {
            alert(JSON.stringify(values, null, 2));
            console.log(departmentId)
            resetForm();
          }}
        >
          <FormStep
            stepName="Step 1"
            onSubmit={(values:any) => {
              console.log("Step 1 Submit")
              let style = styles.find((style) => {return style.id === values.styleId})
              setDepartmentId(style?.Department.id)
              
            }}
            validationSchema={validationSchema}
          >
            <AdjutorTextField
              name="name"
              label="Name"
            />
            <StyleAutocomplete data={styles} isLoading={isStylesLoading} isFetching={isStylesFetching} />
            
          </FormStep>
           <FormStep
            stepName="Step 2"
            onSubmit={(values:any) => {
              console.log(values);
              console.log(departmentId)
            }}
            validationSchema={validationAttibuteSchema}
          >
            <ClassAutocomplete data={classes} isLoading={areClassesLoading} isFetching={areClassesFetching} departmentId={departmentId} />
            <VendorAutocomplete data={vendors} isLoading={areVendorsLoading} isFetching={areVendorsLoading}/>
            
          </FormStep>
          {/* <FormStep
            stepName="Finally"
            onSubmit={() => console.log("Step 3 Submit")}
            validationSchema={validationAttibuteSchema}
          >
            <AdjutorTextField
              name="attributes"
              label="Attributes"
            />
          </FormStep> */}
        </MultiStepForm>
      </Paper>
    </div>
  );
}
