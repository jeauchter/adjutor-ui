import React, { FC } from "react";
import { AddProductTypeApi } from "../../../models/productType.model";
import Title from "../../../components/Title";
import {
  Card,
  CardContent,
  TextField,
  CardActions,
  Button,
} from "@mui/material";
import { Formik, Form } from "formik";

interface AddProductTypeProps {
  onSubmit: (values: AddProductTypeApi) => void;
}

export const AddProductType: FC<AddProductTypeProps> = ({ onSubmit }) => {
  return (
    <Formik
      initialValues={{ name: "" }}
      onSubmit={(values, { resetForm }) => {
        onSubmit(values);
        resetForm();
      }}
    >
      {({ values, handleChange }) => (
        <Form>
          <Card
            sx={{
              p: 1,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <CardContent>
              <Title>Add Product Type</Title>
              <TextField
                id="form-input-class-name"
                label="Name"
                variant="outlined"
                sx={{ mt: 1, mb: 1 }}
                value={values.name}
                name="name"
                onChange={handleChange}
              />
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
