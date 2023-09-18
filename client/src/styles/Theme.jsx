import {createTheme} from "@mui/material"

const theme = createTheme({

  // lightTheme: {
  //   palette: {
  //     mode: 'light',
  //     primary: {
  //       main: '#1976d2',
  //     },
  //   },
  // },

  darkTheme: {
    palette: {
      mode: 'dark',
      primary: {
        main: 'rgba(255,255,255,0)',
      },
    },
  }
});

export default theme