import { Box, Paper, Step, StepLabel, Stepper } from "@mui/material";
import {
  Form,
  Formik,
  FormikConfig,
  FormikHelpers,
  FormikValues
} from "formik";
import React, { useState } from "react";
import MultiStepFormNav from "./MultiStepFormNav";

interface Props extends FormikConfig<FormikValues> {
  children: React.ReactNode;
}

const MultiStepForm = ({ children, initialValues, onSubmit }: Props) => {
  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children) as React.ReactElement[];

  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values: FormikValues) => {
    setSnapshot(values);
    setStepNumber(stepNumber + 1);
  };

  const previous = (values: FormikValues) => {
    setSnapshot(values);
    setStepNumber(stepNumber - 1);
  };

  const handleSubmit = async (
    values: FormikValues,
    actions: FormikHelpers<FormikValues>
  ) => {
    console.log(values)
    if (step.props.onSubmit) {
      await step.props.onSubmit(values);
    }
    if (isLastStep) {
      setStepNumber(0)
      return onSubmit(values, actions);
    } else {
      actions.setTouched({});
      next(values);
    }
  };

  return (
    <div>
      <Formik
        initialValues={snapshot}
        onSubmit={handleSubmit}
        validationSchema={step.props.validationSchema}
      >
        {(formik) => (
          <Form>
            <Stepper activeStep={stepNumber}>
              {steps.map(currentStep => {
                const label = currentStep.props.stepName
                return <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              })}
            </Stepper>
            <Box sx={{m:2}}>
            {step}
            </Box>
            <MultiStepFormNav
              isLastStep={isLastStep}
              hasPrevious={stepNumber > 0}
              onBackClick={() => previous(formik.values)}
              />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default MultiStepForm;

export const FormStep = ({ stepName = "", children }: any) => children;
