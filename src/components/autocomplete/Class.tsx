import * as React from "react";
import { AdjutorAutoCompleteField } from "../AdjutorFields";
interface Props {
  data: Option[];
  isLoading: boolean;
  isFetching: boolean;
  departmentId?: number;
  changeHandler?: any;
}

type Option = {
  id: number;
  name: string;
  DepartmentID: number;
};

export const ClassAutocomplete: React.FunctionComponent<Props> = ({
  data,
  isLoading,
  isFetching,
  departmentId,
  changeHandler
}) => {
  
  const options = departmentId ?
  data.filter((c) => c.DepartmentID === departmentId).map((c) =>  ({ id: c.id, label: c.name })) :
  data.map((c) => ({ id: c.id, label: c.name }))
  options.unshift({ id: 0, label: "" })
  console.log(options.length);
  console.log(options);
  return (
    <AdjutorAutoCompleteField
      name="classId"
      label="Class"
      disabled={isLoading || isFetching}
      options={options}
      id="class-auto-complete-field"
      changeHandler={changeHandler}
    />
  );
};
