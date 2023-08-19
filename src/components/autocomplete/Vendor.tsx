import * as React from "react";
import { useMemo, useState } from "react";
import { useGetVendorsQuery } from "../../features/products/vendors/vendorSlice";

import {AdjutorAutoCompleteField} from "../AdjutorFields";
interface Props {}

export const VendorAutocomplete: React.FunctionComponent<Props> = () => {
  
  const {
    data: vendors = [],
    isLoading,
    isFetching,
    isSuccess,
  } = useGetVendorsQuery();

  const initialOptions = [{id:undefined, label:undefined}]
  const options =  vendors.map((c) => {
    console.log(c);
     return {id: c.id, label: c.name}
  }) 

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
