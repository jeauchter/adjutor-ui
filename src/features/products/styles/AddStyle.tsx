import React, { FC } from "react";
import { AddStyleApi } from "../../../models/styles.model";
import Title from "../../../components/Title";
import * as yup from "yup";
import {
  Card,
  CardContent,
  TextField,
  CardActions,
  Button,
} from "@mui/material";
import { Formik, Form } from "formik";
import { DepartmentAutocomplete } from "../../../components/autocomplete/Department";
import { AudienceAutocomplete } from "../../../components/autocomplete/Audience";
import AdjutorTextField from "../../../components/AdjutorFields";
import { useGetDepartmentsQuery } from "../departments/departementSlice";
import { useGetAudiencesQuery } from "../audiences/audienceSlice";

interface AddStyleProps {
  onSubmit: (values: AddStyleApi) => void;
}

const validationSchema = yup.object({
  name: yup.string().required("Product Name is Required"),
  departmentId: yup.string().required("Department is Required"),
  audienceId: yup.string().required("Audience is Required"),
});


export const AddStyle: FC<AddStyleProps> = ({ onSubmit }) => {

  const {
    data: departments = [],
    isLoading: areDepartmentsLoading,
    isFetching: areDepartmentsFetching,
  } = useGetDepartmentsQuery();

  const {
    data: audiences = [],
    isLoading: areAudiencesLoading,
    isFetching: areAudiencesFetching,
  } = useGetAudiencesQuery();

  return (
    <Formik
      initialValues={{ name: "", departmentId: undefined, audienceId: undefined }}
      onSubmit={(values, { resetForm }) => {
        alert(JSON.stringify(values, null, 2));
        onSubmit(values);
        resetForm();
      }}
      validationSchema={validationSchema}
    >
      {(formik) => (
        <Form>
          <Card
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent>
              <Title>Add Style</Title>
              <AdjutorTextField
              name="name"
              label="Name"
              />
              <DepartmentAutocomplete data={departments} isLoading={areDepartmentsLoading} isFetching={areDepartmentsLoading}/>
              <AudienceAutocomplete data={audiences} isLoading={areAudiencesLoading} isFetching={areAudiencesLoading}/>
            </CardContent>
            <CardActions>
              <Button type="submit" variant="outlined">
                Add
              </Button>
              <Button type="reset" variant="outlined" color="error">
                Reset
              </Button>
            </CardActions>
          </Card>
        </Form>
      )}
    </Formik>
  );
};
