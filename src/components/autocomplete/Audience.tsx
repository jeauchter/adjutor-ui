import * as React from "react";
import { useGetAudiencesQuery } from "../../features/products/audiences/audienceSlice";

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

export const AudienceAutocomplete: React.FunctionComponent<Props> = ({data, isLoading, isFetching}) => {


  const initialOptions = [{ id: undefined, label: undefined }];
  const options = data.map((c) => {
    return { id: c.id, label: c.name };
  });

  return (
    <AdjutorAutoCompleteField
      name="audienceId"
      label="Audience"
      disabled={isLoading || isFetching}
      options={initialOptions && options}
      id="audience-auto-complete-field"
    />
  );
};
