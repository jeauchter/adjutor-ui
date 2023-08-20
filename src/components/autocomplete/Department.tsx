import * as React from "react";
import { useGetDepartmentsQuery } from "../../features/products/departments/departementSlice";

import { AdjutorAutoCompleteField } from "../AdjutorFields";
interface Props {}

export const DepartmentAutocomplete: React.FunctionComponent<Props> = () => {
  const {
    data: departments = [],
    isLoading,
    isFetching,
    isSuccess,
  } = useGetDepartmentsQuery();

  const initialOptions = [{ id: undefined, label: undefined }];
  const options = departments.map((c) => {
    return { id: c.id, label: c.name };
  });

  return (
    <AdjutorAutoCompleteField
      name="departmentId"
      label="Department"
      disabled={isLoading || isFetching}
      options={initialOptions && options}
      id="department-auto-complete-field"
    />
  );
};
