import { Box, Container, Toolbar, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";


export default function Copyright(props: any) {
    return (
        <Box
            component="main"
            sx={{
                backgroundColor: (theme) =>
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[900],
                flexGrow: 1,
                height: '100vh',
                overflow: 'auto',
            }}

        >
            <Toolbar />
            <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                <Typography variant="body2" color="text.secondary" align="center" {...props}>
                    {'Copyright © '}
                    <Link color="inherit" to="https://mui.com/">
                        Adjutor
                    </Link>{' '}
                    {new Date().getFullYear()}
                    {'.'}
                </Typography>
            </Container>
        </Box>

    );
}