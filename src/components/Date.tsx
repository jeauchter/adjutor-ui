import { Typography } from "@mui/material";
import React, { FunctionComponent } from "react";

type DateProps = {
    passedDate: string
}

export const DateTime: FunctionComponent<DateProps> = ({passedDate}) => {
    var d= new Date(passedDate)
    return (
    <Typography  >
        {d.toLocaleString()}
    </Typography>
    )
}