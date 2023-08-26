import * as React from "react";
import { AdjutorAutoCompleteField } from "../AdjutorFields";
interface Props {
  data:Option[],
  isLoading: boolean,
  isFetching: boolean
}

type Option = {
  id: number,
  name: string
}

export const DepartmentAutocomplete: React.FunctionComponent<Props> = ({data, isLoading, isFetching}) => {


  const options = data.map((c) => {
    return { id: c.id, label: c.name };
  });
  options.unshift({ id: 0, label: "" })

  return (
    <AdjutorAutoCompleteField
      name="departmentId"
      label="Department"
      disabled={isLoading || isFetching}
      options={options}
      id="department-auto-complete-field"
    />
  );
};
