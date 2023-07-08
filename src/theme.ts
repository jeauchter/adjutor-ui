import { createTheme } from '@mui/material/styles';
import { red } from '@mui/material/colors';

// A custom theme for this app
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#546e7a',
    },
    secondary: {
      main: '#a5d6a7',
    },
    background: {
      default: '#e8e8e8',
    },
  },
  shape: {
    borderRadius: 8,
  },
});

export default theme;

