import * as React from "react";
import { useGetClassesQuery } from "../../features/products/classes/classSlice";

import { AdjutorAutoCompleteField } from "../AdjutorFields";
interface Props {}

export const ClassAutocomplete: React.FunctionComponent<Props> = () => {
  const {
    data: classes = [],
    isLoading,
    isFetching,
    isSuccess,
  } = useGetClassesQuery();

  const initialOptions = [{ id: undefined, label: undefined }];
  const options = classes.map((c) => {
    return { id: c.id, label: c.name };
  });

  return (
    <AdjutorAutoCompleteField
      name="classId"
      label="Class"
      disabled={isLoading || isFetching}
      options={initialOptions && options}
      id="class-auto-complete-field"
    />
  );
};
