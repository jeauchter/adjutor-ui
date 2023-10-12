import * as React from "react";
import { AdjutorAutoCompleteField } from "../AdjutorFields";
interface Props {
  data: Option[];
  isLoading: boolean;
  isFetching: boolean;
  changeHandler?: any;
}

type Option = {
  id: number;
  name: string;
};

export const ProductTypeAutocomplete: React.FunctionComponent<Props> = ({
  data,
  isLoading,
  isFetching,
  changeHandler
}) => {
  const initialOptions = [{ id: undefined, label: undefined }];
  const options = data.map((c) => {
    return { id: c.id, label: c.name };
  });

  return (
    <AdjutorAutoCompleteField
      name="productTypeId"
      label="ProductType"
      disabled={isLoading || isFetching}
      options={initialOptions && options}
      id="product-type-auto-complete-field"
      changeHandler={changeHandler}
    />
  );
};
