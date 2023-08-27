import { Paper } from "@mui/material";
import * as React from "react";
import { useState } from "react";
import * as yup from "yup";
import AdjutorTextField from "../../components/AdjutorFields";
import MultiStepForm, { FormStep } from "../../components/MultiStepForm";
import Title from "../../components/Title";
import { ClassAutocomplete } from "../../components/autocomplete/Class";
import { ProductTypeAutocomplete } from "../../components/autocomplete/ProductType";
import { StyleAutocomplete } from "../../components/autocomplete/Style";
import { VendorAutocomplete } from "../../components/autocomplete/Vendor";
import { useGetClassesQuery } from "./classes/classSlice";
import { useAddProductMutation } from "./productSlice";
import { useGetProductTypesQuery } from "./productTypes/productTypeSlice";
import { useGetStylesQuery } from "./styles/styleSlice";
import { useGetVendorsQuery } from "./vendors/vendorSlice";

const validationSchema = yup.object({
  name: yup.string().required("Product Name is Required"),
  styleId: yup.number().required().test("","Style  is Required",(value) => value > 0),
});

const validationStep2Schema = yup.object({
  classId: yup.number().required().test("","Class is Required",(value) => value > 0),
  vendorId: yup.number().required().test("","Vendor  is Required",(value) => value > 0),
});

const validationFinalSchema = yup.object({
  productTypeId: yup.number().required().test("","Product Type  is Required",(value) => value > 0),
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

  const {
    data: productTypes = [],
    isLoading: areProductTypesLoading,
    isFetching: areProductTypesFetching,
  } = useGetProductTypesQuery();
  const [addProduct, error] = useAddProductMutation()

  

  return (
    <div>
      <Paper sx={{ m: 5, p: 5 }}>
        <Title>Add Product</Title>
        <MultiStepForm
          initialValues={{
            name: "",
            classId: 0,
            vendorId: 0,
            styleId: 0,
            productTypeId: 0
          }}
          onSubmit={(values, { resetForm }) => {
            alert(JSON.stringify(values, null, 2));
            addProduct(values)
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
              alert(JSON.stringify(values, null, 2));
              console.log(departmentId)
            }}
            validationSchema={validationStep2Schema}
          >
            <ClassAutocomplete data={classes} isLoading={areClassesLoading} isFetching={areClassesFetching} departmentId={departmentId} />
            <VendorAutocomplete data={vendors} isLoading={areVendorsLoading} isFetching={areVendorsLoading}/>
            
          </FormStep>
          <FormStep
            stepName="Final"
            onSubmit={() => console.log("Step 3 Submit")}
            validationSchema={validationFinalSchema}
          >
              <ProductTypeAutocomplete data={productTypes} isLoading={areProductTypesLoading} isFetching={areProductTypesFetching} />
          </FormStep>
        </MultiStepForm>
      </Paper>
    </div>
  );
}
