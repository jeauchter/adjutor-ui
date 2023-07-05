import { Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";


export default function Copyright() {
    return (
    <Typography variant="body2" color="text.secondary" align="center" >
        {'Copyright © '}
        <Link color="inherit" to="https://mui.com/">
            Adjutor
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
    </Typography>
    )
}