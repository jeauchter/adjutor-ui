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


export const VendorAutocomplete: React.FunctionComponent<Props> = ({data, isLoading, isFetching}) => {


  const initialOptions = [{ id: undefined, label: undefined }];
  const options = data.map((c) => {
    return { id: c.id, label: c.name };
  });

  return (
    <AdjutorAutoCompleteField
      name="vendorId"
      label="Vendor"
      disabled={isLoading || isFetching}
      options={initialOptions && options}
      id="vendor-auto-complete-field"
    />
  );
};
