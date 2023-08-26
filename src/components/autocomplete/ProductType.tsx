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

export const StyleAutocomplete: React.FunctionComponent<Props> = ({data, isLoading, isFetching}) => {
 

  const initialOptions = [{ id: undefined, label: undefined }];
  const options = data.map((c) => {
    return { id: c.id, label: c.name };
  });


  return (
    <AdjutorAutoCompleteField
      name="styleId"
      label="Style"
      disabled={isLoading || isFetching}
      options={initialOptions && options}
      id="style-auto-complete-field"
    />
  );
};
