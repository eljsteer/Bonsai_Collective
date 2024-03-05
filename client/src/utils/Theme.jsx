import {createTheme} from "@mui/material";

const theme = createTheme({

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },

  lightTheme: {
    palette: {
      mode: 'light',
      primary: {
        main: '#1976d2',
      },
    },
  },

  darkTheme: {
    palette: {
      mode: 'dark',
      primary: {
        main: '#1976d2',
      },
    },
  }
});

export default theme