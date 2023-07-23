import { Snackbar, Alert } from '@mui/material';
import React, { FC } from 'react'

interface ErrorSnackbarProps {
  message: string
}

const ErrorSnackbar: FC<ErrorSnackbarProps> = ({ message }) => {
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {message}
        </Alert>
    </Snackbar>
  )
}

export default ErrorSnackbar;