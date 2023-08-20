import * as React from "react";
import { useGetAudiencesQuery } from "../../features/products/audiences/audienceSlice";

import { AdjutorAutoCompleteField } from "../AdjutorFields";
interface Props {}

export const AudienceAutocomplete: React.FunctionComponent<Props> = () => {
  const {
    data: audiences = [],
    isLoading,
    isFetching,
    isSuccess,
  } = useGetAudiencesQuery();

  const initialOptions = [{ id: undefined, label: undefined }];
  const options = audiences.map((c) => {
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
