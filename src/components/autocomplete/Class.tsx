import * as React from "react";
import { useMemo, useState } from "react";
import { useGetClassesQuery } from "../../features/products/classes/classSlice";

import {AdjutorAutoCompleteField} from "../AdjutorFields";
interface Props {}

export const ClassAutocomplete: React.FunctionComponent<Props> = () => {
  const [disabledInput, setDisabledInput] = useState(false);
  
  const {
    data: classes = [],
    isLoading,
    isFetching,
    isSuccess,
  } = useGetClassesQuery();


  const options =  classes.map((c) => {
     return c.name
  }) || [] 
  console.log(options); 


  // {
  //   isLoading  && setDisabledInput(true);
  // }

  return (
    <AdjutorAutoCompleteField
      name="className"
      label="Class"
      options={options}
      id="class-auto-complete-field"
    />
  );
};
